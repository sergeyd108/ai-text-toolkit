import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import MarkdownContent from './MarkdownContent.client.vue'

describe('MarkdownContent', () => {
  it('strips dangerous HTML via DOMPurify', async () => {
    const wrapper = await mountSuspended(MarkdownContent, { props: { content: '<img src=x onerror="alert(1)">' } })
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('onerror')).toBeUndefined()
  })

  it('strips script tags via DOMPurify', async () => {
    const wrapper = await mountSuspended(MarkdownContent, { props: { content: '<script>alert("xss")</script>hello' } })
    expect(wrapper.find('script').exists()).toBe(false)
    expect(wrapper.text()).toContain('hello')
  })

  it('applies prose classes to the root element', async () => {
    const wrapper = await mountSuspended(MarkdownContent, { props: { content: 'text' } })
    expect(wrapper.find('.prose').exists()).toBe(true)
  })

  it('updates rendered HTML when content prop changes', async () => {
    const wrapper = await mountSuspended(MarkdownContent, { props: { content: 'first' } })
    expect(wrapper.text()).toContain('first')
    await wrapper.setProps({ content: 'second' })
    expect(wrapper.text()).not.toContain('first')
    expect(wrapper.text()).toContain('second')
  })
})
