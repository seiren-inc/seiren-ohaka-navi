
// ... (Previous imports - assuming no external imports needed or standard ones)
// Since I'm rewriting, I should include necessary imports if any were there?
// Reviewing previous view_file... line 2 says "// ... (Previous imports)".
// Wait, I need the imports!
// Attempting to read only the top lines to get imports.
// Actually, I can View the file one last time to scrape imports, OR...
// The previous view_file output started at line 1. Line 2 was `// ... (Previous imports)`.
// This means the previous `view_file` ALREADY truncated the imports?
// NO. The file I viewed in Step 274:
// 1:
// 2: // ... (Previous imports)
// This suggests the `view_file` in Step 274 was *already* truncated or I am misinterpreting "Previous imports" comment as me filtering it?
// Ah, the tool output says: "Showing lines 1 to 472".
// But line 2 literally says `// ... (Previous imports)`.
// This implies the file ITSELF has that comment? Or I am hallucinating.
// Let's check step 318.
// 2: // ... (Previous imports)
// It seems the file content literally has that comment? That would be weird.
// Wait, typically `store.ts` needs types.
// I will check `app/consult/request-material/page.tsx` imports to see where it gets Store.
// `import { Store } from "../../../lib/store";`
// This confirms `lib/store.ts` is the place.

// Let me try to View the file `lib/store.ts` again, but this time I will assume the comment `// ... (Previous imports)` IS the content. 
// IF the file runs in Next.js, it surely needs `import` statements if it uses anything. 
// But `store.ts` mostly defines types and mocks. It might not depend on anything! 
// Let's check if it uses any external types. 
// It uses `React`? No. 
// It uses simple types. 
// So maybe it has NO imports? 
// The only thing is... `Inquiry` uses `InquiryStatus`. 
// Wait, `InquiryStatus` is defined in the file.
// So, it's possible it has no imports.

// I will overwrite properly.

export interface CalendarRule {
    openDays: number[];
    openHours: string;
    exceptions: { date: string; status: 'closed' | 'full' | 'open'; note?: string; }[];
}

// SEO Types
export interface SeoSettings {
    title?: string;
    description?: string;
    summary?: string; // 300-400 chars for AI
    primaryKeywords: string[];
    secondaryKeywords: string[];
    structuredDataEnabled: boolean;
    faqSource: 'facilityFaq' | 'globalFaq' | 'none';
    indexControl: 'index' | 'noindex';
}

// Calendar Redesign Types
export type BookingStatus = 'open' | 'paused' | 'preparing' | 'closed';
export type BookingChannel = 'form' | 'phone';
export type SlotInterval = 15 | 30 | 60;
export type VisitDuration = 30 | 45 | 60 | 90 | 120;
export type BufferMinutes = 0 | 15 | 30 | 60;
export type CutoffRule = 'dayBefore' | 'hours24' | 'hours48' | 'hours72' | 'week1';
export type BookingWindow = 14 | 30 | 60 | 90 | 180;

export interface CalendarSettings {
    bookingStatus: BookingStatus;
    bookingChannels: BookingChannel[];
    availableWeekdays: number[]; // 0=Sun, 6=Sat
    startTime: string; // "09:00"
    endTime: string;   // "17:00"
    slotIntervalMinutes: SlotInterval;
    visitDurationMinutes: VisitDuration;
    bufferMinutes: BufferMinutes;
    cutoffRule: CutoffRule;
    bookingWindowDays: BookingWindow;
    dailyCapacity: number;
    blackoutDates: { date: string; note?: string }[];
    requestMessage: string;
}

// --- NEW ENUMS & TYPES ---

export type FacilityType = '寺院墓地' | '民営霊園' | '公営霊園' | '納骨堂' | '複合型' | 'その他';

// Religion Category
export const RELIGION_CATEGORIES = {
    buddhism: '仏教',
    shinto: '神道',
    christianity: 'キリスト教',
    other: 'その他',
    unknown: '要確認'
} as const;
export type ReligionCategory = keyof typeof RELIGION_CATEGORIES;

