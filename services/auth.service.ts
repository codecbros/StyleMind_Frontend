import axios from 'axios'
import { axiosInstance } from './config'
import { FormLoginType, FormRegisterType, Gender } from '@/types'

// Para registro (envía por body)
async function registerRequest(endpoint: string, data: FormRegisterType) {
  try {
    const response = await axiosInstance.post(endpoint, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en el registro.')
    }
    throw error
  }
}

// Para login (envía por headers)
async function loginRequest(endpoint: string, credentials: FormLoginType) {
  try {
    const { data } = await axiosInstance.post(
      endpoint,
      {}, // body vacío
      {
        headers: {
          email: credentials.email,
          password: credentials.password
        }
      }
    )
    console.log(data.data.token)
    return data // Aquí vendría el token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en el login.')
    }
    throw error
  }
}

async function getGendersRequest(endpoint: string): Promise<Gender[]> {
  try {
    const { data } = await axiosInstance.get(endpoint)
    return data.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al obtener géneros.')
    }
    throw error
  }
}

export const authService = {
  register: (data: FormRegisterType) => registerRequest('/users', data),
  login: (credentials: FormLoginType) => loginRequest('/auth/login', credentials),
  getGenders: () => getGendersRequest('/genders')
}
