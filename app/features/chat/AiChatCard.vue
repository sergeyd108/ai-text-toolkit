<script setup lang="ts">
import AiChat from '~/features/chat/AiChat.vue'
</script>

<template>
  <UCard :ui="{ body: 'flex-1 flex flex-col min-h-0 overflow-hidden !p-0' }" class="flex flex-col overflow-hidden">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-message-square" class="text-primary size-4" />
        <span class="text-sm font-semibold">Chat</span>
      </div>
    </template>

    <AiChat class="h-full min-h-0 flex-1" />
  </UCard>
</template>
