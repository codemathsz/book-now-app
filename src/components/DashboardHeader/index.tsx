import { ArrowRight, Calendar, CalendarCheck, Plus } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { useReservations } from "@/hooks/useReservations";
import { parseDateString } from "@/utils/utils";
import { useMemo } from "react";

export function DashboardHeader() {

    const { reservations, timeSlots } = useReservations();

    const nextReservation = useMemo(() => {
        if (reservations.length === 0) return null;

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const futureReservations = reservations
            .filter(reservation => {
                const reservationDate = parseDateString(reservation.date);
                reservationDate.setHours(0, 0, 0, 0);
                return reservationDate >= now && reservation.status === 'active';
            })
            .sort((a, b) => {
                const dateA = parseDateString(a.date);
                const dateB = parseDateString(b.date);
                return dateA.getTime() - dateB.getTime();
            });

        return futureReservations[0] || null;
    }, [reservations]);

    const activeReservationsCount = useMemo(
        () => reservations.filter(r => r.status === 'active').length,
        [reservations]
    );

    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <DashboardCard
                title="Próxima Reserva"
                icon={CalendarCheck}
                iconColor="#3b82f6"
            >
                <div className="flex flex-col justify-center items-start gap-4">
                    {
                        nextReservation ? (

                             <div className="flex flex-col gap-2 justify-center items-start">
                                <h1 className="font-bold text-2xl">{timeSlots.find(slot => slot.id === nextReservation.time_slot_id)?.label}</h1>
                                <p className="text-sm text-gray-500">
                                    {new Date(nextReservation.date).toLocaleDateString('pt-BR', { 
                                        weekday: 'long', 
                                        day: 'numeric', 
                                        month: 'long' 
                                    })}
                                    
                                     ° 
                                    Mesa {nextReservation.table_number}
                                </p>
                            </div>
                           
                        ) : (
                            <p className="text-sm text-gray-500">Nenhuma reserva futura</p>
                        )
                    }
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
                    <h1 className="font-bold text-2xl">{activeReservationsCount}</h1>
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