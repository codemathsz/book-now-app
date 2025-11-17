import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { CardContainer } from "@/components/CardContainer";
import { CardTimes } from "@/components/CardTimes";
import { ReservationModal } from "@/components/ReservationModal";
import { useReservations } from "@/hooks/useReservations";
import { formatDateForDisplay } from "@/utils/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewReservation() {

  const { 
    handleCreateReservation, 
    getAvailabilityTimeSlots, 
    availableTimeSlots, 
    reservations, 
    handleGetAllReservations 
  } = useReservations();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDateToString = (date: Date) => date.toISOString().split('T')[0];

  const handleConfirmReservation = async () => {
    if (!selectedDate || !selectedTime) {
      throw new Error('Data e horário são obrigatórios');
    }

    await handleCreateReservation({
      date: formatDateToString(selectedDate),
      time_slot_id: selectedTime
    });
  };

  const handleSelectDate = async (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
    
    if (date) {
      setIsLoading(true);
      try {
        await getAvailabilityTimeSlots(formatDateToString(date));
      } catch (error) {
        console.error("Error fetching available time slots:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isTimeSlotAlreadyReserved = (timeSlotId: number, date: Date) => {
    const dateString = formatDateToString(date);
    return reservations.some(
      reservation => 
        reservation.time_slot_id === timeSlotId && 
        reservation.date === dateString &&
        reservation.status === 'active'
    );
  };

  return (

    <div className="flex flex-col px-4 md:px-44 gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Criar Nova Reserva</h1>
        <p className="text-base text-gray-500">Selecione a data e o horário para a sua refeição</p>
      </div>

      <CardContainer>
        <div>
          <div className="flex justify-start items-center gap-4 mb-4">
            <span className="w-8 h-8 bg-[#3b82f6] rounded-full flex justify-center items-center text-white">1</span>
            <p className="font-semibold text-2xl text-black">Selecionar Data</p>
          </div>

          <div className="flex justify-center items-center">
            {/* Calendário */}
            <Calendar 
              selectedDate={selectedDate} 
              onDateSelect={(selectedDate) => handleSelectDate(selectedDate)}
            />
          </div>
        </div>
      </CardContainer>

      {
        selectedDate && !isLoading && (
          <CardContainer>
            <div className="w-full">
              <div className="flex flex-col justify-center items-start gap-2 mb-4">
                <div className="flex justify-start items-center gap-4">
                  <span className="w-8 h-8 bg-[#3b82f6] rounded-full flex justify-center items-center text-white">1</span>
                  <p className="font-semibold text-2xl text-black">Selecionar Horários</p>
                </div>
                <p className="text-base text-gray-500">{selectedDate && formatDateForDisplay(selectedDate)}</p>
              </div>

              <div className="flex justify-between items-start px-2 gap-4 ">
                <div
                  className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                  {availableTimeSlots?.map((time) => {
                    const isAlreadyReserved = isTimeSlotAlreadyReserved(
                      time.time_slot_id,
                      selectedDate
                    );
                    return (
                      <CardTimes
                        key={time.time_slot_id}
                        availableTimeSlot={time}
                        totalTables={time.max_tables}
                        tablesAvailable={time.available_tables}
                        onSelect={setSelectedTime}
                        selected={selectedTime === time.time_slot_id}
                        isAlreadyReserved={isAlreadyReserved}
                      />
                    );
                  })}
                </div>
              </div>

            </div>
          </CardContainer>
        )
      }

      {

        selectedTime &&(
          <div className="w-full flex justify-end items-center">
            <div className="flex gap-4">
              <Button variant="outline">
                <Link
                  to="/dashboard"
                >
                  <p>Cancelar</p>
                </Link>
              </Button>

              <Button 
                variant="primary"
                onClick={() => setIsModalOpen(true)}
              >
                <p>Confirmar Reserva</p>
              </Button>
            </div>
          </div>
        )
      }

      {selectedDate && selectedTime && (
        <ReservationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          date={formatDateForDisplay(selectedDate)}
          time={selectedTime}
          table={3}
          onConfirm={handleConfirmReservation}
          onSuccess={handleGetAllReservations}
        />
      )}
    </div>

  );
}