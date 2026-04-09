<script setup lang="ts">
import { createTwoFilesPatch } from 'diff'
import { html as diffHtml } from 'diff2html'
import { ColorSchemeType } from 'diff2html/lib/types'

interface Props {
  checkpoint: CheckpointDto
  format?: 'line-by-line' | 'side-by-side'
}

const { checkpoint, format = 'side-by-side' } = defineProps<Props>()

const diff = computed(() => {
  const patch = createTwoFilesPatch('Before', 'After', checkpoint.before, checkpoint.after, '', '', {
    context: 5,
    stripTrailingCr: true,
    ignoreWhitespace: true,
  })
  return diffHtml(patch, {
    drawFileList: false,
    matching: 'lines',
    colorScheme: ColorSchemeType.AUTO,
    outputFormat: format,
  })
})
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="diff" class="diff-container" v-html="diff" />
</template>

<style>
@import 'diff2html/bundles/css/diff2html.min.css';

.diff-container {
  .d2h-wrapper {
    font-size: 0.8rem;
  }

  .d2h-code-linenumber,
  .d2h-code-side-linenumber {
    position: sticky;
    left: 0;
    z-index: 1;
  }
}
</style>
