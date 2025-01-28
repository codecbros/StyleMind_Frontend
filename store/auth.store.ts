import { authService } from '@/services/auth.service'
import { FormLoginType, LoginResponse, UpdateProfileType, UserProfile } from '@/types'
import { AxiosError } from 'axios'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AuthState = {
  role: string | null
  token: string | undefined
  profile: UserProfile | null
  loginUser: (credentials: FormLoginType) => Promise<LoginResponse>
  updateProfile: (data: UpdateProfileType) => Promise<string>
  deleteProfile: () => void
  logout: () => void
  fetchProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        role: null,
        token: undefined,
        profile: null,

        loginUser: async credentials => {
          try {
            const response = await authService.login(credentials)
            const { token, role } = response.data
            set({ token, role })
            const profile = await authService.getProfile()
            set({ profile: profile })
            return response
          } catch (error) {
            set({ role: null, token: undefined })
            throw error
          }
        },

        updateProfile: async Profiledata => {
          try {
            const response = await authService.updatedProfile(Profiledata)
            return response.message
          } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
              throw new Error(error.response?.data?.message || 'Error al actualizar el perfil')
            }
            throw error
          }
        },

        fetchProfile: async () => {
          try {
            const profile = await authService.getProfile()
            set({ profile: profile })
          } catch (error) {
            throw error
          }
        },

        deleteProfile: async () => {
          try {
            await authService.deleteUser()
            set({ role: null, token: undefined, profile: null })
          } catch (error) {
            throw error
          }
        },

        logout: () => set({ role: null, token: undefined })
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)
