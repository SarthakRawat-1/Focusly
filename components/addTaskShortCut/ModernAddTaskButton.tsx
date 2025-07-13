"use client";

import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { ModernAddTaskModal } from "./ModernAddTaskModal";

interface Props {
  userId: string;
}

export const ModernAddTaskButton = ({ userId }: Props) => {

  const triggerButton = (
    <HoverCard openDelay={250} closeDelay={250}>
      <HoverCardTrigger asChild>
        <Button
          size="sm"
          className="h-9 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">Quick Add</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent align="center" className="text-sm">
        <span>Quick add a new task</span>
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <ModernAddTaskModal 
      userId={userId} 
      triggerButton={triggerButton}
    />
  );
};