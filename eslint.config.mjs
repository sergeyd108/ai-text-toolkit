// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import boundaries from 'eslint-plugin-boundaries'

export default withNuxt({
  plugins: { boundaries },
  settings: {
    'import/resolver': {
      typescript: {
        project: './.nuxt/tsconfig.json',
      },
    },
    'boundaries/include': ['app/**/*'],
    'boundaries/elements': [
      {
        type: 'feature',
        pattern: 'app/features/*',
        mode: 'folder',
        capture: ['featureName'],
      },
      { type: 'page', pattern: 'app/pages/**/*', mode: 'file' },
      { type: 'layout', pattern: 'app/layouts/**/*', mode: 'file' },
      { type: 'shared-component', pattern: 'app/components/**/*', mode: 'file' },
      { type: 'shared-store', pattern: 'app/stores/**/*', mode: 'file' },
      { type: 'shared-util', pattern: 'app/utils/**/*', mode: 'file' },
    ],
  },
  rules: {
    'vue/no-multiple-template-root': 'off',
    'boundaries/dependencies': [
      'error',
      {
        default: 'allow',
        rules: [
          {
            from: { type: 'feature' },
            disallow: {
              to: [{ type: 'feature', captured: { featureName: '!{{ featureName }}' } }],
            },
            message: 'Feature "${from.featureName}" must not import from feature "${target.featureName}".',
          },
          {
            from: { type: ['shared-component', 'shared-store', 'shared-util', 'layout'] },
            disallow: {
              to: [{ type: 'feature' }],
            },
            message: 'Shared layer "${from.type}" must not import from features — only pages may import features.',
          },
        ],
      },
    ],
  },
})
