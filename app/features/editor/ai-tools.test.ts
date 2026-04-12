import { describe, it, expect } from 'vitest'
import { findTool } from './ai-tools'

describe('findTool', () => {
  it('returns the correct tool by key', () => {
    const tool = findTool('translate')
    expect(tool!.name).toBe('Translate')
  })

  it('has correct default option values', () => {
    const translateOpt = findTool('translate').options![0]!
    expect(translateOpt.default).toBe('Russian')
    expect(translateOpt.items).toHaveLength(4)

    const toneOpt = findTool('tone').options![0]!
    expect(toneOpt.default).toBe('Professional')
    expect(toneOpt.items).toHaveLength(6)
  })
})
