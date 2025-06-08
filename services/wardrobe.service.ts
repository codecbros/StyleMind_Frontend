import { useAuthStore } from "@/store/auth.store"
import { axiosInstance } from "./config"
import axios from "axios"

export async function getWardrobe() {
  try {
    const { data } = await axiosInstance.get('/wardrobe/my-wardrobe', {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().token}`
      }
    })

    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Error al obtener el armario.')
    }
    throw error
  }
}
