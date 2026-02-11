import { format } from 'date-fns';
import type { Task } from '../types';
import { Pencil, Trash2, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const statusColors = {
    todo: 'border-l-4 border-gray-400',
    'in-progress': 'border-l-4 border-blue-500',
    done: 'border-l-4 border-green-500',
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    return (
        <div className={cn("bg-white dark:bg-gray-800 shadow rounded-lg p-5 mb-4", statusColors[task.status])}>
            <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate" title={task.title}>
                    {task.title}
                </h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {task.description || 'No description provided.'}
            </p>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <span className={cn("px-2 py-1 text-xs font-semibold rounded-full", priorityColors[task.priority])}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    {task.dueDate && (
                        <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <Calendar size={14} className="mr-1" />
                            {format(new Date(task.dueDate), 'MMM d, yyyy')}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
