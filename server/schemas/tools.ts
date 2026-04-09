import { z } from 'zod'

export const toolSchema = z.enum(['chat', 'summarize', 'rewrite', 'translate', 'tone', 'grammar'])

export type ToolKey = z.infer<typeof toolSchema>
