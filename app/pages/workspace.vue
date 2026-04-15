<script setup lang="ts">
import HistoryCard from '~/features/history/HistoryCard.vue'
import AiEditorCard from '~/features/editor/AiEditorCard.vue'
import AiChatCard from '~/features/chat/AiChatCard.vue'
import HistorySlideoverToggle from '~/features/history/HistorySlideoverToggle.vue'
import AiChatModalToggle from '~/features/chat/AiChatModalToggle.vue'

// need to explicitly set layout, otherwise preloadRouteComponents will not preload it
definePageMeta({ layout: 'default' })
</script>

<template>
  <div class="flex grow flex-col gap-2 p-3 sm:gap-4 sm:p-4 lg:p-6">
    <div class="flex gap-2 lg:hidden">
      <AiChatModalToggle />
      <HistorySlideoverToggle />
    </div>

    <AiEditorCard class="min-h-[80dvh] lg:hidden" />

    <div
      class="3xl:grid-cols-3 max-3xl:grid-rows-[4fr_1fr] grid h-[calc(100dvh-var(--ui-header-height)-(--spacing(12)))] grid-cols-2 gap-6 max-lg:hidden sm:gap-4"
    >
      <AiEditorCard />
      <AiChatCard />
      <HistoryCard class="max-3xl:col-span-2" />
    </div>
  </div>
</template>
