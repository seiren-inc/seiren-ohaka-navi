# 基本設計書 — seiren-ohaka-navi

> 最終更新: 2026-02-24
> ステータス: 実装からの逆算による再構成版（初稿）

---

## 1. システム構成

```
[ユーザー/管理者ブラウザ]
        ↓
[Next.js App Router (16.x)]
        ↓
[Route Handlers (API)]
        ↓
[In-Memory Store (lib/store.ts)]  ← 現在はモックデータ
        ↓
[（将来）外部DB / メールサービス]
```

---

## 2. 画面グループ設計

### 2-1. ユーザー向け

| グループ | パス | 説明 |
|---------|-----|------|
| トップ | `/` | ヒーロー・エリア検索・コンセプト・CTA |
| 検索 | `/search`, `/area/...` | キーワード・都道府県・市区町村検索 |
| 霊園詳細 | `/detail/[id]` | 個別霊園ページ |
| 供養ガイド | `/choices/...`, `/guide/...` | コンテンツマーケティング記事 |
| 墓じまい | `/grave-closure/...` | 専用コンテンツ群 |
| 相談・CTA | `/consult/...`, `/contact` | リード獲得導線 |
| 会社情報 | `/about/...`, `/partner/...` | コーポレート情報 |

### 2-2. 管理者向け

| グループ | パス | 説明 |
|---------|-----|------|
| 管理トップ | `/admin` | ダッシュボード |
| 霊園管理 | `/admin/temples/...` | 霊園CRUD + プラン管理 |
| 問い合わせ | `/admin/inquiries/...` | 問い合わせ一覧・詳細 |

---

## 3. データ設計（現在の主要エンティティ）

### Temple（霊園・寺院）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string | 一意ID |
| name | string | 施設名 |
| type | string | 種別（寺院霊園 / 公営霊園 等）|
| prefecture | string | 都道府県 |
| cityName | string | 市区町村 |
| address | string | 住所 |
| lat / lng | number | 緯度・経度 |
| priceAggMin / Max | number | 最低・最高価格（プランから集計）|
| status | 'public' \| 'draft' \| 'closed' | 公開状態 |
| listedInSearch | boolean | 検索対象フラグ |
| tags | string[] | 検索タグ |
| seo | object | SEO設定（title / description等）|
| calendar | object | 来場予約設定 |

### Plan（プラン）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string | 一意ID |
| templeId | string | 紐付け霊園ID |
| category | string | 永代供養 / 樹木葬 / 納骨堂 等 |
| name | string | プラン名 |
| price | number | 価格（円）|
| managementFee | number | 年間管理費（円）|
| availability | string | 空き状況 |
| burialMethod | string | 合祀 / 個別 / 集合 |
| petAllowed | string | ペット可否 |

### Inquiry（問い合わせ）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string | 一意ID |
| receiptNumber | string | 受付番号（R-XXXX）|
| status | 'new' \| 'replied' \| 'closed' | ステータス |
| createdAt | string | 受付日時（ISO8601）|

---

## 4. ルーティング設計

Next.js App Router を使用。`app/` 配下のディレクトリ構造がそのままURLになる。

動的ルート:
- `/area/[prefecture]` — 都道府県コード
- `/area/[prefecture]/[city]` — 市区町村名（URLエンコード）
- `/detail/[id]` — 霊園ID
- `/admin/inquiries/[id]` — 問い合わせID
- `/admin/temples/[id]/edit` — 霊園編集

---

## 5. コンポーネント設計

```
app/components/
├── layout/        ヘッダー・フッター・ナビゲーション
├── ui/            Button, Card, Badge 等の汎用UI部品
├── features/      PrefectureSelector, GraveyardCard 等の機能コンポーネント
└── admin/         管理画面専用コンポーネント
```

---

## 6. 外部連携（現状・将来）

| 機能 | 現状 | 将来 |
|------|------|------|
| データ | In-Memory（store.ts）| PostgreSQL / Firestore 等 |
| 画像 | `/public/uploads/` ローカル | Cloud Storage |
| メール | 未実装 | SendGrid / SES |
| 認証 | 未実装 | NextAuth.js / Clerk |
| 地図 | 未実装 | Google Maps API |
