import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
});

export const updateTaskSchema = z.object({
    status: z.enum(["todo","done","in-progress"])
});

export type createTaskDTO =z.infer<typeof createTaskSchema>
export type updatetaskDTO =z.infer<typeof updateTaskSchema>