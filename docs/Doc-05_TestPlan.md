# テスト計画書 — seiren-ohaka-navi

> 最終更新: 2026-02-24
> ステータス: 初稿（未実施）

---

## 1. テスト方針

現時点では自動テストは未導入。今後、以下の優先順で導入する。

1. **手動 E2E 確認**（現状のアプローチ）
2. **単体テスト**（ユーティリティ・バリデーション）
3. **統合テスト**（API Route Handler）
4. **E2E テスト**（Playwright 等）

---

## 2. 手動確認チェックリスト

### 2-1. フロントエンド

| ID | 確認内容 | 手順 |
|----|---------|------|
| T-F01 | トップページが正常表示される | `http://localhost:3000/` へアクセス |
| T-F02 | 都道府県セレクター操作でエリアページへ遷移 | トップ → 都道府県を選択 |
| T-F03 | 検索キーワードで霊園カードが表示される | `/search?q=東京` 等にアクセス |
| T-F04 | 霊園詳細ページでプランリストが表示される | `/detail/[id]` でプラン確認 |
| T-F05 | 相談フォームが送信できる | `/consult/grave-search` でフォーム送信 |
| T-F06 | レスポンシブ対応（スマホ幅で崩れない）| DevTools で375px幅確認 |
| T-F07 | OGP / メタタグが各ページに設定されている | DevTools で head 確認 |

### 2-2. 管理画面

| ID | 確認内容 | 手順 |
|----|---------|------|
| T-A01 | 霊園一覧が表示される | `/admin/temples` にアクセス |
| T-A02 | 霊園新規登録が保存される | `/admin/temples/new` で登録 |
| T-A03 | 霊園編集が反映される | 一覧 → 編集 → 保存 → 詳細確認 |
| T-A04 | プランの追加・削除で価格集計が更新される | プラン操作後に霊園一覧で価格確認 |
| T-A05 | 問い合わせ一覧が表示される | `/admin/inquiries` にアクセス |

### 2-3. API

| ID | 確認内容 | コマンド |
|----|---------|---------|
| T-API01 | `POST /api/inquiries` でデータが保存される | `curl -X POST http://localhost:3000/api/inquiries -H 'Content-Type: application/json' -d '{"name":"テスト","email":"test@example.com","message":"テスト"}'` |
| T-API02 | `GET /api/temples` で一覧が返る | `curl http://localhost:3000/api/temples` |

---

## 3. ビルド検証

```bash
# TypeScript エラーがないこと
npx tsc --noEmit

# ESLint エラーがないこと
npm run lint

# 本番ビルドが成功すること
npm run build
```

---

## 4. 今後の自動テスト導入方針

| フェーズ | 内容 | 優先度 |
|---------|------|--------|
| 単体テスト | `lib/store.ts` の Store メソッドを Vitest でテスト | 中 |
| API テスト | Route Handler を Supertest でテスト | 中 |
| E2E テスト | Playwright でリード獲得フロー（相談送信完了）を検証 | 高 |
