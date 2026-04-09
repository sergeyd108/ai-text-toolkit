<script setup lang="ts">
const historyStore = useHistoryStore()
</script>

<template>
  <UButton
    v-if="historyStore.checkpoints.length"
    label="Clear"
    size="xs"
    color="neutral"
    variant="ghost"
    icon="i-lucide-trash-2"
    @click="historyStore.clearHistory()"
  />
</template>
