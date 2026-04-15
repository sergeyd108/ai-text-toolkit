import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.nuxt', '.output'],
    onConsoleLog(log) {
      // Known issue: nuxt test env already provides pinia, createTestingPinia overrides it
      // https://github.com/nuxt/test-utils/issues/737
      if (log.includes('App already provides property with key "Symbol(pinia)"')) return false
      // mountSuspended wraps components in <Suspense>, which emits this on every mount
      if (log.includes('<Suspense> is an experimental feature')) return false
    },
  },
})
