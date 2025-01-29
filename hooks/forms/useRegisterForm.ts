import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/auth.service'
import { FormRegisterType } from '@/types'
import { registerSchema } from '@/schema/userSchema'
import { useToastHandler } from '../useToastHandler'
import { useLoading } from '../useLoading'

export function useRegisterForm() {
  const { isLoading, startLoading, stopLoading } = useLoading()
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
    startLoading()
    try {
      const response = await authService.register(data)
      showSuccessToast('¡Registro exitoso!', response.message)
      form.reset()
      router.push('/auth/login')
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      stopLoading()
    }
  }

  return { form, onSubmit, isLoading }
}
