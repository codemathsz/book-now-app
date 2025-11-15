import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/routes';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
    const { user, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, []);

    if (user === undefined) {
        // Ainda carregando
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return <Navigate to={routes.dashboard} replace />;
    }

    return <Outlet />;
}