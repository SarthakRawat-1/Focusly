"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Calendar, 
  Users, 
  Star, 
  Clock, 
  Edit3,
  MoreHorizontal,
  Trash,
  StarOff,
  User,
  Tag,
  ArrowLeft,
  Share,
  Copy,
  CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { ExtendedTask } from "@/types/extended";
import { UserPermission } from "@prisma/client";
import { useFormatter, useTranslations } from "next-intl";
import { ReadOnlyEmoji } from "../common/ReadOnlyEmoji";
import { UserHoverInfo } from "../common/UserHoverInfoCard";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TaskOptions } from "./readOnly/TaskOptions";
import { ReadOnlyCalendar } from "./readOnly/ReadOnlyCalendar";
import { LinkTag } from "./editable/tag/LinkTag";
import { AssignedToTaskSelector } from "./assignToTask/AssignedToTaskSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { TaskContentRenderer } from "./TaskContentRenderer";

interface Props {
  task: ExtendedTask;
  isSavedByUser: boolean;
  userRole: UserPermission | null;
  workspaceName: string;
}

export const TaskPageContainer = ({ 
  task, 
  isSavedByUser, 
  userRole, 
  workspaceName 
}: Props) => {
  const [isSaved, setIsSaved] = useState(isSavedByUser);
  const t = useTranslations("TASK.EDITOR.READ_ONLY");
  const format = useFormatter();
  const { toast } = useToast();
  
  const dateTime = new Date(task.updatedAt);
  const now = new Date();

  const onSetIsSaved = () => {
    setIsSaved((prev) => !prev);
  };

  const copyTaskLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this task with others",
    });
  };

  const getStatusColor = () => {
    return "bg-green-500/10 text-green-700 border-green-500/20";
  };

  const getPriorityColor = () => {
    return "bg-orange-500/10 text-orange-700 border-orange-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/50 p-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex items-start gap-4 flex-1">
            <div className="relative">
              <ReadOnlyEmoji 
                className="h-16 w-16 sm:h-20 sm:w-20" 
                selectedEmoji={task.emoji} 
              />
              <Badge 
                className="absolute -top-2 -right-2 text-xs h-6 px-2 border bg-primary/10 text-primary border-primary/20"
              >
                <Target className="h-3 w-3 mr-1" />
                Task
              </Badge>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-3">
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground flex-1">
                  {task.title || t("NO_TITLE")}
                </h1>
                {isSaved && (
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                )}
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <span className="text-sm">in</span>
                <Badge variant="outline" className="text-xs">
                  {workspaceName}
                </Badge>
                <span className="text-sm">•</span>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="h-3 w-3" />
                  <span>Updated {format.relativeTime(dateTime, now)}</span>
                </div>
              </div>

              {/* Status and Priority Badges */}
              <div className="flex items-center gap-2 mb-4">
                <Badge className={cn("text-xs", getStatusColor())}>
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  In Progress
                </Badge>
                <Badge className={cn("text-xs", getPriorityColor())}>
                  High Priority
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyTaskLink}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            
            {userRole && userRole !== "READ_ONLY" && (
              <Button asChild size="sm">
                <Link href={`/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}/edit`}>
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
            )}
            
            <TaskOptions
              onSetIsSaved={onSetIsSaved}
              isSaved={isSaved}
              taskId={task.id}
              workspaceId={task.workspaceId}
              userRole={userRole}
            />
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Task Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-primary" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                {task.content ? (
                  <TaskContentRenderer content={task.content} />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Edit3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No description provided</p>
                    {userRole && userRole !== "READ_ONLY" && (
                      <Button variant="outline" size="sm" className="mt-3" asChild>
                        <Link href={`/dashboard/workspace/${task.workspaceId}/tasks/task/${task.id}/edit`}>
                          Add Description
                        </Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity/Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activity yet</p>
                  <p className="text-xs mt-1">Comments and updates will appear here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Task Metadata */}
        <div className="space-y-6">
          {/* Assignment and Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Assignment & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Assigned To
                  </label>
                  <AssignedToTaskSelector
                    taskId={task.id}
                    workspaceId={task.workspaceId}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Due Date
                  </label>
                  <ReadOnlyCalendar
                    from={task.taskDate?.from}
                    to={task.taskDate?.to}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-primary" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <LinkTag key={tag.id} tag={tag} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Task Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Task Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Created by
                  </label>
                  <div className="flex items-center gap-2">
                    <UserHoverInfo user={task.creator} />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Last updated by
                  </label>
                  <div className="flex items-center gap-2">
                    <UserHoverInfo user={task.updatedBy} />
                    <span className="text-xs text-muted-foreground">
                      {format.relativeTime(dateTime, now)}
                    </span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">
                    Task ID
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                      {task.id}
                    </code>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        navigator.clipboard.writeText(task.id);
                        toast({ title: "Task ID copied to clipboard" });
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};