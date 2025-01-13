import { useForm } from 'react-hook-form'
import { useToast } from './use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formLoginSchema } from '@/schema/auth/loginSchema'
import { FormLoginType } from '@/types'
import { authService } from '@/services/auth.service'

export function useLoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<FormLoginType>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormLoginType) {
    console.log(data)
    setIsLoading(true)
    try {
      const response = await authService.login(data)
      toast({
        title: '¡Ingreso Exitoso!',
        description: response.message,
        className: 'uppercase'
      })
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
