import type { AuthResponse, LoginDTO } from "@/types/auth";
import type { IUser } from "@/types/user";
import { axiosInstance } from "./axios";

/**
 * authenticates user in the system
 * @param data - login data (email and password)
 * @returns Promise with authentication data (user and message)
 * @throws AuthError in case of authentication failure
 */
export const authenticate = async (data: LoginDTO): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        
        if (!response.data?.user) {
            throw new Error('Resposta inválida do servidor');
        }
        
        return response.data as AuthResponse;
    } catch (error: any) {
        // error handling
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Erro na autenticação';
            
            if (status === 401) {
                throw new Error('Email ou senha incorretos');
            } else if (status === 422) {
                throw new Error('Dados inválidos fornecidos');
            } else if (status >= 500) {
                throw new Error('Erro interno do servidor. Tente novamente mais tarde.');
            } else {
                throw new Error(message);
            }
        } else if (error.request) {
            throw new Error('Erro de conexão. Verifique sua internet.'+ status);
        } else {
            throw new Error(error.message || 'Erro desconhecido durante a autenticação');
        }
    }
}

/**
 * Checks if user is authenticated
 * @returns Promise with user data
 * @throws Error if not authenticated
 */
export const checkAuth = async (): Promise<IUser> => {
    try {
        const response = await axiosInstance.get('/auth/me');        
        return response.data.user;
    } catch (error: any) {
        throw new Error('Não autenticado');
    }
}

/**
 * Logs out user from the system
 * @returns Promise<void>
 */
export const logout = async (): Promise<void> => {
    try {
        await axiosInstance.post('/auth/logout');
    } catch (error: any) {
        console.error('Erro ao fazer logout:', error);
        throw error;
    }
}