# 詳細設計書 — seiren-ohaka-navi

> 最終更新: 2026-02-24
> ステータス: 実装からの逆算による再構成版（初稿）

---

## 1. 検索処理の設計

### 1-1. キーワード検索（`/search`）

**入力**: `q`（クエリパラメータ）

**対象フィールド**:
- `name`（霊園名）
- `address`（住所）
- `cityName`（市区町村）
- `tags`（タグ配列）
- `catchphrase`（キャッチコピー）

**フィルタ条件**:
- `status === 'public'`
- `listedInSearch === true`

**ソート**: 該当なし（現在は登録順）

---

### 1-2. エリア検索（`/area/[prefecture]`）

- 都道府県コード（`prefecture` フィールド）で前方一致または完全一致
- URLは /area/`tokyo`, /area/`osaka` 等（英字スラグ）

---

## 2. 霊園詳細ページ（`/detail/[id]`）

### 表示データ
- Temple（基本情報・概要・アクセス）
- Plan（プランリスト） — `Store.getPlans(id)` で取得
- FAQ — Temple に内包または静的データ
- SEOメタ — `temple.seo` から生成

### 価格表示ロジック
- `priceAggMin` / `priceAggMax` は Plan 追加・更新・削除時に `recalculateTemplePrice()` で自動再計算
- 「〇〇万円〜」の形式で表示

---

## 3. 管理画面の設計

### 3-1. 霊園新規登録（`/admin/temples/new`）

- react-hook-form + zod でバリデーション
- 画像は `/api/upload` へ POST し、返却パスを Temple に保存
- 保存: `Store.createTemple(data)`

### 3-2. 霊園編集（`/admin/temples/[id]/edit`）

- 初期値: `Store.getTemple(id)` で取得
- 保存: `Store.saveTemple(temple)`
- プラン管理（追加・編集・削除）を同一画面に配置
- Plan 操作時は `recalculateTemplePrice()` が自動発火

### 3-3. 問い合わせ一覧（`/admin/inquiries`）

- `Store.getInquiries()` で取得
- ステータス（new / replied / closed）でフィルタ可能
- 受付番号 R-XXXX でソート（降順）

---

## 4. お問い合わせ・相談フォームの設計

### フォーム種別

| 種別 | パス | 送信先API |
|------|-----|----------|
| 一般問い合わせ | `/contact` | `/api/inquiries` |
| 霊園探し相談 | `/consult/grave-search` | `/api/inquiries` |
| 墓じまい相談 | `/consult/grave-closure` | `/api/inquiries` |
| 遺骨サービス相談 | `/consult/ikotsu-service` | `/api/inquiries` |
| 資料請求 | `/consult/request-material` | `/api/inquiries` |
| パートナー申込 | `/partner/contact` | `/api/inquiries` |

### バリデーション（共通）
- 名前: 必須
- 電話番号 or メール: どちらか必須
- 内容: 最大1000文字

---

## 5. SEOメタ生成

各ページは `metadata` export または `generateMetadata()` で設定。

```typescript
// 霊園詳細の例
export async function generateMetadata({ params }) {
  const temple = Store.getTemple(params.id);
  return {
    title: temple.seo.title,
    description: temple.seo.description,
    openGraph: { ... },
  };
}
```

---

## 6. 画像アップロード（`/api/upload`）

- `multipart/form-data` で受信
- 保存先: `/public/uploads/temples/[filename]`
- 返却: `{ url: '/uploads/temples/[filename]' }`
- **注意**: 現在サーバーレス非対応。本番では Cloud Storage へ変更が必要。
