# 運用設計書 — seiren-ohaka-navi

> Project: お墓探しナビ
> Version: v1.0
> 最終更新: 2026-02-24

---

## 0. 本書の目的

本設計書は、
お墓探しナビを「壊れない検索ポータル」として
長期運用するための本番運用設計・監視設計・バックアップ設計・復旧設計を定義する。

本プロジェクトの最優先事項：

1. 保存失敗ゼロ
2. 破壊的変更ゼロ
3. 管理画面事故ゼロ
4. SEO崩壊ゼロ
5. 本番停止ゼロ

---

## 1. システム全体構成

### 1.1 技術スタック

| カテゴリ | 技術 |
|----------|------|
| Frontend | Next.js 16 (App Router), TypeScript, Server Components優先 |
| Backend | Supabase (PostgreSQL), Prisma 7, Supabase Auth, Supabase Storage |
| Hosting | Vercel (Production / Preview) |

### 1.2 環境構成

| 環境 | 用途 |
|------|------|
| Local | ローカル開発 |
| Vercel Preview | PR確認 |
| Vercel Production | 本番 |
| Supabase Local | ローカルDB |
| Supabase Production | 本番DB |

厳守事項:
- Production DBへローカルから直接接続禁止
- Service Role keyは本番APIで使用禁止
- .env のGitコミット禁止

---

## 2. データ設計保護ポリシー

### 2.1 非破壊進化原則

- DROP禁止
- カラム削除禁止
- ALTER TYPE削除禁止
- ENUMはADDのみ

### 2.2 保存保証構造

- versionカラム必須
- 更新時where条件にversion含む
- 影響行数0の場合409返却

### 2.3 二重送信対策

- idempotencyキー導入
- 保存ボタン連打防止
- トランザクション内で処理

---

## 3. バックアップ設計

### 3.1 DBバックアップ

- Supabase daily backup有効
- 7日以上保持
- 月次エクスポート実施

### 3.2 Storageバックアップ

- 画像一覧エクスポート
- 月次バックアップ
- 参照URL監査

---

## 4. ロールバック設計

### 4.1 アプリケーション

- Vercel previous deployment復元可能
- Gitタグによる安定版固定

### 4.2 DB

- migration番号管理
- rollback SQL事前生成
- seed再実行可能設計

復旧目標: 10分以内に前状態復帰

---

## 5. 監視設計

### 5.1 ログ監視

対象:
- 500エラー
- 409頻発
- 401異常増加
- API遅延

ログ確認:
- Vercel logs
- Supabase logs

### 5.2 アラート基準

| 条件 | アクション |
|------|-----------|
| 500エラー > 1% | 即時調査 |
| API応答3秒超 | パフォーマンス調査 |
| DB接続失敗 | Supabase状態確認 |
| Storage 404 | 参照URL監査 |

---

## 6. SEO監視設計

### 6.1 技術SEO

- sitemap自動生成確認
- robots誤設定防止
- canonical一意性確認
- noindex誤設定監査

### 6.2 コンテンツSEO

- title重複禁止
- description重複検出
- JSON-LD検証

### 6.3 Core Web Vitals

| 指標 | 目標 |
|------|------|
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | 最適化 |

---

## 7. パフォーマンス最適化設計

- Server Component優先
- 不要Client削減
- 画像最適化
- Suspense活用
- データ取得最小化

---

## 8. セキュリティ設計

- Supabase RLS有効
- Admin allowlist制御
- SQL Injection防御
- XSSエスケープ
- CSRF対策

---

## 9. 運用フロー設計

### 9.1 開発フロー

- main直接push禁止
- featureブランチ必須
- file指定addのみ
- PRレビュー必須

### 9.2 リリースフロー

1. build成功
2. typecheck成功
3. Test Design完了
4. Preview検証
5. Production deploy

---

## 10. データ整合性監査

- orphanレコードなし
- FK整合
- null許容確認
- municipalitySlug安定確認
- PDF_ONLYルール厳守

---

## 11. スケール設計

想定規模:

| 項目 | 数値 |
|------|------|
| 自治体数 | 1,737 |
| ページ数 | 数万 |
| 月間PV | 数十万 |

対策:
- ISR活用
- Edge cache利用
- DB index最適化
- ページネーション徹底

---

## 12. 継続改善設計

- 月次監査実施
- Lighthouse定期測定
- Search Console監視
- 404検出ログ監査

---

## 13. 絶対禁止事項

- main直接push
- git add -A
- DROP
- 本番DB直操作
- Service Role本番公開
- PDF直リンクをurlに格納

---

本設計書は、お墓探しナビの本番運用における最終安全設計とする。
