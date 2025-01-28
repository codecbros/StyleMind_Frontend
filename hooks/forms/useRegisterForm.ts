import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authService } from '@/services/auth.service'
import { FormRegisterType } from '@/types'
import { registerSchema } from '@/schema/userSchema'
import { useToastHandler } from '../useToastHandler'

export function useRegisterForm() {
  const [isLoading, setIsLoading] = useState(false) // Estado para el loading
  const { showErrorToast, showSuccessToast } = useToastHandler()
  const router = useRouter()
  const form = useForm<FormRegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      genderId: ''
    }
  })

  async function onSubmit(data: FormRegisterType) {
    setIsLoading(true)
    try {
      const response = await authService.register(data)
      showSuccessToast('¡Registro exitoso!', response.message)
      form.reset()
      router.push('/auth/login')
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading }
}
