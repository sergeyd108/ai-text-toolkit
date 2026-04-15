<template>
  <UHeader :toggle="false" :ui="{ container: 'max-w-full px-3 sm:px-6' }">
    <template #left>
      <NuxtLink to="/">
        <AppLogo />
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>

  <UMain class="flex flex-col">
    <slot />
  </UMain>

  <USeparator icon="i-lucide-wand-sparkles" />

  <UFooter :ui="{ container: 'max-w-full px-3 sm:px-6' }">
    <template #left>
      <p class="text-muted text-sm">AI Text Toolkit • © {{ new Date().getFullYear() }}</p>
    </template>
  </UFooter>
</template>
