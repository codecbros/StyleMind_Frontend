import { z } from 'zod'

export const wardrobeItemSchema = z.object({
  // Imágenes de la prenda (mínimo 1 y máximo 4)
  images: z
    .array(
      z.object({
        path: z.string(),
        relativePath: z.string(),
        preview: z.string()
      })
    )
    .min(1, { message: 'At least one image is required' })
    .max(4, { message: 'A maximum of 4 images are allowed' }),

  // Información básica de la prenda
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }).max(100),
  category: z.string().nonempty({ message: 'Category is required' }), // Ej: tops, bottoms, outerwear, etc.
  size: z.string().nonempty({ message: 'Size is required' }),
  brand: z.string().optional(), // Opcional, ya que no todas las prendas tienen marca conocida
  material: z.string().optional(),
  style: z.enum(['casual', 'formal', 'sporty', 'bohemian', 'vintage', 'modern']).or(z.string().nonempty({ message: 'Style is required' })),
  climate: z.string().optional(), // Por ejemplo: summer, winter, etc.
  description: z.string().optional(),

  // Opciones adicionales para enriquecer la información personal:
  color: z.string().optional(), // Color principal de la prenda
  purchaseDate: z.string().optional(), // Fecha de compra (podrías transformarla a Date en otro paso)
  condition: z.enum(['new', 'good', 'worn', 'needs repair']).optional(), // Estado de la prenda
  notes: z.string().optional() // Notas personales, por ejemplo, cuándo se usó por última vez o ideas para combinarla
})