// Buddhist Sects
export const BUDDHIST_SECTS = {
    // Nara
    kegon: '華厳宗',
    hosso: '法相宗',
    sanron: '三論宗',
    ritsu: '律宗',
    kusha: '倶舎宗',
    jojitsu: '成実宗',
    // Heian
    tendai: '天台宗',
    shingon: '真言宗',
    // Kamakura
    jodo: '浄土宗',
    jodoShin: '浄土真宗',
    jishu: '時宗',
    nichiren: '日蓮宗',
    zen: '禅宗', // Zen General
    soto: '曹洞宗',
    rinzai: '臨済宗',
    obaku: '黄檗宗',
    nichirenShoshu: '日蓮正宗',
    hokkeShu: '法華宗',
    kenponHokke: '顕本法華宗',
    honmonButsuryu: '本門佛立宗',
    // Other
    other: 'その他',
    unknown: '要確認'
} as const;
export type BuddhistSect = keyof typeof BUDDHIST_SECTS;

// UI Groups for Select
export const BUDDHIST_SECT_GROUPS = [
    { label: '鎌倉以降の主要宗派', options: ['jodo', 'jodoShin', 'nichiren', 'soto', 'rinzai', 'jishu'] },
    { label: '平安仏教', options: ['tendai', 'shingon'] },
    { label: '奈良仏教', options: ['kegon', 'hosso', 'ritsu'] },
    { label: 'その他', options: ['zen', 'obaku', 'nichirenShoshu', 'hokkeShu', 'kenponHokke', 'honmonButsuryu', 'other', 'unknown'] }
];

export type Sect = '無宗派' | '仏教全般' | '浄土宗' | '浄土真宗' | '日蓮宗' | '真言宗' | '天台宗' | '禅宗' | 'その他'; // Legacy or for granular filter support if needed
export type MemorialType = '一般墓' | '永代供養墓' | '樹木葬' | '納骨堂' | '合祀' | '海洋散骨' | '手元供養' | '遺骨ダイヤモンド';
export type IndoorOutdoor = 'indoor' | 'outdoor' | 'both';
export type PetAllowed = 'allowed' | 'notAllowed' | 'conditional' | 'unknown';
export type ManagementFeeType = 'none' | 'required' | 'unknown';
export type PublishStatus = 'public' | 'private' | 'draft';

export interface NearestStation {
    name: string;
    line?: string;
    walkMinutes: number;
}

// --- Main Temple Interface ---

export interface Temple {
    id: string;
    // Basic Info
    name: string;
    kana: string;
    type: FacilityType;
    managementBody: ManagementBody; // Keep existing or update if needed
    religion: ReligionCategory; // Updated
    buddhistSect?: BuddhistSect; // Added

    // A. Location & Access
    prefecture: Prefecture;
    prefectureCode?: number; // Added
    cityName?: string; // Added - e.g. "新宿区"
    addressLine?: string; // Added - e.g. "西新宿1-1-1"
    address: string; // Full address string (Legacy support)
    lat?: number; // Added
    lng?: number; // Added
    nearestStations: NearestStation[]; // Updated from string access
    access: string; // Legacy string description
    parkingAvailable: boolean; // Added
    parking: Parking; // Legacy enum

    // B. Facility Attributes (Filter Main)
    sects: Sect[]; // Added (Supported Sects for burial, separate from Temple's own sect)
    supportedMemorialTypes: MemorialType[]; // Added
    indoorOutdoor?: IndoorOutdoor; // Added
    barrierFree: boolean; // Updated from enum to boolean for filter logic (or keep enum and map)
    barrierFreeLabel?: BarrierFree; // Legacy enum
    petAllowed: PetAllowed; // Added
    petSupport: PetSupport; // Legacy enum

    // C. Price Range (Aggregated from Plans)
    priceAggMin?: number; // Auto-calculated
    priceAggMax?: number; // Auto-calculated
    managementFeeAggType: ManagementFeeType; // Keep manual or auto-calc? Request says manual fee type might remaining, but let's stick to request: "managementFeeAggType"
    priceAggUpdatedAt?: string;

    // D. Publish Control
    status: PublishStatus; // Renamed type alias but field name same
    listedInSearch: boolean; // Added

    // Content
    catchphrase: string;
    keyFeatures: { title: string; text: string; icon: ContentIcon; }[];
    overview: string;
    suitableFor: string[];
    notesPoints: string[];
    tags: AppealTag[];
    aiSummary: string;

    // Images
    mainImage: string;
    galleryImages: string[];

