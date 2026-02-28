import { DiagnosisAnswers, ScoreResult, SupplyTypeKey } from "./types";
import { DIAGNOSIS_QUESTIONS } from "./rules";

const ALL_TYPES: SupplyTypeKey[] = [
    "general", "perpetual", "ossuary", "tree", "sea", "home", "diamond",
];

/**
 * 診断回答からスコアを算出し、0〜100 に正規化して返す。
 * Doc-36 §5「透明ロジック」に準拠。
 */
export function calculateScores(answers: DiagnosisAnswers): ScoreResult[] {
    // 各タイプの生スコアを集計
    const rawScores: Record<SupplyTypeKey, number> = {
        general: 0, perpetual: 0, ossuary: 0,
        tree: 0, sea: 0, home: 0, diamond: 0,
    };

    const answerEntries = Object.entries(answers) as [string, string][];

    for (const [qId, selectedValue] of answerEntries) {
        if (!selectedValue) continue;
        const question = DIAGNOSIS_QUESTIONS.find((q) => q.id === qId);
        if (!question) continue;
        const option = question.options.find((o) => o.value === selectedValue);
        if (!option) continue;

        for (const [typeKey, score] of Object.entries(option.scores)) {
            if (score && score > 0) {
                rawScores[typeKey as SupplyTypeKey] += score;
            }
        }
    }

    // 最大スコアを取得（正規化用）
    const maxRaw = Math.max(...Object.values(rawScores), 1);

    // 正規化して降順ソート
    const results: ScoreResult[] = ALL_TYPES.map((type) => ({
        type,
        rawScore: rawScores[type],
        score: Math.round((rawScores[type] / maxRaw) * 100),
    }));

    results.sort((a, b) => b.score - a.score);

    return results;
}

/**
 * 上位N件のスコア結果を返す（Doc-36: 上位2タイプ推奨）
 */
export function getTopTypes(scores: ScoreResult[], count: number = 2): ScoreResult[] {
    return scores.slice(0, count);
}
