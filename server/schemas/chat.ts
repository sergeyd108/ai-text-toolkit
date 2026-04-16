import { z } from 'zod'

export const chatKeySchema = z.literal('chat')
export type ChatKey = z.infer<typeof chatKeySchema>

export const chatOptionsSchema = z.object({ context: z.string() })
export type ChatOptions = z.infer<typeof chatOptionsSchema>

export const chatRequestBodySchema = z.object({
  tool: chatKeySchema,
  messages: z.unknown(),
  options: chatOptionsSchema.optional(),
})
export type ChatRequestBody = z.infer<typeof chatRequestBodySchema>
