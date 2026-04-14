# 08 — Skill Loading and Context Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity

## Canonical Skill Layer

The canonical always-on skill shelf for this repo is `.claude/skills/`.
This is the only directory that should be treated as the active core shelf.

## Compatibility Bridge

`.agents/skills` is a symlink → `../.claude/skills`.
Do NOT retarget this symlink to `.agent/skills` — that is the legacy migration source.

## Legacy Layer

`.agent/skills/` is a legacy migration source only. NOT active, NOT canonical, must NOT be bulk-loaded.

## Skill Load Order

1. `.claude/skills/` — core shelf, always available (canonical)
2. `.claude/skills-runtime/` — load on-demand for the current task type
3. Workspace `.agent/skills/` — last resort, selective only
4. Local `.agent/skills/` — do NOT load; legacy source only

## Core Shelf (this repo)

| Skill | Trigger |
|-------|---------|
| `commit-writer` | Any commit task |
| `bugfix-flow` | Any bug investigation |
| `implementation-flow` | Any feature implementation |
| `ui-qa-check` | Any UI change or review |
| `docs-writer` | Any documentation task |
| `handoff-flow` | Session end or agent switch |
| `db-safe-update` | Any DB, auth, migration, or payment change |

`db-safe-update` replaces `schema-markup` as always-on for this repo because database operations (Prisma migrations, Supabase RLS, Stripe webhooks) are core daily work. Schema markup tasks use the `schema-markup` runtime skill.

## Context Budget

Default max active skills: 3 per task. Never load the full vault for a task.
