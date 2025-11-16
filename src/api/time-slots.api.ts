import { axiosInstance } from "./axios"

export const getAllTimeSlots = async () =>{
    try {
        const response = await axiosInstance.get("/time-slots")
        return response.data
    } catch (error) {
        console.log("Error get all time slots ", error)
    }
}

/**
 * @param date (format: YYYY-MM-DD)
 *  */ 
export const getAvailability = async (date: string) =>{
    try {
        const response = await axiosInstance.get(`/reservations/availability?date=${date}`)
        return response.data
    } catch (error) {
        console.log("Eror get availability time slots: ", error)
    }
}