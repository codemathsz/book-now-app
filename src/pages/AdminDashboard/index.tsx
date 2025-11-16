import { Calendar } from "@/components/Calendar";
import { CardContainer } from "@/components/CardContainer";
import { StatCard } from "@/components/StatCard";
import { OccupancyRateCard } from "@/components/OccupancyRateCard";
import { TimeSlotCard } from "@/components/TimeSlotCard";
import { ReservationTable } from "@/components/ReservationTable";
import { CalendarCheck, X, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useReservations } from "@/hooks/useReservations";
import { getMostPopularTimeSlot, calculateOccupancyRate, getTimeSlotStats } from "@/utils/reservationStats";

export default function AdminDashboard() {

  const { handleGetAdminAllReservations, reservationsAllByDate } = useReservations();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const lastMonth = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }, []);

  const mostPopularTimeSlot = useMemo(
    () => getMostPopularTimeSlot(reservationsAllByDate),
    [reservationsAllByDate]
  );

  const occupancyRate = useMemo(
    () => calculateOccupancyRate(reservationsAllByDate),
    [reservationsAllByDate]
  );

  const timeSlotsWithStats = useMemo(
    () => getTimeSlotStats(reservationsAllByDate),
    [reservationsAllByDate]
  );

  const cancelledCount = useMemo(
    () => reservationsAllByDate.filter(reservation => reservation.status === 'cancelled').length,
    [reservationsAllByDate]
  );

  const handleSelectData = async (data: Date) => {
    await handleGetAdminAllReservations(data.toISOString().split('T')[0]);
  };

  useEffect(() => {
    if (!selectedDate) return;
    handleSelectData(selectedDate);
  }, [selectedDate]);

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

      {
        selectedDate && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total de Reservas"
                value={reservationsAllByDate.length}
                subtitle={new Date(selectedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
                icon={CalendarCheck}
                iconColor="text-blue-500"
                iconBgColor="bg-blue-50"
              />

              <StatCard
                title="Canceladas"
                value={cancelledCount}
                subtitle="Reservas canceladas"
                icon={X}
                iconColor="text-red-500"
                iconBgColor="bg-red-50"
              />

              <OccupancyRateCard percentage={occupancyRate} />

              <StatCard
                title="Horário Mais Popular"
                value={mostPopularTimeSlot}
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
                  {timeSlotsWithStats.length > 0 ? (
                    timeSlotsWithStats.map((slot) => (
                      <TimeSlotCard
                        key={slot.timeRange}
                        timeRange={slot.timeRange}
                        reservedTables={slot.reservedTables}
                        totalTables={slot.totalTables}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full text-center py-8">
                      Nenhuma reserva nesta data
                    </p>
                  )}
                </div>
              </div>
            </CardContainer>

            <ReservationTable reservations={reservationsAllByDate} />
          </>
        )
      }


    </div>
  );
}