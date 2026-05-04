import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Cycling pool of Unsplash images — Japanese temple/nature/stone aesthetics
const imagePool = [
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80', // Japanese temple gate
  'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80', // Japanese garden
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', // Zen garden stones
  'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80', // Forest path
  'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80', // Shrine lanterns
  'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=800&q=80', // Bamboo forest
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', // Peaceful lake
]

async function main() {
  console.log('🖼 Updating temple images...\n')

  const { data: temples, error: fetchError } = await supabase
    .from('temples')
    .select('id, name')

  if (fetchError) {
    console.error('❌ Failed to fetch temples:', fetchError.message)
    process.exit(1)
  }

  if (!temples || temples.length === 0) {
    console.log('⚠️  No temples found. Run seed first.')
    process.exit(0)
  }

  let updated = 0

  for (let i = 0; i < temples.length; i++) {
    const temple = temples[i]
    const mainImage = imagePool[i % imagePool.length]
    const gallery = [
      imagePool[(i + 1) % imagePool.length],
      imagePool[(i + 2) % imagePool.length],
    ]

    const { error } = await supabase
      .from('temples')
      .update({
        main_image: mainImage,
        gallery_images: gallery,
      })
      .eq('id', temple.id)

    if (error) {
      console.error(`❌ ${temple.name}:`, error.message)
    } else {
      console.log(`✅ ${temple.name}`)
      updated++
    }
  }

  console.log(`\n✨ Done. ${updated}/${temples.length} temples updated.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
