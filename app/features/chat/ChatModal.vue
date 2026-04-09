<script setup lang="ts">
import AiChat from '~/features/chat/AiChat.vue'

defineEmits<{ close: [] }>()
</script>

<template>
  <UModal title="Chat" fullscreen @close="$emit('close')">
    <template #body>
      <AiChat class="h-full" />
    </template>
  </UModal>
</template>
