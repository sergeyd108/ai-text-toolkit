import { streamText, createGateway, convertToModelMessages, safeValidateUIMessages } from 'ai'
import { z } from 'zod'
import { toolSchema } from '#server/schemas/tools'

const bodySchema = z.object({
  tool: toolSchema,
  messages: z.unknown(),
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

    const validationResult = await safeValidateUIMessages({ messages: body.messages })

    if (!validationResult.success) {
      throw createError({ statusCode: 400, message: 'Invalid messages' })
    }

    const modelMessages = await convertToModelMessages(validationResult.data)

    const result = streamText({
      model: gateway(config.aiModel),
      system: systemPrompt,
      messages: modelMessages,
      maxOutputTokens: 4096,
    })

    return result.toUIMessageStreamResponse()
  })
})
