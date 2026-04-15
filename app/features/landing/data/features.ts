interface Feature {
  icon: string
  name: string
  description: string
}

export const features: Feature[] = [
  {
    icon: 'i-lucide-file-text',
    name: 'Summarize',
    description: 'Condense long text into clear, concise key points.',
  },
  {
    icon: 'i-lucide-pen-line',
    name: 'Rewrite',
    description: 'Rephrase your text while preserving its original meaning.',
  },
  {
    icon: 'i-lucide-spell-check-2',
    name: 'Fix Grammar',
    description: 'Automatically fix grammar, spelling, and punctuation errors.',
  },
  {
    icon: 'i-lucide-languages',
    name: 'Translate',
    description: 'Translate your text into Russian, English, Latvian, or Hebrew.',
  },
  {
    icon: 'i-lucide-drama',
    name: 'Change Tone',
    description: 'Rewrite in a different tone — formal, casual, friendly, and more.',
  },
]
