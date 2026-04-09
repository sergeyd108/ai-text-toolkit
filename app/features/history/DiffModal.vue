<script setup lang="ts">
import DiffView from '~/features/history/DiffView.vue'

const { checkpointId } = defineProps<{ checkpointId: string }>()
const emit = defineEmits<{ close: [] }>()

const isMobile = useMediaQuery('(max-width: 1023px)')
const historyStore = useHistoryStore()
const checkpoint = computed(() => historyStore.getCheckpoint(checkpointId))
</script>

<template>
  <UModal
    title="Diff view"
    :fullscreen="isMobile"
    :ui="isMobile ? {} : { content: 'max-w-[90vw] w-[90vw] max-h-[85vh]', body: 'overflow-auto' }"
    @close="emit('close')"
  >
    <template #body>
      <DiffView v-if="checkpoint" :checkpoint :format="isMobile ? 'line-by-line' : 'side-by-side'" />
    </template>
  </UModal>
</template>
