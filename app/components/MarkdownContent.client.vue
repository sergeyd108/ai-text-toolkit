<script lang="ts">
import DOMPurify from 'dompurify'

function sanitize(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'rel'],
  })
}
</script>

<script setup lang="ts">
const { content } = defineProps<{ content: string }>()
const html = computed(() => sanitize(parseMarkdown(content)))
</script>

<template>
  <!-- eslint-disable vue/no-v-html -- sanitized by DOMPurify -->
  <div class="prose prose-sm dark:prose-invert max-w-none" v-html="html" />
</template>
