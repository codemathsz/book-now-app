import { axiosInstance } from "./axios"

export const getAllTimeSlots = async () =>{
    try {
        const response = await axiosInstance.get("/time-slots")
        return response.data
    } catch (error) {
        console.log("Error get all time slots ", error)
    }
}