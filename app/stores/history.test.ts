import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useHistoryStore } from './history'

describe('useHistoryStore', () => {
  let store: ReturnType<typeof useHistoryStore>

  beforeEach(() => {
    setActivePinia(createTestingPinia({ createSpy: vi.fn, stubActions: false }))
    store = useHistoryStore()
  })

  it('starts with empty checkpoints', () => {
    expect(store.checkpoints).toEqual([])
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

  it('skips checkpoint when before equals after', () => {
    store.addEditCheckpoint('same', 'same')
    expect(store.checkpoints).toHaveLength(0)
  })

  it('formats tool label with options', () => {
    store.addToolCheckpoint('before', 'after', 'translate', { language: 'Russian' })
    const cp = store.checkpoints[0]!

    expect(cp.label).toBe('Translate: Russian')
    expect(cp.source).toBe('tool')
  })

  it('formats tool label without options', () => {
    store.addToolCheckpoint('before', 'after', 'summarize')
    expect(store.checkpoints[0]!.label).toBe('Summarize')
  })

  it('enforces MAX_CHECKPOINTS limit of 50', () => {
    for (let i = 0; i < 55; i++) {
      store.addEditCheckpoint(`before-${i}`, `after-${i}`)
    }

    expect(store.checkpoints).toHaveLength(50)
    expect(store.checkpoints[0]!.after).toBe('after-54')
  })

  it('deletes a checkpoint by id', () => {
    store.addEditCheckpoint('a', 'b')
    const id = store.checkpoints[0]!.id
    store.deleteCheckpoint(id)

    expect(store.checkpoints).toHaveLength(0)
  })

  it('clears all history', () => {
    store.addEditCheckpoint('a', 'b')
    store.addEditCheckpoint('c', 'd')
    store.clearHistory()

    expect(store.checkpoints).toHaveLength(0)
  })
})
