export type GraveType = "general" | "eitai" | "tree" | "nokotsu";

export interface Plan {
    name: string;
    price: number; // in Yen
    maintenanceFee: number; // Annual fee
    description: string;
}

export interface Graveyard {
    id: string;
    name: string;
    prefecture: string;
    city: string;
    address: string;
    access: string; // e.g. "徒歩5分"
    types: GraveType[];
    features: string[]; // e.g. "宗教不問", "バリアフリー"
    minPrice: number;
    description: string;
    imageUrl: string;
    plans: Plan[];
    coordinates: { lat: number; lng: number };
}

export const MOCK_GRAVEYARDS: Graveyard[] = [
    {
        id: "g1",
        name: "清蓮寺 永代供養墓",
        prefecture: "東京都",
        city: "世田谷区",
        address: "東京都世田谷区松原1-1-1",
        access: "明大前駅 徒歩5分",
        types: ["eitai", "nokotsu"],
        features: ["宗教不問", "管理料不要", "駅近", "バリアフリー"],
        minPrice: 150000,
        description: "都心からのアクセスが良く、静かな環境で心安らかに眠れる永代供養墓です。年間管理費は一切かかりません。",
        imageUrl: "/mock/temple1.jpg",
        plans: [
            { name: "合祀プラン", price: 150000, maintenanceFee: 0, description: "他の方と一緒に埋葬されるプランです。" },
            { name: "個別安置プラン(13年)", price: 400000, maintenanceFee: 0, description: "13年間骨壺のまま個別安置し、その後合祀します。" }
        ],
        coordinates: { lat: 35.668, lng: 139.650 }
    },
    {
        id: "g2",
        name: "横浜 あおぞら樹木葬",
        prefecture: "神奈川県",
        city: "横浜市",
        address: "神奈川県横浜市緑区1-2-3",
        access: "横浜線 中山駅 バス10分",
        types: ["tree"],
        features: ["宗教不問", "ペット可", "駐車場あり", "自然豊か"],
        minPrice: 350000,
        description: "四季折々の花に囲まれた、自然に還る樹木葬です。ペットと一緒に入れる区画もご用意しています。",
        imageUrl: "/mock/tree1.jpg",
        plans: [
            { name: "桜エリア(1名)", price: 350000, maintenanceFee: 5000, description: "桜の木の下で眠る人気のエリアです。" },
            { name: "家族エリア(4名まで)", price: 900000, maintenanceFee: 8000, description: "ご家族で一緒に入れる広めの区画です。" }
        ],
        coordinates: { lat: 35.518, lng: 139.529 }
    },
    {
        id: "g3",
        name: "浅草 瑠璃納骨堂",
        prefecture: "東京都",
        city: "台東区",
        address: "東京都台東区浅草2-2-2",
        access: "浅草駅 徒歩3分",
        types: ["nokotsu", "eitai"],
        features: ["宗教不問", "駅近", "室内", "自動搬送式", "冷暖房完備"],
        minPrice: 800000,
        description: "最新の自動搬送式納骨堂。ICカード一枚で気軽にお参りが可能です。天候に左右されず快適にお過ごしいただけます。",
        imageUrl: "/mock/indoor1.jpg",
        plans: [
            { name: "スタンダード", price: 800000, maintenanceFee: 12000, description: "一般的なサイズの参拝ブースをご利用いただけます。" },
            { name: "特別参拝室プラン", price: 1500000, maintenanceFee: 18000, description: "広々とした個室の参拝室をご利用いただけます。" }
        ],
        coordinates: { lat: 35.714, lng: 139.796 }
    },
    {
        id: "g4",
        name: "鎌倉 富士見霊園",
        prefecture: "神奈川県",
        city: "鎌倉市",
        address: "神奈川県鎌倉市大船5-5-5",
        access: "大船駅 バス15分",
        types: ["general", "eitai"],
        features: ["駐車場あり", "富士山が見える", "バリアフリー"],
        minPrice: 1200000,
        description: "晴れた日には富士山を望む絶景の霊園です。伝統的な一般墓から永代供養墓まで幅広く対応しています。",
        imageUrl: "/mock/general1.jpg",
        plans: [
            { name: "一般墓地(1.0㎡)", price: 1200000, maintenanceFee: 15000, description: "墓石代は別途費用がかかります。" },
            { name: "永代供養付き墓地", price: 1800000, maintenanceFee: 10000, description: "跡継ぎがいなくなった後も安心のプランです。" }
        ],
        coordinates: { lat: 35.353, lng: 139.531 }
    }
];
