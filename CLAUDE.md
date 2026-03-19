# CLAUDE.md — seiren-ohaka-navi（技術エージェント向け憲法）

> 最終更新: 2026-03-19 | Package Manager: pnpm | Node: >=20.0.0

---

## コマンド一覧

```bash
pnpm dev           # 開発サーバー起動
pnpm build         # prisma generate && next build
pnpm start         # 本番サーバー起動
pnpm lint          # ESLint
pnpm typecheck     # tsc --noEmit
npx prisma migrate dev    # DBマイグレーション
npx prisma generate       # クライアント生成
```

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| Framework | Next.js 15.x (App Router) |
| React | 19.x |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion v12 / GSAP 3 / Lenis |
| 3D | Three.js / @react-three/fiber / @react-three/drei |
| Database | Prisma v7 + PostgreSQL (pg adapter) + Supabase |
| Auth | Supabase Auth (SSR) |
| Payment | Stripe |
| Mail | Resend |
| PDF | @react-pdf/renderer |

---

## TypeScript 規約

```ts
// ✅ 型定義必須、any禁止
// ✅ Server Component デフォルト
// ✅ react-hook-form + zod でフォームバリデーション
import { zodResolver } from "@hookform/resolvers/zod"

// ✅ Prisma v7 (pg adapter)
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
```

---

## PPR & 画像最適化

```ts
// next.config.ts
experimental: { ppr: true }
images: { formats: ["image/avif", "image/webp"] }
```

---

## セキュリティ

- Supabase RLS を全テーブルに設定
- Cloudflare Turnstile をお問い合わせフォームに実装
- Stripe Webhook signature 検証必須

---

## エラー解決

```bash
# pnpm install 後に型エラー → pnpm typecheck
# Prisma v7 adapter エラー → DATABASE_URL を確認し pnpm build を再実行
# Supabase セッション取得失敗 → getUser() を使用（getSession() 非推奨）
```
