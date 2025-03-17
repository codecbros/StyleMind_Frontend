import { useAuthStore } from '@/store/auth.store'
import { useEffect } from 'react'

export const useGenders = () => {
  const genders = useAuthStore(state => state.genders)
  const getGenders = useAuthStore(state => state.getGenders)

  useEffect(() => {
    const fetchGenders = () => {
      if (genders.length > 0) return

      getGenders()
    }
    fetchGenders()
  }, [genders, getGenders])

  return { genders }
}
