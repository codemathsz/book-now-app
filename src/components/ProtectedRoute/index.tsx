import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/routes';

export function ProtectedRoute() {
    const { user, checkAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    if (user === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Carregando...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={routes.login} state={{ from: location }} replace />;
    }

    return <Outlet />;
}