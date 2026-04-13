import type { ToolKey, ToolOptions } from '#server/schemas/tools'
import { FetchError } from 'ofetch'

type RunOptions<Tool extends ToolKey> = {
  options?: ToolOptions<Tool>
  onChunk?: (accumulated: string, delta: string) => void
}

export const useAiTool = createSharedComposable(() => {
  const isProcessing = ref(false)
  const streamedText = ref('')
  let abortController: AbortController | undefined

  async function run<Tool extends ToolKey>(tool: Tool, prompt: string, { options, onChunk }: RunOptions<Tool> = {}) {
    abort()

    isProcessing.value = true
    streamedText.value = ''
    abortController = new AbortController()

    try {
      const stream = await $fetch<ReadableStream>('/api/ai/generate', {
        method: 'POST',
        responseType: 'stream',
        body: { tool, prompt, options },
        signal: abortController.signal,
      })

      const reader = stream.pipeThrough(new TextDecoderStream()).getReader()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        streamedText.value += value
        onChunk?.(streamedText.value, value)
      }

      return streamedText.value
    } catch (error) {
      if (error instanceof FetchError) {
        throw new Error(error.data?.message || `Generation failed (${error.statusCode})`)
      }

      if (error instanceof Error && error.name === 'AbortError') {
        return streamedText.value
      }

      throw error
    } finally {
      isProcessing.value = false
      abortController = undefined
    }
  }

  function abort() {
    abortController?.abort()
    abortController = undefined
    isProcessing.value = false
  }

  return { isProcessing, streamedText, run, abort }
})