    // Specs
    phone: string;
    officeHours: string;
    notes?: string;
    successorRequirements: SuccessorReq; // Keep

    // Sub-objects
    seo: SeoSettings;
    calendar: CalendarSettings;
    createdAt?: string;
    updatedAt?: string;
    version?: number;
}

// --- Other Existing Types ---
// --- Plan Enums ---
export const PLAN_CATEGORIES = {
    generalGrave: '一般墓',
    perpetualMemorial: '永代供養墓',
    ossuary: '納骨堂',
    treeBurial: '樹木葬',
    gasshi: '合祀墓',
    handMemorial: '手元供養',
    seaBurial: '海洋散骨',
    other: 'その他'
} as const;
export type PlanCategoryType = keyof typeof PLAN_CATEGORIES;

export type PlanAvailability = 'available' | 'limited' | 'none' | 'unknown';
export type PeriodType = 'perpetual' | 'years' | 'unknown';
export type BurialMethodType = 'individual' | 'joint' | 'other'; // "burialMethod" in request, mapping to simplistic type for now

export const PLAN_AVAILABILITY_LABELS: Record<PlanAvailability, string> = {
    available: '空きあり',
    limited: '残りわずか',
    none: '空きなし',
    unknown: '要確認'
};

export const PLAN_PERIOD_LABELS: Record<PeriodType, string> = {
    perpetual: '永代（期限なし）',
    years: '年数指定',
    unknown: '要確認'
};

export const BURIAL_METHOD_LABELS: Record<BurialMethodType, string> = {
    individual: '個別安置',
    joint: '合祀',
    other: 'その他'
};

export const PET_ALLOWED_LABELS: Record<PetAllowed, string> = {
    allowed: '可',
    notAllowed: '不可',
    conditional: '条件付き',
    unknown: '不明'
};

export interface Plan {
    id: string;
    templeId: string;
    category: PlanCategoryType; // Refactored from PlanCategory string
    name: string;
    subDescription?: string;

    price: number; // Mandatory, fixed price
    priceNote?: string; // e.g. "1霊あたり"

    managementFee: number; // Optional, 0 allowed

    availability: PlanAvailability; // Refactored from PlanStatus

    burialMethod?: BurialMethodType; // New

    periodType: PeriodType; // New
    periodYears?: number; // Only if periodType === 'years'

    capacity?: string; // kept as string for flexibility "2霊"
    capacityNote?: string; // New "最大8霊まで"

    petAllowed?: PetAllowed; // Added to Plan

    images: string[];
    note?: string; // notes
    order: number;
}

export type ManagementBody = '寺院' | '宗教法人' | '地方自治体' | '民間企業' | '公益法人';
export type Religion = '仏教' | '神道' | 'キリスト教' | '宗教不問';
export type Parking = 'あり（無料）' | 'あり（有料）' | 'なし' | '近隣コインパーキングあり';
export type BarrierFree = '対応' | '一部対応' | '未対応';
export type PetSupport = '不可' | '同一区画可' | '専用区画あり' | '合祀のみ対応';
export type SuccessorReq = '継承者必要' | '継承者不要' | '一定期間後合祀';
export type Prefecture = '北海道' | '青森県' | '岩手県' | '宮城県' | '秋田県' | '山形県' | '福島県' | '茨城県' | '栃木県' | '群馬県' | '埼玉県' | '千葉県' | '東京都' | '神奈川県' | '新潟県' | '富山県' | '石川県' | '福井県' | '山梨県' | '長野県' | '岐阜県' | '静岡県' | '愛知県' | '三重県' | '滋賀県' | '京都府' | '大阪府' | '兵庫県' | '奈良県' | '和歌山県' | '鳥取県' | '島根県' | '岡山県' | '広島県' | '山口県' | '徳島県' | '香川県' | '愛媛県' | '高知県' | '福岡県' | '佐賀県' | '長崎県' | '熊本県' | '大分県' | '宮崎県' | '鹿児島県' | '沖縄県';
export type ContentIcon = '駅近' | '個室' | '屋内' | 'バリアフリー' | '管理不要' | '継承者不要' | '宗教不問' | 'カード参拝' | '駐車場' | '自然' | 'ペット可' | '費用抑えめ' | '人気' | '新しい施設' | '歴史ある寺院' | '相談可';
export type AppealTag = '宗教不問' | '檀家義務なし' | '管理料不要' | '駅近' | '駐車場' | 'バリアフリー' | '屋内' | '個室参拝' | 'カード参拝' | '会食可' | '生前申込可' | 'ペット供養可' | '永代供養あり' | '樹木葬あり' | '納骨堂あり' | '合祀墓あり';

