import { ArrowRight, Calendar, CalendarCheck, Plus } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export function DashboardHeader() {
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <DashboardCard
                title="Próxima Reserva"
                icon={CalendarCheck}
                iconColor="#3b82f6"
            >
                <div className="flex flex-col justify-center items-start gap-4">
                    <div className="flex flex-col gap-2 justify-center items-start">
                        <h1 className="font-bold text-2xl">12:00 - 12:30 </h1>
                        <p className="text-sm text-gray-500">22/11/2024 ° Mesa 3</p>
                    </div>
                    <Link
                        to="/reservations"
                        className="flex justify-start items-center gap-2"
                    >
                        <p className="text-base text-[#3b82f6] font-semibold">Ver Detalhes</p>
                        <ArrowRight className="w-6 h-4" color="#3b82f6" />
                    </Link>
                </div>
            </DashboardCard>

            <DashboardCard
                title="Reservas Ativas"
                icon={Calendar}
                iconColor="#16a249"
            >
                <div className="flex flex-col gap-1 justify-center items-start">
                    <h1 className="font-bold text-2xl">2</h1>
                    <p className="text-sm text-gray-500">Reservas confirmadas</p>
                </div>
            </DashboardCard>


            <DashboardCard
                title="Ações Rápidas"
                icon={Plus}
                iconColor="#3b82f6"
            >
                <div>
                    <Link
                        to="/reservations/new"
                        className="flex justify-start items-center gap-2"
                    >
                        <Button className="flex-1">
                            <p className="text-base text-white font-semibold">Nova Reserva</p>
                        </Button>
                    </Link>
                </div>
            </DashboardCard>
        </div>
    )
}