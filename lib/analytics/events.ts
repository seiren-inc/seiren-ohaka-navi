/**
 * 診断ファネル用アナリティクスイベント定義
 * Doc-36 §11 / Doc-37 §8 準拠
 *
 * GA4 接続前はダミー実装（console.log + dataLayer push）
 */

export const DiagnosisEvents = {
    START: "diagnosis_start",
    STEP_COMPLETE: "diagnosis_step_complete",
    COMPLETE: "diagnosis_complete",
    RESULT_TYPE: "diagnosis_result_type",
    CLICK_CEMETERY: "diagnosis_result_click_cemetery",
    CLICK_CONSULT: "diagnosis_consult_click",
} as const;

type EventParams = Record<string, string | number | boolean>;

/**
 * イベントを発火するヘルパー関数。
 * GA4 の gtag / dataLayer が存在すれば push し、なければ console.log のみ。
 * 個人情報は含めない（Doc-36 §11）。
 */
export function trackDiagnosisEvent(
    eventName: (typeof DiagnosisEvents)[keyof typeof DiagnosisEvents],
    params?: EventParams,
): void {
    const payload = { event: eventName, ...params };

    // dataLayer（GTM）
    if (typeof window !== "undefined" && Array.isArray((window as Record<string, unknown>).dataLayer)) {
        (window as Record<string, unknown[]>).dataLayer.push(payload);
    }

    // 開発用ログ
    if (process.env.NODE_ENV === "development") {
        console.log("[Diagnosis Event]", eventName, params);
    }
}
