<script setup lang="ts">
import HistoryTimeline from '~/features/history/HistoryTimeline.vue'
import ClearHistoryButton from '~/features/history/ClearHistoryButton.vue'

defineEmits<{ close: [] }>()
</script>

<template>
  <USlideover side="right" :ui="{ header: 'justify-between' }" class="max-w-xl" @close="$emit('close')">
    <template #title>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-history" class="text-primary size-4" />
        <span class="font-semibold">History</span>
      </div>
    </template>

    <template #actions>
      <ClearHistoryButton class="mr-8" @click="$emit('close')" />
    </template>

    <template #body>
      <HistoryTimeline />
    </template>
  </USlideover>
</template>
