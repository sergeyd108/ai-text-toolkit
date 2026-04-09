<script setup lang="ts">
import TimelineActions from '~/features/history/TimelineActions.vue'

type SourceIconMap = Record<CheckpointSource, string>

const sourceIcons: SourceIconMap = {
  'tool': 'i-lucide-wand-sparkles',
  'edit': 'i-lucide-pencil',
  'restore': 'i-lucide-undo-2',
  'chat': 'i-lucide-message-square',
}

const historyStore = useHistoryStore()

const items = computed(() => {
  return historyStore.checkpoints.map((checkpoint) => ({
    checkpoint,
    slot: 'checkpoint',
    icon: sourceIcons[checkpoint.source],
    title: checkpoint.label,
    description: checkpoint.after.slice(0, 80),
    timeAgo: useTimeAgo(checkpoint.timestamp).value,
  }))
})
</script>

<template>
  <UTimeline :items size="xs" color="neutral">
    <template #checkpoint-title="{ item }">
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium">{{ item.title }}</span>
        <span class="text-dimmed text-xs">{{ item.timeAgo }}</span>
        <TimelineActions :checkpoint="item.checkpoint" />
      </div>
    </template>
    <template #checkpoint-description="{ item }">
      <span class="text-muted block truncate text-xs">{{ item.description }}</span>
    </template>
  </UTimeline>
</template>
