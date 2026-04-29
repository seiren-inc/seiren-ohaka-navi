# Navbar Performance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 全ページ共通で読み込まれる `Navbar` のクライアント JS を減らし、モバイル中心の初期表示コストを下げる。

**Architecture:** 現在の `Navbar` はデスクトップの hover ドロップダウン、モバイルメニュー、CTA 開閉を 1 つの client component に抱えている。これを「サーバー描画できるデスクトップ領域」と「状態を持つモバイルメニュー」に分け、共通データを定数化して責務を整理する。

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, `next/image`, `lucide-react`

---

### Task 1: ナビゲーション構造を分解する

**Files:**
- Create: `app/components/layout/navbarData.ts`
- Create: `app/components/layout/NavbarDesktop.tsx`
- Create: `app/components/layout/NavbarMobileMenu.tsx`
- Modify: `app/components/layout/Navbar.tsx`

- [ ] 共通リンク定義を `navbarData.ts` に移す
- [ ] デスクトップナビを server component 化し、hover / focus-within ベースでドロップダウンを出す
- [ ] モバイルの開閉だけを client component に切り出す
- [ ] 既存の見た目と導線を保ったまま `Navbar.tsx` を薄い合成コンポーネントにする

### Task 2: 影響確認と回帰防止

**Files:**
- Verify: `app/page.tsx`
- Verify: `app/choices/diagnosis/DiagnosisContent.tsx`
- Verify: `app/components/layout/Navbar.tsx`

- [ ] `pnpm typecheck` を実行して型の破綻がないことを確認する
- [ ] `pnpm build` を実行して App Router / metadata / sitemap まで含めて build が通ることを確認する
- [ ] build 出力の `/` と共通 JS を確認し、今回の変更で悪化していないことを確認する

### Task 3: 次バッチの候補整理

**Files:**
- Inspect: `app/components/features/search/SearchWidget.tsx`
- Inspect: `app/choices/diagnosis/DiagnosisContent.tsx`

- [ ] `SearchWidget` と診断ページの client dependency を次の最適化候補として整理する
- [ ] 追加で `noindex` に寄せるべきページがないかを Search Console 観点で再確認する
