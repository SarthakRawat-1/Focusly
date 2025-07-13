"use client";

import { EmojiSelector } from "@/components/common/EmojiSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdditionalResource, ExtendedMessage } from "@/types/extended";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Send, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { UploadFilesButton } from "./UploadFileButton";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FilePreview } from "./FilePreview";
import { useSession } from "next-auth/react";
import { useMessage } from "@/store/conversation/messages";
import { v4 as uuidv4 } from "uuid";
import { useOnKeyDown } from "@/hooks/useOnKeyDown";
import { cn } from "@/lib/utils";

interface Props {
  workspaceId: string;
  chatId: string;
}

export const NewMessageContainer = ({ chatId, workspaceId }: Props) => {
  const m = useTranslations("MESSAGES");
  const { toast } = useToast();
  const t = useTranslations("CHAT.NEW_MESSAGE");

  const [uploadedFiles, setUploadedFiles] = useState<
    null | AdditionalResource[]
  >(null);

  const [message, setMessage] = useState("");

  const onSelectEmojiHandler = (emojiCode: string) => {
    const emoji = String.fromCodePoint(parseInt(emojiCode, 16));
    setMessage((prevMessage) => prevMessage + emoji);
  };

  const onChangeUploadedFilesHandler = (files: AdditionalResource[] | null) => {
    setUploadedFiles(files);
  };

  const onRemoveFileHandler = (fileId: string) => {
    setUploadedFiles((prevFiles) => {
      return prevFiles?.filter((file) => file.id !== fileId) || null;
    });
  };

  const session = useSession();
  const [lastMessageId, setLastMessageId] = useState("");
  const { addMessage, deleteMessage } = useMessage((state) => state);

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate: newMessage, isPending } = useMutation({
    mutationFn: async () => {
      if (!session.data) return;
      const user = session.data.user;
      const id = uuidv4();
      setLastMessageId(id);

      const newMessage: ExtendedMessage = {
        id,
        edited: false,
        content: message,
        additionalResources: uploadedFiles ? uploadedFiles : [],
        conversationId: chatId,
        createdAt: new Date(),
        updatedAt: null,
        sender: {
          id: user.id,
          image: user.image,
          username: user.username!,
        },
        senderId: user.id,
      };

      addMessage(newMessage);

      setUploadedFiles(null);
      setMessage("");

      await axios.post(`/api/conversation/new_message`, newMessage);
    },
    onSuccess: async () => {
      toast({
        title: m("SUCCES.TASK_ADDED"),
      });
    },
    onError: (err: AxiosError) => {
      const error = err?.response?.data ? err.response.data : "ERRORS.DEFAULT";

      toast({
        title: m(error),
        variant: "destructive",
      });

      deleteMessage(lastMessageId);
    },
    mutationKey: ["newMessage"],
  });

  useOnKeyDown(textAreaRef, (event) => {
    if (
      textAreaRef.current?.id === "new-message-text-area" &&
      event.key === "Enter"
    ) {
      if (!event.shiftKey && message.trim().length > 0) {
        newMessage();
      }
    }
  });

  return (
    <div className="w-full bg-background border-t border-border">
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="p-4 border-b border-border">
          <ScrollArea className="w-full">
            <div className="flex gap-4">
              {uploadedFiles.map((file) => (
                <FilePreview
                  key={file.id}
                  file={file}
                  onRemoveFile={onRemoveFileHandler}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-end gap-3 bg-muted/30 rounded-2xl border border-border/50 p-3">
          <div className="flex gap-1">
            <UploadFilesButton
              onChangeUploadedFiles={onChangeUploadedFilesHandler}
            />
            <EmojiSelector
              asChild
              slide="right"
              align="end"
              onSelectedEmoji={onSelectEmojiHandler}
            >
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-full hover:bg-primary/10"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </EmojiSelector>
          </div>
          
          <div className="flex-1 min-w-0">
            <TextareaAutosize
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              autoFocus
              id="new-message-text-area"
              ref={textAreaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder={t("PLACEHOLDER")}
              className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground focus:outline-none max-h-32 min-h-[20px] text-sm leading-5"
              minRows={1}
              maxRows={6}
            />
          </div>

          <Button
            disabled={message.trim().length === 0 || isPending}
            onClick={() => {
              newMessage();
            }}
            size="sm"
            className={cn(
              "h-8 w-8 rounded-full transition-all duration-200",
              message.trim().length > 0 
                ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
