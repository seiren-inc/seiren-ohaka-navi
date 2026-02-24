# 技術設計書 — seiren-ohaka-navi

> Project: お墓探しナビ
> Version: v1.0
> 最終更新: 2026-02-24

---

## 1. 技術スタック

| カテゴリ | 技術 |
|----------|------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Backend | Next.js Route Handlers |
| ORM | Prisma |
| データベース | Supabase (PostgreSQL) |
| 認証 | Supabase Auth |
| Storage | Supabase Storage |
| デプロイ | Vercel |
| Runtime | Node.js v22 (LTS固定) |

---

## 2. システム構成図（論理構造）

```
User
↓
Next.js (Server Components / Route Handlers)
↓
Prisma
↓
Supabase PostgreSQL
↓
Supabase Storage

Admin
↓
Auth Middleware
↓
API
↓
DB
```

---

## 3. データベース設計方針

### 3.1 原則

- 破壊的変更禁止
- Add-only migration
- versionカラム必須（更新対象テーブル）
- 論理削除優先
- 外部キー明示

### 3.2 主要テーブル

#### temples

| カラム | 型 | 備考 |
|--------|-----|------|
| id | uuid | PK |
| name | string | |
| slug | string | |
| prefecture | string | |
| city | string | |
| address | string | |
| description | text | |
| priceMin | number | |
| priceMax | number | |
| version | integer | 楽観ロック用 |
| createdAt | timestamp | |
| updatedAt | timestamp | |
| deletedAt | timestamp | nullable, 論理削除 |

#### plans

| カラム | 型 | 備考 |
|--------|-----|------|
| id | uuid | PK |
| templeId | uuid | FK → temples |
| name | string | |
| price | number | |
| description | text | |
| version | integer | |

#### inquiries

| カラム | 型 | 備考 |
|--------|-----|------|
| id | uuid | PK |
| name | string | |
| email | string | |
| phone | string | |
| templeId | uuid | nullable |
| message | text | |
| status | string | new / replied / closed |
| createdAt | timestamp | |

#### municipalities

| カラム | 型 | 備考 |
|--------|-----|------|
| id | uuid | PK |
| prefecture | string | |
| city | string | |
| slug | string | |
| url | string | 自治体ページURL |
| pdfUrl | string | PDF直リンク（url と分離管理）|
| linkType | string | |
| linkStatus | string | |
| version | integer | |

---

## 4. 保存保証設計

### 4.1 楽観ロック

```sql
UPDATE table
SET ...
WHERE id = ?
AND version = ?
```

成功時: version +1
失敗時: 409返却

### 4.2 二重送信対策

- UUIDベースの一意キー
- submitボタンdisable
- サーバー側で重複拒否

---

## 5. 認証設計

- Supabase Auth使用
- allowlistテーブルで管理
- middleware.tsでadmin保護
- API単位でセッション確認

---

## 6. Storage設計

- 画像はSupabase Storageへ保存
- DBにはURLのみ保存
- 物理削除は原則禁止
- 更新時も旧URL保持可能設計

---

## 7. SEO設計

- sitemap.tsで動的生成
- robots.ts制御
- generateMetadata使用
- 静的生成優先

---

## 8. デプロイ設計

- Vercel Production
- Preview環境
- Environment VariablesはVercel管理
- .envはGitに含めない

---

## 9. ログ設計

- 重要APIはconsole.error出力
- 将来は外部ロギング基盤導入可能設計

---

## 10. セキュリティ設計

- SQLインジェクション防止（Prisma使用）
- XSS対策（dangerouslySetInnerHTML禁止）
- 管理画面CSRF対策
- Admin Route完全保護
