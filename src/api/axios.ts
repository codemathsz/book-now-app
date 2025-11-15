import axios from "axios"

const baseURL = 'http://localhost:3000/api'

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
        window.location.href = '/login'
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