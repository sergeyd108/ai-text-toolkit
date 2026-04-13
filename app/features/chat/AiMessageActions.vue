<script setup lang="ts">
import { isTextUIPart } from 'ai'
import type { UIMessage } from 'ai'

const { message } = defineProps<{ message: UIMessage }>()

const editorStore = useEditorStore()
const historyStore = useHistoryStore()

const copied = ref(false)
const applied = ref(false)
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
  applied.value = true
  setTimeout(() => (applied.value = false), 1500)
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
    <UTooltip :text="applied ? 'Editor content replaced' : 'Replace content in editor'">
      <UButton
        v-if="message.role === 'assistant'"
        :label="applied ? 'Applied!' : 'Apply'"
        :color="applied ? 'success' : 'primary'"
        icon="i-lucide-check"
        size="xs"
        variant="soft"
        @click="applyMessage(messageText.trim())"
      />
    </UTooltip>
  </div>
</template>
