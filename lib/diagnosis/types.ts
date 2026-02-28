// 供養タイプキー
export type SupplyTypeKey =
    | "general"    // 一般墓
    | "perpetual"  // 永代供養墓
    | "ossuary"    // 納骨堂
    | "tree"       // 樹木葬
    | "sea"        // 海洋散骨
    | "home"       // 自宅供養（手元供養）
    | "diamond";   // 遺骨ダイヤモンド

// 質問ID（Doc-36 準拠 7問）
export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7";

// 診断回答
export interface DiagnosisAnswers {
    q1?: string; // 地域（都道府県）
    q2?: string; // 予算感
    q3?: string; // 宗教条件
    q4?: string; // お参り頻度
    q5?: string; // 維持管理の不安
    q6?: string; // 埋葬人数
    q7?: string; // 自然志向
}

// 回答選択肢
export interface AnswerOption {
    label: string;
    value: string;
    scores: Partial<Record<SupplyTypeKey, number>>;
    reasonPhrase: string;
}

// 質問定義
export interface Question {
    id: QuestionId;
    title: string;
    subtitle?: string;
    required: boolean;
    options: AnswerOption[];
}

// スコア結果
export interface ScoreResult {
    type: SupplyTypeKey;
    score: number;     // 0〜100 正規化済み
    rawScore: number;
}

// 推薦理由
export interface ExplainResult {
    topReasons: string[];                          // 重視された点 上位3
    typeReasons: Partial<Record<SupplyTypeKey, string>>; // タイプ別合致理由
    cautions: Partial<Record<SupplyTypeKey, string>>;    // タイプ別注意点
}

// 供養タイプ表示情報
export interface SupplyTypeInfo {
    key: SupplyTypeKey;
    name: string;
    description: string;
    link: string;
    suitability: string;
    caution: string;
}

// 供養タイプマスターデータ
export const SUPPLY_TYPE_INFO: Record<SupplyTypeKey, SupplyTypeInfo> = {
    general: {
        key: "general",
        name: "一般墓",
        description: "代々継承していく従来のお墓。家族の絆を形に残し、親族が集まる場所として最も馴染みがあります。",
        link: "/search?type=ippan",
        suitability: "伝統を重んじ、家族で守る場所が欲しい方に向いています。",
        caution: "承継者（管理する人）が必要で、費用も高くなる傾向があります。",
    },
    perpetual: {
        key: "perpetual",
        name: "永代供養墓",
        description: "寺院や霊園が家族に代わって管理・供養を行います。継承者がいなくても安心で、費用も抑えられます。",
        link: "/choices/eitai-kuyou",
        suitability: "子供に負担を残したくないが、お参り場所は欲しい方に適しています。",
        caution: "合祀（他の方と一緒になる）タイプの場合、後から遺骨を取り出せないことがあります。",
    },
    ossuary: {
        key: "ossuary",
        name: "納骨堂",
        description: "屋内の施設に遺骨を収蔵します。天候に左右されずお参りができ、駅近などアクセスが良い場所が多いです。",
        link: "/choices/noukotsudou",
        suitability: "利便性を重視し、快適にお参りしたい方に選ばれています。",
        caution: "建物の老朽化リスクや、一定期間後に合祀される契約内容の確認が必要です。",
    },
    tree: {
        key: "tree",
        name: "樹木葬",
        description: "墓石の代わりに木や花をシンボルにします。自然に還りたい方や、明るい雰囲気を好む方に人気です。",
        link: "/choices/jumokusou",
        suitability: "自然志向が強く、仰々しいお墓を作りたくない方に向いています。",
        caution: "個別に埋葬されるタイプと、最初から合祀されるタイプがあり、確認が必要です。",
    },
    sea: {
        key: "sea",
        name: "海洋散骨",
        description: "粉末化した遺骨を海に撒きます。お墓を持たず、自然の大きなサイクルに還りたい方に適しています。",
        link: "/choices/sankotsu",
        suitability: "特定の場所に縛られたくない、形を残したくないという考えに近い選択肢です。",
        caution: "遺骨が手元に残らないため、後から「お参りしたい」と思っても場所がありません。分骨など事前の検討が必要です。",
    },
    home: {
        key: "home",
        name: "自宅供養（手元供養）",
        description: "遺骨を自宅で保管したり、アクセサリーとして身につけたりする方法です。最も身近に故人を感じられます。",
        link: "/choices/temoto-kuyou",
        suitability: "まだ離れがたい方、形式よりも気持ちの整理を優先したい方に適しています。",
        caution: "将来的にご自身の管理が難しくなった際の最終的な行き先（永代供養など）を考えておく必要があります。",
    },
    diamond: {
        key: "diamond",
        name: "遺骨ダイヤモンド",
        description: "遺骨から抽出した成分で人工ダイヤモンドを作ります。究極の形見として、世代を超えて受け継ぐことができます。",
        link: "/choices/ikotsu-diamond",
        suitability: "費用をかけてでも、美しく変わらない形で手元に残したいという想いに応える選択肢です。",
        caution: "製作に数十万円〜の費用と、半年以上の期間がかかります。また、紛失への注意も必要です。",
    },
};
