import { getAllReservations } from "@/api/reservation.api";
import { getAllTimeSlots } from "@/api/time-slots.api";
import type { Reservation, TimeSlot } from "@/types";
import { createContext, useEffect, useState } from "react";

interface ReservationProviderProps{
    children: React.ReactNode;
}

export type ReservationContextType = {
    reservations: Reservation[];
    timeSlots: TimeSlot[];
    handleCreateReservation: (reservation: Reservation) => void;
    handleCancelReservation: (reservationId: string) => void;
    handleGetAllReservations: () => Promise<void>;
    getTimeSlots: () => Promise<void>;
}

export const ReservationContext = createContext<ReservationContextType>({} as ReservationContextType);

export const ReservationProvider = ({children}: ReservationProviderProps) => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

    const handleCreateReservation = async (reservation: Reservation) => {
        
    }

    const handleGetAllReservations = async () => {
        const response = await getAllReservations();

        if(response){
            setReservations(response.reservations);
        }
    }

    const handleCancelReservation = async (reservationId: string) => {

    }

    const getTimeSlots = async () =>{
        const response = await getAllTimeSlots();

        if(response){
            setTimeSlots(response.timeSlots);
        }
    }

    useEffect(() =>{
        getTimeSlots();
        handleGetAllReservations();
    },[])

    return(
        <ReservationContext.Provider value={{
            reservations,
            handleCreateReservation,     
            handleCancelReservation,
            handleGetAllReservations,
            getTimeSlots,
            timeSlots
        }}>
            {children}
        </ReservationContext.Provider>
    )
}