import type { LucideIcon } from 'lucide-react';
import type { RedirectTo } from '../../routes';
import { Link, useLocation } from 'react-router-dom';

interface AppNavItemProps {
    label: string;
    icon: LucideIcon;
    redirectTo: RedirectTo;
}

export function AppNavItem({ label, icon: Icon, redirectTo }: AppNavItemProps){

    const location = useLocation()
    
    const isActive = (path: string) => location.pathname === path;

    return(
        <Link 
            className={`bg-background px-3 py-2 rounded-lg flex gap-2 items-center md:justify-center justify-start cursor-pointer hover:bg-[#3b82f6] hover:text-white transition-colors w-full md:w-auto ${isActive(redirectTo) ? 'bg-[#3b82f6] text-white' : ''}`}
            to={redirectTo}
        >
            <Icon className={`h-4 w-4 ${isActive(redirectTo) ? 'text-white' : 'text-primary'}`} />
            <span>{label}</span>
        </Link>
    )
}