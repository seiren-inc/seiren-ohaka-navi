import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const { data, error } = await supabase
    .from('temples')
    .select('name, main_image, gallery_images')
    .limit(5)

  if (error) { console.error(error.message); process.exit(1) }

  for (const t of data ?? []) {
    console.log(`${t.name}`)
    console.log(`  main:    ${t.main_image}`)
    console.log(`  gallery: ${JSON.stringify(t.gallery_images)}`)
  }
}

main()
