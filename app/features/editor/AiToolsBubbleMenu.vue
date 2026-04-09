<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { ToolKey } from '#server/schemas/tools'
import AiToolbar from '~/features/editor/AiToolbar.vue'
import { skipHistory, restoreDoc } from '~/features/editor/tiptap-utils'
import { useAiTool } from '~/features/editor/use-ai-tool'

const { editor } = defineProps<{ editor: Editor }>()

const toast = useToast()
const historyStore = useHistoryStore()
const { isProcessing, run } = useAiTool()

function getSelectedText() {
  const { from, to } = editor.state.selection
  if (from === to) return
  const slice = editor.state.doc.slice(from, to)
  const json = { type: 'doc', content: slice.content.toJSON() }
  return editor.markdown?.serialize(json) ?? ''
}

function getSelection() {
  const { from, to } = editor.state.selection
  if (from === to) return
  return { from, to }
}

function streamReplace(from: number, to: number, text: string) {
  const sizeBefore = editor.state.doc.content.size
  skipHistory(editor).deleteRange({ from, to }).insertContent(text, { contentType: 'markdown' }).run()
  const sizeAfter = editor.state.doc.content.size
  return to + (sizeAfter - sizeBefore)
}

async function runner(tool: ToolKey, options?: Record<string, string>) {
  if (isProcessing.value) return

  const selection = getSelection()
  const selectedText = getSelectedText()

  if (!selection || !selectedText) return

  const before = editor.getMarkdown()
  const savedDoc = editor.state.doc

  try {
    skipHistory(editor).deleteRange(selection).showLoading(selection.from).run()

    let currentTo = selection.from

    const result = await run(tool, selectedText, options, (accumulated) => {
      const trimmed = accumulated.trim()
      if (!trimmed) return
      editor.commands.hideLoading()
      currentTo = streamReplace(selection.from, currentTo, trimmed)
    })

    editor.commands.hideLoading()
    restoreDoc(editor, savedDoc)

    if (!result) return

    editor.chain().insertContentAt(selection, result.trim(), { contentType: 'markdown' }).run()

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
  <AiToolbar :editor :runner color="primary" size="md" layout="bubble" />
</template>
