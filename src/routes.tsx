import { createBrowserRouter } from 'react-router-dom'
import type { RouteProps } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Register from './pages/Register'
import AppLayout from './Layouts/AppLayout'
import Reservations from './pages/Reservations'
import NewReservation from './pages/NewReservation'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'

export const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    dashboard: '/dashboard',
    reservations: '/reservations',
    reservationsNew: '/reservations/new',
    adminDashboard: '/admin/dashboard'
} as const

export type AppRouteList = typeof routes
export type RouteName = keyof AppRouteList

export type AppRouteProps<T extends keyof AppRouteList> =
    RouteProps & { path: AppRouteList[T] }

export type RedirectTo = AppRouteList[keyof AppRouteList]

export const router = createBrowserRouter([

    {
        element: <PublicRoute />,
        children: [
            {
                path: routes.home,
                element: <Home />
            },
            {
                path: routes.login,
                element: <Login />
            },
            {
                path: routes.register,
                element: <Register />
            }
        ]
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                element: <AppLayout />,
                children: [
                    {
                        path: routes.dashboard,
                        element: <Dashboard />
                    },
                    {
                        path: routes.adminDashboard,
                        element: <AdminDashboard />
                    },
                    {
                        path: routes.reservations,
                        element: <Reservations />
                    },
                    {
                        path: routes.reservationsNew,
                        element: <NewReservation />
                    }
                ]
            }
        ]
    }
])