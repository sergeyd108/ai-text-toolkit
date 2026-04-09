<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'
import AiFullTextTools from '~/features/editor/AiFullTextTools.vue'
import AiEditor from '~/features/editor/AiEditor.vue'

const editorRef = useTemplateRef<{ editor?: Editor }>('editor')
</script>

<template>
  <UCard
    class="flex flex-col"
    :ui="{
      header: 'py-3',
      body: 'flex grow flex-col overflow-auto p-0!',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between gap-2 overflow-x-auto sm:gap-4">
        <div class="flex items-center gap-2 max-xl:hidden">
          <UIcon name="i-lucide-file-edit" class="text-primary size-4" />
          <span class="text-sm leading-7 font-semibold">Editor</span>
        </div>
        <AiFullTextTools v-if="editorRef?.editor" :editor="editorRef.editor" />
      </div>
    </template>

    <AiEditor ref="editor" class="grow" />
  </UCard>
</template>
