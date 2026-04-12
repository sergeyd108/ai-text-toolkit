import { streamText, createGateway } from 'ai'
import { z } from 'zod'
import {
  languageOptionsSchema,
  toneOptionsSchema,
  toolKeyWithoutParamsSchema,
  toolKeyWithParamsSchema,
} from '#server/schemas/tools'

const promptSchema = z.string().min(1).max(50000)
const bodySchema = z.union([
  z.object({ tool: toolKeyWithoutParamsSchema, prompt: promptSchema }),
  z.object({
    tool: toolKeyWithParamsSchema,
    options: z.union([languageOptionsSchema, toneOptionsSchema]),
    prompt: promptSchema,
  }),
])

export default defineLazyEventHandler(() => {
  const config = useRuntimeConfig()

  if (!config.aiGatewayApiKey || !config.aiModel) {
    throw createError({ statusCode: 500, message: 'AI Gateway is not configured' })
  }

  const gateway = createGateway({
    apiKey: config.aiGatewayApiKey,
  })

  return defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (data) => bodySchema.parse(data))
    const options = 'options' in body ? body.options : undefined
    const systemPrompt = await getSystemPrompt(body.tool, options)

    const result = streamText({
      model: gateway(config.aiModel),
      system: systemPrompt,
      prompt: body.prompt,
      maxOutputTokens: 4096,
      onError: () => {
        throw createError({ statusCode: 502, message: 'AI Gateway error' })
      },
    })

    return result.toTextStreamResponse()
  })
})
