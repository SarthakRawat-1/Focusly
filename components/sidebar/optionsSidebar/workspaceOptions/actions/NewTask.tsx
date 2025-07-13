"use client";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { useNewTask } from "@/hooks/useNewTask";
import { Target, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  workspaceId: string;
}

export const NewTask = ({ workspaceId }: Props) => {
  const { newTask, isPending } = useNewTask(workspaceId);
  
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        newTask();
      }}
      variant="ghost"
      size="sm"
      className="w-full justify-start h-9 group hover:bg-green-500/10 hover:border-green-500/20 border border-transparent transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-1 rounded border transition-all duration-200",
          isPending 
            ? "bg-muted border-border" 
            : "bg-green-500/10 border-green-500/20 group-hover:bg-green-500/20"
        )}>
          {isPending ? (
            <LoadingState className="h-3 w-3" hideLoaderIcon={false} />
          ) : (
            <Target className="h-3 w-3 text-green-600" />
          )}
        </div>
        <span className="text-sm font-medium">
          {isPending ? "Creating..." : "New Task"}
        </span>
        {!isPending && (
          <Plus className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        )}
      </div>
    </Button>
  );
};
