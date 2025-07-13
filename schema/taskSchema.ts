import { z } from "zod";

export const taskSchema = z.object({
  emoji: z.string().optional(),
  icon: z.string().optional(),
  title: z.string().optional(),
  date: z.any().optional(),
  from: z.date().optional(),
  to: z.date().optional(),
  tags: z.array(z.string()).optional(),
  content: z.any().optional(),
});

export const deleteTaskSchema = z.object({
  taskId: z.string(),
  workspaceId: z.string(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
