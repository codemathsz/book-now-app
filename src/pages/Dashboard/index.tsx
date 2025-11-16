import { useMemo } from "react";

import { DashboardHeader } from "@/components/DashboardHeader";
import { ReservationCard } from "@/components/ReservationCard";
import { useAuth } from "@/hooks/useAuth";
import { useReservations } from "@/hooks/useReservations";

function Dashboard() {

  const { user } = useAuth();
  const { reservations } = useReservations();

  const today = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [])

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Olá, {user?.name}! 👋</h1>
        <span className="text-lg text-gray-500">{today}</span>
      </div>

      <DashboardHeader />

      <div className="flex-1  flex flex-col border rounded-2xl p-4 gap-8">
        <h1 className="font-bold text-2xl">Minhas Próximas Reservas</h1>
        <div className="flex-1 flex flex-col gap-4 justify-center items-center text-gray-400">
          {
            reservations.length > 0 ? reservations.map((reservation, index) => (
              <ReservationCard 
                key={index} 
                reservation={reservation} 
              />
            )) : (
              <p>Nenhuma reserva encontrada</p>
            )
          }
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
