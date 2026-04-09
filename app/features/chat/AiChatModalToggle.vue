<script setup lang="ts">
import ChatModal from '~/features/chat/ChatModal.vue'

const overlay = useOverlay()

function openChat() {
  overlay.create(ChatModal, { destroyOnClose: true }).open()
}
</script>

<template>
  <UButton label="Chat" icon="i-lucide-message-square" color="neutral" variant="subtle" @click="openChat" />
</template>
