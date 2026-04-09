# AI Text Toolkit

Single-page AI text editor with real-time streaming, context-aware chat, and version history.

Built with **Nuxt 4**, **Tiptap**, **Vercel AI SDK v6**.

<!-- **[Live Demo](https://ai-text-toolkit.vercel.app)** -->

## Concept

Three-panel workspace on a single page:

- **Editor** — Tiptap rich editor with inline AI tools. Select text, pick a tool (summarize, rewrite, translate, fix grammar, change tone) — the result streams in and replaces the selection. Works on selection or full document.
- **Chat** — AI assistant that sees your document. Ask questions or request edits, then apply the response into the editor in one click.
- **History** — every change is a checkpoint with before/after diff. Restore any version.

All AI responses stream token-by-token via SSE.

## Tech Stack

Nuxt 4 | Nuxt UI v4 | TypeScript | Tailwind CSS v4 | Tiptap | Vercel AI SDK v6 | Vercel AI Gateway | Pinia | Zod | diff2html | Marked + DOMPurify

## Streaming Flow

```
Select text → pick tool → POST /api/ai/generate { tool, prompt }
  → server loads prompt template from server/assets/prompts/{tool}.md
  → streamText() via AI Gateway → SSE → editor replaces selection live
  → checkpoint saved to history
```

Chat (`/api/ai/chat`) works the same way but carries full message history and injects the document as context.

## Project Structure

```
app/
  pages/index.vue                # Single workspace page
  features/
    editor/                      # Tiptap editor, AI tools, bubble menu
    chat/                        # Chat UI + composable
    history/                     # Timeline, diff viewer, restore
  stores/history.ts              # Pinia: checkpoints (max 50)
server/
  api/ai/generate.post.ts       # Streaming text generation
  api/ai/chat.post.ts           # Streaming chat
  assets/prompts/*.md            # System prompts with {{variable}} templates
```

## Setup

Requires **Node.js 22+** and **pnpm 10+**.

```bash
git clone https://github.com/sergeyd108/ai-text-toolkit.git
cd ai-text-toolkit
pnpm install
```

Create `.env`:

```env
NUXT_AI_GATEWAY_API_KEY=your_key   # Vercel AI Gateway
NUXT_AI_MODEL=meta/llama-3.1-8b    # any gateway-supported model
```

```bash
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint       # ESLint
pnpm typecheck  # TypeScript check
```

## CI/CD

GitHub Actions → Vercel, two-stage pipeline:

```
push (any branch)  → lint + typecheck
push to main       → lint + typecheck → vercel deploy --prod
PR to main         → lint + typecheck → vercel deploy (preview) → PR comment with URL
```

GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
AI env vars configured in the Vercel dashboard.

## Key Decisions

- **Single page** — no routing friction for a tool-type app
- **Feature-based structure** — `editor/`, `chat/`, `history/` are self-contained modules, not split by file type
- **Custom Tiptap extensions** — loading dots animation (ProseMirror decoration) and Markdown paste handler, both at the ProseMirror plugin level
- **Prompts as Markdown files** — iterate on prompts without touching code, template variables for options (`{{language}}`, `{{tone}}`)
- **AI Gateway** — swap LLM providers by changing one env var
- **Checkpoint history** — before/after snapshots instead of a full undo tree

## Developer Tooling (Claude Code)

AI-assisted development via [Claude Code](https://docs.anthropic.com/en/docs/claude-code). All config committed — works out of the box after clone.

- **`.claude/CLAUDE.md`** — main instructions: tech stack, conventions, project structure
- **`.claude/rules/`** — scoped rules (docs-first, nuxt patterns, type extraction, VueUse preference, feature spec)
- **`.claude/agents/doc-supplier.md`** — subagent that fetches library docs via MCP before writing code, caches results in `.cache/docs/`
- **`.claude/settings.json`** — hooks: auto-format on edit (`pnpm fmt`), force-read before creating new files in scoped paths

### MCP Servers (`.mcp.json`)

- **Serena** — semantic code navigation (symbols, references, rename)
- **DeepWiki** — AI-generated docs for any GitHub repo
- **Docfork** — indexed official library documentation
