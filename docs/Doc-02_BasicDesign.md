# 基本設計書 — seiren-ohaka-navi

> Project: お墓探しナビ
> Version: v1.0
> 最終更新: 2026-02-24

---

## 1. 全体アーキテクチャ構成

本システムは以下のレイヤーで構成する。

- フロントエンド：Next.js (App Router)
- API層：Next.js Route Handlers
- データ層：Supabase (PostgreSQL)
- ORM：Prisma
- 認証：Supabase Auth
- デプロイ：Vercel

設計思想：
- 非破壊
- 可逆
- 拡張可能
- SEO最適

---

## 2. サイト構造（ページ一覧）

### 2.1 公開ページ

| パス | 内容 |
|------|------|
| / | トップページ |
| /search | 検索ページ |
| /area/[prefecture] | 都道府県一覧 |
| /area/[prefecture]/[city] | 市区町村一覧 |
| /detail/[id] | 施設詳細 |
| /consult | 相談トップ |
| /consult/request-material | 資料請求 |
| /grave-closure | 墓じまい特設 |
| /privacy | プライバシーポリシー |
| /terms | 利用規約 |
| /sitemap.xml | サイトマップ |
| /robots.txt | robots |

### 2.2 管理画面

| パス | 内容 |
|------|------|
| /admin/login | ログイン |
| /admin | ダッシュボード |
| /admin/temples | 施設一覧 |
| /admin/temples/new | 新規作成 |
| /admin/temples/[id]/edit | 編集 |
| /admin/inquiries | 問い合わせ一覧 |
| /admin/inquiries/[id] | 詳細 |

---

## 3. 情報設計（IA）

### 3.1 トップページ構成

1. Heroセクション
2. 検索導線
3. エリアナビ
4. 特集導線
5. 墓じまい導線
6. フッター

目的：検索導線を最優先に配置する。

### 3.2 検索導線

- 都道府県選択
- 市区町村選択
- 結果一覧表示

将来：
- 条件絞り込み
- 価格帯フィルタ
- 宗派フィルタ

### 3.3 施設詳細ページ構成

1. 施設名
2. 基本情報
3. ギャラリー
4. プラン一覧
5. アクセス情報
6. FAQ
7. 問い合わせCTA

CTAは常に視認性の高い位置に配置。

---

## 4. データフロー設計

### 4.1 公開側

```
User → Next.js Server Component → API Route → Prisma → Supabase
```

### 4.2 管理画面

```
Admin → Authチェック → API Route → Prisma → Supabase
```

---

## 5. 保存設計原則

- 非破壊更新
- versionカラムによる楽観ロック
- 二重送信防止
- 失敗時の明確なエラー表示

---

## 6. URL設計原則

- SEOフレンドリー
- slug安定化
- IDとslugの分離
- PDFは url ではなく pdfUrl に保存

---

## 7. パフォーマンス設計

- 静的生成優先
- キャッシュ活用
- 画像最適化
- 不要なクライアントコンポーネント削減

---

## 8. 将来拡張前提

- エリア制圧型モデル
- AIレコメンド
- 有料掲載枠
- CRM統合

---

本基本設計は、すべての詳細設計の基盤とする。
