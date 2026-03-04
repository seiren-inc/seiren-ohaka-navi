import { createHash } from "crypto";

export const CONTRACT_VERSION = "v1.0";

export interface ContractData {
    contractId: string;
    templeName: string;
    representativeName: string;
    representativeTitle: string;
    contactEmail: string;
    planType: "free" | "standard" | "sponsor";
    agreedAt: Date;
    agreedIp: string;
}

const PLAN_DETAILS: Record<string, { label: string; monthly: string; lead: string }> = {
    free: {
        label: "無料プラン（Free）",
        monthly: "0円",
        lead: "資料請求3,000円 / 問い合わせ5,000円 / 来訪予約10,000円（各税別・件）",
    },
    standard: {
        label: "標準プラン（Standard）",
        monthly: "30,000円（税別）/月",
        lead: "資料請求3,000円 / 問い合わせ5,000円 / 来訪予約10,000円（各税別・件）",
    },
    sponsor: {
        label: "PR枠プラン（Sponsor）",
        monthly: "100,000円（税別）/月",
        lead: "資料請求3,000円 / 問い合わせ5,000円 / 来訪予約10,000円（各税別・件）",
    },
};

/** 契約書本文テキスト（ハッシュ計算・PDF生成に使用） */
export function buildContractText(data: ContractData): string {
    const plan = PLAN_DETAILS[data.planType];
    const dateStr = data.agreedAt.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });

    return `
清蓮 掲載サービス利用規約に基づく掲載契約書
契約番号: ${data.contractId}
バージョン: ${CONTRACT_VERSION}
契約締結日: ${dateStr}

【甲（掲載施設）】
施設名: ${data.templeName}
担当者: ${data.representativeName}（${data.representativeTitle}）
連絡先: ${data.contactEmail}

【乙（サービス提供者）】
株式会社清蓮
サービス名: 清蓮 お墓探しナビ

【選択プラン】
プラン名: ${plan.label}
月額費用: ${plan.monthly}
リード課金: ${plan.lead}

第1条（目的）
本契約は、乙が運営する「清蓮 お墓探しナビ」（以下「本サービス」）に甲の施設情報を掲載し、
利用者への案内および問い合わせ受付を行うことを目的とする。

第2条（掲載内容と情報提供義務）
甲は施設名、所在地、連絡先、区画プランおよび料金（税込）、施設写真等を提供し、最新状態を維持する義務を負う。
区画が完売・停止した場合は速やかに乙へ通知しなければならない。

第3条（プランと料金）
甲は本契約において前記【選択プラン】に記載のプランを選択し、同プランに定める料金を乙へ支払う。

第4条（リード課金）
（1）有効リードの定義：資料請求、お問い合わせ（来訪意向あり）、来訪予約の3種別とする。
（2）単価は前記【選択プラン】の「リード課金」欄のとおりとする。
（3）無効リードの申請：スパム・重複（7日以内）・電話番号不通等は申請期限（リード発生より14日以内）に申請することにより課金対象外とする。
（4）月末締め、翌月15日請求書発行、翌月末払い。

第5条（請求と支払）
月額掲載料及びリード課金を合算して月末締め翌月末日に銀行振込にて支払う。遅延損害金は年14.6%とする。

第6条（甲の義務）
（1）提供情報の正確性・最新性の維持。
（2）問い合わせユーザーへの3営業日以内の対応。
（3）本サービス経由のユーザーをポータル非経由と偽る行為の禁止。

第7条（乙の義務）
（1）掲載情報の正確な表示への努力。
（2）月次リード集計レポートの提供。
（3）甲のデータの第三者への無断提供禁止。

第8条（禁止事項）
虚偽情報の掲載、口コミ不正操作の依頼、他施設の誹謗中傷を禁止する。

第9条（契約期間と解約）
（1）本契約は締結日から1年間とし、解約の申出がない場合は自動更新する。
（2）解約は30日前の書面通知による。解約月の月額掲載料は満額適用（日割返金なし）。

第10条（損害賠償の制限）
乙の損害賠償責任は、損害発生直前6ヶ月の月額掲載料の合計額を上限とする。

第11条（秘密保持）
甲乙ともに、本契約に関して知り得た相手方の機密情報を第三者に開示・漏洩しない。

第12条（電子契約の有効性）
本契約は民法第522条に基づき、甲によるウェブフォームへの入力・送信をもって申込みの意思表示とし、
乙の承諾により成立する電子契約である。本契約書はその証拠として機能する。
同意日時: ${data.agreedAt.toISOString()}
同意時IPアドレス: ${data.agreedIp}

第13条（準拠法・管轄）
本契約は日本法に準拠し、東京地方裁判所を専属的合意管轄裁判所とする。

以上、本契約成立の証として本書を作成した。
`.trim();
}

/** 契約書テキストのSHA-256ハッシュを返す */
export function hashContractText(text: string): string {
    return createHash("sha256").update(text, "utf8").digest("hex");
}

export { PLAN_DETAILS };
