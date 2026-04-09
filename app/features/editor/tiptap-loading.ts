import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    loading: {
      showLoading: (pos: number) => ReturnType
      hideLoading: () => ReturnType
    }
  }
}

type PluginMeta = { pos: number } | null

const pluginKey = new PluginKey('loading')

function createLoadingDots() {
  const container = document.createElement('span')
  container.style.cssText = 'display: inline-flex; gap: 3px; padding: 0 4px; vertical-align: middle;'

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement('span')
    dot.style.cssText = 'width: 5px; height: 5px; border-radius: 50%; background: currentColor;'
    dot.animate(
      [
        { opacity: 0.3, transform: 'scale(0.8)' },
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0.3, transform: 'scale(0.8)' },
      ],
      {
        duration: 1400,
        delay: i * 200,
        iterations: Infinity,
        easing: 'ease-in-out',
      },
    )
    container.appendChild(dot)
  }

  return container
}

export const TiptapLoading = Extension.create({
  name: 'loading',

  addCommands() {
    return {
      showLoading:
        (pos: number) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta(pluginKey, { pos } satisfies PluginMeta)
            tr.setMeta('addToHistory', false)
          }
          return true
        },
      hideLoading:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta(pluginKey, null satisfies PluginMeta)
            tr.setMeta('addToHistory', false)
          }
          return true
        },
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: pluginKey,
        state: {
          init() {
            return DecorationSet.empty
          },
          apply(tr, set, _, newState) {
            const meta: PluginMeta | undefined = tr.getMeta(pluginKey)
            if (meta !== undefined) {
              if (meta !== null) {
                return DecorationSet.create(newState.doc, [Decoration.widget(meta.pos, createLoadingDots)])
              }
              return DecorationSet.empty
            }
            return set.map(tr.mapping, tr.doc)
          },
        },
        props: {
          decorations(state) {
            return pluginKey.getState(state)
          },
        },
      }),
    ]
  },
})
