import { Check, Clock, Info, X } from "lucide-react";
import { Button } from "../Button";
import type { TimeSlot } from "@/types";

interface CardTimesProps {
    selected: boolean;
    timeSlot: TimeSlot;
    tablesAvailable: number;
    totalTables: number;
    onSelect: (timeSlotId: number) => void;
}

export function CardTimes({ selected, timeSlot, tablesAvailable, totalTables, onSelect }: CardTimesProps) {
    const isSoldOut = tablesAvailable === 0;
    const isLastTables = tablesAvailable <= 2;
    const occupationPercentage = ((totalTables - tablesAvailable) / totalTables) * 100;

    const getStatusColor = () => {
        if (isSoldOut) return "text-red-500";
        if (isLastTables) return "text-yellow-500";
        return "text-green-500";
    };

    const getStatusBgColor = () => {
        if (isSoldOut) return "bg-red-50";
        if (isLastTables) return "bg-yellow-50";
        return "bg-green-50";
    };

    const getStatusText = () => {
        if (isSoldOut) return "Esgotado";
        if (isLastTables) return "Últimas 1 mesas";
        return `${tablesAvailable} mesas disponíveis`;
    };

    const getStatusIcon = () => {
        if (isSoldOut) return <X className="w-5 h-5" color="#ef4444"/>;
        if (isLastTables) return <Info className="w-5 h-5" color="#f59e0b"/>;
        return <Check className="w-5 h-5" color="#16a34a"/>;
    };

    return (
        <div
            className={`
                w-full flex flex-col items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer
                ${isSoldOut ? 'opacity-50 bg-gray-50' : 'bg-white'}
                ${selected && 'border-blue-500!'}
                ${!isSoldOut && !selected ? 'hover:border-gray-300' : ''}
                min-w-60
            `}
            onClick={() => onSelect(timeSlot.id)}
        >
            <div className="mb-4">
                <Clock className="w-8 h-8" color="#3b82f6" />
            </div>

            <h1 className="font-semibold text-xl text-black mb-3">{timeSlot.label}</h1>

            <div
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4
                    ${getStatusBgColor()}
                `}
            >
                <span className="text-lg leading-none">{getStatusIcon()}</span>
                <p className={`text-sm font-medium ${getStatusColor()}`}>
                    {getStatusText()}
                </p>
            </div>

            <div className="w-full mb-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-500">Ocupação</p>
                    <p className="text-xs text-gray-700 font-medium">
                        {totalTables - tablesAvailable}/{totalTables}
                    </p>
                </div>
                <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div
                        className="h-full transition-all bg-blue-500"
                        style={{ width: `${occupationPercentage}%` }}
                    />
                </div>
            </div>

            {!isSoldOut && (
                <Button
                    variant={selected ? "primary" : "outline"}
                    className="w-full mt-2 gap-2"
                    onClick={() => onSelect(timeSlot.id)}
                >
                    {selected ? (
                        <>
                            <Check className="w-4 h-4" />
                            <span>Selecionado</span>
                        </>
                    ) : (
                        <span>Selecionar</span>
                    )}
                </Button>
            )}
        </div>
    );
}