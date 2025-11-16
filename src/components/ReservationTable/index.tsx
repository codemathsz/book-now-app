import type { ReservationAdmin } from "@/types";

interface ReservationTableProps {
  reservations: ReservationAdmin[];
}

export function ReservationTable({ reservations }: ReservationTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Todas as Reservas</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Nome</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Horário</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Mesa</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-600 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-gray-900">{reservation.users.name}</td>
                    <td className="py-4 px-4 text-gray-600">{reservation.users.email}</td>
                    <td className="py-4 px-4 text-gray-900">{reservation.time_slots.label}</td>
                    <td className="py-4 px-4 text-gray-900">{reservation.table_number}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`
                          inline-block px-3 py-1 rounded-full text-sm font-medium
                          ${reservation.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-600'
                          }
                        `}
                      >
                        {reservation.status === 'active' ? 'Ativa' : 'Cancelada'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-gray-400">
                    Nenhuma reserva encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
