---
name: bugfix-flow
description: Use for any bug investigation, unexpected behavior, build failure, or runtime error. Mandates root cause investigation before any fix. Covers Next.js, Prisma v7, Supabase Auth, Stripe, and Framer Motion patterns.
---

# Bugfix Flow

## When to Use

Use for: bug reports, test failures, unexpected behavior, runtime errors, build failures, type errors. Do not skip to a fix without root cause investigation.

**Iron Law: no fix without root cause.**

## Workflow

**Phase 1 — Reproduce**
1. Identify the exact error message or symptom
2. Confirm reproduction steps
3. Identify which component, route, action, or query is involved

**Phase 2 — Investigate**
1. Read the affected file before editing
2. Run: `pnpm typecheck && pnpm lint`
3. Form a specific hypothesis

**Phase 3 — Implement the fix**
Smallest change that fixes the root cause. No surrounding refactor.

**Phase 4 — Verify**
```bash
pnpm typecheck && pnpm lint && pnpm build
```

## Common Error Patterns

**Prisma v7 (pg adapter)**
- Build failure after schema change → `npx prisma generate` then `pnpm build`
- `Cannot read properties of undefined` → check pg adapter singleton in `src/lib/prisma.ts`

**Supabase Auth**
- Session not found → use `getUser()` not `getSession()`
- PKCE flow issues → check `createServerClient` cookieStore config

**Framer Motion**
- Hydration error → add `"use client"` directive
- `AnimatePresence` not working → add `key` prop to children

**Three.js**
- SSR error → use `dynamic(() => import(...), { ssr: false })` + `<Suspense>`

**Stripe**
- Webhook not verified → check `constructEvent()` is called server-side
