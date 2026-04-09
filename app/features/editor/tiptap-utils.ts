import type { Editor } from '@tiptap/vue-3'

export function skipHistory(editor: Editor) {
  return editor.chain().command(({ tr }) => {
    tr.setMeta('addToHistory', false)
    return true
  })
}

export function restoreDoc(editor: Editor, savedDoc: Editor['state']['doc']) {
  const { tr } = editor.state
  tr.replaceWith(0, editor.state.doc.content.size, savedDoc.content)
  tr.setMeta('addToHistory', false)
  editor.view.dispatch(tr)
}
