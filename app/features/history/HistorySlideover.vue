<script setup lang="ts">
import HistoryTimeline from '~/features/history/HistoryTimeline.vue'
import ClearHistoryButton from '~/features/history/ClearHistoryButton.vue'

defineEmits<{ close: [] }>()
</script>

<template>
  <USlideover title="History" side="right" class="max-w-xl" @close="$emit('close')">
    <template #header>
      <ClearHistoryButton class="ml-auto" @click="$emit('close')" />
    </template>
    <template #body>
      <HistoryTimeline />
    </template>
  </USlideover>
</template>
