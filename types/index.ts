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
