import { useClothingStore } from "@/store/clothing.store"
import { useEffect, useState } from "react"

export const useCategories = () => {
  const categories = useClothingStore(state => state.categories)
  const getCategories = useClothingStore(state => state.getCategories)
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false)

  useEffect(() => {
    if (!hasAttemptedFetch && categories.length === 0) {
      getCategories()
      setHasAttemptedFetch(true)
    }
  }, [getCategories, hasAttemptedFetch])
  
  return { categories }
}