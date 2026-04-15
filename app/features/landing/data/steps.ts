interface Step {
  title: string
  description: string
  icon: string
}

export const steps: Step[] = [
  {
    title: 'Write or paste your text',
    description: 'Use the rich text editor to write from scratch or paste any content — articles, emails, reports.',
    icon: 'i-lucide-clipboard-paste',
  },
  {
    title: 'Transform a part or everything',
    description:
      'Highlight a passage to transform just that fragment, or run any tool on the full document without selecting anything.',
    icon: 'i-lucide-text-select',
  },
  {
    title: 'Pick a tool or ask the chat',
    description:
      'Choose from 5 AI tools in the bubble menu, or ask the chat assistant anything and apply its response directly into the editor.',
    icon: 'i-lucide-wand-sparkles',
  },
  {
    title: 'Review and restore anytime',
    description:
      'Every change is checkpointed. View diffs, compare versions, and roll back to any previous state with one click.',
    icon: 'i-lucide-history',
  },
]
