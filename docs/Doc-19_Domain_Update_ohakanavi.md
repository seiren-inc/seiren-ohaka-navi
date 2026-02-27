# ドメイン確定 & 設定更新設計書 — seiren-ohaka-navi

> Project: お墓探しナビ
> Version: v1.1
> 最終更新: 2026-02-27

---

## 0. 目的

正式ドメインを **ohakanavi.jp** へ確定し、
設計書・環境設定・SEO設定を正式反映する。

---

## 1. 正式本番ドメイン

```
https://ohakanavi.jp
```

全設定・設計書のURL参照をこのドメインへ統一する。

---

## 2. 更新対象ドキュメント

| Doc    | 更新内容                    |
| ------ | --------------------------- |
| Doc-00 | 本番URL記載追加             |
| Doc-01 | 要件定義の本番URLを反映     |
| Doc-08 | CI/CDのデプロイ先URL更新    |
| Doc-15 | GA4データストリームURL更新  |
| Doc-17 | クロスサイトリンクのURL更新 |
| Doc-18 | ロードマップのURL基準更新   |

---

## 3. 環境変数設定

### .env.production（本番）

```
NEXT_PUBLIC_SITE_URL=https://ohakanavi.jp
NEXT_PUBLIC_BASE_URL=https://ohakanavi.jp
```

### .env.local（ローカル開発）

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 4. Next.js 設定更新

`next.config.ts` の `metadataBase` を以下へ更新：

```ts
metadataBase: new URL("https://ohakanavi.jp"),
```

`images.domains`（または `images.remotePatterns`）にドメインが含まれていれば確認：

```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "ohakanavi.jp" },
    // Supabase Storage URL も維持
  ],
},
```

---

## 5. SEO設定更新

### 5.1 sitemap

出力URLをすべて `https://ohakanavi.jp/` 基準に統一。

```ts
// app/sitemap.ts
const BASE_URL = "https://ohakanavi.jp";
```

### 5.2 robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://ohakanavi.jp/sitemap.xml
```

### 5.3 canonical

全ページの canonical を `https://ohakanavi.jp/xxx` に統一。

---

## 6. Vercel設定

### 6.1 ドメイン追加手順

1. Vercel Project Settings → Domains
2. `ohakanavi.jp` を追加
3. Xserver DNS設定（CNAMEまたはAレコード）

### 6.2 www方針

**wwwなし正規化**

```
www.ohakanavi.jp → ohakanavi.jp（301リダイレクト）
```

Vercel上で自動設定可能。

---

## 7. Search Console設定

1. `https://ohakanavi.jp/` をプロパティとして追加
2. XserverのDNS TXTレコードにて所有権確認
3. sitemap.xml を Search Console に送信

```
https://ohakanavi.jp/sitemap.xml
```

---

## 8. GA4 設定更新

- GA4 管理 → データストリーム → ウェブを追加
- ストリームURL: `https://ohakanavi.jp`
- 既存ストリームがあればURLを更新

---

## 9. クロスサイトリンク更新（Doc-17連携）

お墓じまいナビからお墓探しナビへのリンクを `https://ohakanavi.jp` へ更新。

UTMパラメータは維持：

```
https://ohakanavi.jp?utm_source=ohakajimai-navi&utm_medium=referral&utm_campaign=cross_site
```

---

## 10. リダイレクト設計

旧テストURL（Vercel自動ドメイン等）がある場合：

```
https://seiren-ohaka-navi.vercel.app → https://ohakanavi.jp（301）
```

`next.config.ts` の `redirects` に追加可能：

```ts
async redirects() {
  return [
    {
      source: "/:path*",
      has: [{ type: "host", value: "seiren-ohaka-navi.vercel.app" }],
      destination: "https://ohakanavi.jp/:path*",
      permanent: true,
    },
  ];
},
```

---

## 11. 確認チェックリスト

- [ ] Vercelにドメイン追加済み
- [ ] XserverのDNSレコード設定済み
- [ ] `https://ohakanavi.jp` で正常表示確認
- [ ] www → non-www リダイレクト確認
- [ ] http → https リダイレクト確認
- [ ] Search Consoleにプロパティ追加済み
- [ ] sitemap送信済み
- [ ] GA4データストリームURL更新済み
- [ ] canonical が `ohakanavi.jp` で出力されている

---

## 12. 絶対禁止事項

- http混在（Mixed Content）
- wwwと非wwwの混在
- canonical未更新のままの公開
- sitemap未更新
- 旧ドメインからの301未設定

---

本設計書は、ohakanavi.jp を正式本番ドメインとして固定するための必須更新設計とする。
