import { Clock, X } from "lucide-react";
import { Button } from "../Button";

export function ReservationCard() {
    return(
        <div className="w-full flex justify-between border rounded-2xl p-4">
            <div className="flex justify-center items-center gap-4">
                <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-[#3b82f6]/20 ">
                    <Clock className="w-6 h-6" color="#3b82f6"/>
                </div>

                <div className="flex flex-col gap-2 justify-center items-start">
                    <h1 className="font-medium text-xl text-black">sexta-feira, 22 de novembro</h1>
                    <p className="text-base text-gray-500">12:00 - 12:30 º Mesa 3</p>
                </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                <div className="rounded-full bg-[#16a249]/10 px-3 py-1">
                    <span className="text-sm text-[#16a249]">Ativa</span>
                </div>
                <Button variant="outline" className="flex justify-center items-center gap-4 px-4! py-2!" title="Cancelar agendamento">
                    <X className="w-4 h-4" color="#ef4343"/>
                    <span className="text-[#ef4343]">Cancelar</span>
                </Button>
            </div>
        </div>
    )
}