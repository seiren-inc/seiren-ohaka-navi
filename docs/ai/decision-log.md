# Decision Log — seiren-ohaka-navi

## 2026-04-03 — Agent OS Migration: Phase 2 Rollout

**Context**: Workspace-wide agent OS migration Phase 2 batch rollout. seiren-ohaka-navi is a DB-heavy graveyard service platform (Prisma v7 + Supabase + Stripe), treated as a standard web repo with a DB deviation.

**Decisions**:

1. **`.claude/rules/` created with 9 rule files**
   - Adapted from socialboost reference (standard web pattern)
   - Stack-specific: pnpm, Prisma v7 pg adapter, Supabase Auth, Stripe, Resend, @react-pdf/renderer
   - Rules 02/06 use `pnpm typecheck` (not available in no-typecheck repos)

2. **`.claude/skills/` created with 7 core skills — db-safe-update deviation**
   - Standard 7-skill shelf with one deviation: `db-safe-update` replaces `schema-markup`
   - Rationale: DB operations (Prisma migrations, RLS changes, Stripe webhooks) are core daily work
   - `schema-markup` promoted to runtime shelf for this repo

3. **`.agents/skills` symlink corrected**
   - Previous: `../.agent/skills` (legacy)
   - New: `../.claude/skills` (canonical)

4. **Legacy marker added to `.agent/skills/`**
   - Clear "NOT ACTIVE" marker added
   - Directory preserved for migration reference

5. **`docs/ai/` created with 7 governance documents**
