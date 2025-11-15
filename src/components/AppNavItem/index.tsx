import type { LucideIcon } from 'lucide-react';
import type { RedirectTo } from '../../routes';
import { Link } from 'react-router-dom';

interface AppNavItemProps {
    label: string;
    icon: LucideIcon;
    redirectTo: RedirectTo;
}

export function AppNavItem({ label, icon: Icon, redirectTo }: AppNavItemProps){
    return(
        <Link 
            className={`bg-background px-3 py-2 rounded-lg flex gap-2 items-center justify-center cursor-pointer hover:bg-[#3b82f6] hover:text-white transition-colors`}
            to={redirectTo}
        >
            <Icon className="h-4 w-4 text-primary" />
            <span>{label}</span>
        </Link>
    )
}