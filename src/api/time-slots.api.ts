import { axiosInstance } from "./axios"

/**
 * Fetches all available time slots
 * @returns Promise with time slots array
 * @throws Error if request fails
 */
export const getAllTimeSlots = async () => {
    try {
        const response = await axiosInstance.get("/time-slots");
        return response.data;
    } catch (error: any) {
        console.error("Error fetching time slots:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch time slots");
    }
}

/**
 * Fetches availability for all time slots on a specific date
 * @param date - Date in YYYY-MM-DD format
 * @returns Promise with availability data (available tables per time slot)
 * @throws Error if request fails
 */
export const getAvailability = async (date: string) => {
    try {
        const response = await axiosInstance.get(`/reservations/availability?date=${date}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching availability:", error);
        throw new Error(error?.response?.data?.message || "Failed to fetch availability");
    }
}