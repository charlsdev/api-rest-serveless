import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

export const postSchema = z.object({
   id: z.number().optional(),
   title: z.string(),
   description: z.string(),
   created_at: z.string().optional(),
})

export type Post = z.infer<typeof postSchema>
export const validatePost = zValidator('json', postSchema)