export type InquiryStatus = 'new' | 'contacted' | 'done';
export interface Inquiry {
    id: string;
    receiptNumber: string;
    templeId?: string; // Legacy support or primary
    templeNameSnapshot?: string; // Legacy

    // Kind discriminator
    kind?: 'general' | 'business'; // Defaults to 'general' if undefined

    // Business Specific Fields
    organizationName?: string;
    websiteUrl?: string;
    contactName?: string;
    areas?: string;
    phone?: string;
    email?: string;
    address?: string;
    preferredTime?: string;
    preferredContact?: 'email' | 'phone';
    // user fields fallback supported via optional fields above or user obj

    // New Source Tracking
    desiredTempleId?: string;
    desiredTempleName?: string;
    desiredPlanId?: string;
    desiredPlanName?: string;

    // Strict Context Object per User Request
    context?: {
        refUrl?: string; // e.g. /search?area=tokyo
        templeId?: string; // if inquiring about specific temple
        templeName?: string;
        planId?: string;
        planName?: string;
        sourcePath?: string;
        sourceLabel?: string;
        source?: string; // Add source field to context
        pagePath?: string; // Add pagePath field to context
        referrer?: string; // Add referrer field to context
    };
    // New Fields for Consultation Types
    type?: 'consult' | 'grave_closure' | string;
    category?: 'grave_search' | 'grave_closure' | 'ikotsu_service' | string;
    inquiryType?: string; // For business inquiry type selection
    additionalFields?: Record<string, any>;

    // Grave Closure Specific
    graveTempleName?: string;
    graveTempleAddress?: string; // Full address preferred
    graveTemplePref?: string;
    graveTempleCity?: string;
    graveTempleZip?: string;
    graveTempleId?: string;

    // Legacy / Convenience
    ref?: string; // referrer source (e.g. 'search_result', 'top_hero')
    refUrl?: string; // can be empty string

    preferredDateTime: string;
    preferredDateTime2?: string;
    user: {
        name: string; // Legacy/Combined
        lastName?: string;
        firstName?: string;
        kana?: string; // Legacy/Combined
        lastNameKana?: string;
        firstNameKana?: string;
        phone: string;
        email: string;
        address?: string; // Legacy/Combined
        zipCode?: string;
        prefecture?: string;
        city?: string;
        addressLine?: string;
        building?: string;
    };
    message?: string;

    // Questionnaire
    boneStatus?: 'exist' | 'none' | 'unknown';
    graveTypes?: string[];
    nearbyCemeteryOptIn?: boolean;
    visitDate?: string;
    visitTime?: string;
    status: InquiryStatus;
    adminNotes?: string;
    createdAt: string;
    honeypot?: string;
}

