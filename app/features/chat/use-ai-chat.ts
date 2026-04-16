import { Chat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import type { ChatRequestBody } from '#server/schemas/chat'

type ChatTransportBody = Omit<ChatRequestBody, 'messages'>

const API_ENDPOINT = '/api/ai/chat'

export const useAiChat = createSharedComposable(() => {
  const editorStore = useEditorStore()
  const chat = new Chat({
    transport: new DefaultChatTransport({
      api: API_ENDPOINT,
      body: (): ChatTransportBody => ({ tool: 'chat', options: { context: editorStore.content } }),
    }),
  })

  function sendMessage(text: string) {
    if (!text.trim()) return
    return chat.sendMessage({ text })
  }

  return { chat, sendMessage }
})
