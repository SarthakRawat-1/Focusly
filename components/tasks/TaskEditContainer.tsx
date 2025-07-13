"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Calendar, 
  Tag, 
  Save,
  ArrowLeft,
  Smile,
  Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";
import { CustomColors, Tag as TagType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { taskSchema, TaskSchema } from "@/schema/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next-intl/client";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { DateRange } from "react-day-picker";
import axios, { AxiosError } from "axios";

// Import existing components
import { Emoji } from "./editable/container/Emoji";
import { TaskCalendar } from "./editable/container/TaskCalendar";
import { EditorTasks } from "./editable/editor/Editor";
import { TagSelector } from "../common/tag/TagSelector";
import { AssignedToTaskSelector } from "./assignToTask/AssignedToTaskSelector";
import { useAutosaveIndicator } from "@/context/AutosaveIndicator";

interface Props {
  taskId: string;
  workspaceId: string;
  initialActiveTags: TagType[];
  title: string;
  content: JSON;
  emoji: string;
  from?: Date;
  to?: Date;
}

export const TaskEditContainer = ({
  taskId,
  workspaceId,
  initialActiveTags,
  title,
  content,
  emoji,
  from,
  to,
}: Props) => {
  const [activeTags, setActiveTags] = useState<TagType[]>(initialActiveTags);
  const [selectedEmoji, setSelectedEmoji] = useState(emoji);
  const [date, setDate] = useState<DateRange | undefined>({
    from: from ? new Date(from) : undefined,
    to: to ? new Date(to) : undefined,
  });

  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("TASK");
  const { status } = useAutosaveIndicator();

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: title || "",
      emoji: selectedEmoji,
      workspaceId,
      tags: activeTags.map((tag) => tag.id),
      from: date?.from,
      to: date?.to,
    },
  });

  const { data: workspaceTags } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`);
      if (!res.ok) throw new Error("Failed to fetch tags");
      return res.json() as Promise<TagType[]>;
    },
    queryKey: ["getWorkspaceTags", workspaceId],
  });

  const { mutate: updateTask, isPending } = useMutation({
    mutationFn: async (data: TaskSchema) => {
      await axios.post("/api/task/update/title", {
        workspaceId,
        taskId,
        title: data.title,
      });
      
      await axios.post("/api/task/update/emoji", {
        workspaceId,
        taskId,
        selectedEmoji: data.emoji || data.icon,
      });

      await axios.post("/api/task/update/active_tags", {
        workspaceId,
        taskId,
        tagsIds: data.tags,
      });

      if (data.from || data.to) {
        await axios.post("/api/task/update/date", {
          workspaceId,
          taskId,
          date: { from: data.from, to: data.to },
        });
      }
    },
    onSuccess: () => {
      toast({
        title: "Task updated successfully",
        description: "Your changes have been saved.",
      });
      router.push(`/dashboard/workspace/${workspaceId}/tasks/task/${taskId}`);
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Error updating task",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TaskSchema) => {
    updateTask(data);
  };

  useEffect(() => {
    form.setValue("emoji", selectedEmoji);
    form.setValue("tags", activeTags.map((tag) => tag.id));
    form.setValue("from", date?.from);
    form.setValue("to", date?.to);
  }, [selectedEmoji, activeTags, date, form]);

  const getStatusColor = () => {
    switch (status) {
      case "saved":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "unsaved":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "saved":
        return "All changes saved";
      case "pending":
        return "Saving...";
      case "unsaved":
        return "Unsaved changes";
      default:
        return "Ready";
    }
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
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/dashboard/workspace/${workspaceId}/tasks/task/${taskId}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Task
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Edit Task
                </h1>
                <p className="text-muted-foreground text-sm">
                  Make changes to your task details
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={cn("text-sm", getStatusColor())}>
              {getStatusText()}
            </div>
            <Button 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
              disabled={isPending}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Task Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Task Title and Emoji */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smile className="h-5 w-5 text-primary" />
                  Task Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div>
                    <Label htmlFor="emoji" className="text-sm font-medium mb-2 block">
                      Emoji
                    </Label>
                    <Emoji
                      onFormSelect={setSelectedEmoji}
                      emoji={selectedEmoji}
                      taskId={taskId}
                      workspaceId={workspaceId}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Label htmlFor="title" className="text-sm font-medium mb-2 block">
                      Task Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter task title..."
                      {...form.register("title")}
                      className="text-lg font-semibold"
                    />
                    {form.formState.errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.title.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Task Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditorTasks
                  content={content}
                  taskId={taskId}
                  workspaceId={workspaceId}
                />
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
                  <Label className="text-sm font-medium mb-2 block">
                    Assigned To
                  </Label>
                  <AssignedToTaskSelector
                    taskId={taskId}
                    workspaceId={workspaceId}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Due Date
                  </Label>
                  <TaskCalendar
                    onUpdateForm={setDate}
                    from={date?.from}
                    to={date?.to}
                    workspaceId={workspaceId}
                    taskId={taskId}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}
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
                <div className="space-y-3">
                  <TagSelector
                    workspaceId={workspaceId}
                    activeTags={activeTags}
                    onSetActiveTags={setActiveTags}
                  />
                  
                  {activeTags.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium mb-2 block">
                        Selected Tags
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {activeTags.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: `var(--${tag.color.toLowerCase()})`,
                              color: `var(--${tag.color.toLowerCase()})`,
                            }}
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};