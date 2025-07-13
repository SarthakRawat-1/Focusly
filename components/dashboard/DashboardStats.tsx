"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Brain, 
  Users, 
  Star, 
  Calendar,
  TrendingUp,
  Target,
  Clock
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

interface Props {
  userId: string;
}

interface DashboardStatsData {
  totalWorkspaces: number;
  totalTasks: number;
  totalMindMaps: number;
  starredItems: number;
  assignedToMe: number;
  recentActivity: number;
  completedThisWeek: number;
  upcomingDeadlines: number;
}

export const DashboardStats = ({ userId }: Props) => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats", userId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/stats?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json() as Promise<DashboardStatsData>;
    },
  });

  const statItems = [
    {
      title: "Workspaces",
      value: stats?.totalWorkspaces || 0,
      icon: Briefcase,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Tasks",
      value: stats?.totalTasks || 0,
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Mind Maps",
      value: stats?.totalMindMaps || 0,
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Starred",
      value: stats?.starredItems || 0,
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      title: "Assigned to Me",
      value: stats?.assignedToMe || 0,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
    {
      title: "Recent Activity",
      value: stats?.recentActivity || 0,
      icon: TrendingUp,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
    },
    {
      title: "Completed This Week",
      value: stats?.completedThisWeek || 0,
      icon: Calendar,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      title: "Upcoming Deadlines",
      value: stats?.upcomingDeadlines || 0,
      icon: Clock,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-6 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {statItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 * index }}
          whileHover={{ y: -4, scale: 1.02 }}
        >
          <Card className={`border-border/50 hover:shadow-lg transition-all duration-300 ${item.borderColor}`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.bgColor} ${item.borderColor} border`}>
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold">
                    {item.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};