---
name: db-safe-update
description: Use for any database schema change, migration, Supabase Auth change, or Stripe integration change. Enforces safe migration patterns using Prisma v7 (pg adapter) and prevents data loss.
---

# DB Safe Update

## When to Use

Use for: Prisma schema changes, database migrations, Supabase RLS changes, auth flow changes, Stripe webhook changes. Any change touching persistence, authentication, or payment state.

## Workflow

**Step 1 — Understand current state**
Read the current `prisma/schema.prisma` before making changes.

**Step 2 — Plan the migration**
- Additive (safe): new tables, nullable columns, new indexes
- Destructive (requires user approval): DROP COLUMN, DROP TABLE, NOT NULL without default

**Step 3 — Implement schema changes**
```bash
# After editing prisma/schema.prisma:
npx prisma generate
npx prisma migrate dev --name <descriptive-name>
pnpm build    # runs prisma generate + next build
```

**Step 4 — Verify RLS**
After any Supabase table change:
- Confirm RLS is enabled on the table
- `anon` role does not have excessive permissions
- `authenticated` role has correct CRUD permissions

**Step 5 — Verify Auth**
For Supabase Auth changes:
- Use `getUser()` not `getSession()`
- Test login, logout, session persistence

**Step 6 — Verify Stripe**
For Stripe changes:
- `constructEvent()` still called on webhook route
- Payment status verified server-side only
- No card data stored in DB

**Step 7 — Run verification**
```bash
pnpm typecheck && pnpm lint && pnpm build
```

## Safety Rules

1. Never run destructive migration without explicit user approval
2. Never edit the generated Prisma client
3. Always use the global pg-adapter singleton (`src/lib/prisma.ts`)
4. Never expose Supabase service role key to the client
5. `.env.local` holds all secrets — never commit
