# global-rules.md — seiren-ohaka-navi

> グループ: **A（清蓮 / Seiren）**  
> 最終更新: 2026-03-19

---

## 1. ブランドアイデンティティ

### カラーシステム

| 役割 | HEX | 用途 |
|------|-----|------|
| メインカラー | `#3399CC` | CTA・リンク・プライマリ |
| アクセント | `#D98CB3` | 感情訴求・アクセント |
| サポート | `#99CC66` | 区切り・補助 |
| 背景 | `#FFFFFF` | メイン背景 |
| 本文テキスト | `#1A1A1A` | 本文 |

> このプロジェクトはTailwind CSS v4を使用。Tailwindのカスタムカラーは `@theme` ディレクティブで定義する。

### ブランドトーン
- 「安心して任せられる専門家」としての信頼感と温かみ
- お墓・葬送関連のデリケートなテーマに配慮した言葉選び
- AI感・テンプレート感のある表現は禁止

---

## 2. デザインシステム

### 基本方針
- **水彩調・滲み感**を意識したやわらかいビジュアル
- 余白大きめ、情報密度は低めに保つ
- `rounded-2xl` 以上のボーダーラジウスを基本とする
- ボックスシャドウは薄く自然に（`shadow-sm` / `shadow-md`）

### Tailwind v4 カラー定義
```css
/* app/globals.css */
@theme {
  --color-seiren-blue: #3399CC;
  --color-seiren-pink: #D98CB3;
  --color-seiren-green: #99CC66;
  --color-surface: #F5F8FA;
  --color-text-base: #1A1A1A;
  --color-text-muted: #5F6B75;
}
```

---

## 3. アニメーション（Framer Motion v12）

このプロジェクトは `framer-motion@^12` を使用。

### 必須パターン：ゆっくりとした浮き上がり + フェード

```tsx
// lib/motion.ts — 共通バリアント定義
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
}

export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}
```

```tsx
// 使用例
import { motion } from "framer-motion"
import { fadeUp, stagger } from "@/lib/motion"

<motion.section variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <motion.h2 variants={fadeUp}>見出し</motion.h2>
  <motion.p variants={fadeUp}>テキスト</motion.p>
</motion.section>
```

### 禁止パターン
- `duration` 0.3秒未満のアニメーション
- 横スライドイン（水平移動は原則禁止）

---

## 4. フォント

```tsx
// app/layout.tsx
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
```

| 要素 | フォント |
|------|---------|
| `h1`, `h2` | Noto Serif JP（明朝・格調）|
| `h3`以下・本文 | Noto Sans JP（ゴシック・可読性）|

---

## 5. SEO / GEO（地域SEO）

### 最優先エリア
横浜市 / 川崎市 / 鎌倉市 / 藤沢市 / 逗子市 / 葉山町 / 茅ヶ崎市 / 熱海市

### メタ情報ルール
- `<title>` に必ずエリア名＋サービス名を含める
- `og:description` は各ページ固有の内容（共通文言の流用禁止）
- ページURLには日本語を使わず、ローマ字またはエリア英語名で統一

---

## 6. 技術スタック最適化パターン

**スタック**: Next.js 15 / React 19 / Framer Motion v12 / Prisma v7 / Supabase / Tailwind CSS v4

### Server Components 優先
```tsx
// クライアント処理が必要な場合のみ "use client" を付与
// データフェッチはServer Componentで完結させる
```

### Prisma v7（pg アダプター使用）
```ts
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
export const prisma = new PrismaClient({ adapter })
```

### Supabase SSR認証
```ts
import { createServerClient } from "@supabase/ssr"
// cookieStoreを使った正規パターンのみ使用
// クライアント側での直接セッション操作は禁止
```

### フォームバリデーション
```tsx
// react-hook-form + zod でスキーマ定義を一元管理
import { zodResolver } from "@hookform/resolvers/zod"
```

---

## 7. コンポーネント設計ルール

- `src/components/ui/` → 汎用UIコンポーネント
- `src/components/features/` → ビジネスロジックを含むコンポーネント
- `src/app/` → Page / Layout のみ
- `any` 型の使用禁止
- `console.log` の本番コードへの混入禁止
- 画像は `next/image` を必ず使用（`<img>` タグ直接使用禁止）

---

## 8. Stripe 決済ルール

```ts
// webhook signature を必ず検証
const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
// 冪等性を保証するため、イベントIDによる重複処理防止を実装すること
```

---

## 9. アニメーション アクセシビリティ基準（2026追加）

### useReducedMotion 必須ルール

**すべてのアニメーションコンポーネントに `useReducedMotion` を実装すること。**

```tsx
// lib/motion.ts
import { useReducedMotion } from "framer-motion"

export function useMotionSafe() {
  const prefersReduced = useReducedMotion()
  return !prefersReduced
}
```

```tsx
// 使用例
"use client"
import { motion, useReducedMotion } from "framer-motion"

export function FadeUp({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      transition={prefersReduced ? {} : { duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}
```

### Suspense による重エフェクトの遅延

```tsx
import { Suspense } from "react"
import dynamic from "next/dynamic"

const HeavyEffect = dynamic(() => import("@/components/HeavyEffect"), { ssr: false })

export function Section() {
  return (
    <Suspense fallback={<div className="animate-pulse bg-seiren-blue/10 h-64 rounded-2xl" />}>
      <HeavyEffect />
    </Suspense>
  )
}
```

### パフォーマンス基準
- LCP要素にアニメーションを付けることは禁止
- `will-change: transform` は必要な要素のみ（多用禁止）
- Lighthouse Performance スコア 90+ を維持すること

---

## Tailwind CSS v4 アニメーション定義（2026追加）

> このプロジェクトはTailwind CSS v4（`@tailwindcss/postcss`使用）のため、`globals.css` に直接定義する。

### app/globals.css への追記

```css
/* =============================================
   2026: Shimmer・Floating・Glow アニメーション
   ============================================= */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

@keyframes floating {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}

@keyframes floating-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-5px) rotate(0.4deg); }
  66%       { transform: translateY(-2px) rotate(-0.3deg); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(0, 64, 255, 0.3); }
  50%       { box-shadow: 0 0 24px rgba(0, 64, 255, 0.7); }
}

@keyframes slide-in-left {
  0%   { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

/* =============================================
   Shimmer グラデーション共通ユーティリティ
   スケルトンUIに適用: className="animate-shimmer shimmer-bg"
   ============================================= */
@utility shimmer-bg {
  background: linear-gradient(
    90deg,
    theme(colors.gray.200) 25%,
    theme(colors.gray.100) 50%,
    theme(colors.gray.200) 75%
  );
  background-size: 200% 100%;
}

/* ============
   アニメーション
   ============ */
@utility animate-shimmer       { animation: shimmer 1.8s linear infinite; }
@utility animate-floating      { animation: floating 3.5s ease-in-out infinite; }
@utility animate-floating-slow { animation: floating-slow 8.0s ease-in-out infinite; }
@utility animate-glow-pulse    { animation: glow-pulse 2.5s ease-in-out infinite; }
@utility animate-slide-in-left { animation: slide-in-left 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
```

### 使用例

```tsx
// スケルトンローディング
<div className="animate-shimmer shimmer-bg h-48 rounded-lg" />

// 浮遊するアイコン・バッジ
<div className="animate-floating">
  <Icon />
</div>

// CTAボタンのグロー
<button className="animate-glow-pulse bg-brand-primary text-white px-6 py-3 rounded-lg">
  今すぐ始める
</button>
```

