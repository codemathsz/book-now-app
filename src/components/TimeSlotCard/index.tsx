import { Clock } from 'lucide-react';

interface TimeSlotCardProps {
  timeRange: string;
  reservedTables: number;
  totalTables: number;
}

export function TimeSlotCard({ timeRange, reservedTables, totalTables }: TimeSlotCardProps) {
  const occupationPercentage = (reservedTables / totalTables) * 100;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Ícone e horário */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
          <Clock className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="font-semibold text-lg text-gray-900">{timeRange}</h3>
        <p className="text-sm text-gray-500 mt-1">
          {reservedTables} de {totalTables} mesas reservadas
        </p>
      </div>

      {/* Barra de progresso */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${occupationPercentage}%` }}
        />
      </div>

      {/* Grid de mesas */}
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: totalTables }).map((_, index) => (
          <div
            key={index}
            className={`
              aspect-square rounded-xl flex items-center justify-center text-white font-semibold text-lg
              ${index < reservedTables ? 'bg-green-500' : 'bg-gray-200 text-gray-400'}
            `}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
