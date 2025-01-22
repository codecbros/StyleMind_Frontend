import { z } from 'zod'
import { formRegisterSchema } from '@/schema/auth/registerSchema'
import { userSchema } from '@/schema/auth/userSchema'

type Auth = z.infer<typeof formRegisterSchema>

export type FormLoginType = Pick<Auth, 'email' | 'password'>
export type FormRegisterType = z.infer<typeof formRegisterSchema>
export type UserSchemaType = z.infer<typeof userSchema>

export type Gender = {
  id: string
  name: string
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
