import type { CreateReservationDTO, Reservation } from "@/types";
import { axiosInstance } from "./axios"

/**
 * Fetches all reservations for the authenticated user
 * @returns Promise with reservations array
 * @throws Error if request fails
 */
export const getAllReservations = async () => {
    try {
        const response = await axiosInstance.get("/reservations/");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user reservations:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch reservations");
    }
}


/**
 * Fetches all reservations for a specific date (admin only)
 * @param date - Date in YYYY-MM-DD format
 * @returns Promise with all reservations for the specified date
 * @throws Error if request fails or user is not admin
 */
export const getAdminAllReservations = async (date: string) => {
    try {
        const response = await axiosInstance.get(`/reservations/all?date=${date}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching admin reservations:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch admin reservations");
    }
}

/**
 *  create a new reservation
 *  @param data - CreateReservationDTO
 *  @returns return reservation
 *  @throws throw error in case of create reservation failure
 * */ 
export const createReservation = async (data: CreateReservationDTO): Promise<Reservation> => {
    try {
        const response = await axiosInstance.post("/reservations/", data);
        return response.data
    } catch (error) {
        console.log("Error creating reservation", error);
        throw error;
    }
}

/**
 * Cancels a reservation by ID
 * @param reservationId - Unique identifier of the reservation
 * @returns Promise with cancellation confirmation
 * @throws Error if cancellation fails or reservation not found
 */
export const cancelReservation = async (reservationId: string) => {
    try {
        const response = await axiosInstance.delete(`/reservations/${reservationId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error canceling reservation:", error);
        throw new Error(error?.response?.data?.message || "Failed to cancel reservation");
    }
}