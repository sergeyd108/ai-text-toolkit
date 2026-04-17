// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt', '@nuxt/test-utils/module', '@vercel/analytics'],

  experimental: {
    viewTransition: true,
  },

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    aiGatewayApiKey: '',
    aiModel: '',
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        plugins: [{ name: '@vue/typescript-plugin' }],
      },
    },
  },

  compatibilityDate: '2025-01-15',

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@nuxt/ui > prosemirror-state',
        '@nuxt/ui > prosemirror-transform',
        '@nuxt/ui > prosemirror-model',
        '@nuxt/ui > prosemirror-view',
      ],
    },
  },
})
