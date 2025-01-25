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
            set({ profile: profile.data })
            return response
          } catch (error) {
            set({ role: null, token: undefined })
            throw error
          }
        },

        updateProfile: async Profiledata => {
          try {
            const { message } = await authService.updatedProfile(Profiledata)
            return message
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
            set({ profile: profile.data })
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
