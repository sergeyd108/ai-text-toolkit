import type { ToolKey, ToolOptions } from '#server/schemas/tools'
import type { ChatKey, ChatOptions } from '#server/schemas/chat'

export async function getSystemPrompt<Tool extends ToolKey>(tool: Tool, options?: ToolOptions<Tool>): Promise<string>
export async function getSystemPrompt(tool: ChatKey, options?: ChatOptions): Promise<string>
export async function getSystemPrompt<Tool extends ToolKey>(
  tool: Tool | ChatKey,
  options?: ToolOptions<Tool> | ChatOptions,
) {
  const storage = useStorage('assets:server')
  let prompt = await storage.getItem<string>(`prompts/${tool}.md`)

  if (!prompt) {
    throw new Error(`System prompt not found for "${tool}"`)
  }

  if (options) {
    for (const [key, value] of Object.entries(options)) {
      prompt = prompt.replaceAll(`{{${key}}}`, value)
    }
  }

  return prompt
}
