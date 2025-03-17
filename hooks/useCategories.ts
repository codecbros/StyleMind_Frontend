import { useClothingStore } from '@/store/clothing.store'
import { useEffect } from 'react'

export const useCategories = () => {
  const categories = useClothingStore(state => state.categories)
  const getCategories = useClothingStore(state => state.getClothing)

  useEffect(() => {

    const fetchCategories = () => {
      if (categories.length > 0) return

      getCategories()
    }
    fetchCategories()
  }, [categories, getCategories])

  return { categories }
}
