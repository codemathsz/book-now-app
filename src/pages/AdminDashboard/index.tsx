import { Calendar } from "@/components/Calendar";
import { CardContainer } from "@/components/CardContainer";
import { StatCard } from "@/components/StatCard";
import { OccupancyRateCard } from "@/components/OccupancyRateCard";
import { TimeSlotCard } from "@/components/TimeSlotCard";
import { ReservationTable } from "@/components/ReservationTable";
import { CalendarCheck, X, Clock } from "lucide-react";
import { useMemo, useState } from "react";

export default function AdminDashboard() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const lastMonth = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }, []);

  const stats = {
    totalReservations: 15,
    cancelledReservations: 2,
    occupancyRate: 83,
    popularTime: "12:00 - 12:30"
  };

  const timeSlots = [
    { timeRange: "12:00 - 12:30", reservedTables: 6, totalTables: 6 },
    { timeRange: "12:30 - 13:00", reservedTables: 5, totalTables: 6 },
    { timeRange: "13:00 - 13:30", reservedTables: 4, totalTables: 6 },
  ];

  // Mock de dados da tabela - substituir por dados reais depois
  const reservations = [
    { id: '1', name: 'João Silva', email: 'joao@example.com', timeRange: '12:00 - 12:30', table: 'Mesa 3', status: 'active' as const },
    { id: '2', name: 'Maria Santos', email: 'maria@example.com', timeRange: '12:30 - 13:00', table: 'Mesa 5', status: 'active' as const },
    { id: '3', name: 'Pedro Costa', email: 'pedro@example.com', timeRange: '13:00 - 13:30', table: 'Mesa 2', status: 'active' as const },
    { id: '4', name: 'Ana Oliveira', email: 'ana@example.com', timeRange: '12:00 - 12:30', table: 'Mesa 1', status: 'cancelled' as const },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Dashboard Administrativo</h1>
        <span className="text-lg text-gray-500">Visão geral das reservas do sistema</span>
      </div>


      <CardContainer>
        <div>
          <div className="flex justify-start items-center gap-4 mb-4">
            <p className="font-semibold text-2xl text-black">Filtrar por Data</p>
          </div>

          <div className="flex justify-center items-center">
            {/* Calendário */}
            <Calendar
              minDate={lastMonth}
              selectedDate={selectedDate}
              onDateSelect={(selectedDate) => setSelectedDate(selectedDate)}
            />
          </div>
        </div>
      </CardContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Reservas"
          value={stats.totalReservations}
          subtitle={new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
          icon={CalendarCheck}
          iconColor="text-blue-500"
          iconBgColor="bg-blue-50"
        />

        <StatCard
          title="Canceladas"
          value={stats.cancelledReservations}
          subtitle="Reservas canceladas"
          icon={X}
          iconColor="text-red-500"
          iconBgColor="bg-red-50"
        />

        <OccupancyRateCard percentage={stats.occupancyRate} />

        <StatCard
          title="Horário Mais Popular"
          value={stats.popularTime}
          subtitle="Horário com mais reservas"
          icon={Clock}
          iconColor="text-orange-500"
          iconBgColor="bg-orange-50"
        />
      </div>

      <CardContainer>
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-2xl text-blue-500 px-4 py-2 bg-blue-100 rounded-lg inline-block w-fit">
            Ocupação por Horário
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {timeSlots.map((slot) => (
              <TimeSlotCard
                key={slot.timeRange}
                timeRange={slot.timeRange}
                reservedTables={slot.reservedTables}
                totalTables={slot.totalTables}
              />
            ))}
          </div>
        </div>
      </CardContainer>

      <ReservationTable reservations={reservations} />
    </div>
  );
}