import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
    selectedDate?: Date | null;
    onDateSelect?: (date: Date | null) => void;
    minDate?: Date;
    maxDate?: Date;
}

export function Calendar({ selectedDate, onDateSelect, minDate = new Date(new Date().setDate(new Date().getDate() - 1)), maxDate }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(
        selectedDate ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1) : new Date()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: (Date | null)[] = [];

        // Adiciona dias vazios antes do primeiro dia do mês
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Adiciona os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const handleDateClick = (date: Date) => {
        if (isDateDisabled(date)) return;
        
        if (isSelected(date)) {
            onDateSelect?.(null as any);
            return;
        }
        
        onDateSelect?.(date);
    };

    const isDateDisabled = (date: Date) => {
        const dateTime = date.getTime();
        if (minDate && dateTime < minDate.getTime()) return true;
        if (maxDate && dateTime > maxDate.getTime()) return true;
        return false;
    };

    const isToday = (date: Date) => {
        return date.getTime() === today.getTime();
    };

    const isSelected = (date: Date) => {
        if (!selectedDate) return false;
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);
        return date.getTime() === selected.getTime();
    };

    const days = getDaysInMonth(currentMonth);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={handlePreviousMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Mês anterior"
                >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>

                <h2 className="text-lg font-semibold text-gray-900">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>

                <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Próximo mês"
                >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
                {daysOfWeek.map((day) => (
                    <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 py-2"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((date, index) => {
                    if (!date) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const disabled = isDateDisabled(date);
                    const isTodayDate = isToday(date);
                    const isSelectedDate = isSelected(date);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => handleDateClick(date)}
                            disabled={disabled}
                            className={`
                                aspect-square rounded-lg text-sm font-medium transition-all
                                ${disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50 cursor-pointer'}
                                ${isTodayDate && !isSelectedDate ? 'bg-blue-100 text-blue-600 ring-2 ring-blue-200' : ''}
                                ${isSelectedDate ? 'bg-blue-500 text-white hover:bg-blue-600' : 'text-gray-700'}
                                ${!disabled && !isTodayDate && !isSelectedDate ? 'hover:ring-2 hover:ring-blue-100' : ''}
                            `}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>

            {/* Legenda */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 ring-2 ring-blue-200" />
                    <span>Hoje</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-500" />
                    <span>Selecionado</span>
                </div>
            </div>
        </div>
    );
}
