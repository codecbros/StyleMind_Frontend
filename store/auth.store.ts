import { authService } from '@/services/auth.service'
import { FormLoginType, UserProfile } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type AuthState = {
  role: string | null
  token: string | undefined
  profile: UserProfile | null
  loginUser: (credentials: FormLoginType) => Promise<void>
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
          } catch (error) {
            set({ role: null, token: undefined })
            throw error
          }
        },

        fetchProfile: async () => {
          try {
            const profile = await authService.getProfile()
            console.log(profile)
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
