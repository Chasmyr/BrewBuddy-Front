import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useState } from "react"

export const useApi = <T = any>() => {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async (url: string, options?: AxiosRequestConfig) => {
        setIsLoading(true)
        const fullUrl: string = import.meta.env.VITE_API_URL + url
        try {
            const response: AxiosResponse<T> = await axios({
                url: fullUrl,
                method: options?.method || 'get',
                headers: {
                    Authorization: options?.headers?.Authorization || '',
                    ...options?.headers
                },
                data: options?.data,
                params: options?.params
            })
            setData(response.data)
            return response.data
        } catch(error: any) {
            setError(error)
        } finally {
            setIsLoading(false);
        }
    }

    return {data, isLoading, error, fetchData}
}