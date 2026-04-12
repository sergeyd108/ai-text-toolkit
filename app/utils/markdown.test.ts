import { describe, it, expect } from 'vitest'
import { parseMarkdown } from './markdown'

describe('parseMarkdown', () => {
  it('adds target and rel attributes to links', () => {
    const html = parseMarkdown('[click](https://example.com)')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('escapes quotes in href to prevent XSS', () => {
    const html = parseMarkdown('[x](https://evil.com"onclick="alert(1))')
    expect(html).toContain('&quot;')
    expect(html).not.toContain('href="https://evil.com"onclick')
  })

  it('converts line breaks with breaks: true', () => {
    const html = parseMarkdown('line1\nline2')
    expect(html).toContain('<br>')
  })

  it('wraps plain text in a paragraph', () => {
    const html = parseMarkdown('hello world')
    expect(html).toContain('<p>hello world</p>')
  })
})
