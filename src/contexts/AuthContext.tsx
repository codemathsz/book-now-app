import { authenticate, checkAuth as checkAuthApi, logout as logoutApi } from "@/api/auth.api";
import type { LoginDTO } from "@/types/auth";
import type { IUser } from "@/types/user";
import { createContext, useEffect, useState } from "react";

interface AuthProviderProps{
    children: React.ReactNode;
}

export type AuthContextType = {
    login: (data: LoginDTO) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    user: IUser | null | undefined;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: AuthProviderProps) => {

    const [user, setUser] = useState<IUser | null | undefined>(undefined);

    const login = async (data: LoginDTO) => {
        try {
            const response = await authenticate(data);
            if(response){
                setUser(response.user);
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    const logout = async () => {
        try {
            await logoutApi();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally {
            setUser(null);
        }
    }

    const checkAuth = async () => {
        try {
            const userData = await checkAuthApi();
            setUser(userData);
        } catch (error) {
            setUser(null);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return(
        <AuthContext.Provider value={{
            login,
            logout,
            checkAuth,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}