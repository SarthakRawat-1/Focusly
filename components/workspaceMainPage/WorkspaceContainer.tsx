"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Brain, 
  Target, 
  MessageSquare,
  Filter,
  Grid,
  List,
  Search,
  Plus,
  Settings,
  Crown,
  Shield,
  Eye,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { ExtendedWorkspace } from "@/types/extended";
import { UserPermission } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { FilterContainer } from "./filter/FilterContainer";
import { RecentActivityContainer } from "./recentActivity/RecentActivityContainer";
import { useNewTask } from "@/hooks/useNewTask";
import { useNewMindMap } from "@/hooks/useNewMindMap";
import Link from "next/link";

interface Props {
  workspace: ExtendedWorkspace;
  userRole: UserPermission | null;
  userId: string;
}

interface WorkspaceStats {
  taskCount: number;
  mindMapCount: number;
  memberCount: number;
  recentActivityCount: number;
}

export const WorkspaceContainer = ({ workspace, userRole, userId }: Props) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  
  const { newTask, isPending: isNewTaskLoading } = useNewTask(workspace.id);
  const { newMindMap, isPending: isNewMindMapLoading } = useNewMindMap(workspace.id);

  // Debounce search to improve performance
  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearchQuery(value);
  }, 300);

  // Fetch workspace stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["workspaceStats", workspace.id],
    queryFn: async () => {
      const res = await fetch(`/api/workspace/get/workspace_stats?workspaceId=${workspace.id}`);
      if (!res.ok) throw new Error("Failed to fetch workspace stats");
      return res.json() as Promise<WorkspaceStats>;
    },
  });

  const getRoleIcon = (role: UserPermission | null) => {
    switch (role) {
      case "OWNER":
        return <Crown className="h-4 w-4" />;
      case "ADMIN":
        return <Shield className="h-4 w-4" />;
      case "CAN_EDIT":
        return <Settings className="h-4 w-4" />;
      default:
        return <Eye className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: UserPermission | null) => {
    switch (role) {
      case "OWNER":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
      case "ADMIN":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800";
      case "CAN_EDIT":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      PURPLE: "from-purple-400/20 to-purple-600/20 border-purple-400/30",
      RED: "from-red-400/20 to-red-600/20 border-red-400/30",
      GREEN: "from-green-400/20 to-green-600/20 border-green-400/30",
      BLUE: "from-blue-400/20 to-blue-600/20 border-blue-400/30",
      PINK: "from-pink-400/20 to-pink-600/20 border-pink-400/30",
      YELLOW: "from-yellow-400/20 to-yellow-600/20 border-yellow-400/30",
      ORANGE: "from-orange-400/20 to-orange-600/20 border-orange-400/30",
      CYAN: "from-cyan-400/20 to-cyan-600/20 border-cyan-400/30",
      LIME: "from-lime-400/20 to-lime-600/20 border-lime-400/30",
      EMERALD: "from-emerald-400/20 to-emerald-600/20 border-emerald-400/30",
      INDIGO: "from-indigo-400/20 to-indigo-600/20 border-indigo-400/30",
      FUCHSIA: "from-fuchsia-400/20 to-fuchsia-600/20 border-fuchsia-400/30",
    };
    return colorMap[workspace.color] || "from-primary/20 to-primary/30 border-primary/30";
  };

  const quickActions = [
    {
      title: "New Task",
      description: "Create a new task",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      onClick: newTask,
      loading: isNewTaskLoading,
      disabled: userRole === "READ_ONLY",
    },
    {
      title: "New Mind Map",
      description: "Create a mind map",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      onClick: newMindMap,
      loading: isNewMindMapLoading,
      disabled: userRole === "READ_ONLY",
    },
    {
      title: "Group Chat",
      description: "Join the conversation",
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      href: `/dashboard/workspace/${workspace.id}/chat/${workspace.conversation.id}`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "bg-gradient-to-r rounded-xl border p-6",
          getColorClass(workspace.color)
        )}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {workspace.image ? (
                <img
                  src={workspace.image}
                  alt={workspace.name}
                  className="h-16 w-16 rounded-xl object-cover border-2 border-white/20"
                />
              ) : (
                <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-white/20 to-white/10 border-2 border-white/20 flex items-center justify-center text-white font-bold text-2xl">
                  {workspace.name.charAt(0).toUpperCase()}
                </div>
              )}
              <Badge 
                className={cn(
                  "absolute -top-2 -right-2 text-xs h-6 px-2 border",
                  getRoleColor(userRole)
                )}
              >
                {getRoleIcon(userRole)}
                <span className="ml-1 capitalize">{userRole?.toLowerCase().replace('_', ' ')}</span>
              </Badge>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {workspace.name}
              </h1>
              <p className="text-muted-foreground mt-1">
                Collaborate, organize, and achieve your goals together
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                placeholder="Search tasks and mind maps..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                className="pl-10 pr-10 w-full sm:w-64"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedSearchQuery("");
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
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
          ))
        ) : (
          [
            {
              title: "Tasks",
              value: stats?.taskCount || 0,
              icon: Target,
              color: "text-green-500",
              bgColor: "bg-green-500/10",
              borderColor: "border-green-500/20",
            },
            {
              title: "Mind Maps",
              value: stats?.mindMapCount || 0,
              icon: Brain,
              color: "text-purple-500",
              bgColor: "bg-purple-500/10",
              borderColor: "border-purple-500/20",
            },
            {
              title: "Members",
              value: stats?.memberCount || 0,
              icon: Users,
              color: "text-blue-500",
              bgColor: "bg-blue-500/10",
              borderColor: "border-blue-500/20",
            },
            {
              title: "Recent Activity",
              value: stats?.recentActivityCount || 0,
              icon: Briefcase,
              color: "text-orange-500",
              bgColor: "bg-orange-500/10",
              borderColor: "border-orange-500/20",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -2, scale: 1.02 }}
            >
              <Card className={cn("border-border/50 hover:shadow-lg transition-all duration-300", stat.borderColor)}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg border", stat.bgColor, stat.borderColor)}>
                      <stat.icon className={cn("h-5 w-5", stat.color)} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              <CardTitle>Quick Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ y: -2, scale: 1.02 }}
                >
                  {action.href ? (
                    <Link href={action.href}>
                      <div className={cn(
                        "p-4 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer group",
                        action.bgColor,
                        action.borderColor
                      )}>
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-lg border", action.bgColor, action.borderColor)}>
                            <action.icon className={cn("h-5 w-5", action.color)} />
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
                  ) : (
                    <Button
                      variant="ghost"
                      className={cn(
                        "h-auto p-4 rounded-lg border transition-all duration-300 hover:shadow-md w-full justify-start",
                        action.bgColor,
                        action.borderColor
                      )}
                      onClick={action.onClick}
                      disabled={action.disabled || action.loading}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className={cn("p-2 rounded-lg border", action.bgColor, action.borderColor)}>
                          <action.icon className={cn("h-5 w-5", action.color)} />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="font-semibold text-sm">
                            {action.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {action.description}
                          </p>
                        </div>
                      </div>
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <FilterContainer sessionUserId={userId} />
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle>Recent Activity</CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">
                {viewMode === "grid" ? "Grid" : "List"} View
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <RecentActivityContainer
              userId={userId}
              workspaceId={workspace.id}
              viewMode={viewMode}
              searchQuery={debouncedSearchQuery}
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};