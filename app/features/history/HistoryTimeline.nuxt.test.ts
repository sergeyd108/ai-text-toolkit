import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import type { CheckpointDto } from '~/stores/history'
import HistoryTimeline from './HistoryTimeline.vue'

function createCheckpoint(overrides: Partial<CheckpointDto> = {}): CheckpointDto {
  return {
    id: 'cp-1',
    label: 'Manual edit',
    before: 'old text',
    after: 'new text content here',
    timestamp: Date.now(),
    source: 'edit',
    ...overrides,
  }
}

async function mountWith(checkpoints: CheckpointDto[] = []) {
  const pinia = createTestingPinia({ createSpy: vi.fn })
  const wrapper = await mountSuspended(HistoryTimeline, {
    global: { plugins: [pinia], stubs: { TimelineActions: true } },
  })
  const store = useHistoryStore(pinia)
  store.checkpoints = checkpoints
  await nextTick()
  return wrapper
}

describe('HistoryTimeline', () => {
  it('renders nothing when history is empty', async () => {
    const wrapper = await mountWith()
    expect(wrapper.text()).toBe('')
  })

  it('renders checkpoint label and description', async () => {
    const checkpoints = [createCheckpoint({ label: 'Summarize', after: 'Short summary of the text' })]
    const wrapper = await mountWith(checkpoints)
    expect(wrapper.text()).toContain('Summarize')
    expect(wrapper.text()).toContain('Short summary of the text')
  })

  it('truncates description to 80 characters', async () => {
    const checkpoints = [createCheckpoint({ after: 'A'.repeat(100) })]
    const wrapper = await mountWith(checkpoints)
    expect(wrapper.find('.text-muted').text().length).toBeLessThanOrEqual(80)
  })
})
