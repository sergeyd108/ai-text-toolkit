---
description: Create a conventional git commit
allowed-tools: Bash(git add:*), Bash(git commit:*), Bash(git diff:*)
context: fork
model: sonnet
---

## Format

```
<type>(<scope>): <subject>

- <change 1>
- <change 2>

BREAKING CHANGE: <description>
```

### Types

| Type       | When to use                                   |
| ---------- | --------------------------------------------- |
| `feat`     | New functionality                             |
| `fix`      | Bug fix                                       |
| `docs`     | Documentation only                            |
| `style`    | Formatting, whitespace, semicolons (no logic) |
| `refactor` | Code restructuring (no feat, no fix)          |
| `perf`     | Performance improvement                       |
| `test`     | Adding or updating tests                      |
| `build`    | Build system or external dependencies         |
| `ci`       | CI/CD configuration                           |
| `chore`    | Maintenance tasks (.gitignore, configs, etc.) |
| `revert`   | Reverting a previous commit                   |
| `ai`       | AI context configuration (.claude/)           |

### Rules

- Subject: lowercase, imperative mood, no period
- Scope: only when it adds clarity (e.g. `auth`, `ui`, `api`, `core`, `deps`)
- Body: bullet list of changes. Omit body if only one change.
- Footer: add `BREAKING CHANGE: <what changed>` when introducing incompatible changes
- Do NOT add `Co-Authored-By`

## Steps

1. Run `git add -A`
2. Run `git diff --staged`
3. Run `git commit -m "..."` — describe ONLY what the diff from step 2 shows

IMPORTANT: No text output. Only tool calls.
