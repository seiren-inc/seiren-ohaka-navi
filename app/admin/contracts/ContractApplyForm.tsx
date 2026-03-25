"use client";

import { useState } from "react";
import { FileText, CheckCircle2, Loader2, ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";

const PLAN_OPTIONS = [
    {
        value: "free",
        label: "無料プラン（Free）",
        monthly: "0円",
        description: "基本掲載 + 問い合わせ導線。リード課金のみ。",
        color: "border-gray-200 bg-white",
    },
    {
        value: "standard",
        label: "標準プラン（Standard）",
        monthly: "30,000円（税別）/月",
        description: "「おすすめ」バッジ・上位表示・詳細コンテンツ強化。",
        color: "border-emerald-400 bg-emerald-50",
        recommended: true,
    },
    {
        value: "sponsor",
        label: "PR枠プラン（Sponsor）",
        monthly: "100,000円（税別）/月",
        description: "エリアページ最上部固定表示・「PR」バッジ。",
        color: "border-amber-400 bg-amber-50",
    },
];

const CONTRACT_PREVIEW = `
第1条（目的）本サービス「清蓮 お墓探しナビ」に施設情報を掲載し、利用者への案内および問い合わせ受付を行う。
第2条（掲載情報の義務）施設情報を最新状態に維持し、完売・停止時は速やかに通知する。
第3条（プランと料金）申込時に選択したプランの料金を支払う。
第4条（リード課金）資料請求3,000円、問い合わせ5,000円、来訪予約10,000円（各税別・件）。無効リードは14日以内に申請可。
第5条（支払）月末締め翌月末日、銀行振込。
第6条（甲の義務）情報更新・3営業日以内の対応。ポータル非経由と偽る行為禁止。
第7条（乙の義務）正確な掲載・月次レポート提供・データの第三者提供禁止。
第8条（禁止事項）虚偽情報・口コミ不正操作・他施設誹謗中傷を禁止。
第9条（解約）30日前書面通知。解約月は満額適用。
第10条（損害賠償上限）直前6ヶ月の月額掲載料の合計額。
第11条（秘密保持）機密情報の第三者開示禁止。
第12条（電子契約）民法522条に基づく電子契約として有効。
第13条（準拠法・管轄）日本法準拠、東京地方裁判所を専属的合意管轄とする。
`.trim();

interface Props {
    templeId: string;
    templeName: string;
}

export function ContractApplyForm({ templeId, templeName }: Props) {
    const [step, setStep] = useState<"form" | "preview" | "done">("form");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [contractId, setContractId] = useState<string | null>(null);

    const [form, setForm] = useState({
        representativeName: "",
        representativeTitle: "",
        contactEmail: "",
        planType: "standard",
        agreed: false,
    });

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/contracts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    templeId,
                    templeName,
                    representativeName: form.representativeName,
                    representativeTitle: form.representativeTitle,
                    contactEmail: form.contactEmail,
                    planType: form.planType,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "エラーが発生しました。");
            setContractId(data.contractId);
            setStep("done");
        } catch (err) {
            setError(err instanceof Error ? err.message : "送信に失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    if (step === "done") {
        return (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">申込が完了しました</h2>
                <p className="text-gray-500 mb-2">ご登録のメールアドレスに契約書PDFをお送りしました。</p>
                <p className="text-xs text-gray-400 mb-6 font-mono">{contractId}</p>
                <Link href="/admin/contracts" className="text-primary underline text-sm font-bold">
                    契約一覧を見る
                </Link>
            </div>
        );
    }

    if (step === "preview") {
        const selectedPlan = PLAN_OPTIONS.find(p => p.value === form.planType)!;
        return (
            <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" /> 契約内容の確認
                    </h2>
                    <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                        {[
                            ["施設名", templeName],
                            ["担当者", `${form.representativeName}（${form.representativeTitle}）`],
                            ["連絡先", form.contactEmail],
                            ["選択プラン", `${selectedPlan.label}／${selectedPlan.monthly}`],
                        ].map(([label, value]) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-xs text-gray-400">{label}</span>
                                <span className="font-bold text-gray-700">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs text-gray-600 leading-relaxed max-h-48 overflow-y-auto font-mono whitespace-pre-wrap">
                        {CONTRACT_PREVIEW}
                    </div>

                    <label className="flex items-start gap-3 mt-5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.agreed}
                            onChange={e => setForm({ ...form, agreed: e.target.checked })}
                            className="mt-0.5 w-5 h-5 accent-primary"
                        />
                        <span className="text-sm text-gray-700">
                            上記の契約内容および全条項に同意します。本フォームの送信をもって電子契約が成立することを確認しました。
                        </span>
                    </label>

                    {error && (
                        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 mt-4 text-sm">
                            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                        </div>
                    )}

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setStep("form")}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50"
                        >
                            戻る
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!form.agreed || loading}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                            同意して申込む・契約書PDFを受け取る
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> 掲載申込フォーム
                </h2>
                <p className="text-sm text-gray-500 mb-6">{templeName} の掲載契約を申し込みます。</p>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">担当者氏名 <span className="text-red-500">*</span></label>
                            <input
                                value={form.representativeName}
                                onChange={e => setForm({ ...form, representativeName: e.target.value })}
                                placeholder="例：山田 太郎"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">役職 <span className="text-red-500">*</span></label>
                            <input
                                value={form.representativeTitle}
                                onChange={e => setForm({ ...form, representativeTitle: e.target.value })}
                                placeholder="例：住職 / 副住職 / 事務長"
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">連絡先メールアドレス（PDF送付先） <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            value={form.contactEmail}
                            onChange={e => setForm({ ...form, contactEmail: e.target.value })}
                            placeholder="temple@example.com"
                            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">掲載プランを選択 <span className="text-red-500">*</span></label>
                        <div className="space-y-3">
                            {PLAN_OPTIONS.map(plan => (
                                <label key={plan.value} className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${form.planType === plan.value ? plan.color + " border-primary" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                                    <input
                                        type="radio"
                                        name="planType"
                                        value={plan.value}
                                        checked={form.planType === plan.value}
                                        onChange={() => setForm({ ...form, planType: plan.value })}
                                        className="mt-0.5 accent-primary"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm">{plan.label}</span>
                                            {plan.recommended && <span className="text-xs bg-emerald-500 text-white px-1.5 py-0.5 rounded font-bold">おすすめ</span>}
                                        </div>
                                        <p className="text-primary font-bold text-sm mt-0.5">{plan.monthly}</p>
                                        <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setStep("preview")}
                    disabled={!form.representativeName || !form.representativeTitle || !form.contactEmail}
                    className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    契約内容を確認する <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
