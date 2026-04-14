# AGENTS.md — seiren-ohaka-navi

> Applies to: Claude Code, Codex, Antigravity
> Compact pointer contract. Full policy lives in `.claude/rules/` and `docs/ai/`.

---

## Core rules
- Plan-first
- Minimal diff
- No unrelated refactor

## Data integrity (CRITICAL)
- DO NOT modify municipality data arbitrarily
- DO NOT overwrite existing links incorrectly
- DO NOT change PDF handling logic
- DO NOT change data normalization rules

## SEO protection
- DO NOT change meta tags
- DO NOT modify canonical URLs
- DO NOT alter structured data
- DO NOT break routing or URL structure

## Link safety
- DO NOT move PDF URLs into wrong fields
- DO NOT mix guide links and PDF links
- Respect: pdfUrl vs url separation rules

## Agent boundaries
- implementation → coding only
- audit → analysis only
- explorer → investigation only

## Context isolation
- repo-only scope
- no cross-project references

## Stop conditions (STRICT)
- municipality data inconsistency detected
- link mapping unclear (PDF vs URL)
- normalization logic conflict
- SEO structure change required
- multiple modules impacted
- requirements unclear
→ STOP and ask before proceeding

## Read Order

1. `CLAUDE.md` — commands, pnpm, Prisma v7 + Supabase + Stripe, Next.js 15 stack
2. `docs/ai/` — workspace overview, architecture summary, execution contract
3. `.claude/rules/` — load the rules relevant to the current task
4. `.claude/skills/` — load the skills relevant to the current task

---

## Skill Layers

| Layer | Path | Role |
|-------|------|------|
| Always-on core shelf | `.claude/skills/` | 7 core skills — canonical |
| Compatibility bridge | `.agents/skills` → `.claude/skills` | for tools resolving `.agents/` |
| Runtime shelf | `.claude/skills-runtime/` | task-scoped, load on demand |
| Legacy migration source | `.agent/` | NOT active — reference only |

---

## Core Shelf (7 skills)

| Skill | Trigger |
|-------|---------|
| `commit-writer` | Any commit |
| `bugfix-flow` | Any bug investigation |
| `implementation-flow` | Any feature implementation |
| `ui-qa-check` | Any UI change or review |
| `docs-writer` | Any documentation task |
| `handoff-flow` | Session end or agent switch |
| `db-safe-update` | Any DB / auth / migration / payment change |

Note: `db-safe-update` replaces `schema-markup` as always-on (Prisma + Supabase + Stripe).
`schema-markup` is available as a runtime skill.

---

## Key Operating Rules

**Implementation flow**: Analysis → Plan → Approval → Execution → Verification.

**Completion**: Requires file paths, diff, verification output, and skill usage report.

**Commits**: `pnpm typecheck && pnpm lint` before committing. Conventional commit format.

---

## Stack Highlights (from CLAUDE.md)

- Next.js 15 / React 19 / TypeScript 5 / Tailwind v4 / pnpm (Node ≥20)
- Prisma v7 with pg adapter — singleton in `src/lib/prisma.ts`
- `pnpm build` = `prisma generate && next build`
- Supabase Auth SSR — use `getUser()` not `getSession()`
- Supabase RLS on all user-data tables
- Stripe webhook: `constructEvent()` required server-side
- Cloudflare Turnstile on all user-facing forms
