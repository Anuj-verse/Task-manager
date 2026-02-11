import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Filter } from 'lucide-react';
import api from '../lib/api';
import type { Task } from '../types';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import toast from 'react-hot-toast';

export default function Dashboard() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [filterPriority, setFilterPriority] = useState<string>('all');

    const { data: tasks = [], isLoading } = useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await api.get('/tasks');
            // The backend returns an array of tasks currently
            return response.data;
        },
    });

    const createTaskMutation = useMutation({
        mutationFn: (newTask: Partial<Task>) => api.post('/tasks', newTask),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully');
            setIsModalOpen(false);
        },
        onError: () => toast.error('Failed to create task'),
    });

    const updateTaskMutation = useMutation({
        mutationFn: ({ id, ...data }: Partial<Task> & { id: string }) => api.put(`/tasks/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task updated successfully');
            setIsModalOpen(false);
            setEditingTask(null);
        },
        onError: () => toast.error('Failed to update task'),
    });

    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/tasks/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task deleted successfully');
        },
        onError: () => toast.error('Failed to delete task'),
    });

    const handleCreate = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this task?')) {
            deleteTaskMutation.mutate(id);
        }
    };

    const handleSubmit = (taskData: Partial<Task>) => {
        if (editingTask) {
            updateTaskMutation.mutate({ id: editingTask.id, ...taskData });
        } else {
            createTaskMutation.mutate(taskData);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const statusMatch = filterStatus === 'all' || task.status === filterStatus;
        const priorityMatch = filterPriority === 'all' || task.priority === filterPriority;
        return statusMatch && priorityMatch;
    });

    if (isLoading) return <div className="text-center py-10">Loading tasks...</div>;

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Tasks</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and track your work</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    New Task
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2">
                    <Filter size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
                </div>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="all">All Statuses</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">No tasks found. Create one to get started!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingTask}
                isLoading={createTaskMutation.isPending || updateTaskMutation.isPending}
            />
        </div>
    );
}
