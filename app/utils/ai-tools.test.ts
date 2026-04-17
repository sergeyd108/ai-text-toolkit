import { describe, it, expect } from 'vitest'
import { findAiTool } from './ai-tools'

describe('findAiTool', () => {
  it('returns the correct tool by key', () => {
    const tool = findAiTool('translate')
    expect(tool!.name).toBe('Translate')
  })

  it('has correct default option values', () => {
    const translateOpt = findAiTool('translate').options![0]!
    expect(translateOpt.default).toBe('Russian')
    expect(translateOpt.items).toHaveLength(4)

    const toneOpt = findAiTool('tone').options![0]!
    expect(toneOpt.default).toBe('Professional')
    expect(toneOpt.items).toHaveLength(6)
  })
})
