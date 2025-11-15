import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
    title: string
    icon: LucideIcon;
    iconColor: string;
    children: React.ReactNode;
}

export function DashboardCard({ title, icon: Icon, iconColor, children }: DashboardCardProps) {
    return(
        <div className="flex flex-col gap-2 p-4 hover:shadow-lg bg-background rounded-lg border transition-shadow">
            <div className="flex items-center justify-between w-full">
                <p className="text-sm font-medium">{title}</p>
                <Icon className="w-4 h-4" color={iconColor}/>
            </div>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}