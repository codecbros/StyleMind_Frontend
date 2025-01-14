import { useForm } from 'react-hook-form'
import { useToast } from './use-toast'
import { formRegisterSchema } from '@/schema/auth/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { authService } from '@/services/auth.service'
import { FormRegisterType } from '@/types'

export function useRegisterForm() {
  const [isLoading, setIsLoading] = useState(false) // Estado para el loading
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<FormRegisterType>({
    resolver: zodResolver(formRegisterSchema),
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
      toast({
        title: '¡Registro exitoso!',
        description: response.message,
        className: 'uppercase'
      })
      form.reset()
      router.push('/auth/login')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        className: 'uppercase'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading }
}
