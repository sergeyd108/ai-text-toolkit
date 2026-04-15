import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { FetchError } from 'ofetch'
import { useAiTool } from './use-ai-tool'

const mockFetch = vi.fn()

vi.stubGlobal('$fetch', mockFetch)
mockNuxtImport('createSharedComposable', () => (fn: () => unknown) => fn)

function createMockStream(chunks: string[]) {
  const encoder = new TextEncoder()
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk))
      }
      controller.close()
    },
  })
}

function createAbortingStream(initialChunks: string[]) {
  const encoder = new TextEncoder()
  let index = 0
  return new ReadableStream({
    pull(controller) {
      if (index < initialChunks.length) {
        controller.enqueue(encoder.encode(initialChunks[index++]))
      } else {
        const error = new Error('The operation was aborted')
        error.name = 'AbortError'
        controller.error(error)
      }
    },
  })
}

describe('useAiTool', () => {
  beforeEach(() => {
    mockFetch.mockReset()
  })

  it('streams text chunks and returns accumulated result', async () => {
    mockFetch.mockResolvedValue(createMockStream(['Hello', ', ', 'World']))

    const { run, streamedText } = useAiTool()
    const result = await run('summarize', 'test prompt')

    expect(result).toBe('Hello, World')
    expect(streamedText.value).toBe('Hello, World')
  })

  it('sets isProcessing during run and resets after completion', async () => {
    mockFetch.mockResolvedValue(createMockStream(['data']))
    const { run, isProcessing } = useAiTool()

    const promise = run('summarize', 'text')
    expect(isProcessing.value).toBe(true)

    await promise
    expect(isProcessing.value).toBe(false)
  })

  it('resets streamedText at the start of each run', async () => {
    mockFetch.mockResolvedValue(createMockStream(['first']))
    const { run, streamedText } = useAiTool()

    await run('summarize', 'text')
    expect(streamedText.value).toBe('first')

    mockFetch.mockResolvedValue(createMockStream(['second']))
    await run('summarize', 'text')
    expect(streamedText.value).toBe('second')
  })

  it('calls onChunk with accumulated and delta text', async () => {
    mockFetch.mockResolvedValue(createMockStream(['Hello', ' World']))

    const { run } = useAiTool()
    const onChunk = vi.fn()
    await run('summarize', 'text', { onChunk })

    expect(onChunk).toHaveBeenCalledTimes(2)
    expect(onChunk).toHaveBeenNthCalledWith(1, 'Hello', 'Hello')
    expect(onChunk).toHaveBeenNthCalledWith(2, 'Hello World', ' World')
  })

  it('converts API error to Error with server message', async () => {
    const fetchError = new FetchError('request failed')
    fetchError.statusCode = 500
    fetchError.data = { message: 'Model overloaded' }
    mockFetch.mockRejectedValue(fetchError)

    const { run } = useAiTool()
    await expect(run('summarize', 'text')).rejects.toThrow('Model overloaded')
  })

  it('converts API error to Error with status code fallback', async () => {
    const fetchError = new FetchError('request failed')
    fetchError.statusCode = 429
    mockFetch.mockRejectedValue(fetchError)

    const { run } = useAiTool()
    await expect(run('summarize', 'text')).rejects.toThrow('Generation failed (429)')
  })

  it('returns accumulated text on AbortError during streaming', async () => {
    mockFetch.mockResolvedValue(createAbortingStream(['partial']))
    const { run } = useAiTool()
    const result = await run('summarize', 'text')
    expect(result).toBe('partial')
  })

  it('re-throws unknown errors', async () => {
    const error = new TypeError('unexpected')
    mockFetch.mockRejectedValue(error)
    const { run } = useAiTool()
    await expect(run('summarize', 'text')).rejects.toThrow(error)
  })

  it('resets isProcessing after error', async () => {
    mockFetch.mockRejectedValue(new TypeError('fail'))
    const { run, isProcessing } = useAiTool()
    await expect(run('summarize', 'text')).rejects.toThrow()
    expect(isProcessing.value).toBe(false)
  })

  it('abort() resets processing state', async () => {
    mockFetch.mockReturnValue(new Promise(() => {}))
    const { run, abort, isProcessing } = useAiTool()

    run('summarize', 'text')
    expect(isProcessing.value).toBe(true)

    abort()
    expect(isProcessing.value).toBe(false)
  })
})
