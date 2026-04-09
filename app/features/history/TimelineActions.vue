<script setup lang="ts">
import DiffModal from './DiffModal.vue'

defineProps<{ checkpoint: CheckpointDto }>()

const overlay = useOverlay()
const editorStore = useEditorStore()
const historyStore = useHistoryStore()

function openDiff(checkpointId: string) {
  const modal = overlay.create(DiffModal, { destroyOnClose: true })
  modal.open({ checkpointId })
}

function restoreCheckpoint(checkpoint: CheckpointDto) {
  if (checkpoint.before === editorStore.content) return
  const before = editorStore.content
  editorStore.content = checkpoint.before
  historyStore.addRestoreCheckpoint(before, checkpoint.before)
}
</script>

<template>
  <div class="ml-auto flex items-center gap-0.5">
    <UTooltip text="View diff">
      <UButton size="xs" color="neutral" variant="ghost" icon="i-lucide-eye" @click="openDiff(checkpoint.id)" />
    </UTooltip>
    <UTooltip text="Restore">
      <UButton
        size="xs"
        color="neutral"
        variant="ghost"
        icon="i-lucide-undo-2"
        :disabled="checkpoint.before === editorStore.content"
        @click="restoreCheckpoint(checkpoint)"
      />
    </UTooltip>
    <UTooltip text="Delete">
      <UButton
        size="xs"
        color="neutral"
        variant="ghost"
        icon="i-lucide-trash-2"
        @click="historyStore.deleteCheckpoint(checkpoint.id)"
      />
    </UTooltip>
  </div>
</template>
