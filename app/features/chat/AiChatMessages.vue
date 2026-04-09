<script setup lang="ts">
import { isTextUIPart } from 'ai'
import AiMessageActions from '~/features/chat/AiMessageActions.vue'
import { useAiChat } from '~/features/chat/use-ai-chat'

const { chat } = useAiChat()
</script>

<template>
  <UChatMessages
    :messages="chat.messages"
    :status="chat.status"
    :assistant="{ variant: 'soft', icon: 'i-lucide-bot' }"
    :user="{ side: 'right', variant: 'soft' }"
    :auto-scroll="{ color: 'neutral', variant: 'outline' }"
  >
    <template #content="{ message }">
      <template v-for="(part, index) in message.parts" :key="`${message.id}-${part.type}-${index}`">
        <MarkdownContent v-if="isTextUIPart(part)" :content="part.text" />
      </template>
    </template>
    <template #actions="{ message }">
      <AiMessageActions :message />
    </template>
  </UChatMessages>
</template>
