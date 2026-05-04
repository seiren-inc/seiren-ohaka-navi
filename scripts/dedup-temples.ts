import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const { data: temples, error } = await supabase
    .from('temples')
    .select('id, name, created_at')
    .order('name')
    .order('created_at', { ascending: true })

  if (error || !temples) { console.error(error?.message); process.exit(1) }

  // Group by name, keep first (oldest), collect rest for deletion
  const seen = new Map<string, string>()
  const toDelete: string[] = []

  for (const t of temples) {
    if (seen.has(t.name)) {
      toDelete.push(t.id)
    } else {
      seen.set(t.name, t.id)
    }
  }

  console.log(`Total: ${temples.length}, Duplicates to delete: ${toDelete.length}`)

  if (toDelete.length === 0) {
    console.log('No duplicates found.')
    return
  }

  // Delete plans first (FK constraint)
  const { error: planErr } = await supabase
    .from('plans')
    .delete()
    .in('temple_id', toDelete)
  if (planErr) { console.error('Plans delete error:', planErr.message); process.exit(1) }

  // Delete duplicate temples
  const { error: templeErr } = await supabase
    .from('temples')
    .delete()
    .in('id', toDelete)
  if (templeErr) { console.error('Temples delete error:', templeErr.message); process.exit(1) }

  console.log(`✅ Deleted ${toDelete.length} duplicate temples (+ their plans).`)

  const { count } = await supabase.from('temples').select('*', { count: 'exact', head: true })
  console.log(`Remaining: ${count} temples`)
}

main().catch(e => { console.error(e); process.exit(1) })
