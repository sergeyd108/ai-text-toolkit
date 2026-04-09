import { Marked } from 'marked'

const md = new Marked({
  async: false,
  breaks: true,
  gfm: true,
  renderer: {
    link({ href, text }) {
      const escaped = href.replace(/"/g, '&quot;')
      return `<a href="${escaped}" target="_blank" rel="noopener noreferrer">${text}</a>`
    },
  },
})

export function parseMarkdown(text: string) {
  return md.parse(text) as string
}
