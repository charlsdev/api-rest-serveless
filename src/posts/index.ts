import { Context, Hono } from 'hono'
import { Bindings, User } from '../types/bindings'
import { getSupabase, supabaseMiddleware } from '../supabase/config'
import { authMiddleware, decodeMiddleware, getJWT } from '../middleware/authorization'
import { Post, validatePost } from './validation'

export const posts = new Hono<{ Bindings: Bindings }>().basePath('/posts')

posts.use('*', supabaseMiddleware, authMiddleware, decodeMiddleware)

posts.post('/new', validatePost, async (c: Context) => {
   const { title, description } = await c.req.json<Post>()

   const jwtDecode: User = getJWT(c)
   const supabase = getSupabase(c)

   const { data, error } = await supabase
      .from('posts')
      .insert([
         {
            title,
            description,
            user: jwtDecode.id,
         },
      ])
      .select('*')

   if (error) return c.json({ msg: error.message }, 500)

   return c.json({ msg: 'Post creado con éxito ✅', data }, 201)
})

posts.get('/all', async (c: Context) => {
   const jwtDecode: User = getJWT(c)
   const supabase = getSupabase(c)

   const { data, error } = await supabase.from('posts').select('*').eq('user', jwtDecode.id)

   if (error) return c.json({ msg: error.message }, 500)

   return c.json({ msg: 'Posts encontrados', data }, 200)
})

posts.get('/one/:id', async (c: Context) => {
   const { id } = c.req.param()

   const jwtDecode: User = getJWT(c)
   const supabase = getSupabase(c)

   const { data, error } = await supabase.from('posts').select('*').eq('user', jwtDecode.id).eq('id', id)

   if (error) return c.json({ msg: error.message }, 500)

   if (!data.length) return c.json({ msg: 'Post no encontrado ❌', data: [] }, 404)

   return c.json({ msg: 'Post encontrado 🖇️', data }, 200)
})

posts.put('/update/:id', validatePost, async (c: Context) => {
   const { id } = c.req.param()
   const { title, description } = await c.req.json<Post>()

   const jwtDecode: User = getJWT(c)
   const supabase = getSupabase(c)

   const { data, error } = await supabase
      .from('posts')
      .update({ title, description })
      .eq('user', jwtDecode.id)
      .eq('id', id)
      .select('*')

   if (error) return c.json({ msg: error.message }, 500)

   if (!data.length) return c.json({ msg: 'Post no encontrado ❌', data: [] }, 404)

   return c.json({ msg: 'Post actualizado con éxito ✅', data }, 200)
})

posts.delete('/delete/:id', async (c: Context) => {
   const { id } = c.req.param()

   const jwtDecode: User = getJWT(c)
   const supabase = getSupabase(c)

   const { data, error } = await supabase
      .from('posts')
      .delete()
      .eq('user', jwtDecode.id)
      .eq('id', id)
      .select('*')

   if (error) return c.json({ msg: error.message }, 500)

   if (!data.length) return c.json({ msg: 'Post no encontrado ❌', data: [] }, 404)

   return c.json({ msg: 'Post eliminado con éxito ✅', data }, 200)
})
