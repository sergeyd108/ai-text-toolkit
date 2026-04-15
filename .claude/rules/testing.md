---
description: Testing conventions — Vitest patterns for pure functions, composables, and Pinia stores
paths:
  - '**/*.test.ts'
---

# Testing

## Stack

Vitest + `@nuxt/test-utils` (config via `defineVitestConfig`), `@pinia/testing`, `@vue/test-utils`, `happy-dom`.

## File Placement

Test files are co-located next to the source file they test:

- `app/features/editor/ai-tools.ts` → `app/features/editor/ai-tools.test.ts`
- `app/stores/history.ts` → `app/stores/history.test.ts`

## Imports

Always import `describe`, `it`, `expect`, `vi`, `beforeEach` explicitly from `vitest` — they are not auto-imported in test files.

## Patterns by Test Type

### Pure functions

Import the function directly and test input/output. No mocking needed.

```ts
import { describe, it, expect } from 'vitest'
import { myFunction } from './my-module'
```

### Composables (with `$fetch` or Nuxt auto-imports)

1. Use `vi.hoisted` to create mock functions before any imports
2. Use `vi.stubGlobal('$fetch', mockFetch)` for fetch mocking
3. Use `mockNuxtImport` from `@nuxt/test-utils/runtime` to mock Nuxt auto-imports (e.g. `createSharedComposable`)
4. Import the composable under test **after** mocks are set up

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
}))

vi.stubGlobal('$fetch', mockFetch)
mockNuxtImport('createSharedComposable', () => (fn: Function) => fn)

import { useMyComposable } from './use-my-composable'
```

### Pinia stores

Use `createTestingPinia` with `stubActions: false` to test real action logic. Set active pinia in `beforeEach`.

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useMyStore } from './my-store'

beforeEach(() => {
  setActivePinia(createTestingPinia({ createSpy: vi.fn, stubActions: false }))
})
```

### Components (`*.nuxt.test.ts`)

Use `mountSuspended` from `@nuxt/test-utils/runtime`. Stub child feature components with `stubs: { Name: true }` to isolate the unit under test. Extract the mount boilerplate (pinia plugin + stubs + initial store state) into a local `mountWith` / `mountActions` helper — don't repeat it per test.

```ts
async function mountWith(checkpoints: CheckpointDto[] = []) {
  const pinia = createTestingPinia({ createSpy: vi.fn })
  const wrapper = await mountSuspended(HistoryTimeline, {
    global: { plugins: [pinia], stubs: { TimelineActions: true } },
  })
  const store = useHistoryStore(pinia)
  store.checkpoints = checkpoints
  await nextTick()
  return wrapper
}
```

Test only what the component itself adds on top of its inputs: conditional rendering (`v-if`), `computed` transforms (mapping/formatting/truncation), and user interaction → side effect (click → store mutation → UI state change).

## What NOT to Test

- **Type correctness** — TypeScript handles it.
- **Zod schema validation** — Zod handles it.
- **Framework guarantees** — `v-for` iteration over N items, static prop bindings (`:foo="bar"`), unconditional template nodes. If proving it requires pointing at the literal template, it's trivial wiring.
- **Logic owned by another tested file** — if `history.test.ts` already asserts `addChatCheckpoint` sets `source: 'chat'`, the component test that dispatches it shouldn't re-assert those fields. Check `checkpoints.length` grew, stop there.
- **Library internals** — output format of `useTimeAgo`, the `Blob`s inside a `ClipboardItem`, etc. Test _that the component wires up the library_, not _that the library works_.
- **Implementation details** — `$fetch` URLs/params, which branch of a fallback chain fired, spy call shapes. Test user-visible behavior (store state changed, text rendered, element appeared).

When a component hand-rolls something VueUse already does (`useClipboard`, `useClipboardItems`, `refAutoReset`, `useTimeoutFn`, ...), **replace the code instead of testing the hand-rolled version**. The best test for library code is deletion.

## Test Hygiene

- Pair state-stubbing APIs with `afterEach` cleanup so a mid-test failure doesn't leak state:
  - `vi.useFakeTimers()` → `vi.useRealTimers()`
  - `vi.stubGlobal(...)` → `vi.unstubAllGlobals()`
- Don't add `beforeEach(() => vi.restoreAllMocks())` unless tests actually install persistent `vi.spyOn` / `vi.mock` — a cleanup hook that cleans nothing is dead code.
