import { cancelReservation, createReservation, getAdminAllReservations, getAllReservations } from "@/api/reservation.api";
import { getAllTimeSlots, getAvailability } from "@/api/time-slots.api";
import type { AvailabilityTimeSlots, CreateReservationDTO, Reservation, ReservationAdmin, TimeSlot } from "@/types";
import { createContext, useEffect, useState } from "react";

interface ReservationProviderProps{
    children: React.ReactNode;
}

export type ReservationContextType = {
    reservations: Reservation[];
    timeSlots: TimeSlot[];
    availableTimeSlots: AvailabilityTimeSlots[];
    reservationsAllByDate: ReservationAdmin[];
    handleCreateReservation: (reservation: CreateReservationDTO) => Promise<void>;
    handleCancelReservation: (reservationId: string) => Promise<void>;
    handleGetAllReservations: () => Promise<void>;
    getTimeSlots: () => Promise<void>;
    getAvailabilityTimeSlots: (date: string) => Promise<void>;
    handleGetAdminAllReservations: (date: string) => Promise<void>;
}

export const ReservationContext = createContext<ReservationContextType>({} as ReservationContextType);

export const ReservationProvider = ({children}: ReservationProviderProps) => {

    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [reservationsAllByDate, setReservationsAllByDate] = useState<ReservationAdmin[]>([]);
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [availableTimeSlots, setAvailableTimeSlots] = useState<AvailabilityTimeSlots[]>([]);

    const handleCreateReservation = async (reservation: CreateReservationDTO) => {
        try {
            const response = await createReservation(reservation);
            if (!response) throw new Error('Failed to create reservation');
            setReservations(prev => [...prev, response]);
        } catch (error) {
            console.error("Error creating reservation:", error);
            throw error;
        }
    }

    const handleGetAllReservations = async () => {
        try {
            const response = await getAllReservations();
            if (response) {
                setReservations(response.reservations);
            }
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    }

    const handleCancelReservation = async (reservationId: string) => {
        try {
            const response = await cancelReservation(reservationId);
            if (response) {
                await handleGetAllReservations();
            }
        } catch (error) {
            console.error("Error canceling reservation:", error);
            throw error;
        }
    }

    const getTimeSlots = async () => {
        try {
            const response = await getAllTimeSlots();
            if (response) {
                setTimeSlots(response.timeSlots);
            }
        } catch (error) {
            console.error("Error fetching time slots:", error);
        }
    }

    const getAvailabilityTimeSlots = async (date: string) => {
        try {
            const response = await getAvailability(date);
            if (response) {
                setAvailableTimeSlots(response.availability);
            }
        } catch (error) {
            console.error("Error fetching availability:", error);
        }
    }

    const handleGetAdminAllReservations = async (date: string) => {
        try {
            const response = await getAdminAllReservations(date);
            if (response) {
                setReservationsAllByDate(response.reservations);
            }
        } catch (error) {
            console.error("Error fetching admin reservations:", error);
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
            availableTimeSlots,
            handleGetAdminAllReservations,
            reservationsAllByDate
        }}>
            {children}
        </ReservationContext.Provider>
    )
}