// Mock Data
let MOCK_TEMPLES: Temple[] = [
    {
        id: "id1624858636",
        name: "清蓮メモリアルパーク東京",
        kana: "せいれんめもりあるぱーくとうきょう",
        type: '寺院墓地',
        managementBody: '寺院',
        religion: 'buddhism',
        buddhistSect: 'jodoShin',
        prefecture: '東京都',
        address: "港区芝公園4-2-8",
        prefectureCode: 13,
        cityName: "港区",
        addressLine: "芝公園4-2-8",
        lat: 35.6554,
        lng: 139.7486,
        nearestStations: [{ name: "赤羽橋駅", line: "都営大江戸線", walkMinutes: 5 }],
        access: "都営大江戸線「赤羽橋駅」より徒歩約5分",
        parkingAvailable: true,
        parking: 'あり（有料）',

        sects: ['浄土真宗'],
        supportedMemorialTypes: ['一般墓', '永代供養墓', '樹木葬'],
        indoorOutdoor: 'outdoor',
        barrierFree: true,
        barrierFreeLabel: '対応',
        petAllowed: 'conditional',
        petSupport: '専用区画あり',

        // priceMin: 300000,
        // priceMax: 1500000,
        // Using Agg instead
        priceAggMin: 300000,
        priceAggMax: 500000, // Updated based on MOCK_PLANS

        // managementFeeType: 'required', // Removed
        managementFeeAggType: 'required', // Init
        // managementFeeMin: 5000, // Legacy
        // managementFeeMax: 15000, // Legacy

        status: 'public',
        listedInSearch: true,
        successorRequirements: '継承者不要',
        phone: "0120-000-000",
        officeHours: "9:00〜17:00",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-20T10:00:00Z",

        catchphrase: "東京タワーを望む、都心の安らぎの聖地",
        keyFeatures: [
            { title: "駅徒歩5分の好立地", text: "赤羽橋駅から徒歩5分。ご高齢の方でも無理なくお参りいただけます。", icon: "駅近" },
            { title: "完全バリアフリー", text: "園内は段差のない設計。車椅子の方も安心してお参り可能です。", icon: "バリアフリー" },
            { title: "ペットと眠れる", text: "大切な家族であるペットと一緒に入れる専用区画をご用意しています。", icon: "ペット可" }
        ],
        overview: "清蓮メモリアルパーク東京は、東京タワーを間近に望む芝公園エリアにある、四季折々の花々に囲まれた都心の霊園です。\n由緒ある寺院が管理しており、永代にわたり手厚くご供養いたします。\n近年需要の高まる樹木葬や永代供養墓も充実しており、ニーズに合わせたプランをお選びいただけます。",
        suitableFor: [
            "都心でお墓を探している方",
            "後継ぎがいなく永代供養を希望される方",
            "ペットと一緒に入れるお墓をお探しの方"
        ],
        notesPoints: [
            "ペット区画は数に限りがあります",
            "法要施設のご利用は事前予約が必要です",
            "駐車場は近隣のコインパーキングもご利用いただけます"
        ],
        tags: ["駅近", "バリアフリー", "ペット供養可", "永代供養あり", "宗教不問"],
        aiSummary: "東京タワーを望む好立地にある寺院霊園です。\n駅近でバリアフリー完備、ペット共葬も可能な充実した設備が魅力。\n都心でアクセス重視の方や永代供養をお探しの方に最適です。",

        mainImage: "/images/hero_temple_01.jpg",
        galleryImages: [
            "/images/gallery_01.jpg",
            "/images/gallery_02.jpg",
            "/images/gallery_03.jpg"
        ],

        seo: {
            title: "清蓮メモリアルパーク東京 | 都心の永代供養墓",
            description: "港区芝公園にある清蓮メモリアルパーク東京。永代供養墓、樹木葬など。",
            summary: "清蓮メモリアルパーク東京は、港区芝公園にある都心型の寺院霊園です。東京タワーを望む好立地で、駅からも徒歩5分とアクセス抜群。完全バリアフリー設計で、ペットと一緒に入れる区画も用意されています。永代供養墓や樹木葬など多様なプランがあり、後継者のいない方でも安心してご利用いただけます。",
            primaryKeywords: ["東京 永代供養", "港区 霊園", "芝公園 墓地"],
            secondaryKeywords: ["ペット可", "バリアフリー", "駅近"],
            structuredDataEnabled: true,
            faqSource: 'facilityFaq',
            indexControl: 'index'
        },

        calendar: {
            bookingStatus: 'open',
            bookingChannels: ['form', 'phone'],
            availableWeekdays: [1, 2, 4, 5, 6, 0],
            startTime: "10:00",
            endTime: "16:00",
            slotIntervalMinutes: 60,
            visitDurationMinutes: 60,
            bufferMinutes: 0,
            cutoffRule: "hours48",
            bookingWindowDays: 60,
            dailyCapacity: 3,
            blackoutDates: [
                { date: "2026-02-10", note: "臨時休園" }
            ],
            requestMessage: "予約リクエストを受け付けました。内容を確認のうえ担当者より確定のご連絡を差し上げます。"
        }
    }
];

