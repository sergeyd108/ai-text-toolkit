import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'

export const TiptapMdPaste = Extension.create({
  name: 'tiptap-md-paste',

  addProseMirrorPlugins() {
    const { editor } = this

    return [
      new Plugin({
        key: new PluginKey('tiptap-md-paste'),
        props: {
          handlePaste(_, event) {
            const data = event.clipboardData

            if (!data) return false
            if (data.getData('text/html')) return false

            const text = data.getData('text/plain')
            if (!text) return false

            const html = parseMarkdown(text)
            editor.commands.insertContent(html)

            return true
          },
        },
      }),
    ]
  },
})
