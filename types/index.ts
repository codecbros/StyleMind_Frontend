import { z } from 'zod'

import { loginSchema, registerSchema, updateProfileSchema } from '@/schema/userSchema'

export type FormLoginType = z.infer<typeof loginSchema>
export type FormRegisterType = z.infer<typeof registerSchema>
export type UpdateProfileType = z.infer<typeof updateProfileSchema>

export type Gender = {
  id: string
  name: string
}

export type LoginResponse = {
  data: {
    token: string
    role: string
  }
  message: string
}

export type SkinTonePickerProps = {
  value: string | undefined
  onChange: (value: string) => void
}
export type UserProfile = {
  email: string
  firstName: string
  lastName: string
  birthDate: string | null
  profilePicture: string | null
  bodyDescription: string | null
  profileDescription: string | null
  weight: number | null
  height: number | null
  gender: Gender
  skinColor: string | null
  hairColor: string | null
}

export type ProtectedRoute = {
  path: string
  redirectTo: string
}
