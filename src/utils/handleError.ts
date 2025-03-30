import axios, { AxiosError } from 'axios'

export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>

    if (axiosError.response) {
      const { status, data } = axiosError.response
      const message = data?.message || 'Server error occurred'
      switch (status) {
        case 400:
          return new Error(`Bad request: ${message}`)
        case 401:
          return new Error(`Unauthorized: ${message}`)
        case 403:
          return new Error(`Forbidden: ${message}`)
        case 404:
          return new Error(`Not found: ${message}`)
        default:
          return new Error(`Server error (${status}): ${message}`)
      }
    }

    if (axiosError.request) {
      return new Error('Network error: No response received from server')
    }
  }
}
