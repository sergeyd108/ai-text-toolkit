import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.nuxt', '.output'],
  },
})
