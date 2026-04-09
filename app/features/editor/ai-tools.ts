interface ToolOption {
  key: string
  label: string
  items: { label: string; value: string }[]
  default: string
}

interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  placeholder: string
  options?: ToolOption[]
}

export const tools: Tool[] = [
  {
    slug: 'summarize',
    name: 'Summarize',
    description: 'Condense long text into key points',
    icon: 'i-lucide-file-text',
    placeholder: 'Paste the text you want to summarize...',
  },
  {
    slug: 'rewrite',
    name: 'Rewrite',
    description: 'Rephrase text while preserving meaning',
    icon: 'i-lucide-pen-line',
    placeholder: 'Paste the text you want to rewrite...',
  },
  {
    slug: 'grammar',
    name: 'Fix Grammar',
    description: 'Fix grammar, spelling, and punctuation',
    icon: 'i-lucide-spell-check-2',
    placeholder: 'Paste the text you want to fix...',
  },
  {
    slug: 'translate',
    name: 'Translate',
    description: 'Translate text to a selected language',
    icon: 'i-lucide-languages',
    placeholder: 'Paste the text you want to translate...',
    options: [
      {
        key: 'language',
        label: 'Target language',
        default: 'Russian',
        items: [
          { label: 'Russian', value: 'Russian' },
          { label: 'English', value: 'English' },
          { label: 'Latvian', value: 'Latvian' },
          { label: 'Hebrew', value: 'Hebrew' },
        ],
      },
    ],
  },
  {
    slug: 'tone',
    name: 'Change Tone',
    description: 'Rewrite text in a different tone',
    icon: 'i-lucide-drama',
    placeholder: 'Paste the text you want to change the tone of...',
    options: [
      {
        key: 'tone',
        label: 'Tone',
        default: 'Professional',
        items: [
          { label: 'Formal', value: 'Formal' },
          { label: 'Casual', value: 'Casual' },
          { label: 'Professional', value: 'Professional' },
          { label: 'Friendly', value: 'Friendly' },
          { label: 'Persuasive', value: 'Persuasive' },
          { label: 'Humorous', value: 'Humorous' },
        ],
      },
    ],
  },
]

export function findTool(slug: string) {
  return tools.find((t) => t.slug === slug)
}
