import axios, { AxiosError, AxiosInstance } from 'axios'
import { getSession } from 'next-auth/react'

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  async config => {
    const session = await getSession()
    console.log({ session })
    if (session?.user?.access_token) {
      config.headers.Authorization = `Bearer ${session.user.access_token}`
    }
    return config
  },
  error => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  response => {
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)
export default apiClient
