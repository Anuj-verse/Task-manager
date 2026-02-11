export type TaskStatus = "done" | "in-progress" | "todo" ;

export interface Task {
    id: string,
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: Date;
}