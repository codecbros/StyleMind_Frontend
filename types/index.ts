import { z } from 'zod'
import { formRegisterSchema } from '@/schema/auth/registerSchema'

type Auth = z.infer<typeof formRegisterSchema>

export type FormLoginType = Pick<Auth, 'email' | 'password'>
export type FormRegisterType = z.infer<typeof formRegisterSchema>

export type Gender = {
  id: string
  name: string
}
