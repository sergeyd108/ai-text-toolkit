<script setup lang="ts">
import { isTextUIPart } from 'ai'
import type { UIMessage } from 'ai'

const { message } = defineProps<{ message: UIMessage }>()

const editorStore = useEditorStore()
const historyStore = useHistoryStore()

const { copy: copyItems, copied: richCopied, isSupported: richSupported } = useClipboardItems()
const { copy: copyText, copied: plainCopied } = useClipboard({ legacy: true })

const copied = computed(() => richCopied.value || plainCopied.value)
const applied = refAutoReset(false, 1500)

const messageText = computed(() => {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join('')
})

async function copyAsRichText(text: string) {
  if (richSupported.value) {
    const html = parseMarkdown(text)
    await copyItems([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ])
  } else {
    await copyText(text)
  }
}

function applyMessage(after: string) {
  const before = editorStore.content
  editorStore.content = after
  historyStore.addChatCheckpoint(before, after)
  applied.value = true
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
