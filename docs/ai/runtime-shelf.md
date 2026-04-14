# Runtime Shelf — seiren-ohaka-navi

> Full policy: `/Users/takumashinnyo/workspace/projects/docs/ai/runtime-shelf.md`

## Always-On Shelf

7 skills in `.claude/skills/`:
`commit-writer`, `bugfix-flow`, `implementation-flow`, `ui-qa-check`,
`docs-writer`, `handoff-flow`, `db-safe-update`

## Runtime Shelf Is Task-Specific

See `.claude/skills-runtime/README.md` for the full grouped catalog.

## Categories That Stay Runtime-Only

| Category | Reason |
|----------|--------|
| Schema markup / SEO audit | Sprint-only; `db-safe-update` takes always-on slot |
| Animation sprints | Periodic, not daily |
| Performance sweeps | Sprint-only |
| Design import (Figma) | Infrequent |
| PDF generation | Task-specific |

## Context Budget

Core: 7 skills. Runtime addition: max 3 per task. Total active: ≤10.
