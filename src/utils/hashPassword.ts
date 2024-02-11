import argon2 from 'argon2';

/**
 * Encripta la contraseña
 * @param plainPass string
 * @returns string
 */
export const encryptPassword = async (plainPass: string) => {
   return await argon2.hash(plainPass);
};

/**
 * Verifica si la contraseña es correcta
 * @param hashPass string
 * @param plainPass string
 * @returns boolean
 */
export const verifyPassword = async (hashPass: string, plainPass: string) => {
   return await argon2.verify(hashPass, plainPass);
};