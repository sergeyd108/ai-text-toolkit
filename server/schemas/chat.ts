import { z } from 'zod'

export const chatKeySchema = z.literal('chat')
export type ChatKey = z.infer<typeof chatKeySchema>

export const chatOptionsSchema = z.object({ context: z.string() })
export type ChatOptions = z.infer<typeof chatOptionsSchema>
