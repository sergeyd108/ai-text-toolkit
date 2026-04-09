import type { ToolKey } from '#server/schemas/tools'

export async function getSystemPrompt(tool: ToolKey, options?: Record<string, string>) {
  const storage = useStorage('assets:server')
  let prompt = await storage.getItem<string>(`prompts/${tool}.md`)

  if (prompt && options) {
    for (const [key, value] of Object.entries(options)) {
      prompt = prompt.replaceAll(`{{${key}}}`, value)
    }
  }

  return prompt
}
