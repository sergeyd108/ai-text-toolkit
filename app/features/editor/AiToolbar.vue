<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { EditorToolbarItem } from '@nuxt/ui'
import { findTool } from '~/features/editor/ai-tools'
import type { ToolKey } from '#server/schemas/tools'
import { useAiTool } from '~/features/editor/use-ai-tool'

interface Props {
  editor: Editor
  runner: (tool: ToolKey, options?: Record<string, string>) => Promise<void>
  portal?: boolean
}

const { editor, runner, portal = false } = defineProps<Props>()

const { isProcessing } = useAiTool()

const translateTool = findTool('translate')
const toneTool = findTool('tone')

const items = computed(() => {
  const disabled = isProcessing.value
  return [
    {
      disabled,
      label: 'Summarize',
      icon: 'i-lucide-file-text',
      onClick: () => runner('summarize'),
    },
    {
      disabled,
      label: 'Rewrite',
      icon: 'i-lucide-pen-line',
      onClick: () => runner('rewrite'),
    },
    {
      disabled,
      label: 'Fix Grammar',
      icon: 'i-lucide-spell-check-2',
      onClick: () => runner('grammar'),
    },
    {
      portal,
      disabled,
      label: 'Translate',
      icon: 'i-lucide-languages',
      items:
        translateTool?.options?.[0]?.items.map((item) => ({
          label: item.label,
          onClick: () => runner('translate', { language: item.value }),
        })) ?? [],
    },
    {
      portal,
      disabled,
      label: 'Tone',
      icon: 'i-lucide-drama',
      items:
        toneTool?.options?.[0]?.items.map((item) => ({
          label: item.label,
          onClick: () => runner('tone', { tone: item.value }),
        })) ?? [],
    },
  ] satisfies EditorToolbarItem[]
})
</script>

<template>
  <UEditorToolbar :editor :items />
</template>
