# 技術設計書 — seiren-ohaka-navi

> 最終更新: 2026-02-24
> ステータス: 実装からの逆算による再構成版（初稿）

---

## 1. 技術スタック

| カテゴリ | 採用技術 | バージョン |
|----------|---------|-----------|
| フレームワーク | Next.js (App Router) | 16.1.6 |
| 言語 | TypeScript | ^5 |
| UIライブラリ | React | 19.2.3 |
| スタイリング | Tailwind CSS v4 | ^4 |
| アイコン | lucide-react | ^0.563.0 |
| フォーム | react-hook-form + zod | ^7 / ^4 |
| アニメーション | framer-motion | ^12 |
| 日付処理 | date-fns | ^4 |
| ユーティリティ | clsx, tailwind-merge | - |

---

## 2. ディレクトリ構成

```
seiren-ohaka-navi/
├── app/                      Next.js App Router
│   ├── page.tsx              トップページ
│   ├── layout.tsx            ルートレイアウト（メタ・フォント）
│   ├── globals.css           グローバルスタイル
│   ├── components/           共通コンポーネント
│   │   ├── layout/           Header, Footer, Nav
│   │   ├── ui/               Button, Card, Badge...
│   │   ├── features/         PrefectureSelector, GraveyardCard...
│   │   └── admin/            管理画面コンポーネント
│   ├── lib/                  ユーティリティ
│   │   ├── address.ts        住所・都道府県ユーティリティ
│   │   ├── mockData.ts       初期モックデータ定義
│   │   └── prefectures.ts    都道府県マスタ
│   ├── [各ページディレクトリ]
│   ├── api/                  Route Handlers
│   │   ├── inquiries/        問い合わせ API
│   │   ├── temples/          霊園 API
│   │   └── upload/           画像アップロード API
│   └── admin/                管理画面
├── lib/                      アプリケーション共通ロジック
│   └── store.ts              In-Memory データストア
├── public/                   静的ファイル
│   └── uploads/temples/      アップロード画像
├── docs/                     設計・運用ドキュメント
├── .agent/workflows/         AIエージェント用ワークフロー
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 3. データフロー

### フロントエンドからの読み取り

```
Server Component
  → Store.getTemples() / Store.getTemple(id)
  → JSX へレンダリング
```

### フォーム送信（問い合わせ）

```
Client Component (react-hook-form)
  → fetch('/api/inquiries', { method: 'POST', body: JSON })
  → Route Handler: Store.addInquiry(data)
  → { receiptNumber: 'R-XXXX' }
  → 完了画面表示
```

### 管理画面での霊園保存

```
Client Component
  → 画像: POST /api/upload → URL取得
  → 霊園データ: POST /api/temples → Store.saveTemple()
  → Plan更新: Store.savePlan() → recalculateTemplePrice()
```

---

## 4. 型定義

主要な型は `lib/store.ts` に集中管理。

```typescript
type Temple = {
  id: string;
  name: string;
  type: string;
  prefecture: string;
  cityName: string;
  status: 'public' | 'draft' | 'closed';
  listedInSearch: boolean;
  priceAggMin?: number;
  priceAggMax?: number;
  seo: { title: string; description: string; ... };
  calendar: { bookingStatus: string; ... };
  // ... その他多数
};

type Plan = {
  id: string;
  templeId: string;
  category: 'perpetualMemorial' | 'treeBurial' | 'columbarium' | ...;
  price: number;
  availability: 'available' | 'limited' | 'full' | 'none';
  burialMethod: 'joint' | 'individual' | 'collective';
  // ...
};

type Inquiry = {
  id: string;
  receiptNumber: string;
  status: 'new' | 'replied' | 'closed';
  createdAt: string;
  // ...
};
```

---

## 5. 環境変数

| 変数名 | 用途 | 現状 |
|--------|------|------|
| （未定義）| DB接続情報 | 未使用（モックデータ）|
| （未定義）| メール送信APIキー | 未実装 |

`.env.local` を使用し、`.gitignore` で除外すること（現時点は変数なし）。

---

## 6. ビルド・開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 型チェック
npx tsc --noEmit

# Lint
npm run lint

# 本番ビルド
npm run build
```

---

## 7. 既知の技術的課題

| 課題 | 詳細 | 優先度 |
|------|------|--------|
| モックデータ | `lib/store.ts` はサーバー再起動でリセットされる | 高 |
| 画像アップロード | ローカルファイル保存（Vercel等サーバーレス環境では使用不可）| 高 |
| 管理認証なし | `/admin/*` が認証なしでアクセス可能 | 高 |
| 型の一貫性 | `as any` キャストが一部に残存 | 中 |
