# 03 — Architecture and Stack Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity
> Stack: Next.js 15 / React 19 / TypeScript 5 / Tailwind v4 / pnpm / Prisma v7 (pg adapter) / Supabase / Stripe

## Directory Conventions

```
src/
  app/           ← Pages and layouts only. No business logic.
  components/
    ui/           ← Generic UI components
    common/       ← Shared components (Button, SmoothScroll, etc.)
    features/     ← Feature components with business logic
  lib/            ← Utilities, Prisma singleton, Supabase client
  actions/        ← Server Actions only
  types/          ← Type definitions
```

## Component Rules

- Server Component is the default. Use `"use client"` only for interactivity, animation, or browser APIs.
- Interactive components (forms, modals, carousels) must be Client Components.
- Framer Motion always requires `"use client"` and `key` prop on `AnimatePresence`.
- Three.js: always `dynamic import + ssr: false + <Suspense>`.

## TypeScript Rules

- `any` type is forbidden. Use `unknown` and narrow.
- All functions must have explicit return types.
- Path alias: `@/*` → `./src/*`
- Use `react-hook-form + zod` for form validation.

## Prisma v7 Pattern (pg adapter)

```ts
// src/lib/prisma.ts — global singleton with pg adapter
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
```

After any schema change:
```bash
npx prisma generate
npx prisma migrate dev --name <descriptive-name>
```

`pnpm build` runs `prisma generate && next build` — always confirm build passes after schema changes.

## Supabase Auth

- Use `getUser()` — never `getSession()` (deprecated, insecure)
- Use `createServerClient` from `@supabase/ssr` with correct `cookieStore`
- RLS must be enabled on all user-data tables

## Package Manager

pnpm. Do not use npm or yarn commands in this repo.
