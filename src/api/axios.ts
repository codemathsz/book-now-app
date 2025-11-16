import axios from "axios"

// Use o IP da sua máquina para acessar do celular
// Em produção, use a URL real da API
const baseURL = import.meta.env.VITE_API_URL || 'http://192.168.18.8:3000/api'

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

const responseInterceptor = (response: any) => response

const errorInterceptor = (error: any) => {
    // Handle specific status codes
    if (error.response?.status === 401) {
        // Não redireciona se for o endpoint de verificação de auth
        const isAuthCheck = error.config?.url?.includes('/auth/me');
        
        if (!isAuthCheck) {
            // Só redireciona se não estiver na página de login
            const currentPath = window.location.pathname;
            if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
                window.location.href = '/login';
            }
        }
    }

    if (error.response?.status === 403) {
        console.error('Acesso negado')
    }

    if (error.response?.status >= 500) {
        console.error('Erro interno do servidor')
    }

    return Promise.reject(error)
}

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor)