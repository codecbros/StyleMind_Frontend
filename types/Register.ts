import { formRegisterSchema } from '@/schema/auth/registerSchema'
import { z } from 'zod'

export type FormRegisterType = z.infer<typeof formRegisterSchema>
