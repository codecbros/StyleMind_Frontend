import { getWardrobe } from '@/services/wardrobe.service'
import { WardrobeItem } from '@/types'
import { AxiosError } from 'axios'
import { create } from 'zustand'

export type ClothingState = {
  wardrobe: WardrobeItem[]
  getWardrobe: () => void
}

export const useWardrobeStore = create<ClothingState>()(
      set => ({
        wardrobe: [],

        getWardrobe: async () => {
          try {
            const { data } = await getWardrobe()
            set({ wardrobe: data })
            return
          } catch (error) {
            if (error instanceof AxiosError) {
              throw new Error(error.response?.data?.message || 'Error al obtener el armario.')
            }
            throw error
          }
        }
      }),
)
