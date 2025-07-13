"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Activity, 
  ArrowRight,
  Clock,
  Star,
  Briefcase,
  Brain
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ReadOnlyEmoji } from "../common/ReadOnlyEmoji";
import { useFormatter } from "next-intl";
import { HomeRecentActivity } from "@/types/extended";

interface Props {
  userId: string;
}

export const DashboardRecentActivity = ({ userId }: Props) => {
  const format = useFormatter();
  
  const { data: recentActivity, isLoading } = useQuery({
    queryKey: ["dashboardRecentActivity", userId],
    queryFn: async () => {
      const res = await fetch(`/api/home-page/get?userId=${userId}&page=1&take=8`);
      if (!res.ok) throw new Error("Failed to fetch recent activity");
      return res.json() as Promise<HomeRecentActivity[]>;
    },
  });

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-9 w-20" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border/30">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-4 w-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {recentActivity?.length || 0}
              </Badge>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">
                View All
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!recentActivity || recentActivity.length === 0 ? (
            <div className="text-center py-8">
              <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                <Activity className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No recent activity</h3>
              <p className="text-muted-foreground text-sm">
                Start creating tasks and mind maps to see your activity here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Link href={item.link}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-border/30 hover:shadow-md transition-all duration-300 group cursor-pointer">
                      <div className="relative">
                        <ReadOnlyEmoji
                          className="h-10 w-10"
                          selectedEmoji={item.emoji}
                        />
                        <Badge 
                          variant={item.type === "task" ? "default" : "secondary"}
                          className="absolute -top-1 -right-1 text-xs h-4 px-1"
                        >
                          {item.type === "task" ? (
                            <Briefcase className="h-2 w-2" />
                          ) : (
                            <Brain className="h-2 w-2" />
                          )}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                            {item.title || `Untitled ${item.type === "task" ? "Task" : "Mind Map"}`}
                          </h3>
                          {item.starred && (
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{format.relativeTime(new Date(item.updated.at), new Date())}</span>
                          <span className="mx-1">•</span>
                          <span className="truncate">{item.workspaceName}</span>
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};