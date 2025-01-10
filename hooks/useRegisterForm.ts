import { useForm } from 'react-hook-form'
import { useToast } from './use-toast'
import { FormRegisterType } from '@/types/Register'
import { formRegisterSchema } from '@/schema/auth/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/services/auth/register'
import { useRouter } from 'next/navigation'

export function useRegisterForm() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<FormRegisterType>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormRegisterType) {
    try {
      const response = await registerUser(data)
      toast({
        title: '¡Registro exitoso!',
        description: response.message,
        className: 'uppercase'
      })
      form.reset()
      router.push('/')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        className: 'uppercase'
      })
    }
  }

  return { form, onSubmit }
}
