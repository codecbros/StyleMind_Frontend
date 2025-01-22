import axios, { AxiosError } from 'axios'
import { axiosInstance } from './config'
import { FormLoginType, FormRegisterType, Gender, UserSchemaType } from '@/types'
import { useAuthStore } from '@/store/auth.store'

export type UpdateProfileResponse = {
  message: string
  status: string
}
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
      {},
      {
        headers: {
          email: credentials.email,
          password: credentials.password
        }
      }
    )
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw error
  }
}

//Obtener perfil de usuario
async function getProfile(endpoint: string) {
  try {
    const { data } = await axiosInstance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })
    return data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al obtener el perfil')
    }
    throw error
  }
}

//Actualizar Perfil del Usuario
async function updatedProfile(
  endpoint: string,
  data: UserSchemaType
): Promise<UpdateProfileResponse> {
  try {
    const token = useAuthStore.getState().token
    const response = await axiosInstance.patch(
      endpoint,
      data, // esto va como body
      {
        headers: {
          Authorization: `Bearer ${token}` // token en el header
        }
      }
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al obtener el perfil')
    }
    throw error
  }
}

//Obtener Generos
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
  getProfile: () => getProfile('/users/myProfile'),
  updatedProfile: (data: UserSchemaType) => updatedProfile('/users/update', data),
  getGenders: () => getGendersRequest('/genders')
}
