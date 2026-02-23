# 運用・保守・リカバリ手順 (Operations & Recovery)

## 0. 基本方針
本システムは Supabase (Auth/Storage/DB) と Vercel をベースとしたマネージド環境で稼働します。
ゼロ・データロスト、ゼロ・アクセス不可を目標とした構成となっています。

## 1. バックアップ手順

### A. 自動バックアップ (Supabase 標準)
- Database: 毎日定期バックアップが実行されます。
- Storage: バケットレベルでの保護。

### B. 手動エクスポート (週次推奨)
データのスナップショットをローカルに取得する場合：
```bash
# Prisma経由でのデータ取得 (JSON)
npx prisma db pull
# SQLダンプが必要な場合 (Supabase CLI)
supabase db dump --db-url "$DATABASE_URL" > backup_$(date +%Y%m%d).sql
```

## 2. リカバリ手順

### A. デプロイのロールバック (Vercel)
Vercelダッシュボードより、過去の成功ビルド（Deployments）を選択し「Redeploy」を実行してください。

### B. Database スキーマの整合性修復
マイグレーションの失敗や意図しないスキーマ変更が発生した場合：
```bash
# スキーマの再同期 (警告: 本番環境での破壊的変更に注意)
npx prisma db push
```

### C. データの不整合修復 (Optimistic Locking)
「他のユーザーによって更新されました」というエラーが頻発する場合は、該当レコードの `version` フィールドを確認してください。
手動で修正が必要な場合は、Supabase SQL Editor より以下を実行：
```sql
UPDATE "Temple" SET version = version + 1 WHERE id = 'YOUR_ID';
```

## 3. 環境変数の検証
新しい本番環境を構築する際は、以下の変数が Vercel に登録されていることを確認してください：
- `DATABASE_URL` / `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_ALLOWLIST` (カンマ区切りメールアドレス)

## 4. ログの監視 (Vercel Log)
以下のタグでフィルタリングすることで、主要なイベントを追跡可能です：
- `[TEMPLE_SAVED]` / `[TEMPLE_SAVE_FAILED]`
- `[UPLOAD_OK]` / `[UPLOAD_FAIL]`
- `[INQUIRY_SENT]` / `[INQUIRY_FAIL]`
- `[ADMIN_LOGIN_OK]`
- `[ENV_CHECK_OK]` / `[CRITICAL_FAIL]`
