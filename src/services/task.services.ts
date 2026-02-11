import prisma from '../lib/prisma.js';
import type { Task } from '@prisma/client';

export const createTask = async (title: string, description: string | undefined, userId: string, priority: string, dueDate?: string): Promise<Task> => {
    return prisma.task.create({
        data: {
            title,
            description,
            userId,
            priority,
            dueDate: dueDate ? new Date(dueDate) : undefined,
        },
    });
};

export const getTasks = async (userId: string): Promise<Task[]> => {
    return prisma.task.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
    });
};

export const updateTaskStatus = async (id: string, status: string, userId: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) return null;

    return prisma.task.update({
        where: { id },
        data: { status },
    });
};

export const updateTask = async (id: string, data: Partial<Task>, userId: string): Promise<Task | null> => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) return null;

    return prisma.task.update({
        where: { id },
        data: data,
    });
};

export const deleteTask = async (id: string, userId: string): Promise<void | null> => {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task || task.userId !== userId) return null;

    await prisma.task.delete({ where: { id } });
};
