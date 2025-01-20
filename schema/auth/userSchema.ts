import { z } from 'zod'

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El nombre solo puede contener letras y espacios.'
    }),
  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El apellido no puede tener más de 50 caracteres.' })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, {
      message: 'El apellido solo puede contener letras y espacios.'
    }),
  skinTone: z.string().optional(),

  weight: z
    .number()
    .nonnegative({ message: 'El peso debe ser un número positivo.' })
    .max(500, { message: 'Por favor, introduce un peso menor a 500 kg.' })
    .optional(),
  height: z
    .number()
    .nonnegative({ message: 'La altura debe ser un número positivo.' })
    .max(500, { message: 'Por favor, introduce una altura menor a 500 cm.' })
    .optional(),

  hairColor: z.string().optional(),
  bodyDescription: z.string().optional(),
  profileDescription: z.string().optional(),
  birthDate: z.string().optional(),
  genderName: z
    .string({
      message: 'El género es requerido'
    })
    .min(1, 'Por favor, selecciona un género')
    .optional()
})
