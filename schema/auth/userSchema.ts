import { z } from 'zod'

export const userSchema = z.object({
  /*bodyDescription: z
    .string()
    .max(1000, { message: 'La descripción del cuerpo no puede tener más de 1000 caracteres.' })
    .optional(),*/
  /*profileDescription: z
    .string()
    .max(500, { message: 'La descripción del perfil no puede tener más de 500 caracteres.' })
    .optional(),*/
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
  /*birthDate: z
    .string() 
    .datetime({ message: 'Por favor, introduce una fecha de nacimiento válida.' })
    .optional(),*/
  /*profileImageUrl: z
    .string()
    .url({ message: 'El enlace de la imagen debe ser válido.' })
    .optional(),*/
  /*genderId: z.string().min(1, { message: 'Por favor, selecciona un género.' }),*/
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
  size: z.string().optional(),
  hairColor: z.string().optional(),
  skinTone: z.string().optional(),
  bodyDescription: z.string().optional(),
  profileDescription: z.string().optional(),
  genderId: z
    .string({
      message: 'El género es requerido'
    })
    .min(1, 'Por favor, selecciona un género')
})
