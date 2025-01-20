import { useForm } from 'react-hook-form'
import { useToast } from './use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { formLoginSchema } from '@/schema/auth/loginSchema'
import { FormLoginType } from '@/types'
import { useAuthStore } from '@/store/auth.store'

export function useLoginForm() {
  const loginUser = useAuthStore(state => state.loginUser)
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
    setIsLoading(true)
    try {
      await loginUser(data)
      toast({
        title: '¡Ingreso Exitoso!',
        description: '¡Bienvenido al sistema!',
        className: 'uppercase'
      })

      router.push('/dashboard/perfil')
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error al iniciar sesión',
        variant: 'destructive',
        className: 'uppercase'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return { form, onSubmit, isLoading }
}
