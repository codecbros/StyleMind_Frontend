import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FormLoginType } from '@/types'
import { useAuthStore } from '@/store/auth.store'
import { loginSchema } from '@/schema/userSchema'
import { useToastHandler } from '../useToastHandler'
import { useSetCookie } from 'cookies-next/client'
import { useLoading } from '../useLoading'

export function useLoginForm() {
  const loginUser = useAuthStore(state => state.loginUser)
  const router = useRouter()
  const setCookie = useSetCookie()
  const { isLoading, startLoading, stopLoading } = useLoading()
  const { showErrorToast, showSuccessToast } = useToastHandler()

  const form = useForm<FormLoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormLoginType) {
    startLoading()
    try {
      const response = await loginUser(data)
      setCookie('cookie-token', response.data.token)
      showSuccessToast('¡Ingreso Exitoso!', response.message)
      router.push('/dashboard/perfil')
    } catch (error: any) {
      showErrorToast(error.message)
    } finally {
      stopLoading()
    }
  }

  return { form, onSubmit, isLoading }
}
