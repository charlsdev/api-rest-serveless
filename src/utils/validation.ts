import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

// Schema para validar el body de la petición
export const registerSchema = z.object({
   id: z.number().optional(),
   firstname: z.string(),
   lastname: z.string(),
   gender: z.enum(['M', 'F', 'O']),
   birthdate: z.string(),
   email: z.string().email(),
   password: z.string().min(10),
})

export type RegisterUser = z.infer<typeof registerSchema> // Interface para el tipo de dato que se espera
export const validateRegister = zValidator('json', registerSchema) // Middleware para validar el body de la petición

export const loginSchema = z.object({
   email: z.string().email(),
   password: z.string(),
})

export type LoginUser = z.infer<typeof loginSchema>
export const validateLogin = zValidator('json', loginSchema)
