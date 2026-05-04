import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  // 1. テンプルID取得
  const { data: temples } = await supabase
    .from('temples')
    .select('id, name')
    .limit(1)

  if (!temples?.length) {
    console.error('❌ No temples found. Run seed first.')
    process.exit(1)
  }

  const temple = temples[0]
  const email = 'portal@seiren.ne.jp'
  const password = 'Seiren2026!'
  const passwordHash = await bcrypt.hash(password, 10)
  const now = new Date().toISOString()

  // 2. 既存チェック
  const { data: existing } = await supabase
    .from('temple_users')
    .select('id')
    .eq('email', email)
    .single()

  if (existing) {
    console.log(`⚠️  TempleUser already exists: ${email}`)
    console.log(`   Temple: ${temple.name}`)
    console.log(`   Password: ${password}`)
    return
  }

  // 3. TempleUser 作成
  const { error } = await supabase
    .from('temple_users')
    .insert({
      id: randomUUID(),
      temple_id: temple.id,
      email,
      password_hash: passwordHash,
      name: '管理者',
      title: 'オーナー',
      status: 'active',
      created_at: now,
      updated_at: now,
    })

  if (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }

  console.log('✅ TempleUser created:')
  console.log(`   Email:    ${email}`)
  console.log(`   Password: ${password}`)
  console.log(`   Temple:   ${temple.name} (${temple.id})`)
}

main().catch(e => { console.error(e); process.exit(1) })
