import { describe, it, expect, vi, afterEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { createTestingPinia } from '@pinia/testing'
import type { UIMessage } from 'ai'
import AiMessageActions from './AiMessageActions.vue'

function createMessage(overrides: Partial<UIMessage> = {}): UIMessage {
  return {
    id: 'msg-1',
    role: 'assistant',
    parts: [{ type: 'text', text: 'Hello world' }],
    ...overrides,
  }
}

function mountActions(message: UIMessage) {
  return mountSuspended(AiMessageActions, {
    props: { message },
    global: {
      renderStubDefaultSlot: true,
      plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })],
      stubs: { UTooltip: true },
    },
  })
}

function findApplyButton(wrapper: Awaited<ReturnType<typeof mountActions>>) {
  return wrapper.findAll('button').find((button) => button.text().includes('Apply'))
}

describe('AiMessageActions', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders apply button only for assistant messages', async () => {
    const assistant = await mountActions(createMessage({ role: 'assistant' }))
    expect(assistant.text()).toContain('Apply')
    const user = await mountActions(createMessage({ role: 'user' }))
    expect(user.text()).not.toContain('Apply')
  })

  it('applies joined message text to editor and creates a chat checkpoint', async () => {
    const message = createMessage({
      parts: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', text: 'world' },
      ],
    })
    const wrapper = await mountActions(message)

    const editorStore = useEditorStore()
    editorStore.content = 'old content'
    await findApplyButton(wrapper)!.trigger('click')

    expect(editorStore.content).toBe('Hello world')
    expect(useHistoryStore().checkpoints).toHaveLength(1)
  })

  it('shows "Applied!" feedback then reverts after 1.5s', async () => {
    vi.useFakeTimers()
    const wrapper = await mountActions(createMessage())

    await findApplyButton(wrapper)!.trigger('click')
    await nextTick()
    expect(wrapper.text()).toContain('Applied!')

    await vi.advanceTimersByTimeAsync(1500)
    await nextTick()
    expect(wrapper.text()).not.toContain('Applied!')
    expect(wrapper.text()).toContain('Apply')
  })
})
