# CODEX.md — seiren-ohaka-navi（事業エージェント向け文脈）

> 最終更新: 2026-03-19 | グループ: A（清蓮 / Seiren）

---

## Project Goal（事業の目的）

**「お墓の情報格差をなくし、誰もが納得できる供養の形を選べるようにする」**

墓地・霊園情報の検索とフィルタリング、改葬・永代供養の専門家紹介、
PDF見積書の自動生成まで提供する、次世代型の「お墓ナビプラットフォーム」。
「費用が分からない」「どこに頼めばいいか分からない」を解決することが中心命題。

ターゲット: 30〜60代の「お墓の購入・移転・終活を考える家族」
エリア最優先: 横浜市・川崎市・鎌倉市・藤沢市・熱海市・小田原市

---

## Brand Identity

**「誠実・清潔・格調」**
- 水色（#3399CC）+ ピンク（#D98CB3）+ 黄緑（#99CC66）
- Framer Motion のゆっくりとしたフェードで「安心感」
- 見出しに明朝体（格調）、本文にゴシック体（可読性）

---

## AEO（JSON-LD）ルール

```tsx
// LocalBusiness（全ページ必須）
{ "@type": "LocalBusiness", "name": "清蓮 お墓ナビ", "areaServed": ["横浜市","鎌倉市","熱海市"] }

// Service（各サービスページ）
{ "@type": "Service", "serviceType": "墓地・霊園情報提供・改葬サポート" }

// FAQPage（FAQ・よくある質問ページ）
{ "@type": "FAQPage", "mainEntity": [{ "@type": "Question", "name": "永代供養の費用は？", ... }] }
```

---

## プライバシー・個人情報ルール

- Stripe 決済情報はサーバー側で処理のみ（カード番号のDB保存禁止）
- Supabase に保存する家族情報・墓地情報はRLSで厳格に保護
- PDF見積書に含まれる個人情報のS3/Storage保存は暗号化必須
- Cloudflare Turnstile をフォームに実装（reCAPTCHA代替）
- AI生成コンテンツ（霊園紹介文等）は「AI補助作成」を明示

---

## PPR & Edge

```ts
// next.config.ts
experimental: { ppr: true }
// 墓地一覧ページ: 静的シェル（ヘッダー・検索バー）→ 動的（検索結果）を Suspense
images: { formats: ["image/avif", "image/webp"] }
```
