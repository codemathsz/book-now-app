
import { AppNavItem } from "../AppNavItem";
import { routes } from "../../routes";
import { LayoutDashboard, CalendarPlus, Calendar} from "lucide-react";

export function AppNav(){
    return(
        <nav className="flex items-center justify-between gap-4">
            <AppNavItem label="Dashboard" icon={LayoutDashboard} redirectTo={routes.dashboard} />
            <AppNavItem label="Nova reserva" icon={CalendarPlus} redirectTo={routes.reservationsNew} />
            <AppNavItem label="Minhas reservas" icon={Calendar} redirectTo={routes.reservations} />
        </nav>
    )
}