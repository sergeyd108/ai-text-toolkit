import type { ToolKey, ToolOptions } from '#server/schemas/tools'

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

function toolLabel<Tool extends ToolKey>(tool: Tool, options?: ToolOptions<Tool>): string {
  const name = findAiTool(tool)!.name
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
      id: Math.random().toString(36).slice(2),
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

  function addToolCheckpoint<Tool extends ToolKey>(
    before: string,
    after: string,
    tool: Tool,
    options?: ToolOptions<Tool>,
  ) {
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
