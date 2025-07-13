"use client";

import { useTruncateText } from "@/hooks/useTruncateText";
import { UserAvatar } from "../ui/user-avatar";
import { Button } from "../ui/button";
import { BellDot } from "lucide-react";
import { UserNotification } from "@/types/extended";
import { useFormatter, useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useCreateNotifyItemDay } from "@/hooks/useCreateNotifyItemDay";
import axios, { AxiosError } from "axios";
import Link from "next/link";

interface Props {
  notify: UserNotification;
}

export const NotificationItem = ({ notify }: Props) => {
  // Early safety check - if notify is not a valid object, return null
  if (!notify || typeof notify !== 'object' || !notify.id) {
    return null;
  }

  try {
    // Safely extract properties with fallbacks
    const notifyCreator = notify.notifyCreator || null;
    const clicked = notify.clicked ?? false;
    const createdDate = notify.createdDate;
    const workspace = notify.workspace || null;
    const newUserRole = notify.newUserRole || null;
    const taskId = notify.taskId || null;
    const mindMapId = notify.mindMapId || null;
    const notifyType = notify.notifyType;
    const id = notify.id;
    
    // If notifyCreator is completely missing, don't render the notification
    if (!notifyCreator) {
      return null;
    }
  
  // Handle case where notifyCreator might be null/undefined
  const image = notifyCreator?.image;
  const username = notifyCreator?.username || "Unknown User";
  const name = useTruncateText(username, 20);
  const m = useTranslations("MESSAGES");
  const queryClient = useQueryClient();

  const format = useFormatter();
  const dateTime = new Date(createdDate);
  const now = new Date();

  const { toast } = useToast();

  const { link, textContent } = useCreateNotifyItemDay(
    notifyType,
    newUserRole,
    workspace,
    taskId,
    mindMapId
  );

  const { mutate: updateToClickStatus } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/notifications/set-click/by-id`, { id });
    },
    onMutate: async () => {
      //@ts-ignore
      await queryClient.cancelQueries(["getUserNotifications"]);
      const previousNotifications = queryClient.getQueryData<
        UserNotification[]
      >(["getUserNotifications"]);

      const checkedPreviousNotifications =
        previousNotifications && previousNotifications.length > 0
          ? previousNotifications
          : [];

      const updatedNotifications = checkedPreviousNotifications.map(
        (notify) => {
          if (notify.id === id) {
            return {
              ...notify,
              clicked: true,
            };
          } else return notify;
        }
      );

      queryClient.setQueryData(["getUserNotifications"], updatedNotifications);

      return { checkedPreviousNotifications };
    },
    onError: (err: AxiosError, _, context) => {
      queryClient.setQueryData(
        ["getUserNotifications"],
        context?.checkedPreviousNotifications
      );

      toast({
        title: m("ERRORS.CANT_UPDATE_SEEN_NOTIFY"),
        variant: "destructive",
      });
    },
    onSettled: () => {
      //@ts-ignore
      queryClient.invalidateQueries["getUserNotifications"];
    },
    mutationKey: ["updateToClickStatus"],
  });
    return (
      <Link
        href={link || "#"}
        onClick={() => {
          !clicked && updateToClickStatus();
        }}
      >
        <div className="flex gap-4 p-3 hover:bg-muted/50 rounded-lg transition-colors">
          <div>
            <UserAvatar className="w-10 h-10" size={12} profileImage={image} />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-start justify-between">
              <p className="text-sm">
                <span className="font-bold">{name}</span>
                <span className="ml-1">{textContent || "performed an action"}</span>
              </p>
              {!clicked && (
                <div className="h-6 w-6 text-primary flex-shrink-0">
                  <BellDot size={16} />
                </div>
              )}
            </div>
            <p
              className={`text-xs transition-colors duration-200 ${
                clicked ? "text-muted-foreground" : "text-primary font-bold"
              }`}
            >
              {format.relativeTime(dateTime, now)}
            </p>
          </div>
        </div>
      </Link>
    );
  } catch (error) {
    return null;
  }
};
