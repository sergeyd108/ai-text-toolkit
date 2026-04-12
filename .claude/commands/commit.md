---
description: Create a conventional git commit
allowed-tools: Bash(git add:*), Bash(git commit:*), Bash(git diff:*)
context: fork
model: haiku
---

## Format

```
<type>(<scope>): <subject>

- <change 1>
- <change 2>
```

- Subject: lowercase, imperative mood
- Scope: only when it adds clarity
- Body: bullet list of changes. Omit body if only one change.
- Do NOT add `Co-Authored-By`

## Steps

1. Run `git add -A`
2. Run `git diff --staged`
3. Run `git commit -m "..."` — describe ONLY what the diff from step 2 shows

IMPORTANT: No text output. Only tool calls.
