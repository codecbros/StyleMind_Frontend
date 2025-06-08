"use client"
import { ClothingCard } from "@/components/wardrobe/ClothingCard"
import { useWardrobeStore } from "@/store/wardrobe.store"
import { useEffect } from "react"

export default function page() {
   const wardrobe = useWardrobeStore(state => state?.wardrobe)
  const getWardrobe = useWardrobeStore(state => state?.getWardrobe)

  useEffect(() => {
    if (!wardrobe || wardrobe.length === 0) {
      getWardrobe()
    }
  },[])

  return (
     <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Mi Guardarropa</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wardrobe.map(item => (
          <ClothingCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
