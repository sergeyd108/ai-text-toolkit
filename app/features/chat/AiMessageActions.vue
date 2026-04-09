<script setup lang="ts">
import { isTextUIPart } from 'ai'
import type { UIMessage } from 'ai'

const { message } = defineProps<{ message: UIMessage }>()

const editorStore = useEditorStore()
const historyStore = useHistoryStore()

const copied = ref(false)
const messageText = computed(() => {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join('')
})

async function copyAsRichText(text: string) {
  const html = parseMarkdown(text)

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ])
  } catch {
    await navigator.clipboard.writeText(text)
  }

  copied.value = true

  setTimeout(() => (copied.value = false), 1500)
}

function applyMessage(after: string) {
  const before = editorStore.content
  editorStore.content = after
  historyStore.addChatCheckpoint(before, after)
}
</script>

<template>
  <div class="flex gap-1.5">
    <UTooltip :text="copied ? 'Copied!' : 'Copy'">
      <UButton
        :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
        size="xs"
        color="neutral"
        variant="ghost"
        @click="copyAsRichText(messageText)"
      />
    </UTooltip>
    <UTooltip text="Replace text in editor">
      <UButton
        v-if="message.role === 'assistant'"
        label="Apply"
        icon="i-lucide-check"
        size="xs"
        color="primary"
        variant="soft"
        @click="applyMessage(messageText)"
      />
    </UTooltip>
  </div>
</template>
