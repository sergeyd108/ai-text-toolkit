<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import type { EditorToolbarItem } from '@nuxt/ui'

defineProps<{ editor: Editor }>()

const items: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'mark', mark: 'strike', icon: 'i-lucide-strikethrough' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'blockquote', icon: 'i-lucide-quote' },
]
</script>

<template>
  <UEditorToolbar :editor :items />
</template>
