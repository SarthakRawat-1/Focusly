"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  PencilRuler, 
  Workflow, 
  Plus, 
  ChevronDown,
  Users,
  Target,
  Brain,
  Folder,
  Activity
} from "lucide-react";
import { useTranslations } from "next-intl";
import { NewTask } from "./actions/NewTask";
import { useQuery } from "@tanstack/react-query";
import { WorkspaceShortcuts } from "@/types/extended";
import { NewMindMap } from "./actions/NewMindMap";
import { UsersContainer } from "./usersList/UsersContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import ActiveLink from "@/components/ui/active-link";
import { changeCodeToEmoji } from "@/lib/changeCodeToEmoji";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  workspaceId: string;
}

export const ModernWorkspaceOptions = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
  const [tasksExpanded, setTasksExpanded] = useState(false);
  const [mindMapsExpanded, setMindMapsExpanded] = useState(false);

  const { data: workspaceShortcuts, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(
        `/api/workspace/get/workspace_shortcuts?workspaceId=${workspaceId}`
      );

      if (!res.ok) return null;

      const data = await res.json();
      return data as WorkspaceShortcuts;
    },
    queryKey: ["getWrokspaceShortcuts", workspaceId],
  });

  const taskCount = workspaceShortcuts?.tasks?.length || 0;
  const mindMapCount = workspaceShortcuts?.mindMaps?.length || 0;

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Plus className="h-4 w-4 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <NewTask workspaceId={workspaceId} />
            <NewMindMap workspaceId={workspaceId} />
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Shortcuts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Folder className="h-4 w-4 text-primary" />
              Content
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            ) : (
              workspaceShortcuts && (
                <>
                  {/* Tasks Section */}
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between p-2 h-auto"
                      onClick={() => setTasksExpanded(!tasksExpanded)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-green-500/10 rounded border border-green-500/20">
                          <Target className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm font-medium">Tasks</span>
                        <Badge variant="secondary" className="text-xs h-5">
                          {taskCount}
                        </Badge>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          tasksExpanded && "rotate-180"
                        )}
                      />
                    </Button>
                    
                    <AnimatePresence>
                      {tasksExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-2 space-y-1"
                        >
                          {workspaceShortcuts.tasks.length > 0 ? (
                            workspaceShortcuts.tasks.slice(0, 5).map((task) => {
                              const name = task.title && task.title.length > 18
                                ? task.title.substring(0, 17) + "..."
                                : task.title || "Untitled Task";

                              return (
                                <ActiveLink
                                  key={task.id}
                                  href={`/dashboard/workspace/${workspaceId}/tasks/task/${task.id}`}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs h-8 font-normal"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    {task.emoji && (
                                      <span className="text-sm flex-shrink-0">
                                        {changeCodeToEmoji(task.emoji)}
                                      </span>
                                    )}
                                    <span className="truncate">{name}</span>
                                  </div>
                                </ActiveLink>
                              );
                            })
                          ) : (
                            <p className="text-xs text-muted-foreground py-2">
                              No tasks yet
                            </p>
                          )}
                          {workspaceShortcuts.tasks.length > 5 && (
                            <p className="text-xs text-muted-foreground py-1">
                              +{workspaceShortcuts.tasks.length - 5} more tasks
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Separator />

                  {/* Mind Maps Section */}
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between p-2 h-auto"
                      onClick={() => setMindMapsExpanded(!mindMapsExpanded)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-purple-500/10 rounded border border-purple-500/20">
                          <Brain className="h-3 w-3 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">Mind Maps</span>
                        <Badge variant="secondary" className="text-xs h-5">
                          {mindMapCount}
                        </Badge>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          mindMapsExpanded && "rotate-180"
                        )}
                      />
                    </Button>
                    
                    <AnimatePresence>
                      {mindMapsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-2 space-y-1"
                        >
                          {workspaceShortcuts.mindMaps.length > 0 ? (
                            workspaceShortcuts.mindMaps.slice(0, 5).map((mindMap) => {
                              const name = mindMap.title && mindMap.title.length > 18
                                ? mindMap.title.substring(0, 17) + "..."
                                : mindMap.title || "Untitled Mind Map";

                              return (
                                <ActiveLink
                                  key={mindMap.id}
                                  href={`/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${mindMap.id}`}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs h-8 font-normal"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-sm flex-shrink-0">🧠</span>
                                    <span className="truncate">{name}</span>
                                  </div>
                                </ActiveLink>
                              );
                            })
                          ) : (
                            <p className="text-xs text-muted-foreground py-2">
                              No mind maps yet
                            </p>
                          )}
                          {workspaceShortcuts.mindMaps.length > 5 && (
                            <p className="text-xs text-muted-foreground py-1">
                              +{workspaceShortcuts.mindMaps.length - 5} more mind maps
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UsersContainer />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};