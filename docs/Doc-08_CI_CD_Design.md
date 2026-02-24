# CI/CD & Quality Gate 設計書 — seiren-ohaka-navi

> Project: お墓探しナビ
> Version: v1.0
> 最終更新: 2026-02-24

---

## 0. 目的

本設計書は、
お墓探しナビの品質を自動で守るための
CI/CDおよびQuality Gate設計を定義する。

目標：

1. 壊れたコードをmainに入れない
2. 型エラーゼロ
3. ビルド失敗ゼロ
4. 保存事故ゼロ
5. SEO事故ゼロ

---

## 1. CI全体方針

mainへマージされる前に以下が必ず自動実行される：

- typecheck
- build
- lint
- Test実行
- migration安全性チェック

いずれか失敗 → PRマージ禁止

---

## 2. GitHub Actions設計

### 2.1 ワークフロー

トリガー：
- pull_request
- push to main

### 2.2 実行ステップ

1. Node v22セットアップ
2. 依存インストール（`pnpm install`）
3. Prisma generate
4. 型チェック（`pnpm -w typecheck`）
5. Lint（`pnpm lint`）
6. Build（`pnpm build`）
7. Test実行（`pnpm test`）
8. Migration安全確認（`prisma migrate diff`）

---

## 3. Quality Gate定義

PRマージ条件（必須成功項目）：

- typecheck 成功
- build 成功
- Test成功
- ESLintエラーなし
- console.errorなし
- .envが含まれていない

---

## 4. Migration安全チェック

禁止事項：
- DROP TABLE
- DROP COLUMN
- ALTER TYPE削除
- 既存ENUM変更

`prisma migrate diff` で破壊的変更が検出された場合、CIをFailさせる。

---

## 5. SEO品質ゲート

PR内で以下を検査：

- sitemap.ts 存在確認
- robots.ts 存在確認
- metadata生成関数存在
- canonicalタグ出力確認
- JSON-LD構造生成関数確認

将来的にE2EでHTML解析も導入可。

---

## 6. セキュリティゲート

検査：
- Service Role key使用禁止
- console.logに秘密情報なし
- hardcoded URL禁止

---

## 7. ビルド後検証

- next build成功
- 静的ページ数確認
- 500エラーなし
- Vercel Preview自動生成

---

## 8. main保護設定

GitHub Branch Protection：

- Require PR
- Require status checks
- Require 1 review
- Force push禁止
- Delete branch after merge推奨

---

## 9. デプロイフロー

1. PR作成
2. CI通過
3. レビュー承認
4. mainマージ
5. Vercel自動デプロイ
6. Production確認

---

## 10. 将来拡張

- Lighthouse CI導入
- E2E自動化（Playwright）
- SEOクローラーテスト
- DB整合性自動監査

---

本設計書は、お墓探しナビの品質を自動で守る最終防衛線とする。
