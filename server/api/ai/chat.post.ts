import { streamText, createGateway, convertToModelMessages, safeValidateUIMessages } from 'ai'
import { chatRequestBodySchema } from '#server/schemas/chat'

export default defineLazyEventHandler(() => {
  const config = useRuntimeConfig()

  if (!config.aiGatewayApiKey || !config.aiModel) {
    console.error('[chat] AI Gateway is not configured')
    throw createError({ statusCode: 500, message: 'AI Gateway is not configured' })
  }

  const gateway = createGateway({
    apiKey: config.aiGatewayApiKey,
  })

  return defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, (data) => chatRequestBodySchema.parse(data))
    const systemPrompt = await getSystemPrompt(body.tool, body.options)
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
      onError: ({ error }) => {
        console.error('[chat] AI Gateway stream error:', error)
        throw createError({ statusCode: 502, message: 'AI Gateway error' })
      },
    })

    return result.toUIMessageStreamResponse()
  })
})
