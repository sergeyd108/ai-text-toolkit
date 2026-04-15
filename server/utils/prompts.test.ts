import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getSystemPrompt } from './prompts'

const mockGetItem = vi.fn()

vi.stubGlobal('useStorage', () => ({
  getItem: mockGetItem,
}))

describe('getSystemPrompt', () => {
  beforeEach(() => {
    mockGetItem.mockReset()
  })

  it('returns prompt content from storage', async () => {
    mockGetItem.mockResolvedValue('You are a helpful assistant.')
    const result = await getSystemPrompt('summarize')
    expect(mockGetItem).toHaveBeenCalledWith('prompts/summarize.md')
    expect(result).toBe('You are a helpful assistant.')
  })

  it('replaces template variables with options', async () => {
    mockGetItem.mockResolvedValue('Translate to {{language}}.')
    const result = await getSystemPrompt('translate', { language: 'Russian' })
    expect(result).toBe('Translate to Russian.')
  })

  it('keeps placeholders when no options provided', async () => {
    mockGetItem.mockResolvedValue('Use a {{tone}} tone.')
    const result = await getSystemPrompt('tone')
    expect(result).toBe('Use a {{tone}} tone.')
  })

  it('throws when prompt is not found', async () => {
    mockGetItem.mockResolvedValue(null)
    await expect(getSystemPrompt('summarize')).rejects.toThrow('System prompt not found for "summarize"')
  })
})
