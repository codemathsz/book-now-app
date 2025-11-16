import { Clock } from 'lucide-react';

interface OccupancyRateCardProps {
  percentage: number;
}

export function OccupancyRateCard({ percentage }: OccupancyRateCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-600">Taxa de Ocupação</h3>
        <div className="p-2 rounded-lg bg-green-50">
          <Clock className="w-5 h-5 text-green-500" />
        </div>
      </div>
      
      <div>
        <p className="text-3xl font-bold text-gray-900">{percentage}%</p>
        
        {/* Barra de progresso */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-blue-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
