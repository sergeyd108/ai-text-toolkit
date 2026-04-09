<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})

const title = 'AI Text Toolkit'
const description =
  'Powerful AI-powered text tools for summarizing, rewriting, translating, adjusting tone, and fixing grammar.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})
</script>

<template>
  <UApp>
    <UHeader :toggle="false" :ui="{ container: 'max-w-full px-3 sm:px-6' }">
      <template #left>
        <AppLogo />
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="flex flex-col">
      <NuxtPage />
    </UMain>

    <USeparator icon="i-lucide-wand-sparkles" />

    <UFooter :ui="{ container: 'max-w-full px-3 sm:px-6' }">
      <template #left>
        <p class="text-muted text-sm">AI Text Toolkit • © {{ new Date().getFullYear() }}</p>
      </template>
    </UFooter>
  </UApp>
</template>
