"use client";

import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { SimpleNotificationItem } from "./SimpleNotificationItem";
import { useQuery } from "@tanstack/react-query";
import { UserNotification } from "@/types/extended";
import { useState, useEffect } from "react";

interface Props {
  userId: string;
}

export const SimpleNotificationContainer = ({ userId }: Props) => {
  const [open, setOpen] = useState(false);

  const fetchNotifications = async (): Promise<UserNotification[]> => {
    const response = await fetch(`/api/notifications/get?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }
    return response.json();
  };

  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ['notifications', userId],
    queryFn: fetchNotifications,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications/set-click/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      refetch();
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.clicked).length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all read
              </Button>
            )}
          </div>
          
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            <ScrollArea className="h-96">
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <SimpleNotificationItem 
                    key={notification.id} 
                    notification={notification} 
                  />
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};