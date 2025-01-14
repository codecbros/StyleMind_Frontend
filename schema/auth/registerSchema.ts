import { z } from 'zod'

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
  genderId: z
    .string({
      message: 'El género es requerido'
    })
    .min(1, 'Por favor, selecciona un género')
})
