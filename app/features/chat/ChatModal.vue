<script setup lang="ts">
import AiChat from '~/features/chat/AiChat.vue'

defineEmits<{ close: [] }>()
</script>

<template>
  <UModal fullscreen @close="$emit('close')">
    <template #title>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-message-square" class="text-primary size-4" />
        <span class="text-sm font-semibold">Chat</span>
      </div>
    </template>

    <template #body>
      <AiChat class="h-full" />
    </template>
  </UModal>
</template>
