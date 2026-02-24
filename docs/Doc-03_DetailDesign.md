# 詳細設計書 — seiren-ohaka-navi

> Project: お墓探しナビ
> Version: v1.0
> 最終更新: 2026-02-24

---

## 1. フロントエンド構造設計

### 1.1 コンポーネント分類

1. Layout系
   - Navbar
   - Footer
   - Breadcrumbs

2. 検索系
   - AreaSearchModal
   - PrefectureSelector
   - SearchFilter
   - GraveyardCard

3. 詳細ページ系
   - TempleHero
   - PlanList
   - TempleAccess
   - TempleGallery
   - InquiryModal

4. フォーム系
   - Input
   - Select
   - Textarea
   - RadioGroup
   - Checkbox

---

## 2. 施設詳細ページ設計

### 2.1 データ取得

Server Componentで取得。

API:
`GET /api/temples/[id]`

レスポンス例:

```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "address": "string",
  "priceMin": 0,
  "priceMax": 0,
  "plans": [],
  "images": []
}
```

---

## 3. API設計

### 3.1 施設API

| メソッド | パス | 処理 |
|---------|------|------|
| GET | /api/temples | 一覧取得 |
| GET | /api/temples/[id] | 詳細取得 |
| POST | /api/temples | 新規作成（Admin）|
| PATCH | /api/temples/[id] | 更新（非破壊）|
| DELETE | /api/temples/[id] | 論理削除推奨 |

### 3.2 問い合わせAPI

`POST /api/inquiries`

保存処理フロー:

1. 入力検証
2. DB保存
3. 保存確認
4. 成功レスポンス

二重送信防止:

- UUID生成
- versionチェック

---

## 4. 状態管理設計

基本方針:
- Server Component優先
- 必要最小限のClient Component
- useState最小化

フォーム:
- react-hook-form使用
- Zodでバリデーション

---

## 5. 保存保証設計

### 5.1 楽観ロック

テーブルに version カラムを持たせる。

更新時:

```sql
UPDATE table
SET ...
WHERE id = ?
AND version = ?
```

成功時: version +1
失敗時: 409エラー返却

### 5.2 二重送信防止

- submit中はボタン無効化
- サーバー側でUUID重複チェック

---

## 6. 画像アップロード設計

- Supabase Storage使用
- 公開URL生成
- DBにはURLのみ保存
- 物理削除は原則行わない

---

## 7. 管理画面設計

### 7.1 認証

- Supabase Auth
- allowlist管理
- middlewareで保護

### 7.2 施設CRUD

- フォームは共通化
- 編集画面は初期値セット
- 更新はPATCH

---

## 8. SEO動的生成設計

### 8.1 generateMetadata使用

各ページで:

- title動的生成
- description生成
- OGタグ設定

---

## 9. エラーハンドリング設計

| コード | 意味 |
|--------|------|
| 400 | 入力不正 |
| 401 | 認証エラー |
| 403 | 権限不足 |
| 404 | データなし |
| 409 | version競合 |
| 500 | サーバーエラー |

---

## 10. 非破壊原則

- DELETEは論理削除推奨
- マイグレーションはAdd-only
- カラム削除禁止

---

本詳細設計は、実装レベルの基準とする。
