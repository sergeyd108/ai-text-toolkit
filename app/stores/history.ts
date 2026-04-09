import type { ToolKey } from '#server/schemas/tools'
import { findTool } from '~/features/editor/ai-tools'

export type CheckpointSource = 'tool' | 'edit' | 'restore' | 'chat'

export type CheckpointDto = {
  id: string
  label: string
  before: string
  after: string
  timestamp: number
  source: CheckpointSource
}

type AddCheckpointDto = Omit<CheckpointDto, 'id' | 'timestamp'>

const MAX_CHECKPOINTS = 50

function toolLabel(tool: ToolKey, options?: Record<string, string>): string {
  const name = findTool(tool)!.name
  const detail = options ? Object.values(options)[0] : undefined
  return detail ? `${name}: ${detail}` : name
}

export const useHistoryStore = defineStore('history', () => {
  const checkpoints = ref<CheckpointDto[]>([])

  function getCheckpoint(id: string) {
    return checkpoints.value.find((c) => c.id === id)
  }

  function addCheckpoint(data: AddCheckpointDto) {
    if (data.before === data.after) return

    const checkpoint = {
      ...data,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    } satisfies CheckpointDto

    checkpoints.value = [checkpoint, ...checkpoints.value].slice(0, MAX_CHECKPOINTS)
  }

  function addEditCheckpoint(before: string, after: string) {
    addCheckpoint({
      before,
      after,
      source: 'edit',
      label: 'Manual edit',
    })
  }

  function addChatCheckpoint(before: string, after: string) {
    addCheckpoint({
      before,
      after,
      source: 'chat',
      label: 'Chat applied',
    })
  }

  function addRestoreCheckpoint(before: string, after: string) {
    addCheckpoint({
      before,
      after,
      source: 'restore',
      label: 'Restored',
    })
  }

  function addToolCheckpoint(before: string, after: string, tool: ToolKey, options?: Record<string, string>) {
    addCheckpoint({
      before,
      after,
      source: 'tool',
      label: toolLabel(tool, options),
    })
  }

  function deleteCheckpoint(id: string) {
    checkpoints.value = checkpoints.value.filter((c) => c.id !== id)
  }

  function clearHistory() {
    checkpoints.value = []
  }

  return {
    checkpoints,
    getCheckpoint,
    addEditCheckpoint,
    addChatCheckpoint,
    addRestoreCheckpoint,
    addToolCheckpoint,
    deleteCheckpoint,
    clearHistory,
  }
})
