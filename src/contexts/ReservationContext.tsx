import { createReservation, getAllReservations } from "@/api/reservation.api";
import { getAllTimeSlots, getAvailability } from "@/api/time-slots.api";
import type { AvailabilityTimeSlots, CreateReservationDTO, Reservation, TimeSlot } from "@/types";
import { createContext, useEffect, useState } from "react";

interface ReservationProviderProps{
    children: React.ReactNode;
}

export type ReservationContextType = {
    reservations: Reservation[];
    timeSlots: TimeSlot[];
    handleCreateReservation: (reservation: CreateReservationDTO) => Promise<void>;
    handleCancelReservation: (reservationId: string) => void;
    handleGetAllReservations: () => Promise<void>;
    getTimeSlots: () => Promise<void>;
    getAvailabilityTimeSlots: (date: string) => Promise<void>;
    availableTimeSlots: AvailabilityTimeSlots[]
}

export const ReservationContext = createContext<ReservationContextType>({} as ReservationContextType);

export const ReservationProvider = ({children}: ReservationProviderProps) => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<AvailabilityTimeSlots[]>([]);

    const handleCreateReservation = async (reservation: CreateReservationDTO) => {
        try {
            const response = await createReservation(reservation);
            if(!response) throw new Error('Erro ao criar reserva');
            setReservations(prev => [...prev, response]);
        } catch (error) {
            console.log("Error creating reservation in context", error);
            throw error;
        }
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

    const getAvailabilityTimeSlots = async (date: string) =>{
        const response = await getAvailability(date);
        if(response){
            setAvailableTimeSlots(response.availability);
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
            timeSlots,
            getAvailabilityTimeSlots,
            availableTimeSlots
        }}>
            {children}
        </ReservationContext.Provider>
    )
}