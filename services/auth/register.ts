// services/auth/register.ts
import { FormRegisterType } from '@/types/Register'
import { axiosInstance } from '../config'
import axios from 'axios'

export async function registerUser(data: FormRegisterType) {
  try {
    const response = await axiosInstance.post('/users', data)
    console.log(response.data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario.')
    }
    throw error
  }
}
