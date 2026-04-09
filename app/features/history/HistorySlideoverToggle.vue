<script setup lang="ts">
import HistorySlideover from '~/features/history/HistorySlideover.vue'

const overlay = useOverlay()
const historyStore = useHistoryStore()

function openHistory() {
  overlay.create(HistorySlideover, { destroyOnClose: true }).open()
}
</script>

<template>
  <UButton
    v-if="historyStore.checkpoints.length"
    label="History"
    icon="i-lucide-clock"
    color="neutral"
    variant="subtle"
    @click="openHistory"
  />
</template>
