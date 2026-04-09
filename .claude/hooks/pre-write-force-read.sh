#!/usr/bin/env bash
set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

[[ -z "$FILE_PATH" ]] && exit 0

# Only block if file doesn't exist (pure creation)
# Overwrites of existing files pass through normally
[[ -f "$FILE_PATH" ]] && exit 0

# Resolve project root from script location
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
RULES_DIR="$PROJECT_ROOT/.claude/rules"

# If no rules directory, allow
[[ ! -d "$RULES_DIR" ]] && exit 0

# Make file path relative to project root
REL_PATH="${FILE_PATH#"$PROJECT_ROOT"/}"

# If path is still absolute (file outside project), allow
[[ "$REL_PATH" == /* ]] && exit 0

# Collect glob patterns from scoped rule files (those with paths frontmatter)
PATTERNS=()
while IFS= read -r -d '' rule_file; do
  # Check if file starts with frontmatter delimiter
  first_line=$(head -1 "$rule_file")
  [[ "$first_line" != "---" ]] && continue

  # Parse frontmatter for paths array
  in_paths=false
  while IFS= read -r line; do
    [[ "$line" == "---" ]] && break

    if [[ "$line" =~ ^paths:[[:space:]]*$ ]]; then
      in_paths=true
      continue
    fi

    if $in_paths; then
      if [[ "$line" =~ ^[[:space:]]*-[[:space:]]*(.+)$ ]]; then
        pattern="${BASH_REMATCH[1]}"
        # Strip surrounding quotes and trailing whitespace
        pattern="${pattern#\"}"
        pattern="${pattern%\"}"
        pattern="${pattern#\'}"
        pattern="${pattern%\'}"
        pattern="${pattern%"${pattern##*[![:space:]]}"}"
        PATTERNS+=("$pattern")
      else
        # Non-list line means paths array ended
        in_paths=false
      fi
    fi
  done < <(tail -n +2 "$rule_file")
done < <(find "$RULES_DIR" -name '*.md' -print0)

# No scoped rules found → allow creation
[[ ${#PATTERNS[@]} -eq 0 ]] && exit 0

# Match file path against collected glob patterns using Node.js
PATTERNS_JSON=$(printf '%s\n' "${PATTERNS[@]}" | jq -R . | jq -s .)

MATCH=$(python3 -c "
import sys, json
from pathlib import PurePath

patterns = json.loads(sys.argv[1])
fp = PurePath(sys.argv[2])
print('yes' if any(fp.match(p) for p in patterns) else 'no')
" "$PATTERNS_JSON" "$REL_PATH")

# File doesn't match any scoped rule → allow creation freely
[[ "$MATCH" != "yes" ]] && exit 0

# File matches scoped rules → deny, force read first
mkdir -p "$(dirname "$FILE_PATH")"
touch "$FILE_PATH"

cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "File '${FILE_PATH}' did not exist. It was created empty. You MUST Read this file first (to load rules), then Write/Edit with the discovered rules."
  }
}
EOF
