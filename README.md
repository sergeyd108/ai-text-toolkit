# AI Text Toolkit

AI text editor with real-time streaming, context-aware chat, and version history. Landing page + workspace.

Built with **Nuxt 4**, **Tiptap**, **Vercel AI SDK v6**.

<!-- **[Live Demo](https://ai-text-toolkit.vercel.app)** -->

## How It Works

Landing page (`/`) introduces the product → workspace (`/workspace`) has three panels:

1. **Write** — type or paste text into the rich editor
2. **AI Tools** (summarize, rewrite, translate, fix grammar, change tone) — available from the toolbar (applies to full document) and from the bubble menu on text selection (applies to selection). Result streams in-place
3. **Chat** — ask the AI about your text or request edits → apply the response into the editor in one click
4. **History** — every change creates a checkpoint with before/after diff. Restore any version

All AI responses stream token-by-token via SSE.

## Tech Stack

Nuxt 4 | Nuxt UI v4 | TypeScript | Tailwind CSS v4 | SCSS | Tiptap | Vercel AI SDK v6 | Vercel AI Gateway | Pinia | Zod | Vitest | diff2html | Marked + DOMPurify

## Streaming Flow

```
Select text → pick tool → $fetch('/api/ai/generate', { responseType: 'stream' })
  → server loads prompt template from server/assets/prompts/{tool}.md
  → streamText() via AI Gateway → SSE → editor replaces selection live
  → checkpoint saved to history
```

Chat (`/api/ai/chat`) works the same way but carries full message history and injects the document as context.

View transitions animate the landing → workspace navigation.

## Project Structure

```
app/
  pages/index.vue                # Landing page (/)
  pages/workspace.vue            # Workspace page (/workspace)
  layouts/
    landing.vue                  # Bare layout for landing page
    default.vue                  # Header + footer layout for workspace
  features/
    landing/                     # Landing page sections, data, styles (BEM + SCSS)
    editor/                      # Tiptap editor, AI tools, bubble menu
    chat/                        # Chat UI + composable
    history/                     # Timeline, diff viewer, restore
  stores/history.ts              # Pinia: checkpoints (max 50)
  stores/editor.ts               # Pinia: editor content state
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
pnpm dev            # http://localhost:3000
pnpm build          # production build
pnpm preview        # preview production build locally
pnpm test           # run unit tests
pnpm test:watch     # run tests in watch mode
pnpm lint           # ESLint check
pnpm lint:fix       # ESLint auto-fix
pnpm fmt            # Prettier format
pnpm typecheck      # TypeScript check
pnpm pkg:up:minor   # update deps (minor)
pnpm pkg:up:major   # update deps (major)
```

## CI/CD

GitHub Actions → Vercel, two-stage pipeline:

```
push (any branch)  → lint + typecheck + test
push to main       → lint + typecheck + test → vercel deploy --prod
PR to main         → lint + typecheck + test → vercel deploy (preview) → PR comment with URL
```

GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
AI env vars configured in the Vercel dashboard.

## Key Decisions

- **Two pages** — landing (`/`) for product intro, workspace (`/workspace`) for the actual editor; view transitions between them
- **Feature-based structure** — `landing/`, `editor/`, `chat/`, `history/` are self-contained modules, not split by file type
- **BEM + SCSS for landing** — landing page uses BEM methodology with SCSS; workspace uses Tailwind utilities
- **Custom Tiptap extensions** — loading dots animation (ProseMirror decoration) and Markdown paste handler, both at the ProseMirror plugin level
- **Prompts as Markdown files** — iterate on prompts without touching code, template variables for options (`{{language}}`, `{{tone}}`)
- **AI Gateway** — swap LLM providers by changing one env var
- **Checkpoint history** — before/after snapshots instead of a full undo tree

## Developer Tooling (Claude Code)

AI-assisted development via [Claude Code](https://docs.anthropic.com/en/docs/claude-code). All config committed — works out of the box after clone.

- **`.claude/CLAUDE.md`** — main instructions: tech stack, conventions, project structure
- **`.claude/rules/`** — scoped rules (docs-first, nuxt patterns, type extraction, VueUse preference, feature spec)
- **`.claude/commands/commit.md`** — `/commit` slash command: conventional commits (`type(scope): subject`)
- **`.claude/agents/doc-supplier.md`** — subagent that fetches library docs via MCP before writing code, caches results in `.cache/docs/`
- **`.claude/settings.json`** — hooks: auto-format on edit (`pnpm fmt`), force-read before creating new files in scoped paths

### MCP Servers (`.mcp.json`)

- **Serena** — semantic code navigation (symbols, references, rename)
- **DeepWiki** — AI-generated docs for any GitHub repo
- **Docfork** — indexed official library documentation
