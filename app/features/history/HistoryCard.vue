<script setup lang="ts">
import HistoryTimeline from '~/features/history/HistoryTimeline.vue'
import ClearHistoryButton from '~/features/history/ClearHistoryButton.vue'

const historyStore = useHistoryStore()
</script>

<template>
  <UCard
    class="flex flex-col"
    :ui="{
      body: 'flex grow flex-col overflow-auto p-0!',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <span class="font-semibold">History</span>
        <ClearHistoryButton />
      </div>
    </template>

    <div v-if="!historyStore.checkpoints.length" class="text-muted p-6 text-sm">No history yet</div>
    <div v-else class="overflow-y-auto p-6">
      <HistoryTimeline />
    </div>
  </UCard>
</template>
