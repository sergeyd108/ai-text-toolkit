import { Chat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'

const API_ENDPOINT = '/api/ai/chat'

export const useAiChat = createSharedComposable(() => {
  const editorStore = useEditorStore()
  const chat = new Chat({
    transport: new DefaultChatTransport({
      api: API_ENDPOINT,
      body: () => ({ tool: 'chat', context: editorStore.content }),
    }),
  })

  function sendMessage(text: string) {
    if (!text.trim()) return
    return chat.sendMessage({ text })
  }

  return { chat, sendMessage }
})
