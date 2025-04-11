import axios, { AxiosResponse } from 'axios'
import { axiosInstance } from './config'
import { ApiResponse, CategoriesApiResponse, ClothingItem } from '@/types'
import { useAuthStore } from '@/store/auth.store'

// Obtener Categorías
export async function getCategories(): Promise<CategoriesApiResponse> {
  try {
    const { data }: AxiosResponse<CategoriesApiResponse> = await axiosInstance.get('/categories/my', {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al obtener las categorías.')
    }
    throw error
  }
}

export async function postClothing(data: ClothingItem): Promise<ApiResponse<object>> {
  try {
    const { data: response }: AxiosResponse<ApiResponse<object>> = await axiosInstance.post('/wardrobe/add-clothes', data, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })

    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al crear la prenda.')
    }
    throw error
  }
}
