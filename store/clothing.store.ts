import { getCategories } from '@/services/clothing.service'
import { Category } from '@/types'
import { AxiosError } from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type ClothingState = {
  categories: Category[]
  getCategories: () => void
}

export const useClothingStore = create<ClothingState>()(
  devtools(
    persist(
      set => ({
        categories: [],

        getCategories: async () => {
          try {
            const { data } = await getCategories()
            set({ categories: data })
            return
          } catch (error) {
            if (error instanceof AxiosError) {
              throw new Error(error.response?.data?.message || 'Error al obtener las categorias')
            }
            throw error
          }
        }
      }),
      {
        name: 'clothing-storage'
      }
    )
  )
)
