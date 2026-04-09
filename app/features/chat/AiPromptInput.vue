<script setup lang="ts">
import { useAiChat } from '~/features/chat/use-ai-chat'

const { chat, sendMessage } = useAiChat()
const input = ref('')
</script>

<template>
  <UChatPrompt
    v-model="input"
    placeholder="Ask a question or refine your text..."
    variant="soft"
    :maxrows="20"
    @submit="[sendMessage(input), (input = '')]"
  >
    <UChatPromptSubmit :status="chat.status" @stop="chat.stop()" @reload="chat.regenerate()" />
  </UChatPrompt>
</template>
