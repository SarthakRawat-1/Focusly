"use client";
import { ExtendedMessage } from "@/types/extended";
import { Header } from "./header/Header";
import { MessagesContainer } from "./messages/MessagesContainer";
import { NewMessageContainer } from "./newMessage/NewMessageContainer";
import { useEffect, useRef } from "react";
import { MESSAGES_LIMIT } from "@/lib/constants";
import { useMessage } from "@/store/conversation/messages";

interface Props {
  workspaceId: string;
  chatId: string;
  initialMessages: ExtendedMessage[];
  sessionUserId: string;
  workspaceName: string;
}

export const ChatContainer = ({
  workspaceId,
  chatId,
  initialMessages,
  sessionUserId,
  workspaceName,
}: Props) => {
  const initState = useRef(false);

  const hasMore = initialMessages.length >= MESSAGES_LIMIT;

  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({
        messages: initialMessages.reverse(),
        hasMore,
        initialMessagesLoading: false,
      });
    }
    initState.current = true;
  }, []);

  return (
    <div className="w-full h-full flex flex-col border border-border rounded-md shadow-sm relative">
      <Header workspaceName={workspaceName} />
      <div className="flex-1 min-h-0">
        <MessagesContainer
          chatId={chatId}
          workspaceId={workspaceId}
          sessionUserId={sessionUserId}
        />
      </div>
      <div className="flex-shrink-0">
        <NewMessageContainer chatId={chatId} workspaceId={workspaceId} />
      </div>
    </div>
  );
};
