import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useHistoryStore } from './history'

describe('useHistoryStore', () => {
  let store: ReturnType<typeof useHistoryStore>

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useHistoryStore()
  })

  it('starts with empty checkpoints', () => {
    expect(store.checkpoints).toEqual([])
  })

  it('generates id and timestamp for each checkpoint', () => {
    store.addEditCheckpoint('before', 'after')
    const cp = store.checkpoints[0]!

    expect(cp.id).toBeTypeOf('string')
    expect(cp.id.length).toBeGreaterThan(0)
    expect(cp.timestamp).toBeTypeOf('number')
    expect(cp.timestamp).toBeGreaterThan(0)
  })

  it('creates a checkpoint with addEditCheckpoint', () => {
    store.addEditCheckpoint('before', 'after')
    const cp = store.checkpoints[0]!

    expect(store.checkpoints).toHaveLength(1)
    expect(cp.source).toBe('edit')
    expect(cp.label).toBe('Manual edit')
    expect(cp.before).toBe('before')
    expect(cp.after).toBe('after')
  })

  it('creates a checkpoint with addChatCheckpoint', () => {
    store.addChatCheckpoint('before', 'after')
    const cp = store.checkpoints[0]!

    expect(store.checkpoints).toHaveLength(1)
    expect(cp.source).toBe('chat')
    expect(cp.label).toBe('Chat applied')
    expect(cp.before).toBe('before')
    expect(cp.after).toBe('after')
  })

  it('creates a checkpoint with addRestoreCheckpoint', () => {
    store.addRestoreCheckpoint('before', 'after')
    const cp = store.checkpoints[0]!

    expect(store.checkpoints).toHaveLength(1)
    expect(cp.source).toBe('restore')
    expect(cp.label).toBe('Restored')
    expect(cp.before).toBe('before')
    expect(cp.after).toBe('after')
  })

  it('skips checkpoint when before equals after', () => {
    store.addEditCheckpoint('same', 'same')
    expect(store.checkpoints).toHaveLength(0)
  })

  it('formats tool label with language option', () => {
    store.addToolCheckpoint('before', 'after', 'translate', { language: 'Russian' })
    const cp = store.checkpoints[0]!
    expect(cp.label).toBe('Translate: Russian')
    expect(cp.source).toBe('tool')
  })

  it('formats tool label with tone option', () => {
    store.addToolCheckpoint('before', 'after', 'tone', { tone: 'Formal' })
    const cp = store.checkpoints[0]!
    expect(cp.label).toBe('Change Tone: Formal')
    expect(cp.source).toBe('tool')
  })

  it('formats tool label without options', () => {
    store.addToolCheckpoint('before', 'after', 'summarize')
    expect(store.checkpoints[0]!.label).toBe('Summarize')
  })

  it('prepends newest checkpoints first', () => {
    store.addEditCheckpoint('a', 'b')
    store.addEditCheckpoint('c', 'd')
    expect(store.checkpoints[0]!.before).toBe('c')
    expect(store.checkpoints[1]!.before).toBe('a')
  })

  it('enforces MAX_CHECKPOINTS limit of 50', () => {
    for (let i = 0; i < 55; i++) {
      store.addEditCheckpoint(`before-${i}`, `after-${i}`)
    }

    expect(store.checkpoints).toHaveLength(50)
    expect(store.checkpoints[0]!.after).toBe('after-54')
  })

  it('finds a checkpoint by id with getCheckpoint', () => {
    store.addEditCheckpoint('a', 'b')
    const id = store.checkpoints[0]!.id
    const found = store.getCheckpoint(id)
    expect(found).toBeDefined()
    expect(found!.before).toBe('a')
  })

  it('returns undefined for non-existent id in getCheckpoint', () => {
    expect(store.getCheckpoint('nonexistent')).toBeUndefined()
  })

  it('deletes a checkpoint by id', () => {
    store.addEditCheckpoint('a', 'b')
    const id = store.checkpoints[0]!.id
    store.deleteCheckpoint(id)
    expect(store.checkpoints).toHaveLength(0)
  })

  it('does nothing when deleting a non-existent id', () => {
    store.addEditCheckpoint('a', 'b')
    store.deleteCheckpoint('nonexistent')
    expect(store.checkpoints).toHaveLength(1)
  })

  it('clears all history', () => {
    store.addEditCheckpoint('a', 'b')
    store.addEditCheckpoint('c', 'd')
    store.clearHistory()
    expect(store.checkpoints).toHaveLength(0)
  })
})
