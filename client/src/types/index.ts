export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'done';
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}
