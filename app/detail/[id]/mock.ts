
export interface FacilityPlan {
    id: string;
    type: 'general' | 'eitai' | 'tree' | 'noukotsudou' | 'other';
    typeName: string;
    name: string;
    price: number; // in yen
    maintenanceFee?: number; // 0 means none
    capacity?: string; // e.g. "1~4名"
    features: string[];
    description: string;
    imageUrl?: string;
}

export interface FacilityReview {
    id: string;
    user: string;
    score: number;
    date: string;
    comment: string;
    tags?: string[];
}

export interface FacilityFaq {
    q: string;
    a: string;
}

export interface FacilityImage {
    url: string; // Placeholder color or path
    caption: string;
}

export interface FacilityDetail {
    id: string;
    name: string;
    ruby?: string;
    typeBadges: string[]; // e.g. ["民営霊園", "宗派不問"]
    address: string;
    coordinates: { lat: number; lng: number };
    access: string;
    rating: {
        score: number;
        count: number;
    };
    minPrice: {
        [key: string]: number; // e.g. "general": 1000000
    };
    images: FacilityImage[];
    features: string[]; // e.g. "バリアフリー", "駐車場あり"
    basicInfo: { label: string; value: string }[];
    plans: FacilityPlan[];
    reviews: FacilityReview[];
    faqs: FacilityFaq[];
    description: string;
    report?: {
        title: string;
        content: string;
    };
}

export const MOCK_FACILITY_DATA: FacilityDetail = {
    id: "id1624858636",
    name: "清蓮メモリアルパーク東京",
    ruby: "せいれんめもりあるぱーくとうきょう",
    typeBadges: ["民営霊園", "宗教不問"],
    address: "東京都港区芝公園4-2-8",
    coordinates: { lat: 35.6586, lng: 139.7454 },
    access: "都営大江戸線「赤羽橋駅」より徒歩約5分",
    rating: {
        score: 4.5,
        count: 128
    },
    minPrice: {
        "一般墓": 800000,
        "樹木葬": 300000,
        "納骨堂": 500000,
        "永代供養": 100000
    },
    images: [
        { url: "bg-gray-300", caption: "緑豊かな園内風景" },
        { url: "bg-gray-200", caption: "メインエントランス" },
        { url: "bg-gray-400", caption: "樹木葬エリア" },
        { url: "bg-gray-300", caption: "永代供養墓「久遠」" },
        { url: "bg-gray-200", caption: "法要施設内部" },
    ],
    features: [
        "駅近", "駐車場あり", "バリアフリー", "ペット共葬可", "生前申込可",
        "法要施設あり", "管理棟あり", "永代供養施設", "宗教不問"
    ],
    basicInfo: [
        { label: "所在地", value: "東京都港区芝公園4-2-8" },
        { label: "霊園種別", value: "民営霊園" },
        { label: "宗旨・宗派", value: "宗教不問（在来仏教、神道、キリスト教、無宗教など、どなたでもご利用いただけます）" },
        { label: "総面積/区画数", value: "3,500㎡ / 1,200区画" },
        { label: "経営主体", value: "宗教法人 清蓮会" },
        { label: "開園時間", value: "9:00 〜 17:00（年中無休）" },
        { label: "設備", value: "管理棟、法要室、休憩所、駐車場（50台）、水場、トイレ（多目的あり）" },
    ],
    plans: [
        {
            id: "p1",
            type: "tree",
            typeName: "樹木葬",
            name: "樹木葬「桜花」 1人用",
            price: 300000,
            maintenanceFee: 0,
            capacity: "1名",
            features: ["永代供養付", "個別安置", "ペット可"],
            description: "桜の木の下で眠る樹木葬プランです。最後の納骨から13年後に合祀されます。管理費は不要です。"
        },
        {
            id: "p2",
            type: "tree",
            typeName: "樹木葬",
            name: "樹木葬「桜花」 夫婦用",
            price: 550000,
            maintenanceFee: 0,
            capacity: "2名",
            features: ["永代供養付", "個別安置", "ペット可"],
            description: "ご夫婦で入れる区画です。お二人目の納骨から13年後に合祀となります。"
        },
        {
            id: "p3",
            type: "eitai",
            typeName: "永代供養墓",
            name: "合祀墓「やすらぎ」",
            price: 100000,
            maintenanceFee: 0,
            capacity: "1名",
            features: ["合祀", "年間管理費なし"],
            description: "最初から合祀となるプランです。費用を最小限に抑えたい方に適しています。"
        },
        {
            id: "p4",
            type: "noukotsudou",
            typeName: "納骨堂",
            name: "自動搬送式納骨堂「光」",
            price: 800000,
            maintenanceFee: 12000,
            capacity: "〜8名",
            features: ["屋内", "カード参拝", "冷暖房完備"],
            description: "最新の自動搬送式納骨堂です。天候を気にせず、カード一枚でいつでもお参りが可能です。"
        },
        {
            id: "p5",
            type: "general",
            typeName: "一般墓",
            name: "スタンダード一般墓 0.8㎡",
            price: 1200000,
            maintenanceFee: 15000,
            capacity: "制限なし",
            features: ["代々継承", "石碑自由設計"],
            description: "伝統的な石のお墓です。和型・洋型からデザインを選べます。永代使用料と墓石代を含んだ目安です。"
        }
    ],
    reviews: [
        {
            id: "r1",
            user: "K.S様 (50代 男性)",
            score: 5,
            date: "2024/01/15",
            comment: "駅から近くて大変便利です。園内も掃除が行き届いており、いつ行っても気持ちよくお参りできます。スタッフの方の対応も丁寧でした。",
            tags: ["交通利便性", "環境・設備"]
        },
        {
            id: "r2",
            user: "M.T様 (60代 女性)",
            score: 4,
            date: "2023/12/10",
            comment: "樹木葬を見学しました。桜の木が立派で、ここなら寂しくないだろうと感じて契約しました。費用も予算内で収まり満足しています。",
            tags: ["樹木葬", "費用"]
        },
        {
            id: "r3",
            user: "Y.O様 (40代 女性)",
            score: 4,
            date: "2023/11/05",
            comment: "駐車場が広くて車でも行きやすいです。法要施設もきれいでした。",
            tags: ["設備", "駐車場"]
        }
    ],
    faqs: [
        {
            q: "見学の予約は必要ですか？",
            a: "基本的には予約なしでもご見学いただけますが、スタッフによる詳しい・ご案内をご希望の場合は、事前にご予約いただくことをおすすめします。"
        },
        {
            q: "ペットと一緒に入れますか？",
            a: "はい、一部の区画（樹木葬エリアなど）ではペットとの共葬が可能です。詳細はプラン一覧をご確認ください。"
        },
        {
            q: "お墓の引越し（改葬）の相談はできますか？",
            a: "はい、承っております。改葬の手続きや石材店の手配など、トータルでサポートさせていただきますので、お気軽にご相談ください。"
        }
    ],
    description: "都心にありながら、四季折々の自然を感じられるやすらぎの空間です。\n最新の設備と充実した管理体制で、将来にわたって安心してお任せいただけます。\n宗旨・宗派を問わず、どなたでもご利用いただける開かれた霊園です。\nバリアフリー設計で、車椅子の方やベビーカーをご利用の方もお参りしやすくなっています。"
};
