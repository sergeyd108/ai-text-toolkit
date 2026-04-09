import { streamText, createGateway } from 'ai'
import { z } from 'zod'
import { toolSchema } from '#server/schemas/tools'

const bodySchema = z.object({
  tool: toolSchema,
  prompt: z.string().min(1).max(50000),
  options: z.record(z.string(), z.string()).optional(),
})

export default defineLazyEventHandler(() => {
  const config = useRuntimeConfig()
  const gateway = createGateway({
    apiKey: config.aiGatewayApiKey,
  })

  return defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (data) => bodySchema.parse(data))
    const systemPrompt = await getSystemPrompt(body.tool, body.options)

    if (!systemPrompt) {
      throw createError({ statusCode: 400, message: `Unknown tool: ${body.tool}` })
    }

    const result = streamText({
      model: gateway(config.aiModel),
      system: systemPrompt,
      prompt: body.prompt,
      maxOutputTokens: 4096,
    })

    return result.toTextStreamResponse()
  })
})
