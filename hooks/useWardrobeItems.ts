import { useClothingStore } from "@/store/clothing.store"
import { useEffect, useState } from "react"

export const useWardrobeItems = () => {
  const wardrobeItems = useClothingStore(state => state.wardrobeItems)
  const getWardrobeItems = useClothingStore(state => state.getWardrobeItems)
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false)

  useEffect(() => {
    if (!hasAttemptedFetch && wardrobeItems.length === 0) {
      getWardrobeItems()
      setHasAttemptedFetch(true)
    }
  }, [getWardrobeItems, hasAttemptedFetch, wardrobeItems.length])
  
  return { wardrobeItems }
}
