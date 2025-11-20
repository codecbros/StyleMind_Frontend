import { getCategories, getWardrobeItems } from '@/services/clothing.service'
import { Category, WardrobeItem } from '@/types'
import { AxiosError } from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type ClothingState = {
  categories: Category[]
  wardrobeItems: WardrobeItem[]
  getCategories: () => void
  getWardrobeItems: () => void
}

export const useClothingStore = create<ClothingState>()(
  devtools(
    persist(
      set => ({
        categories: [],
        wardrobeItems: [],

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
        },

        getWardrobeItems: async () => {
          try {
            const { data } = await getWardrobeItems()
            set({ wardrobeItems: data })
            return
          } catch (error) {
            if (error instanceof AxiosError) {
              throw new Error(error.response?.data?.message || 'Error al obtener los items del guardarropa')
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
