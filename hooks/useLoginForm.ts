import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormLoginType } from '@/types'
import { useAuthStore } from '@/store/auth.store'
import { loginSchema } from '@/schema/userSchema'
import { useToastHandler } from './useToastHandler'

export function useLoginForm() {
  const loginUser = useAuthStore(state => state.loginUser)
  const { showErrorToast, showSuccessToast } = useToastHandler()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormLoginType) {
    setIsLoading(true)
    try {
      const response = await loginUser(data)
      showSuccessToast('¡Ingreso Exitoso!', response.message)
      router.push('/dashboard/perfil')
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading }
}
