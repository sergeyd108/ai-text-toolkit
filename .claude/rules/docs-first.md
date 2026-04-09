---
description: Always fetch fresh library documentation before using any API
---

# Docs First

Do NOT rely on your training knowledge for library/framework APIs — it may be outdated.

Before using any library API (Nuxt, Nuxt UI, Vercel AI SDK, Tailwind, Zod, Pinia, VueUse, etc.):

1. Spawn a `doc-supplier` agent to fetch current documentation
2. Use the fetched docs to write correct, up-to-date code

This applies to: component props, composable signatures, server utilities, config options, SDK methods — anything that could have changed between versions.
