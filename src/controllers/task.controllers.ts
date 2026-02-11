import type { Request, Response } from "express";
import * as TaskService from "../services/task.services.js";

export const createTaskHandler = async (req: Request, res: Response) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        // @ts-ignore - user is attached by middleware
        const userId = req.user.userId;
        const task = await TaskService.createTask(title, description, userId, priority || 'medium', dueDate);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to create task", error });
    }
};

export const getTaskHandler = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const tasks = await TaskService.getTasks(userId);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
};

export const updateTaskHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        // @ts-ignore
        const userId = req.user.userId as string;
        const updatedTask = await TaskService.updateTask(id, req.body, userId);
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Failed to update task", error });
    }
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        // @ts-ignore
        const userId = req.user.userId as string;
        await TaskService.deleteTask(id, userId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Failed to delete task", error });
    }
};