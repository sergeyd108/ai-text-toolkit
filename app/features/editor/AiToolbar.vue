<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { EditorToolbarItem } from '@nuxt/ui'
import type { ToolKey, ToolOptions } from '#server/schemas/tools'
import { useAiTool } from '~/features/editor/use-ai-tool'

interface Props {
  editor: Editor
  runner: <Tool extends ToolKey>(tool: Tool, options?: ToolOptions<Tool>) => Promise<void>
  portal?: boolean
}

const { editor, runner, portal = false } = defineProps<Props>()

const { isProcessing } = useAiTool()

const translateTool = findAiTool('translate')
const toneTool = findAiTool('tone')

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
        translateTool?.options?.[0]?.items.map((language) => ({
          label: language,
          onClick: () => runner('translate', { language }),
        })) ?? [],
    },
    {
      portal,
      disabled,
      label: 'Tone',
      icon: 'i-lucide-drama',
      items:
        toneTool?.options?.[0]?.items.map((tone) => ({
          label: tone,
          onClick: () => runner('tone', { tone }),
        })) ?? [],
    },
  ] satisfies EditorToolbarItem[]
})
</script>

<template>
  <UEditorToolbar :editor :items />
</template>
