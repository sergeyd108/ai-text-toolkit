interface Capability {
  icon: string
  name: string
  description: string
}

export const capabilities: Capability[] = [
  {
    icon: 'i-lucide-text-cursor-input',
    name: 'Selection or Full Text',
    description: 'Select a range to transform just that fragment, or apply any tool to the entire document at once.',
  },
  {
    icon: 'i-lucide-message-square',
    name: 'AI Chat Assistant',
    description:
      'Chat with an AI that sees your document. Ask questions, request custom edits, or get writing suggestions in context.',
  },
  {
    icon: 'i-lucide-history',
    name: 'Checkpoint History',
    description:
      'Every AI edit is saved as a checkpoint. Browse the timeline, view side-by-side diffs, and restore any previous version.',
  },
]
