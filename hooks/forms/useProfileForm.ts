import { useRouter } from 'next/navigation'
import { useToastHandler } from '../useToastHandler'
import { useDeleteCookie } from 'cookies-next/client'
import { useAuthStore } from '@/store/auth.store'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfileSchema } from '@/schema/userSchema'
import { UpdateProfileType } from '@/types'
import { useLoading } from '../useLoading'
import { Dispatch, SetStateAction } from 'react'
import { isEqual } from '@react-hookz/deep-equal'

type authProps = {
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export function useProfileForm({ setIsEditing, isEditing }: authProps) {
  const router = useRouter()
  const deleteCookie = useDeleteCookie()
  const profile = useAuthStore(state => state.profile)
  const deleteProfile = useAuthStore(state => state.deleteProfile)
  const fetchProfile = useAuthStore(state => state.fetchProfile)
  const updateProfile = useAuthStore(state => state.updateProfile)
  const { showErrorToast, showSuccessToast } = useToastHandler()
  const { isLoading, startLoading, stopLoading } = useLoading()

  const defaultValues: UpdateProfileType = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    skinColor: profile?.skinColor || undefined,
    weight: profile?.weight ?? undefined,
    height: profile?.height ?? undefined,
    bodyDescription: profile?.bodyDescription || undefined,
    profileDescription: profile?.profileDescription || undefined,
    birthDate: profile?.birthDate || undefined,
    genderId: undefined,
    hairColor: profile?.hairColor || undefined
  }

  const form = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues
  })

  async function onSubmit(data: UpdateProfileType) {
    startLoading()

    if (isEqual(data, defaultValues)) {
      showSuccessToast('¡Cambios Guardados!', 'usuario actualizado correctamente')
      setIsEditing(false)
      return
    }

    try {
      const profileData = { ...data, genderId: undefined }
      const response = await updateProfile(profileData)
      setIsEditing(!isEditing)
      await fetchProfile()
      showSuccessToast('¡Cambios Guardados!', response)
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : 'Error al iniciar sesión')
    } finally {
      stopLoading()
    }
  }

  async function handleDeleteAccount() {
    try {
      deleteProfile()
      deleteCookie('cookie-token')
      showSuccessToast('Cuenta eliminada', 'Tu cuenta ha sido eliminada exitosamente.')
      router.push('/')
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : 'No se pudo eliminar la cuenta.')
    }
  }

  return { form, onSubmit, handleDeleteAccount, isLoading, profile }
}