// Helper to Recalculate
const recalculateTemplePrice = (templeId: string) => {
    const templeIndex = MOCK_TEMPLES.findIndex(t => t.id === templeId);
    if (templeIndex === -1) return;

    const templePlans = MOCK_PLANS.filter(p => p.templeId === templeId && p.price > 0 && p.availability !== 'none');

    if (templePlans.length === 0) {
        MOCK_TEMPLES[templeIndex].priceAggMin = undefined;
        MOCK_TEMPLES[templeIndex].priceAggMax = undefined;
    } else {
        const prices = templePlans.map(p => p.price);
        MOCK_TEMPLES[templeIndex].priceAggMin = Math.min(...prices);
        MOCK_TEMPLES[templeIndex].priceAggMax = Math.max(...prices);
    }
    MOCK_TEMPLES[templeIndex].priceAggUpdatedAt = new Date().toISOString();
};

let MOCK_PLANS: Plan[] = [
    {
        id: "p1", templeId: "id1624858636", category: 'perpetualMemorial', name: "永代供養墓「安らぎ」", subDescription: "合祀タイプで費用を抑えたい方に最適です。",
        price: 300000, priceNote: "総額目安", managementFee: 0,
        availability: 'available',
        periodType: 'perpetual',
        burialMethod: 'joint',
        images: ["/images/plan_01.jpg"], note: "春と秋に合同法要を行います。", order: 1
    },
    {
        id: "p2", templeId: "id1624858636", category: 'treeBurial', name: "樹木葬「桜」", subDescription: "桜の木の下で眠る、自然に還るプラン。",
        price: 500000, priceNote: "一霊あたり", managementFee: 5000,
        availability: 'limited',
        periodType: 'years', periodYears: 33,
        burialMethod: 'individual',
        petAllowed: 'allowed',
        capacity: '2霊',
        images: ["/images/plan_02.jpg"], order: 2
    }
];

let MOCK_INQUIRIES: Inquiry[] = [];
let RECEIPT_COUNTER = 1000;

export const Store = {
    getTemples: () => MOCK_TEMPLES,
    getTemple: (id: string) => MOCK_TEMPLES.find(t => t.id === id),
    saveTemple: (temple: Temple) => { const idx = MOCK_TEMPLES.findIndex(t => t.id === temple.id); if (idx >= 0) { MOCK_TEMPLES[idx] = temple; } else { MOCK_TEMPLES.push(temple); } return temple; },
    createTemple: (data: Omit<Temple, "id">) => { const newTemple: Temple = { ...data, id: `t_${Date.now()}` }; MOCK_TEMPLES.push(newTemple); return newTemple; },
    getPlans: (templeId: string) => MOCK_PLANS.filter(p => p.templeId === templeId).sort((a, b) => a.order - b.order),
    getPlan: (id: string) => MOCK_PLANS.find(p => p.id === id),

    savePlan: (plan: Plan) => {
        const idx = MOCK_PLANS.findIndex(p => p.id === plan.id);
        if (idx >= 0) { MOCK_PLANS[idx] = plan; }
        else { MOCK_PLANS.push(plan); }

        // Trigger Aggregation
        recalculateTemplePrice(plan.templeId);

        return plan;
    },

    createPlan: (data: Omit<Plan, 'id'>) => {
        const newPlan: Plan = { ...data, id: `p_${Date.now()}` };
        MOCK_PLANS.push(newPlan);

        // Trigger Aggregation
        recalculateTemplePrice(newPlan.templeId);

        return newPlan;
    },

    deletePlan: (id: string) => {
        const plan = MOCK_PLANS.find(p => p.id === id);
        if (!plan) return;
        const tId = plan.templeId;
        MOCK_PLANS = MOCK_PLANS.filter(p => p.id !== id);

        // Trigger Aggregation
        recalculateTemplePrice(tId);
    },

    getInquiries: () => MOCK_INQUIRIES,
    addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status' | 'receiptNumber'>) => { RECEIPT_COUNTER++; const newInquiry: Inquiry = { ...inquiry, id: `inq_${Date.now()}`, receiptNumber: `R-${RECEIPT_COUNTER}`, status: 'new', createdAt: new Date().toISOString() }; MOCK_INQUIRIES.unshift(newInquiry); return newInquiry; },
    updateInquiry: (id: string, updates: Partial<Inquiry>) => { const idx = MOCK_INQUIRIES.findIndex(i => i.id === id); if (idx >= 0) { MOCK_INQUIRIES[idx] = { ...MOCK_INQUIRIES[idx], ...updates }; return MOCK_INQUIRIES[idx]; } return null; }
};
