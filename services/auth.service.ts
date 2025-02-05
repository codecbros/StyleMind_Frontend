import axios, { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from './config'
import {
  ApiResponse,
  FormLoginType,
  FormRegisterType,
  Gender,
  GetProfileResponse,
  LoginResponse,
  UpdateProfileResponse,
  UpdateProfileType,
  UserProfile
} from '@/types'
import { useAuthStore } from '@/store/auth.store'

// Para registro (envía por body)
async function registerRequest(endpoint: string, data: FormRegisterType): Promise<ApiResponse<null>> {
  try {
    const response = await axiosInstance.post<ApiResponse<null>>(endpoint, data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error en el registro.')
    }
    throw error
  }
}

// Para login (envía por headers)
async function loginRequest(endpoint: string, credentials: FormLoginType): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      endpoint,
      {},
      {
        headers: {
          email: credentials.email,
          password: credentials.password
        }
      }
    )

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data)
      throw new Error(error.response?.data)
    }
    throw error
  }
}

//Obtener perfil de usuario
async function getProfile(endpoint: string): Promise<UserProfile> {
  try {
    const response = await axiosInstance.get<GetProfileResponse>(endpoint, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })
    return response.data.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al obtener el perfil')
    }
    throw error
  }
}

//Actualizar Perfil del Usuario
async function updatedProfile(endpoint: string, data: UpdateProfileType): Promise<UpdateProfileResponse> {
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

//Eliminar/Desactivar Usuario
async function deleteUser(endpoint: string): Promise<ApiResponse<null>> {
  try {
    const token = useAuthStore.getState().token
    const response = await axiosInstance.patch<ApiResponse<null>>(
      endpoint,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Error al Eliminar el usuario')
    }
    throw error
  }
}


//Obtener Generos
async function getGenders(endpoint: string): Promise<Gender[]> {
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
  updatedProfile: (data: UpdateProfileType) => updatedProfile('/users/update', data),
  deleteUser: () => deleteUser('/users/desactivateMyUser'),
  getGenders: () => getGenders('/genders')
}
