import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "@/pages/AdminDashboard";
import Dashboard from "@/pages/Dashboard";

export function DashboardRedirect(){

    const { user } = useAuth()

    if(user?.role === "admin"){
        return <AdminDashboard />
    }

    if(user?.role === "user"){
        return <Dashboard />
    }

    return <Dashboard />
}