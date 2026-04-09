<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import { TiptapMdPaste } from './tiptap-md-paste'
import { TiptapLoading } from './tiptap-loading'
import FormattingToolbar from '~/features/editor/FormattingToolbar.vue'
import AiToolsBubbleMenu from '~/features/editor/AiToolsBubbleMenu.vue'
import { useAiTool } from '~/features/editor/use-ai-tool'

const editorRef = useTemplateRef<{ editor?: Editor }>('editor')

const editorStore = useEditorStore()
const historyStore = useHistoryStore()
const { isProcessing } = useAiTool()

const contentCheckpoint = ref(editorStore.content)

defineExpose({ editor: computed(() => editorRef.value?.editor) })
</script>

<template>
  <UEditor
    ref="editor"
    v-slot="{ editor }"
    v-model="editorStore.content"
    :extensions="[TiptapMdPaste, TiptapLoading]"
    content-type="markdown"
    text-direction="auto"
    :ui="{
      root: ['flex flex-col', isProcessing && 'select-none opacity-60 cursor-not-allowed'],
      content: [
        'flex-1 min-h-0 cursor-text overflow-y-auto flex flex-col [&_.tiptap]:flex-1 px-3 pt-3',
        isProcessing && 'pointer-events-none',
      ],
      base: '*:my-2 *:first:mt-0 *:last:mb-0 [&_pre]:whitespace-pre-wrap [&_pre]:break-words',
    }"
    @focus="contentCheckpoint = editorStore.content"
    @blur="historyStore.addEditCheckpoint(contentCheckpoint, editorStore.content)"
  >
    <div class="border-default flex justify-center border-b pt-1 pb-2">
      <FormattingToolbar :editor />
    </div>
    <AiToolsBubbleMenu :editor layout="bubble" />
  </UEditor>
</template>
