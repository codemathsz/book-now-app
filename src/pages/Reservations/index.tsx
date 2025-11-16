import { useMemo, useState } from 'react';
import { ReservationCard } from '../../components/ReservationCard';
import { useReservations } from '@/hooks/useReservations';
import { parseDateString } from '@/utils/utils';

type TabType = 'proximas' | 'hoje' | 'historico';

export default function Reservations() {
  const [activeTab, setActiveTab] = useState<TabType>('proximas');
  const { reservations } = useReservations();

  const reservationsToday = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservations.filter(reservation => {
      const reservationDate = parseDateString(reservation.date);
      reservationDate.setHours(0, 0, 0, 0);
      return reservationDate.getTime() === today.getTime();
    });
  }, [reservations]);

  const reservationsHistory = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservations.filter(reservation => {
      const reservationDate = parseDateString(reservation.date);
      reservationDate.setHours(0, 0, 0, 0);
      return reservationDate.getTime() < today.getTime();
    });
  }, [reservations]);

  const reservationsFuture = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservations.filter(reservation => {
      const reservationDate = parseDateString(reservation.date);
      reservationDate.setHours(0, 0, 0, 0);

      return reservationDate.getTime() > today.getTime();
    });
  }, [reservations]);


  const tabs = [
    { key: 'proximas' as TabType, label: 'Próximas' },
    { key: 'hoje' as TabType, label: 'Hoje' },
    { key: 'historico' as TabType, label: 'Histórico' },
  ];

  return (
    <main className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold">Minhas Reservas</h1>
        <p className="text-base sm:text-lg text-gray-500">
          Gerencie todas as suas reservas
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              px-6 py-2 rounded-lg font-medium transition-all
              ${activeTab === tab.key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col border rounded-2xl p-6 gap-8">
        <h2 className="font-bold text-xl sm:text-2xl">
          {activeTab === 'proximas' && 'Reservas Futuras'}
          {activeTab === 'hoje' && 'Reservas de Hoje'}
          {activeTab === 'historico' && 'Histórico de Reservas'}
        </h2>

        <div className="flex-1 flex flex-col gap-4">
          {activeTab === 'proximas' && (
            reservationsFuture.length > 0 ? (
              reservationsFuture.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center">
                  Nenhuma reserva futura
                </p>
              </div>
            )
          )}

          {activeTab === 'hoje' && (
            reservationsToday.length > 0 ? (
              reservationsToday.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center">
                  Nenhuma reserva para hoje
                </p>
              </div>
            )
          )}

          {activeTab === 'historico' && (
            reservationsHistory.length > 0 ? (
              reservationsHistory.map((reservation) => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                />
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-400 text-center">
                  Nenhuma reserva no histórico
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}