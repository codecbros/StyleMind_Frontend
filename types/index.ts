import { z } from 'zod'
import { loginSchema, registerSchema, updateProfileSchema } from '@/schema/userSchema'

// **Inferencia de Zod Schemas**
export type FormLoginType = z.infer<typeof loginSchema>
export type FormRegisterType = z.infer<typeof registerSchema>
export type UpdateProfileType = z.infer<typeof updateProfileSchema>

// **Tipo genérico para respuestas de API**
export type ApiResponse<T> = {
  data: T
  message: string
  statusCode: number
}

export type FilesType = File & {
  path: string
  relativePath: string
  preview: string
}

// **Género del usuario**
export type Gender = {
  id: string
  name: string
}

// **Perfil del usuario**
export interface UserProfile {
  email: string
  firstName: string
  lastName: string
  birthDate: string | null
  profilePicture: string | null
  bodyDescription: string | null
  profileDescription: string | null
  weight: number | null
  height: number | null
  gender: Gender
  skinColor: string | null
  hairColor: string | null
}

// **Respuestas de API específicas**
export type LoginResponse = ApiResponse<{
  token: string
  role: string
}>

export type GetProfileResponse = ApiResponse<UserProfile>

export type UpdateProfileResponse = ApiResponse<null> // Reutiliza el genérico

// **Props reutilizables**
export type SkinTonePickerProps = {
  value: string | undefined
  onChange: (value: string) => void
}

export type ProtectedRoute = {
  path: string
  redirectTo: string
}

// Tipo para cada categoría
export type Category = {
  id: string
  name: string
  description: string | null
}

// Tipo para la respuesta completa de la API
export type CategoriesApiResponse = {
  statusCode: number
  message: string
  data: Category[]
}

export type ClothingItem = {
  name: string
  description: string
  season: string
  primaryColor: string
  secondaryColor: string
  style: string
  material: string
  size: string
  categoriesId: string[]
}
