import type { IUser } from "./user"

export interface LoginDTO{
    email: string
    password: string
}

export type AuthResponse = {
    message: string
    user: IUser
}