/**
 * 診断ファネル用アナリティクスイベント定義
 * Doc-36 §11 / Doc-37 §8 準拠
 */

export const DiagnosisEvents = {
    START: "diagnosis_start",
    STEP_COMPLETE: "diagnosis_step_complete",
    COMPLETE: "diagnosis_complete",
    RESULT_TYPE: "diagnosis_result_type",
    CLICK_CEMETERY: "diagnosis_result_click_cemetery",
    CLICK_CONSULT: "diagnosis_consult_click",
} as const;

export const SearchEvents = {
    SUBMIT: "search_submit",
    FILTER_APPLY: "filter_apply",
} as const;

export const FacilityEvents = {
    VIEW: "facility_view",
    CTA_CLICK: "facility_cta_click",
} as const;

export const FormEvents = {
    START: "form_start",
    COMPLETE: "form_complete",
    ERROR: "form_error",
} as const;

type EventName =
    | (typeof DiagnosisEvents)[keyof typeof DiagnosisEvents]
    | (typeof SearchEvents)[keyof typeof SearchEvents]
    | (typeof FacilityEvents)[keyof typeof FacilityEvents]
    | (typeof FormEvents)[keyof typeof FormEvents];

type EventParams = Record<string, string | number | boolean>;

/**
 * イベントを発火するヘルパー関数。
 * GA4 の gtag / dataLayer が存在すれば push し、なければ console.log のみ。
 * 個人情報は含めない（Doc-36 §11 / Doc-15 §2）。
 */
export function trackEvent(eventName: EventName, params?: EventParams): void {
    const payload = { event: eventName, ...params };

    // dataLayer（GTM または GA4）
    const win = window as any;
    if (typeof win !== "undefined" && Array.isArray(win.dataLayer)) {
        win.dataLayer.push(payload);
    }

    // gtag (Direct GA4 mapping)
    if (typeof win !== "undefined" && typeof win.gtag === "function") {
        win.gtag("event", eventName, params);
    }

    // 開発用ログ
    if (process.env.NODE_ENV === "development") {
        console.log(`[Event: ${eventName}]`, params);
    }
}

/**
 * @deprecated Use trackEvent directly. Keeping for backward compatibility with DiagnosisWizard.
 */
export function trackDiagnosisEvent(
    eventName: (typeof DiagnosisEvents)[keyof typeof DiagnosisEvents],
    params?: EventParams,
): void {
    trackEvent(eventName, params);
}
