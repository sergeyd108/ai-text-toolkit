import { z } from 'zod'

export const toolKeyWithoutParamsSchema = z.enum(['summarize', 'rewrite', 'grammar'])
export type ToolKeyWithoutParams = z.infer<typeof toolKeyWithoutParamsSchema>

export const toolKeyWithParamsSchema = z.enum(['translate', 'tone'])
export type ToolKeyWithParams = z.infer<typeof toolKeyWithParamsSchema>

export const toolKeySchema = z.union([toolKeyWithoutParamsSchema, toolKeyWithParamsSchema])
export type ToolKey = z.infer<typeof toolKeySchema>

export const languageOptionsSchema = z.object({ language: z.string() })
export type LanguageOptions = z.infer<typeof languageOptionsSchema>

export const toneOptionsSchema = z.object({ tone: z.string() })
export type ToneOptions = z.infer<typeof toneOptionsSchema>

export type ToolOptions<Key extends ToolKey> = Key extends 'translate'
  ? LanguageOptions
  : Key extends 'tone'
    ? ToneOptions
    : never
