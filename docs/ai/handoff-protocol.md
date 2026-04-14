# Handoff Protocol

> For the handoff workflow, use `.claude/skills/handoff-flow/SKILL.md`

## Standard Handoff Checklist

- [ ] `pnpm typecheck` passes (or failures documented)
- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] No uncommitted changes that should be committed
- [ ] No pending Prisma migrations left unapplied
- [ ] Active skills listed; next steps documented

## Re-entry Protocol

1. Read the handoff note in full
2. Run `pnpm typecheck && pnpm lint`
3. Check `git status` for uncommitted changes
4. Load relevant `.claude/skills/` for the next task
5. Do not assume the previous agent's context — verify independently
