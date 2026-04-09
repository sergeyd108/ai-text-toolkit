---
description: Nuxt 4 and Nuxt UI v4 patterns and conventions for this project
globs:
  - app/**
  - server/**
  - nuxt.config.ts
---

# Nuxt Patterns

## Nuxt 4

- App code lives in `app/` directory (pages, features, components, stores, utils, assets)
- Server code lives in `server/` directory (api, assets, utils, schemas)
- Use `defineNuxtConfig`, `definePageMeta`, `defineAppConfig` — all auto-imported
- Single page app: `app/pages/index.vue` → `/`

## Nuxt UI v4

- All components are auto-imported with `U` prefix: `UButton`, `UTextarea`, `USelect`, `UCard`, `UModal`, etc.
- Layout components: `UApp`, `UHeader`, `UMain`, `UFooter`, `UPage*`
- Use `color` and `variant` props for styling (not custom classes on UI components)
- Dark mode handled automatically via `UColorModeButton`

## Server API

- API routes use file naming: `server/api/ai/generate.post.ts` handles POST `/api/ai/generate`
- Export `defineEventHandler` (auto-imported in server context)
- Read body with `readBody(event)`, validate with Zod
- Access runtime config with `useRuntimeConfig(event)`

## Vercel AI SDK

- Server: `streamText` from `ai` package via Vercel AI Gateway
- Client (chat): `Chat` class from `@ai-sdk/vue` in `app/features/chat/use-ai-chat.ts`
- Client (tools): custom `use-ai-tool.ts` composable with fetch + TextDecoder streaming
- Chat endpoint returns `toUIMessageStreamResponse()`, generate endpoint returns `toTextStreamResponse()`
