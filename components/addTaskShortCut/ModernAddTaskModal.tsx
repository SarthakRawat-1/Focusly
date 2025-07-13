"use client";

import { Task, Workspace } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { 
  ChevronLeft, 
  ExternalLink, 
  PencilRuler, 
  Target,
  Calendar,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChangeCodeToEmoji } from "@/hooks/useChangeCodeToEmoji";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next-intl/client";
import { DateRange } from "react-day-picker";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { LoadingState } from "../ui/loadingState";
import { useUserEditableWorkspaces } from "@/context/UserEditableWorkspaces";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ClientError } from "../error/ClientError";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { EmojiSelector } from "../common/EmojiSelector";
import { CalendarTask } from "./CalendarTask";
import { ActiveWorkspaceInfo } from "./ActiveWorkspaceInfo";
import { SelectWorkspace } from "./SelectWorkspace";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props {
  userId: string;
  externalOpen?: boolean;
  onExternalOpenChange?: (open: boolean) => void;
  triggerButton?: React.ReactNode;
}

export const ModernAddTaskModal = ({ 
  userId, 
  externalOpen, 
  onExternalOpenChange, 
  triggerButton 
}: Props) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = onExternalOpenChange || setInternalOpen;
  const [currentStep, setCurrentStep] = useState<"form" | "workspace" | "success">("form");
  const [selectedEmoji, setSelectedEmoji] = useState("1f9e0");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace | null>(null);
  const [newTaskLink, setNewTaskLink] = useState<string | null>(null);

  const renderedEmoji = useChangeCodeToEmoji(selectedEmoji);
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: workspaces,
    isError,
    isLoading: isGettingWorkspaces,
    refetch,
  } = useUserEditableWorkspaces();

  useEffect(() => {
    if (workspaces && workspaces.length > 0) {
      setActiveWorkspace(workspaces[0]);
    }
  }, [workspaces]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => {
        setCurrentStep("form");
        setTitle("");
        setSelectedEmoji("1f9e0");
        setDate({ from: undefined, to: undefined });
        setNewTaskLink(null);
        if (workspaces && workspaces.length > 0) {
          setActiveWorkspace(workspaces[0]);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [open, workspaces]);

  const { mutate: createTask, isPending } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(`/api/task/create_short_task`, {
        workspaceId: activeWorkspace?.id,
        icon: selectedEmoji,
        title,
        date,
      });
      return data as Task;
    },
    onSuccess: async (data: Task) => {
      await queryClient.refetchQueries({ queryKey: ["getCalendarItems", userId] });
      
      const taskLink = `/dashboard/workspace/${data.workspaceId}/tasks/task/${data.id}/edit`;
      setNewTaskLink(taskLink);
      setCurrentStep("success");
      
      toast({
        title: "Task created successfully! 🎉",
        description: "Your new task is ready to be edited.",
      });
      
      router.refresh();
    },
    onError: (err: AxiosError) => {
      toast({
        title: "Failed to create task. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateTask = () => {
    if (!activeWorkspace || !title.trim()) return;
    createTask();
  };

  const handleWorkspaceSelect = (workspace: Workspace) => {
    setActiveWorkspace(workspace);
    setCurrentStep("form");
  };

  const isFormValid = activeWorkspace && title.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerButton ? (
        <DialogTrigger asChild>
          {triggerButton}
        </DialogTrigger>
      ) : (
        <HoverCard openDelay={250} closeDelay={250}>
          <HoverCardTrigger asChild>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8 sm:w-9 sm:h-9 hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <PencilRuler size={18} />
              </Button>
            </DialogTrigger>
          </HoverCardTrigger>
          <HoverCardContent align="center" className="text-sm">
            <span>Quick add a new task</span>
          </HoverCardContent>
        </HoverCard>
      )}

      <DialogContent className="sm:max-w-[500px] p-0 gap-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentStep === "success" && newTaskLink ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Task Created Successfully! 🎉</h3>
                  <p className="text-muted-foreground text-sm">
                    Your task "{title}" has been created and is ready for editing.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    asChild
                    className="flex-1"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={newTaskLink} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Edit Task
                    </Link>
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep("form");
                      setTitle("");
                      setSelectedEmoji("1f9e0");
                      setDate({ from: undefined, to: undefined });
                    }}
                    className="flex-1"
                  >
                    Create Another
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <DialogHeader className="p-6 pb-4">
                <div className="flex items-center gap-3">
                  {currentStep === "workspace" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCurrentStep("form")}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-semibold">
                        {currentStep === "form" ? "Create New Task" : "Choose Workspace"}
                      </DialogTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentStep === "form" 
                          ? "Add a new task to your workspace" 
                          : "Select where to create your task"
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              {/* Content */}
              <div className="px-6 pb-6">
                {isError ? (
                  <ClientError
                    message="Error fetching workspaces"
                    onRefetch={refetch}
                    className="mt-0"
                  />
                ) : isGettingWorkspaces ? (
                  <div className="flex justify-center items-center py-12">
                    <LoadingState className="w-8 h-8" />
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {currentStep === "form" ? (
                      <motion.div
                        key="form"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        {/* Task Details Card */}
                        <Card className="border-border/50">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-primary" />
                              Task Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Emoji and Title */}
                            <div className="flex gap-4 items-start">
                              <div>
                                <Label className="text-sm font-medium mb-2 block">
                                  Icon
                                </Label>
                                <EmojiSelector
                                  onSelectedEmoji={setSelectedEmoji}
                                  align="center"
                                >
                                  <div className="w-12 h-12 rounded-lg bg-muted hover:bg-muted/80 transition-colors cursor-pointer flex items-center justify-center text-2xl border-2 border-dashed border-border hover:border-primary/50">
                                    {renderedEmoji}
                                  </div>
                                </EmojiSelector>
                              </div>
                              
                              <div className="flex-1">
                                <Label htmlFor="title" className="text-sm font-medium mb-2 block">
                                  Task Title *
                                </Label>
                                <Input
                                  id="title"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  placeholder="What needs to be done?"
                                  className="text-base"
                                  autoFocus
                                />
                              </div>
                            </div>

                            <Separator />

                            {/* Due Date */}
                            <div>
                              <Label className="text-sm font-medium mb-2 block">
                                Due Date (Optional)
                              </Label>
                              <CalendarTask 
                                date={date} 
                                onSelectedDate={setDate}
                              />
                            </div>
                          </CardContent>
                        </Card>

                        {/* Workspace Selection */}
                        <Card className="border-border/50">
                          <CardContent className="p-4">
                            <button
                              onClick={() => setCurrentStep("workspace")}
                              className="w-full flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <div className="text-left">
                                  <p className="text-sm font-medium">Workspace</p>
                                  <p className="text-xs text-muted-foreground">
                                    {activeWorkspace?.name || "Select workspace"}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {activeWorkspace && (
                                  <ActiveWorkspaceInfo workspace={activeWorkspace} />
                                )}
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </button>
                          </CardContent>
                        </Card>

                        {/* Create Button */}
                        <Button
                          onClick={handleCreateTask}
                          disabled={!isFormValid || isPending}
                          className="w-full h-11 text-base font-medium"
                          size="lg"
                        >
                          {isPending ? (
                            <LoadingState loadingText="Creating task..." />
                          ) : (
                            <>
                              <Target className="w-4 h-4 mr-2" />
                              Create Task
                            </>
                          )}
                        </Button>

                        {!isFormValid && (
                          <p className="text-xs text-muted-foreground text-center">
                            {!activeWorkspace 
                              ? "Please select a workspace" 
                              : "Please enter a task title"
                            }
                          </p>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="workspace"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="border-border/50">
                          <CardHeader className="pb-4">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-primary" />
                              Available Workspaces
                              <Badge variant="secondary" className="text-xs">
                                {workspaces?.length || 0}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ScrollArea className="max-h-64">
                              <div className="space-y-2">
                                {workspaces?.map((workspace) => (
                                  <SelectWorkspace
                                    key={workspace.id}
                                    workspace={workspace}
                                    onSelectActiveWorkspace={handleWorkspaceSelect}
                                  />
                                ))}
                              </div>
                            </ScrollArea>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};