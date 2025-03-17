import axios, { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from './config'
import { CategoriesApiResponse } from '@/types';
import { useAuthStore } from '@/store/auth.store';


// Obtener Categorías
async function getCategories(endpoint: string): Promise<CategoriesApiResponse> {
    try {
      const { data }: AxiosResponse<CategoriesApiResponse> = await axiosInstance.get(endpoint,{
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`
        }
      });
      
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Error al obtener las categorías.');
      }
      throw error;
    }
  }


  export const clothingService = {
    getCategories: () => getCategories('/categories/my')
  }


