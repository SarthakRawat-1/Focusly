"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";

interface Props {
  content: any;
}

export const TaskContentRenderer = ({ content }: Props) => {
  console.log("TaskContentRenderer - Received content:", content);
  console.log("TaskContentRenderer - Content type:", typeof content);
  const editor = useEditor({
    editable: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer prose-code:text-foreground prose-code:bg-muted prose-ol:text-foreground prose-ul:text-foreground prose-li:marker:text-foreground prose-li:marker:font-bold focus:outline-none",
      },
    },
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          class: "text-primary hover:underline cursor-pointer",
        },
      }),
      Color,
      TextStyle,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
    ],
    content: content || "",
    onCreate: ({ editor }) => {
      console.log("TaskContentRenderer - Editor created with content:", editor.getJSON());
      console.log("TaskContentRenderer - Editor HTML:", editor.getHTML());
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
  });

  if (!editor) {
    return (
      <div className="animate-pulse space-y-2">
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div className="task-content">
      <EditorContent editor={editor} />
    </div>
  );
};