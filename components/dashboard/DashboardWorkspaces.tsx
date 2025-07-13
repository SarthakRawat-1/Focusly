"use client";

import { Workspace } from "@prisma/client";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { 
  Briefcase, 
  Plus, 
  Users, 
  Settings,
  Crown,
  Shield,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  userWorkspaces: Workspace[];
  userAdminWorkspaces: Workspace[];
  userId: string;
}

interface WorkspaceWithStats extends Workspace {
  taskCount: number;
  mindMapCount: number;
  memberCount: number;
  userRole: "OWNER" | "ADMIN" | "CAN_EDIT" | "READ_ONLY";
}

export const DashboardWorkspaces = ({ 
  userWorkspaces, 
  userAdminWorkspaces, 
  userId 
}: Props) => {
  const { data: workspacesWithStats, isLoading } = useQuery({
    queryKey: ["workspacesWithStats", userId],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/workspaces?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch workspace stats");
      return res.json() as Promise<WorkspaceWithStats[]>;
    },
  });

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      PURPLE: "bg-purple-500",
      RED: "bg-red-500",
      GREEN: "bg-green-500",
      BLUE: "bg-blue-500",
      PINK: "bg-pink-500",
      YELLOW: "bg-yellow-500",
      ORANGE: "bg-orange-500",
      CYAN: "bg-cyan-500",
      LIME: "bg-lime-500",
      EMERALD: "bg-emerald-500",
      INDIGO: "bg-indigo-500",
      FUCHSIA: "bg-fuchsia-500",
    };
    return colorMap[color] || "bg-primary";
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "OWNER":
        return <Crown className="h-3 w-3" />;
      case "ADMIN":
        return <Shield className="h-3 w-3" />;
      case "CAN_EDIT":
        return <Settings className="h-3 w-3" />;
      default:
        return <Eye className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "OWNER":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ADMIN":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "CAN_EDIT":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-9 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border/30">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-32" />
                      <div className="flex gap-2">
                        <Skeleton className="h-5 w-12" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle>Your Workspaces</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {workspacesWithStats?.length || 0}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {!workspacesWithStats || workspacesWithStats.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No workspaces yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first workspace to start organizing your tasks and mind maps.
              </p>
              <Button disabled>
                <Plus className="h-4 w-4 mr-2" />
                Create Workspace
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workspacesWithStats.map((workspace, index) => (
                <motion.div
                  key={workspace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  <Link href={`/dashboard/workspace/${workspace.id}`}>
                    <Card className="border-border/30 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            {workspace.image ? (
                              <img
                                src={workspace.image}
                                alt={workspace.name}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                            ) : (
                              <div className={cn(
                                "h-10 w-10 rounded-lg flex items-center justify-center text-white font-bold",
                                getColorClass(workspace.color)
                              )}>
                                {workspace.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <Badge 
                              className={cn(
                                "absolute -top-2 -right-2 text-xs h-5 px-1.5 border",
                                getRoleColor(workspace.userRole)
                              )}
                            >
                              {getRoleIcon(workspace.userRole)}
                            </Badge>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate group-hover:text-primary transition-colors">
                              {workspace.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {workspace.memberCount} member{workspace.memberCount !== 1 ? 's' : ''}
                            </p>
                            
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {workspace.taskCount} tasks
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {workspace.mindMapCount} mind maps
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
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