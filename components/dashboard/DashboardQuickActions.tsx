"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Calendar,
  Star,
  Users,
  Clock,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { AddTaskShortcut } from "../addTaskShortCut/AddTaskShortcut";

interface Props {
  userId: string;
}

export const DashboardQuickActions = ({ userId }: Props) => {
  const quickActions = [
    {
      title: "Create Task",
      description: "Add a new task to any workspace",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      component: <AddTaskShortcut userId={userId} />,
    },
    {
      title: "View Calendar",
      description: "See all your scheduled tasks",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      href: "/dashboard/calendar",
    },
    {
      title: "Starred Items",
      description: "Access your favorite content",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      href: "/dashboard/starred",
    },
    {
      title: "Assigned to Me",
      description: "View tasks assigned to you",
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      href: "/dashboard/assigned-to-me",
    },
    {
      title: "Pomodoro Timer",
      description: "Focus with time management",
      icon: Clock,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      href: "/dashboard/pomodoro",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            <CardTitle>Quick Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                {action.component ? (
                  <div className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${action.bgColor} ${action.borderColor}`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${action.bgColor} ${action.borderColor} border`}>
                        <action.icon className={`h-5 w-5 ${action.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{action.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    {action.component}
                  </div>
                ) : (
                  <Link href={action.href || "#"}>
                    <div className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer group ${action.bgColor} ${action.borderColor}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${action.bgColor} ${action.borderColor} border`}>
                          <action.icon className={`h-5 w-5 ${action.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                            {action.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};