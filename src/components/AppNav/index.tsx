
import { AppNavItem } from "../AppNavItem";
import { routes } from "../../routes";
import { LayoutDashboard, CalendarPlus, Calendar} from "lucide-react";

export function AppNav(){
    return(
        <nav className="flex md:flex-row flex-col items-start md:items-center justify-between gap-2 md:gap-4 w-full md:w-auto">
            <AppNavItem label="Dashboard" icon={LayoutDashboard} redirectTo={routes.dashboard} />
            <AppNavItem label="Nova reserva" icon={CalendarPlus} redirectTo={routes.reservationsNew} />
            <AppNavItem label="Minhas reservas" icon={Calendar} redirectTo={routes.reservations} />
        </nav>
    )
}