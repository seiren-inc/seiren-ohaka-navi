import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';
import { Store } from '../lib/store';

async function main() {
  console.log('Start seeding ...');

  const temples = Store.getTemples();

  for (const t of temples) {
    console.log(`Processing temple: ${t.name}`);

    // Create Temple
    const temple = await prisma.temple.create({
      data: {
        id: t.id, // Keep ID for consistency if possible, or omit to let DB generate UUID if schema allows (our schema has default(uuid))
        // But existing IDs are like "id1624858636" which is string. Using provided ID is better for relation mapping.
        name: t.name,
        kana: t.kana,
        type: mapFacilityType(t.type),
        managementBody: t.managementBody,
        religion: mapReligion(t.religion),
        buddhistSect: t.buddhistSect ? mapSect(t.buddhistSect) : null,

        prefecture: t.prefecture,
        prefectureCode: t.prefectureCode,
        cityName: t.cityName,
        addressLine: t.addressLine,
        address: t.address,
        lat: t.lat,
        lng: t.lng,
        access: t.access,

        parkingAvailable: t.parkingAvailable,
        parking: t.parking,

        indoorOutdoor: t.indoorOutdoor,
        barrierFree: t.barrierFree,
        barrierFreeLabel: t.barrierFreeLabel,

        petAllowed: t.petAllowed,
        petSupport: t.petSupport,

        sects: t.sects, // String[]
        supportedMemorialTypes: t.supportedMemorialTypes,

        nearestStations: t.nearestStations as any, // Json

        priceAggMin: t.priceAggMin,
        priceAggMax: t.priceAggMax,
        managementFeeAggType: t.managementFeeAggType,

        catchphrase: t.catchphrase,
        overview: t.overview,
        suitableFor: t.suitableFor,
        notesPoints: t.notesPoints,
        tags: t.tags,
        aiSummary: t.aiSummary,

        mainImage: t.mainImage,
        galleryImages: t.galleryImages,

        phone: t.phone,
        officeHours: t.officeHours,
        status: t.status,
        listedInSearch: t.listedInSearch,
        successorRequirements: t.successorRequirements,

        seo: t.seo as any,
        calendar: t.calendar as any,
        keyFeatures: t.keyFeatures as any,

        createdAt: new Date(t.createdAt || Date.now()),
        updatedAt: new Date(t.updatedAt || Date.now()),
      }
    });

    // Create Plans
    const plans = Store.getPlans(t.id);
    for (const p of plans) {
      await prisma.plan.create({
        data: {
          id: p.id,
          templeId: temple.id,
          category: p.category,
          name: p.name,
          subDescription: p.subDescription,
          price: p.price,
          priceNote: p.priceNote,
          managementFee: p.managementFee,
          availability: p.availability,
          burialMethod: p.burialMethod,
          periodType: p.periodType,
          periodYears: p.periodYears,
          capacity: p.capacity,
          capacityNote: p.capacityNote,
          petAllowed: p.petAllowed,
          images: p.images,
          note: p.note,
          order: p.order,
        }
      });
    }
  }

  console.log('Seeding finished.');
}

// Mapping Helpers (Type to Enum String matching Schema)
function mapFacilityType(t: string): any {
  // Store has '寺院墓地', Schema has TEMPLE_GRAVE mapped to '寺院墓地'
  // Actually Prisma Client expects the ENUM Key (e.g. 'TEMPLE_GRAVE') or the mapped value? 
  // With @map, Prisma Client uses the enum Key in code (FacilityType.TEMPLE_GRAVE), but sends the mapped string to DB.
  // Wait, if I use `prisma.temple.create`, I should use the ENUM KEY.
  // My store data has the Japanese string '寺院墓地'.
  // So I need to map Japanese string -> Enum Key.

  const map: Record<string, string> = {
    '寺院墓地': 'TEMPLE_GRAVE',
    '民営霊園': 'PRIVATE_CEMETERY',
    '公営霊園': 'PUBLIC_CEMETERY',
    '納骨堂': 'OSSUARY',
    '複合型': 'COMPLEX',
    'その他': 'OTHER'
  };
  return map[t] || 'OTHER';
}

function mapReligion(r: string): any {
  // Store: 'buddhism' ... Schema: BUDDHISM mapped to 'buddhism'
  // So 'buddhism' -> 'BUDDHISM'
  return r.toUpperCase(); // simplistic, but works for 'buddhism' -> 'BUDDHISM'
}

function mapSect(s: string): any {
  // Store: 'jodoShin' ... Schema: JODO_SHIN mapped to 'jodoShin'
  // Camel to Snake uppercase?
  // jodoShin -> JODO_SHIN
  // zen -> ZEN
  // nichirenShoshu -> NICHIREN_SHOSHU
  // Let's make a specific map to be safe.
  const map: Record<string, string> = {
    'kegon': 'KEGON', 'hosso': 'HOSSO', 'sanron': 'SANRON', 'ritsu': 'RITSU',
    'kusha': 'KUSHA', 'jojitsu': 'JOJITSU', 'tendai': 'TENDAI', 'shingon': 'SHINGON',
    'jodo': 'JODO', 'jodoShin': 'JODO_SHIN', 'jishu': 'JISHU', 'nichiren': 'NICHIREN',
    'zen': 'ZEN', 'soto': 'SOTO', 'rinzai': 'RINZAI', 'obaku': 'OBAKU',
    'nichirenShoshu': 'NICHIREN_SHOSHU', 'hokkeShu': 'HOKKE_SHU',
    'kenponHokke': 'KENPON_HOKKE', 'honmonButsuryu': 'HONMON_BUTSURYU',
    'other': 'OTHER', 'unknown': 'UNKNOWN'
  };
  return map[s] || 'UNKNOWN';
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
