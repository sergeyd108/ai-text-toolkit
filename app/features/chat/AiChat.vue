<script setup lang="ts">
import AiChatMessages from '~/features/chat/AiChatMessages.vue'
import AiPromptInput from '~/features/chat/AiPromptInput.vue'
import { useAiChat } from '~/features/chat/use-ai-chat'

const { chat } = useAiChat()
</script>

<template>
  <div class="relative flex flex-col">
    <div class="min-h-0 flex-1 overflow-y-auto pt-4">
      <AiChatMessages />
    </div>
    <div class="shrink-0 px-4 pt-2 pb-4">
      <UAlert
        v-if="chat.error"
        :description="chat.error.message"
        icon="i-lucide-alert-circle"
        color="error"
        variant="subtle"
        title="Error"
        class="mb-2"
      />
      <AiPromptInput />
    </div>
  </div>
</template>
