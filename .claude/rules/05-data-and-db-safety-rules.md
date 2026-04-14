# 05 — Data and DB Safety Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity
> DB stack: Prisma v7 (pg adapter) + Supabase PostgreSQL + Supabase Auth SSR + Stripe

## Prisma Rules

1. After any schema change: `npx prisma generate && npx prisma migrate dev --name <name>`
2. Never edit the generated Prisma client directly.
3. Use the global Prisma singleton with pg adapter — never instantiate `new PrismaClient()` outside `src/lib/prisma.ts`.
4. Never commit migrations without reviewing them first.
5. Destructive migrations (DROP COLUMN, DROP TABLE) require explicit user approval.
6. `pnpm build` runs `prisma generate` — always confirm build passes after schema changes.

## Supabase Auth Rules

1. Always use `getUser()` — never `getSession()` (deprecated, insecure).
2. Use `createServerClient` from `@supabase/ssr` with correct `cookieStore`.
3. RLS must be enabled on all user-data tables.
4. Never grant the `anon` role excessive permissions on user-scoped tables.

## Stripe Rules

1. Always verify Stripe Webhook signatures with `constructEvent()`.
2. Never trust client-side payment status — verify server-side via the Stripe API.
3. Store only Stripe customer/subscription IDs in the database, not card data.

## Security Rules

1. `.env.local` holds all secrets. Never commit to git.
2. Upstash Rate Limit must be applied to all API routes.
3. Cloudflare Turnstile: required on all user-facing forms; validate `CLOUDFLARE_TURNSTILE_SECRET_KEY` server-side.

## Structured Data (SEO)

1. Use JSON-LD only — no Microdata or RDFa.
2. Schema must match displayed content exactly. No dummy values.
3. Required base fields: `@context`, `@type`, `@id`, `url`, `name`, `description`, `inLanguage`.
4. Validate with Rich Results Test before release.
