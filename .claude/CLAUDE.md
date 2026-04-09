# AI Text Toolkit

Single-page AI text workspace: rich editor with inline AI tools, context-aware chat, and checkpoint-based version history. All responses stream in real time.

## Tech Stack

- **Framework**: Nuxt 4 (Vue 3, `app/` directory structure)
- **UI**: Nuxt UI v4 (components prefixed `U`), Tailwind CSS v4
- **Editor**: Tiptap (ProseMirror) with custom extensions
- **AI**: Vercel AI SDK v6 (`ai` + `@ai-sdk/vue`) — `Chat` class on client, `streamText` on server
- **AI Provider**: Vercel AI Gateway (model-agnostic, set via env var)
- **State**: Pinia (checkpoint history), Vue composables
- **Validation**: Zod
- **Package manager**: pnpm
- **Language**: TypeScript (strict)

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint check
pnpm typecheck    # TypeScript check
```

## Project Structure

```
app/
  pages/index.vue              # Single workspace page (editor + chat + history)
  features/
    editor/                    # Tiptap editor, AI tools, bubble menu, toolbar
    chat/                      # Chat UI, composable, message actions
    history/                   # Timeline, diff viewer, restore
  components/                  # Shared components (AppLogo, MarkdownContent)
  stores/history.ts            # Pinia store (checkpoints, max 50)
  utils/                       # Shared utilities (markdown parser)
server/
  api/ai/generate.post.ts     # POST /api/ai/generate — streaming text generation
  api/ai/chat.post.ts         # POST /api/ai/chat — streaming chat
  assets/prompts/              # System prompts per tool (Markdown with {{variable}} templates)
  utils/prompts.ts             # Prompt loader with template substitution
  schemas/tools.ts             # Zod schema for tool validation
```

## Conventions

- Use Nuxt auto-imports (no manual imports for Vue/Nuxt APIs, composables, utils, components)
- Use Nuxt UI components (`UButton`, `UTextarea`, `USelect`, etc.) — do not install other UI libs
- Icons: `@iconify-json/lucide` and `@iconify-json/simple-icons`, referenced as `i-lucide-*` / `i-simple-icons-*`
- Formatting: Prettier (trailing commas: all, printWidth: 120). ESLint stylistic disabled
- API key via `runtimeConfig.aiGatewayApiKey` (set `NUXT_AI_GATEWAY_API_KEY` env var)
- Primary color: green, neutral: slate (defined in `app/app.config.ts`)
