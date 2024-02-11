import { SupabaseClient } from '@supabase/supabase-js'
import { RegisterUser } from '../utils/validation'

/**
 * Función para registrar un usuario
 * @param supabase SupabaseClient
 * @param user RegisterUser
 * @returns { msg: string, data: RegisterUser | null }
 */
export const registerUser = async (
   supabase: SupabaseClient,
   user: RegisterUser,
): Promise<{ msg: string; data: RegisterUser | null }> => {
   const { data, error } = await supabase.from('users').insert([user]).select()

   if (error) return { msg: error.message, data: null }

   return { msg: 'Usuario registrado con éxito ✅', data: data[0] }
}

/**
 * Función para verificar si un usuario ya existe
 * @param supabase SupabaseClient
 * @param email string
 * @returns { msg?: string, data: RegisterUser | null }
 */
export const verifyUser = async (
   supabase: SupabaseClient,
   email: string,
): Promise<{ msg?: string; data: RegisterUser[] | null }> => {
   const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)

   if (error) return { msg: error.message, data: null }

   return { data }
}
