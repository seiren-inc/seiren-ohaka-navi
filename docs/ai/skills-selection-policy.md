# Skills Selection Policy

> Local pointer. Full policy: `/Users/takumashinnyo/workspace/projects/docs/ai/skills-selection-policy.md`

## Core Shelf (7 skills — always-on)

Located in `.claude/skills/`:

| Skill | Trigger |
|-------|---------|
| `commit-writer` | Any commit |
| `bugfix-flow` | Any bug investigation |
| `implementation-flow` | Any feature implementation |
| `ui-qa-check` | Any UI change or review |
| `docs-writer` | Any documentation task |
| `handoff-flow` | Session end or agent switch |
| `db-safe-update` | Any DB / auth / payment change |

**Deviation from standard web shelf**: `db-safe-update` replaces `schema-markup` as always-on because database operations (Prisma migrations, Supabase RLS, Stripe webhooks) are core daily work in this repo. `schema-markup` is available in the runtime shelf.

## Runtime Shelf

See `.claude/skills-runtime/README.md` for the full catalog.

## Legacy Source

Local `.agent/skills/` is legacy migration source only. Do not treat as active.
