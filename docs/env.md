# Environment Variables

### Supabase (Auth & Storage)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL (e.g., `https://xxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key (Client-side use)
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (**Server-side only**, for admin actions. フロントエンドコードからの参照は厳禁)

### Site
- `NEXT_PUBLIC_SITE_URL`: この値はログアウト時のリダイレクト先 (`api/auth/logout`) で使用される。本番環境では `https://ohakanavi.jp` を設定すること。

### Admin Security
- `ADMIN_ALLOWLIST`: Comma-separated list of email addresses allowed to access the admin dashboard.
  - Example: `admin@example.com,manager@example.com`

### Database
- `DATABASE_URL`: Prisma connection string (PostgreSQL)
- `DIRECT_URL`: Optional direct connection string for Prisma migrations

### 本番デプロイ前チェック
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` に実際のAnon Keyが設定されていること
- [ ] `SUPABASE_SERVICE_ROLE_KEY` に実際のService Role Keyが設定されていること
- [ ] `NEXT_PUBLIC_SITE_URL` に `https://ohakanavi.jp` が設定されていること
- [ ] `ADMIN_ALLOWLIST` に運用担当者のメールアドレスが設定されていること
