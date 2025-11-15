import { Clock, X } from "lucide-react";
import { Button } from "../Button";

export function ReservationCard() {
    return(
        <div className="w-full flex flex-col sm:flex-row justify-between gap-4 border rounded-2xl p-4">
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex justify-center items-center rounded-xl bg-[#3b82f6]/20">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6" color="#3b82f6"/>
                </div>

                <div className="flex flex-col gap-1 sm:gap-2 justify-center items-start min-w-0">
                    <h1 className="font-medium text-base sm:text-xl text-black truncate w-full">sexta-feira, 22 de novembro</h1>
                    <p className="text-sm sm:text-base text-gray-500">12:00 - 12:30 º Mesa 3</p>
                </div>
            </div>
            <div className="flex justify-between sm:justify-center items-center gap-3 sm:gap-4">
                <div className="rounded-full bg-[#16a249]/10 px-3 py-1">
                    <span className="text-xs sm:text-sm text-[#16a249]">Ativa</span>
                </div>
                <Button variant="outline" className="flex justify-center items-center gap-2 sm:gap-4 px-3 sm:px-4 py-2 text-sm sm:text-base" title="Cancelar agendamento">
                    <X className="w-4 h-4" color="#ef4343"/>
                    <span className="text-[#ef4343]">Cancelar</span>
                </Button>
            </div>
        </div>
    )
}