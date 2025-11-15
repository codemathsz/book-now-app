import { useState } from 'react';
import { ReservationCard } from '../../components/ReservationCard';

type TabType = 'proximas' | 'hoje' | 'historico';

export default function Reservations() {
  const [activeTab, setActiveTab] = useState<TabType>('proximas');

  const mockReservations = [
    { id: 1, date: 'sexta-feira, 22 de novembro', time: '12:00 - 12:30', table: 'Mesa 3', status: 'active' },
    { id: 2, date: 'sábado, 23 de novembro', time: '12:30 - 13:00', table: 'Mesa 5', status: 'active' },
    { id: 3, date: 'segunda-feira, 25 de novembro', time: '13:00 - 13:30', table: 'Mesa 2', status: 'active' },
  ];

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
          {activeTab === 'proximas' && mockReservations.length > 0 ? (
            mockReservations.map((reservation) => (
              <ReservationCard key={reservation.id} />
            ))
          ) : activeTab === 'hoje' ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-center">
                Nenhuma reserva para hoje
              </p>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-400 text-center">
                Nenhuma reserva no histórico
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}