---
description: Feature specification — tools, workspace layout, streaming flow, and history
globs:
  - app/**
  - server/**
---

# Feature Spec

## AI Tools

5 text tools, each defined in `app/features/editor/ai-tools.ts` with: slug, name, description, icon, placeholder, optional options.

1. **Summarize** (`summarize`) — Condense long text into key points
2. **Rewrite** (`rewrite`) — Rephrase text while preserving meaning
3. **Translate** (`translate`) — Translate to a selected language (Russian, English, Latvian, Hebrew)
4. **Change Tone** (`tone`) — Rewrite in a different tone (Formal, Casual, Professional, Friendly, Persuasive, Humorous)
5. **Fix Grammar** (`grammar`) — Fix grammar, spelling, and punctuation

## Workspace (`/`)

Single page with three panels:

- **Editor** (left) — Tiptap rich editor with:
  - FormattingToolbar (bold, italic, lists, blockquote)
  - AiToolsBubbleMenu — select text, pick a tool, result streams in-place
  - AiFullTextTools — apply tools to the entire document from the toolbar
  - Custom extensions: animated loading dots, Markdown paste handler
- **Chat** (right) — Context-aware AI assistant:
  - Sees the current document content via `{{context}}` in system prompt
  - Chat messages with copy/apply actions
  - "Apply" inserts the response into the editor
- **History** (below) — Checkpoint timeline:
  - Up to 50 checkpoints (tool, chat, manual edit, restore)
  - View side-by-side diff (diff2html)
  - Restore any previous version

## Streaming Flow

1. **Tools**: User triggers tool → `use-ai-tool.ts` POSTs to `/api/ai/generate` with `{ tool, prompt, options? }` → server loads prompt template, calls `streamText()` → SSE back → editor replaces selection/document live → checkpoint saved
2. **Chat**: User sends message → `use-ai-chat.ts` uses `@ai-sdk/vue` `Chat` class → POST to `/api/ai/chat` with `{ tool: 'chat', messages, options: { context } }` → server streams via `toUIMessageStreamResponse()` → messages render as they arrive

## Server Prompts

System prompts stored as Markdown in `server/assets/prompts/{tool}.md`. Template variables (`{{language}}`, `{{tone}}`, `{{context}}`) are substituted at runtime by `server/utils/prompts.ts`.
