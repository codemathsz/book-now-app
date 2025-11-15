import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { CardContainer } from "@/components/CardContainer";
import { CardTimes } from "@/components/CardTimes";
import { ReservationModal } from "@/components/ReservationModal";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewReservation() {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const formatDateForDisplay = (date: Date | string) => {
    let parsedDate = new Date(date);
    
    return parsedDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              onDateSelect={(selectedDate) => setSelectedDate(selectedDate)}
            />
          </div>
        </div>
      </CardContainer>

      {
        selectedDate && (
          <CardContainer>
            <div className="w-full">
              <div className="flex flex-col justify-center items-start gap-2 mb-4">
                <div className="flex justify-start items-center gap-4">
                  <span className="w-8 h-8 bg-[#3b82f6] rounded-full flex justify-center items-center text-white">1</span>
                  <p className="font-semibold text-2xl text-black">Selecionar Horários</p>
                </div>
                <p className="text-base text-gray-500">{formatDateForDisplay(selectedDate)}</p>
              </div>

              <div className="flex justify-between items-start px-2 gap-4 ">
                <CardTimes 
                  timeLabel="12:00 - 12:30"
                  totalTables={6}
                  tablesAvailable={3}
                  onSelect={(time) => setSelectedTime(time)}
                  selected={selectedTime === "12:00 - 12:30"}
                />

                <CardTimes 
                  timeLabel="12:30 - 13:00"
                  totalTables={6}
                  tablesAvailable={1}
                  onSelect={(time) => setSelectedTime(time)}
                  selected={selectedTime === "12:30 - 13:00"}
                />

                <CardTimes 
                  timeLabel="13:00 - 13:30"
                  totalTables={6}
                  tablesAvailable={0}
                  onSelect={(time) => setSelectedTime(time)}
                  selected={selectedTime === "13:00 - 13:30"}
                />
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

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        date={formatDateForDisplay(selectedDate!)}
        time={selectedTime}
        table="Mesa 3"
        onConfirm={() => {
          // Lógica após confirmar
        }}
      />
    </div>

  );
}