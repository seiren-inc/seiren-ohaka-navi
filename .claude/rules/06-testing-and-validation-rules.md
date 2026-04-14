# 06 — Testing and Validation Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity

## Validation Before Any Commit

Always run in order:
```bash
pnpm typecheck   # TypeScript — fix first
pnpm lint        # ESLint — fix second
pnpm build       # full build (includes prisma generate)
```

## Build Verification

`pnpm build` runs `prisma generate && next build`. Watch for:
- Type errors from Prisma client changes
- Missing env vars at build time
- Server/Client boundary violations
- Prisma schema drift

## Schema Validation (JSON-LD)

After any JSON-LD change:
1. Run Rich Results Test on the affected page
2. Validate via Google Search Console after deployment
3. Confirm H1 / title / schema subject alignment

## Stripe Verification

After any Stripe integration change:
- Confirm `constructEvent()` is still called on webhook routes
- Test payment flow against Stripe test mode before deploying

## What "Verified" Means

A change is verified when:
1. `pnpm typecheck` passes
2. `pnpm lint` passes
3. `pnpm build` passes
4. No visual regressions observed
5. For DB changes: migration reviewed and applied cleanly
6. For payment changes: Stripe test mode verified
