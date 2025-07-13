"use client";

import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/ui/loadingState";
import { useNewMindMap } from "@/hooks/useNewMindMap";
import { Brain, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  workspaceId: string;
}

export const NewMindMap = ({ workspaceId }: Props) => {
  const { newMindMap, isPending } = useNewMindMap(workspaceId);
  
  return (
    <Button
      disabled={isPending}
      onClick={() => {
        newMindMap();
      }}
      variant="ghost"
      size="sm"
      className="w-full justify-start h-9 group hover:bg-purple-500/10 hover:border-purple-500/20 border border-transparent transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-1 rounded border transition-all duration-200",
          isPending 
            ? "bg-muted border-border" 
            : "bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20"
        )}>
          {isPending ? (
            <LoadingState className="h-3 w-3" hideLoaderIcon={false} />
          ) : (
            <Brain className="h-3 w-3 text-purple-600" />
          )}
        </div>
        <span className="text-sm font-medium">
          {isPending ? "Creating..." : "New Mind Map"}
        </span>
        {!isPending && (
          <Plus className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        )}
      </div>
    </Button>
  );
};
