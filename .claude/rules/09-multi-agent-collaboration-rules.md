# 09 — Multi-Agent Collaboration Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity

## Agent Routing

| Task type | Preferred agent |
|-----------|----------------|
| Feature implementation, code edits | Claude Code or Codex |
| High-level planning, orchestration | Antigravity |
| Browser verification, UI inspection | Codex (isolated Chrome DevTools MCP) |
| Final verification | Codex only |

Antigravity must not perform final verification. This is a hard rule.

## Handoff Protocol

When handing off between agents or sessions:
1. Load `handoff-flow` skill
2. Summarize: current state, what was completed, what is next
3. List files modified in this session
4. Note which skills were active

## Shared Context Boundaries

- Each agent session starts with: CLAUDE.md → AGENTS.md → relevant `.claude/rules/` files
- Do not assume the other agent read the same context
- When picking up another agent's work, run `pnpm typecheck && pnpm lint` before continuing
- Do not silently undo another agent's changes without documenting why
