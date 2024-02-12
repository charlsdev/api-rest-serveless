import { Context, MiddlewareHandler } from 'hono'
import { decode, jwt } from 'hono/jwt'

export const idTokenContext = 'jwt' // Nombre del contexto para guardar el token de jwt

/**
 * Middleware para inicializar el token de jwt
 * @param c Context
 * @param next MiddlewareHandler
 * @returns Promise<void>
 */
export const authMiddleware: MiddlewareHandler = async (c, next) => {
   try {
      const token = c.req.header('Authorization')?.split(' ')[1]
      if (!token) return c.json({ msg: 'No se ha proporcionado un token 🚫' }, 401)

      const JWT_SECRET = process.env.JWT_SECRET
      if (!JWT_SECRET) return c.json({ msg: 'Error al procesar el token 🤯' }, 500)

      // Inicializamos el middleware de jwt
      const jwtMiddleware = jwt({ secret: JWT_SECRET })

      // Ejecutamos el middleware de jwt
      return jwtMiddleware(c, next)
   } catch (e: unknown) {
      return c.json({ msg: (e as Error).message }, 401)
   }
}

/**
 * Middleware para decodificar el token de jwt
 * @param c Context
 * @param next MiddlewareHandler
 * @returns Promise<void>
 */
export const decodeMiddleware: MiddlewareHandler = async (c, next) => {
   try {
      const token = c.req.header('Authorization')?.split(' ')[1]
      if (!token) return c.json({ msg: 'No se ha proporcionado un token 🚫' }, 401)

      // Decodificamos el token
      const decoded = decode(token)

      if (!decoded) return c.json({ msg: 'Token inválido 🚫' }, 401)
      c.set(idTokenContext, decoded.payload) // Lo guardamos en el contexto

      return next()
   } catch (e: unknown) {
      return c.json({ msg: (e as Error).message }, 401)
   }
}

/**
 * Función para obtener el token de jwt
 * @param c Context
 * @returns User
 */
export const getJWT = (c: Context) => c.get(idTokenContext) // Obtenemos el token del contexto
