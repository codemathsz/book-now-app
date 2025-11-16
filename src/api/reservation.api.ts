import type { CreateReservationDTO, Reservation } from "@/types";
import { axiosInstance } from "./axios"

/**
 * get all reservations user
 * 
 */
export const getAllReservations = async () =>{
    try {
        const response = await axiosInstance.get("/reservations/")
        return response.data
    } catch (error) {
        console.log("Error get all reservations", error);
    }
}


/** 
 * @param data (format: YYYY-MM-DD)
*/
export const getAdminAllReservations = async (date:string) =>{
    try {
        const response = await axiosInstance.get(`/reservations/all?date=${date}`)
        return response.data
    } catch (error) {
        console.log("Error get admin all reservations ", error)
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