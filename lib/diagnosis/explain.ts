import { DiagnosisAnswers, ExplainResult, ScoreResult, SupplyTypeKey, SUPPLY_TYPE_INFO } from "./types";
import { DIAGNOSIS_QUESTIONS } from "./rules";

/**
 * 推薦理由を生成する。
 * Doc-36 §7「説明責任」に準拠。
 *
 * 1. あなたの条件で重視された点（上位3つ）
 * 2. 供養タイプ別の合致理由（2行ずつ）
 * 3. 注意点（1〜2行）
 */
export function generateExplanation(
    answers: DiagnosisAnswers,
    topScores: ScoreResult[],
): ExplainResult {
    // 1. 回答から理由フレーズを収集
    const allReasonPhrases: string[] = [];
    const typeReasonMap: Partial<Record<SupplyTypeKey, string[]>> = {};

    const answerEntries = Object.entries(answers) as [string, string][];

    for (const [qId, selectedValue] of answerEntries) {
        if (!selectedValue) continue;
        const question = DIAGNOSIS_QUESTIONS.find((q) => q.id === qId);
        if (!question) continue;
        const option = question.options.find((o) => o.value === selectedValue);
        if (!option || !option.reasonPhrase) continue;

        // 全体の理由リスト
        if (!allReasonPhrases.includes(option.reasonPhrase)) {
            allReasonPhrases.push(option.reasonPhrase);
        }

        // タイプ別の理由リスト
        for (const [typeKey] of Object.entries(option.scores)) {
            const key = typeKey as SupplyTypeKey;
            if (!typeReasonMap[key]) {
                typeReasonMap[key] = [];
            }
            if (!typeReasonMap[key]!.includes(option.reasonPhrase)) {
                typeReasonMap[key]!.push(option.reasonPhrase);
            }
        }
    }

    // 2. 上位3つの理由を抽出
    const topReasons = allReasonPhrases.slice(0, 3);

    // 3. タイプ別の合致理由を生成（上位タイプのみ）
    const typeReasons: Partial<Record<SupplyTypeKey, string>> = {};
    for (const scoreResult of topScores) {
        const reasons = typeReasonMap[scoreResult.type] || [];
        if (reasons.length > 0) {
            typeReasons[scoreResult.type] =
                `「${reasons.join("」「")}」という傾向があるため、この考え方に近い選択肢です。`;
        } else {
            typeReasons[scoreResult.type] =
                "あなたの回答傾向から、バランスの取れた選択肢としておすすめします。";
        }
    }

    // 4. 注意点はマスターデータから取得
    const cautions: Partial<Record<SupplyTypeKey, string>> = {};
    for (const scoreResult of topScores) {
        const info = SUPPLY_TYPE_INFO[scoreResult.type];
        if (info?.caution) {
            cautions[scoreResult.type] = info.caution;
        }
    }

    return { topReasons, typeReasons, cautions };
}
