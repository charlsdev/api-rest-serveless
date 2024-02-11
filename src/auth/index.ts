import { Hono, Context } from "hono"
import { sign } from "hono/jwt"
import { getSupabase, supabaseMiddleware } from "../supabase/config"
import { Bindings } from "../types/bindings"
import {
   LoginUser,
   RegisterUser,
   validateLogin,
   validateRegister,
} from "../utils/validation"
import { encryptPassword, verifyPassword } from "../utils/hashPassword"
import { registerUser, verifyUser } from "./service"

export const auth = new Hono<{ Bindings: Bindings }>().basePath("/auth")

auth.use("*", supabaseMiddleware)

auth.post("/login", validateLogin, async (c: Context) => {
   const { email, password } = await c.req.json<LoginUser>()

   const supabase = getSupabase(c)
   const verify = await verifyUser(supabase, email)

   if (!verify.data) return c.json({ msg: verify.msg, data: null }, 500)

   if (verify.data.length) {
      const data = verify.data[0]
      const isPasswordValid = await verifyPassword(data.password, password)

      if (isPasswordValid) {
         const payload = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
         }

         const token = await sign(payload, process.env.JWT_SECRET as string)

         return c.json(
            {
               msg: "Inicio de sesión exitoso ✅",
               data: token
            },
            200
         )
      }
   }

   return c.json({ msg: "Credenciales incorrectas ❌", data: null }, 401)
})

auth.post("/register", validateRegister, async (c: Context) => {
   const body = await c.req.json<RegisterUser>()
   body.password = await encryptPassword(body.password)

   const supabase = getSupabase(c)
   const register = await registerUser(supabase, body)

   return c.json(
      {
         msg: register.msg,
         data: register.data,
      },
      register.data ? 200 : 500
   )
})
