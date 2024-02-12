import { sign, decode } from 'hono/jwt'

/**
 * Generate a JWT token
 * @param payload Generic type
 * @param secret string
 * @returns string
 */
export const generateJWT = async <T>(payload: T, secret: string): Promise<string> => {
   return sign(payload, secret)
}
