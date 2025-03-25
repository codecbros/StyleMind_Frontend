import { z } from 'zod';

export const wardrobeItemSchema = z.object({
  // Imágenes de la prenda (mínimo 1 y máximo 4)
  images: z
    .array(
      z.object({
        path: z.string(),
        relativePath: z.string(),
        preview: z.string(),
      })
    )
    .min(1, { message: 'Se requiere al menos una imagen' })
    .max(4, { message: 'Se permite un máximo de 4 imágenes' }),

  // Información de la prenda
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(100, { message: 'El nombre no puede exceder 100 caracteres' }),
  description: z.string().nonempty({ message: 'La descripción es obligatoria' }),
  season: z.string().nonempty({ message: 'La temporada es obligatoria' }),
  primaryColor: z.string().nonempty({ message: 'El color principal es obligatorio' }),
  secondaryColor: z.string().optional(), // Opcional
  style: z.string().nonempty({ message: 'El estilo es obligatorio' }),
  material: z.string().optional(), // Opcional
  size: z.string().nonempty({ message: 'La talla es obligatoria' }),

  // Categoría (solo se puede seleccionar una)
  categoryId: z.string().nonempty({ message: 'Debe seleccionarse una categoría' }),
});
