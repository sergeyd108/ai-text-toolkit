<script setup lang="ts">
preloadRouteComponents('/')
preloadRouteComponents('/workspace')

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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
