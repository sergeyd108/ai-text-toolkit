import type { ToolKey } from '#server/schemas/tools'

interface ToolOption {
  key: string
  label: string
  items: string[]
  default: string
}

interface Tool {
  key: ToolKey
  name: string
  description: string
  icon: string
  placeholder: string
  options?: ToolOption[]
}

export const aiTools: Tool[] = [
  {
    key: 'summarize',
    name: 'Summarize',
    description: 'Condense long text into key points',
    icon: 'i-lucide-file-text',
    placeholder: 'Paste the text you want to summarize...',
  },
  {
    key: 'rewrite',
    name: 'Rewrite',
    description: 'Rephrase text while preserving meaning',
    icon: 'i-lucide-pen-line',
    placeholder: 'Paste the text you want to rewrite...',
  },
  {
    key: 'grammar',
    name: 'Fix Grammar',
    description: 'Fix grammar, spelling, and punctuation',
    icon: 'i-lucide-spell-check-2',
    placeholder: 'Paste the text you want to fix...',
  },
  {
    key: 'translate',
    name: 'Translate',
    description: 'Translate text to a selected language',
    icon: 'i-lucide-languages',
    placeholder: 'Paste the text you want to translate...',
    options: [
      {
        key: 'language',
        label: 'Target language',
        default: 'Russian',
        items: ['Russian', 'English', 'Latvian', 'Hebrew'],
      },
    ],
  },
  {
    key: 'tone',
    name: 'Change Tone',
    description: 'Rewrite text in a different tone',
    icon: 'i-lucide-drama',
    placeholder: 'Paste the text you want to change the tone of...',
    options: [
      {
        key: 'tone',
        label: 'Tone',
        default: 'Professional',
        items: ['Formal', 'Casual', 'Professional', 'Friendly', 'Persuasive', 'Humorous'],
      },
    ],
  },
]

export function findAiTool(key: ToolKey) {
  return aiTools.find((t) => t.key === key)!
}
