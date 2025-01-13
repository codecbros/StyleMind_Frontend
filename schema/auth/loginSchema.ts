import { z } from 'zod'

export const formLoginSchema = z.object({
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
    })
})
