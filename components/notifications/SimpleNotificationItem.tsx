"use client";

import { UserAvatar } from "../ui/user-avatar";
import { BellDot } from "lucide-react";
import Link from "next/link";
import { UserNotification } from "@/types/extended";

interface Props {
  notification: UserNotification;
}

export const SimpleNotificationItem = ({ notification }: Props) => {
  if (!notification) return null;

  const creatorName = notification.notifyCreator?.username || "Someone";
  const workspaceName = notification.workspace?.name || "a workspace";
  
  const getText = () => {
    switch (notification.notifyType) {
      case "NEW_USER_IN_WORKSPACE":
        return ` joined ${workspaceName}`;
      case "NEW_ROLE":
        return ` changed your role in ${workspaceName}`;
      case "NEW_ASSIGNMENT_TASK":
        return ` assigned you a task`;
      case "NEW_ASSIGNMENT_MIND_MAP":
        return ` assigned you a mind map`;
      case "USER_LEFT_WORKSPACE":
        return ` left ${workspaceName}`;
      default:
        return " performed an action";
    }
  };

  const getLink = () => {
    if (notification.taskId) {
      return `/dashboard/workspace/${notification.workspaceId}/tasks/task/${notification.taskId}`;
    }
    if (notification.mindMapId) {
      return `/dashboard/workspace/${notification.workspaceId}/mind-maps/mind-map/${notification.mindMapId}`;
    }
    if (notification.workspaceId) {
      return `/dashboard/workspace/${notification.workspaceId}`;
    }
    return "/dashboard";
  };

  const timeAgo = () => {
    const now = new Date();
    const created = new Date(notification.createdDate);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Link href={getLink()}>
      <div className="flex gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors border border-transparent hover:border-border">
        <UserAvatar 
          className="w-10 h-10 flex-shrink-0" 
          size={12} 
          profileImage={notification.notifyCreator?.image} 
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm">
              <span className="font-semibold">{creatorName}</span>
              <span className="text-muted-foreground">{getText()}</span>
            </p>
            {!notification.clicked && (
              <BellDot className="h-4 w-4 text-primary flex-shrink-0" />
            )}
          </div>
          <p className={`text-xs mt-1 ${
            notification.clicked ? "text-muted-foreground" : "text-primary font-medium"
          }`}>
            {timeAgo()}
          </p>
        </div>
      </div>
    </Link>
  );
};