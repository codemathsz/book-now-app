import type { ICreateUser, ICreateUserReponse } from "@/types/user";
import { axiosInstance } from "./axios";

/**
 * Create account
 * @param data - data for create user
 * @returns Promise data user
 * @throws Error if create account fails
 */
export const createAccount = async (data: ICreateUser): Promise<ICreateUserReponse> =>{
    try {
        const response = await axiosInstance.post("/auth/register", data)
        return response.data
    } catch (error: any) {
        console.error("Error ccreateAccount:", error);
        throw new Error(error?.response?.data?.message || "Failed to createAccount");
    }
}