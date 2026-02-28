import { Question, SupplyTypeKey } from "./types";

/**
 * Doc-36 準拠の診断質問定義（最大7問）
 * Q1: 地域 → Q2: 予算 → Q3: 宗教 → Q4: お参り頻度 → Q5: 維持管理 → Q6: 埋葬人数 → Q7: 自然志向
 */
export const DIAGNOSIS_QUESTIONS: Question[] = [
    {
        id: "q1",
        title: "お墓を探しているエリアは？",
        subtitle: "候補墓地を絞り込むために使用します",
        required: true,
        options: [
            // Q1は都道府県セレクトで別途実装。ここではフォールバック選択肢
            { label: "関東（東京・神奈川・埼玉・千葉）", value: "kanto", scores: {}, reasonPhrase: "" },
            { label: "関西（大阪・京都・兵庫・奈良）", value: "kansai", scores: {}, reasonPhrase: "" },
            { label: "東海（愛知・静岡・岐阜・三重）", value: "tokai", scores: {}, reasonPhrase: "" },
            { label: "その他の地域", value: "other", scores: {}, reasonPhrase: "" },
            { label: "まだ決めていない", value: "undecided", scores: {}, reasonPhrase: "" },
        ],
    },
    {
        id: "q2",
        title: "費用感のイメージは？",
        subtitle: "初期費用＋年間管理料を含めた総額イメージ",
        required: true,
        options: [
            {
                label: "〜50万円で抑えたい",
                value: "under50",
                scores: { sea: 3, home: 3, perpetual: 2 },
                reasonPhrase: "費用を50万円以下に抑えたい",
            },
            {
                label: "50〜100万円",
                value: "50to100",
                scores: { perpetual: 3, tree: 3, home: 1 },
                reasonPhrase: "費用は50〜100万円で考えている",
            },
            {
                label: "100〜200万円",
                value: "100to200",
                scores: { ossuary: 3, tree: 2, general: 2 },
                reasonPhrase: "100〜200万円の予算で考えている",
            },
            {
                label: "200万円以上でもこだわりたい",
                value: "over200",
                scores: { general: 3, diamond: 3, ossuary: 2 },
                reasonPhrase: "費用よりこだわりや価値を重視する",
            },
            {
                label: "まだ決まっていない",
                value: "undecided",
                scores: {},
                reasonPhrase: "",
            },
        ],
    },
    {
        id: "q3",
        title: "宗教・宗派のこだわりは？",
        required: true,
        options: [
            {
                label: "宗旨宗派を問わない（自由がいい）",
                value: "free",
                scores: { tree: 3, sea: 3, perpetual: 2, ossuary: 1 },
                reasonPhrase: "宗派にこだわらない",
            },
            {
                label: "特定の宗派・お寺との付き合いがある",
                value: "specific",
                scores: { general: 3, ossuary: 1 },
                reasonPhrase: "特定の宗派との関係を大切にしたい",
            },
            {
                label: "まだ分からない・未定",
                value: "undecided",
                scores: {},
                reasonPhrase: "",
            },
        ],
    },
    {
        id: "q4",
        title: "お参りの頻度はどのくらいですか？",
        subtitle: "回答をスキップしてもかまいません",
        required: false,
        options: [
            {
                label: "月1回以上お参りしたい",
                value: "monthly",
                scores: { ossuary: 3, general: 2 },
                reasonPhrase: "頻繁にお参りしたい",
            },
            {
                label: "年に数回（お盆やお彼岸など）",
                value: "yearly",
                scores: { tree: 2, perpetual: 2, general: 1 },
                reasonPhrase: "年に数回のお参りを考えている",
            },
            {
                label: "ほぼ行けない（遠方や体調の事情）",
                value: "rarely",
                scores: { perpetual: 3, sea: 2, home: 3 },
                reasonPhrase: "お参りに頻繁に行くのが難しい",
            },
        ],
    },
    {
        id: "q5",
        title: "維持管理やご家族の将来について",
        required: true,
        options: [
            {
                label: "年間管理費を抑えたい",
                value: "low_fee",
                scores: { perpetual: 3, sea: 3, tree: 2, home: 2 },
                reasonPhrase: "年間管理費を抑えたい",
            },
            {
                label: "子供に管理の負担を残したくない",
                value: "no_burden",
                scores: { perpetual: 3, tree: 3, sea: 2, ossuary: 1 },
                reasonPhrase: "ご家族への将来の負担を軽減したい",
            },
            {
                label: "特に不安は感じていない",
                value: "no_worry",
                scores: { general: 2, ossuary: 1 },
                reasonPhrase: "",
            },
        ],
    },
    {
        id: "q6",
        title: "何名分のスペースをお考えですか？",
        subtitle: "回答をスキップしてもかまいません",
        required: false,
        options: [
            {
                label: "1人",
                value: "one",
                scores: { perpetual: 2, tree: 2, sea: 2 },
                reasonPhrase: "1名分のスペースで考えている",
            },
            {
                label: "2人（ご夫婦など）",
                value: "two",
                scores: { tree: 3, ossuary: 2, perpetual: 2 },
                reasonPhrase: "ご夫婦での利用を考えている",
            },
            {
                label: "3人以上（ご家族全員）",
                value: "family",
                scores: { general: 3, ossuary: 2 },
                reasonPhrase: "ご家族全員分のスペースが必要",
            },
            {
                label: "まだ決めていない",
                value: "undecided",
                scores: {},
                reasonPhrase: "",
            },
        ],
    },
    {
        id: "q7",
        title: "お墓の雰囲気として、お気持ちに近いのは？",
        subtitle: "回答をスキップしてもかまいません",
        required: false,
        options: [
            {
                label: "自然に還る形がいい（花や緑に囲まれたい）",
                value: "nature",
                scores: { tree: 3, sea: 2 },
                reasonPhrase: "自然に還る形を希望する",
            },
            {
                label: "従来のお墓らしい形がいい",
                value: "traditional",
                scores: { general: 3, ossuary: 1 },
                reasonPhrase: "従来のお墓の形式を希望する",
            },
            {
                label: "特にこだわりはない",
                value: "undecided",
                scores: {},
                reasonPhrase: "",
            },
        ],
    },
];

/**
 * 加点マトリクスのバリデーション用ヘルパー
 * 全質問・全回答・全タイプのスコアが非負であることを保証
 */
export function validateRules(): boolean {
    for (const q of DIAGNOSIS_QUESTIONS) {
        for (const opt of q.options) {
            for (const [, score] of Object.entries(opt.scores)) {
                if (score < 0) return false;
            }
        }
    }
    return true;
}
