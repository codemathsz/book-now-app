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

  const { handleCreateReservation, getAvailabilityTimeSlots, availableTimeSlots, reservations, handleGetAllReservations } = useReservations()
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmReservation = async () => {
    if(!selectedDate || !selectedTime){
      throw new Error('Data e horário são obrigatórios');
    }

    await handleCreateReservation({
      date: selectedDate.toISOString().split('T')[0],
      time_slot_id: selectedTime
    });
  }

  const handleSelectDate = async (date: Date | null) => {
    if(date){
      setIsLoading(true);
      setSelectedDate(date);
      await handleGetAvailableTimeSlots(date.toISOString().split('T')[0]).finally(() =>{
        setIsLoading(false);
      });
    } else {
      setSelectedDate(null);
    }
  }

  const handleGetAvailableTimeSlots = async (date: string) => {
    try {      
      if(!date) return;
      await getAvailabilityTimeSlots(date);
    } catch (error) {
      console.log("Error get available time slots handler: ", error);
    }
  }

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
                {
                  availableTimeSlots?.map((time) =>{
                    const isAlreadyReserved = reservations.some(
                      reservation => 
                        reservation.time_slot_id === time.time_slot_id && 
                        reservation.date === selectedDate.toISOString().split('T')[0] &&
                        reservation.status === 'active'
                    );
                    
                    return (
                      <CardTimes 
                        key={time.time_slot_id}
                        availableTimeSlot={time}
                        totalTables={time.max_tables}
                        tablesAvailable={time.available_tables}
                        onSelect={(time) => setSelectedTime(time)}
                        selected={selectedTime === time.time_slot_id}
                        isAlreadyReserved={isAlreadyReserved}
                      />
                    )
                  })
                }
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

      {
        selectedDate !== null && (
          <ReservationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            date={formatDateForDisplay(selectedDate) || ''}
            time={selectedTime!}
            table={3}
            onConfirm={handleConfirmReservation}
            onSuccess={handleGetAllReservations}
          />
        )
      }
    </div>

  );
}