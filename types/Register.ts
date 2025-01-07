import { z } from 'zod'
import { formSchema } from '@/schema/auth/registerSchema'

export type FormRegisterType = z.infer<typeof formSchema>
