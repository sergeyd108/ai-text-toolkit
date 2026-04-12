<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { ToolKey, ToolOptions } from '#server/schemas/tools'
import AiToolbar from '~/features/editor/AiToolbar.vue'
import { skipHistory, restoreDoc } from '~/features/editor/tiptap-utils'
import { useAiTool } from '~/features/editor/use-ai-tool'

const { editor } = defineProps<{ editor: Editor }>()

const toast = useToast()
const historyStore = useHistoryStore()
const { isProcessing, run } = useAiTool()

async function runner<Tool extends ToolKey>(tool: Tool, options?: ToolOptions<Tool>) {
  if (isProcessing.value) return

  const before = editor.getMarkdown()
  const savedDoc = editor.state.doc

  try {
    skipHistory(editor).setContent('').showLoading(1).run()

    const result = await run(tool, before, {
      options,
      onChunk: (accumulated) => {
        const trimmed = accumulated.trim()
        if (!trimmed) return
        editor.commands.hideLoading()
        skipHistory(editor).setContent(trimmed, { contentType: 'markdown' }).run()
      },
    })

    editor.commands.hideLoading()
    restoreDoc(editor, savedDoc)

    if (!result) return

    editor.commands.setContent(result.trim(), { contentType: 'markdown' })

    const after = editor.getMarkdown()
    historyStore.addToolCheckpoint(before, after, tool, options)
  } catch (error) {
    console.error(error)
    editor.commands.hideLoading()
    restoreDoc(editor, savedDoc)
    toast.add({
      title: 'Error',
      description: 'Failed to process text. Please try again.',
      color: 'error',
    })
  }
}
</script>

<template>
  <AiToolbar :editor :runner color="primary" variant="outline" portal />
</template>
