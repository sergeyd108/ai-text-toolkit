import type { ToolKey, ToolOptions } from '#server/schemas/tools'

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
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, prompt, options }),
        signal: abortController.signal,
      })

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.status}`)
      }

      if (!response.body) {
        throw new Error('No response body')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const delta = decoder.decode(value, { stream: true })
        streamedText.value += delta
        onChunk?.(streamedText.value, delta)
      }

      return streamedText.value
    } catch (error) {
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
