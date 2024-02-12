import { type SupabaseClient, createClient } from '@supabase/supabase-js'
import { Context, MiddlewareHandler } from 'hono'

export const idTokenContext = 'supabase' // Nombre del contexto para guardar el cliente de supabase

/**
 * Middleware para inicializar el cliente de supabase
 * @param c: Context
 * @param next: MiddlewareHandler
 * @returns Promise<void>
 */
export const supabaseMiddleware: MiddlewareHandler = async (c, next) => {
   try {
      const BASE_URL = process.env.SUPABASE_URL
      const BASE_KEY = process.env.SUPABASE_KEY

      if (!BASE_URL) return c.json({ msg: 'SUPABASE_URL debe ser declarado como variable de env' }, 500)
      if (!BASE_KEY) return c.json({ msg: 'SUPABASE_KEY debe ser declarado como variable de env' }, 500)

      // Si ya existe el cliente de supabase, entonces no lo inicializamos
      if (getSupabase(c)) return next()

      // Inicializamos el cliente de supabase
      const supabase = createClient(BASE_URL, BASE_KEY)
      c.set(idTokenContext, supabase) // Lo guardamos en el contexto

      await next()
   } catch (e: unknown) {
      return c.json({ msg: (e as Error).message }, 500)
   }
}

/**
 * Función para obtener el cliente de supabase
 * @param c: Context
 * @returns SupabaseClient
 */
export const getSupabase = (c: Context): SupabaseClient => c.get(idTokenContext) // Obtenemos el cliente de supabase del contexto
