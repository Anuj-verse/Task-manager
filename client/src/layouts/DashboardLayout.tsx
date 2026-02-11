import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function DashboardLayout() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <LayoutDashboard className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Task Manager</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="ml-4 flex items-center md:ml-6">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4">
                                    Welcome, {user?.name || user?.email}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    title="Logout"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
