import { GenderOption } from '@/types/types'
import { z } from 'zod'

export const GENDER_OPTIONS: GenderOption[] = [
  { genderId: 'cm5q67ghi0001cu21w3bn7mhs', name: 'Hombre' },
  { genderId: 'cm5q68hft0004cu218yqqky5o', name: 'Mujer' },
  { genderId: 'cm5q69y4j0003cu21kn4qhmoy', name: 'Prefiero no decirlo' }
]

export const formRegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: 'El nombre debe tener al menos 2 caracteres.'
    })
    .max(50, {
      message: 'El nombre no puede tener más de 50 caracteres.'
    })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El nombre solo puede contener letras y espacios.'
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'El apellido debe tener al menos 2 caracteres.'
    })
    .max(50, {
      message: 'El apellido no puede tener más de 50 caracteres.'
    })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El apellido solo puede contener letras y espacios.'
    }),
  email: z.string().email({
    message: 'Por favor, introduce un email válido.'
  }),
  password: z
    .string()
    .min(6, {
      message:
        'La contraseña debe tener al menos 6 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 símbolo.'
    })
    .regex(/[a-z]/, {
      message: 'La contraseña debe incluir al menos una letra minúscula.'
    })
    .regex(/[A-Z]/, {
      message: 'La contraseña debe incluir al menos una letra mayúscula.'
    })
    .regex(/\d/, {
      message: 'La contraseña debe incluir al menos un número.'
    })
    .regex(/[@$!%*?&]/, {
      message: 'La contraseña debe incluir al menos un símbolo especial (@, $, !, %, *, ?, &).'
    }),
  genderId: z.string().refine(value => GENDER_OPTIONS.some(option => option.genderId === value), {
    message: 'Por favor, selecciona una opción válida.'
  })
})
