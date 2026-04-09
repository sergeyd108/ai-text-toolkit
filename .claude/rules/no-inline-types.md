# No Inline Type Structures

Never inline complex type structures directly in generics, function parameters, or variable declarations.

Instead, extract them into a named `type` alias and reference it.

**Bad:**

```ts
const ref = useTemplateRef<{ editor: { state: { selection: { from: number; to: number } } } | undefined }>('ref')
```

**Good:**

```ts
type EditorExpose = {
  editor:
    | {
        state: {
          selection: { from: number; to: number }
          doc: { textBetween: (from: number, to: number) => string }
        }
      }
    | undefined
}

const ref = useTemplateRef<EditorExpose>('ref')
```

This applies to `defineProps`, `defineEmits`, `ref`, `shallowRef`, `useTemplateRef`, `computed`, and any other generic usage. If a type has more than one property or any nesting, extract it.
