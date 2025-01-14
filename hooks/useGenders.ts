import { authService } from '@/services/auth.service'
import { Gender } from '@/types'
import { useEffect, useState } from 'react'

export function useGenders() {
  const [genders, setGenders] = useState<Gender[]>([])

  useEffect(() => {
    const loadGenders = async () => {
      try {
        const data = await authService.getGenders()
        setGenders(data)
      } catch (error) {
        console.error('Error al cargar géneros:', error)
      }
    }

    loadGenders()
  }, [])

  return { genders }
}
