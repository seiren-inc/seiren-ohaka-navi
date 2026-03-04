"use client";

import { useState } from "react";
import { Check, ChevronRight, FileText, Building2, AlertCircle, Loader2, Star } from "lucide-react";

const PLANS = [
    {
        id: "free",
        label: "無料プラン",
        badge: "Free",
        monthly: "無料",
        monthlyNum: 0,
        description: "まずは無料で掲載を始めて、効果を確認できます。",
        features: ["基本施設情報の掲載", "問い合わせ受付", "リード課金のみ発生"],
        color: "border-gray-200",
        selectedColor: "border-primary bg-primary/5",
    },
    {
        id: "standard",
        label: "標準プラン",
        badge: "Standard",
        monthly: "月額 30,000円",
        monthlyNum: 30000,
        description: "上位表示と「おすすめ」バッジで集客強化。",
        features: ["「おすすめ」バッジ表示", "検索一覧での上位表示", "詳細コンテンツ強化", "リード課金あり"],
        color: "border-emerald-200",
        selectedColor: "border-emerald-500 bg-emerald-50",
        recommended: true,
    },
    {
        id: "sponsor",
        label: "PR枠プラン",
        badge: "Sponsor",
        monthly: "月額 100,000円",
        monthlyNum: 100000,
        description: "エリア最上部固定表示で最大露出を獲得。",
        features: ["「PR」バッジ付き最上部固定", "エリアごとのプレミアム枠", "優先サポート", "リード課金あり"],
        color: "border-amber-200",
        selectedColor: "border-amber-500 bg-amber-50",
    },
];

const STEPS = ["プラン選択", "施設情報入力", "契約確認・申込"];

const CONTRACT_SUMMARY = `第1条（目的）本サービスへの施設情報掲載と問い合わせ受付。
第2条（情報提供義務）掲載情報を最新に維持し、完売・停止時は速やかに通知。
第3条（プランと料金）選択プランに応じた月額料金とリード課金。
第4条（リード課金）資料請求3,000円、問い合わせ5,000円、来訪予約10,000円（各税別）。
第5条（支払）月末締め翌月末日銀行振込。
第6条（甲の義務）情報更新・3営業日以内の対応。
第7条（乙の義務）正確な掲載・月次レポート提供。
第8条（禁止事項）虚偽情報・口コミ不正・他施設誹謗中傷の禁止。
第9条（解約）30日前書面通知。解約月は満額。
第10条（損害賠償上限）直前6ヶ月の月額掲載料の合計額。
第11条（秘密保持）機密情報の第三者への開示禁止。
第12条（電子契約）民法522条に基づく電子契約として有効。
第13条（準拠法・管轄）東京地方裁判所を専属的合意管轄裁判所とする。`;

interface FormData {
    templeName: string;
    prefName: string;
    city: string;
    addressLine: string;
    sect: string;
    phone: string;
    representativeName: string;
    representativeTitle: string;
    contactEmail: string;
    planType: string;
    agreed: boolean;
}

export default function ApplyPage() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [completedContractId, setCompletedContractId] = useState<string | null>(null);

    const [form, setForm] = useState<FormData>({
        templeName: "",
        prefName: "",
        city: "",
        addressLine: "",
        sect: "",
        phone: "",
        representativeName: "",
        representativeTitle: "",
        contactEmail: "",
        planType: "standard",
        agreed: false,
    });

    const selectedPlan = PLANS.find(p => p.id === form.planType)!;

    const updateForm = (key: keyof FormData, value: string | boolean) =>
        setForm(prev => ({ ...prev, [key]: value }));

    const step1Valid = form.planType !== "";
    const step2Valid = form.templeName && form.prefName && form.city &&
        form.representativeName && form.representativeTitle && form.contactEmail;

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "申込に失敗しました。");
            setCompletedContractId(data.contractId);
            setStep(3);
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    // 完了画面
    if (step === 3) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-lg w-full text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">申込が完了しました</h1>
                    <p className="text-gray-500 mb-2">ご登録のメールアドレスに契約書PDFをお送りしました。</p>
                    <p className="text-xs text-gray-400 mb-6 font-mono">{completedContractId}</p>
                    <p className="text-sm text-gray-600 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                        担当者より3営業日以内にご連絡いたします。<br />
                        掲載開始後は施設ポータルから情報を管理できます。
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-4">
                <div className="max-w-3xl mx-auto flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-sm">S</span>
                    </div>
                    <div>
                        <p className="font-black text-primary text-base leading-none">SEIREN</p>
                        <p className="text-gray-400 text-xs">お墓探しナビ 掲載申込</p>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Steps */}
                <div className="flex items-center gap-0 mb-8">
                    {STEPS.map((label, i) => (
                        <div key={label} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i < step ? "bg-emerald-500 text-white" : i === step ? "bg-primary text-white" : "bg-gray-200 text-gray-400"}`}>
                                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                                </div>
                                <span className={`text-xs whitespace-nowrap ${i === step ? "text-primary font-bold" : "text-gray-400"}`}>{label}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`h-px flex-1 mx-2 mt-[-12px] ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step 0: プラン選択 */}
                {step === 0 && (
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold text-gray-800">掲載プランを選択</h1>
                        <p className="text-gray-500 text-sm">まずは無料プランで始めて、随時プランを変更できます。</p>
                        <div className="space-y-3">
                            {PLANS.map(plan => (
                                <label key={plan.id} className={`flex items-start gap-4 p-5 border-2 rounded-xl cursor-pointer transition-all ${form.planType === plan.id ? plan.selectedColor : plan.color + " bg-white hover:bg-gray-50"}`}>
                                    <input type="radio" name="plan" value={plan.id}
                                        checked={form.planType === plan.id}
                                        onChange={() => updateForm("planType", plan.id)}
                                        className="mt-1 accent-primary" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-gray-800">{plan.label}</span>
                                            {plan.recommended && (
                                                <span className="text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                                                    <Star className="w-2.5 h-2.5" /> おすすめ
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-primary font-bold text-sm mb-2">{plan.monthly}<span className="text-gray-400 font-normal text-xs">（税別）</span></p>
                                        <p className="text-xs text-gray-500 mb-3">{plan.description}</p>
                                        <ul className="space-y-1">
                                            {plan.features.map(f => (
                                                <li key={f} className="text-xs text-gray-600 flex items-center gap-1.5">
                                                    <Check className="w-3 h-3 text-emerald-500" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <button onClick={() => setStep(1)} disabled={!step1Valid}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">
                            次へ（施設情報の入力）<ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* Step 1: 施設情報 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-primary" />
                            <h1 className="text-2xl font-bold text-gray-800">施設情報の入力</h1>
                        </div>
                        <p className="text-gray-500 text-sm">選択プラン：<span className="font-bold text-primary">{selectedPlan.label}（{selectedPlan.monthly}）</span></p>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                            <h2 className="font-bold text-gray-700 text-sm border-b pb-2">施設情報</h2>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">施設名 <span className="text-red-500">*</span></label>
                                <input value={form.templeName} onChange={e => updateForm("templeName", e.target.value)}
                                    placeholder="例：○○霊苑" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">都道府県 <span className="text-red-500">*</span></label>
                                    <input value={form.prefName} onChange={e => updateForm("prefName", e.target.value)}
                                        placeholder="例：東京都" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">市区町村 <span className="text-red-500">*</span></label>
                                    <input value={form.city} onChange={e => updateForm("city", e.target.value)}
                                        placeholder="例：渋谷区" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">番地以降</label>
                                <input value={form.addressLine} onChange={e => updateForm("addressLine", e.target.value)}
                                    placeholder="例：代々木1-1-1" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">宗派</label>
                                    <input value={form.sect} onChange={e => updateForm("sect", e.target.value)}
                                        placeholder="例：曹洞宗" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">電話番号</label>
                                    <input value={form.phone} onChange={e => updateForm("phone", e.target.value)}
                                        placeholder="例：03-xxxx-xxxx" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                            <h2 className="font-bold text-gray-700 text-sm border-b pb-2">担当者情報</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">担当者氏名 <span className="text-red-500">*</span></label>
                                    <input value={form.representativeName} onChange={e => updateForm("representativeName", e.target.value)}
                                        placeholder="例：山田 太郎" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">役職 <span className="text-red-500">*</span></label>
                                    <input value={form.representativeTitle} onChange={e => updateForm("representativeTitle", e.target.value)}
                                        placeholder="例：住職" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス（契約書PDFを送付します） <span className="text-red-500">*</span></label>
                                <input type="email" value={form.contactEmail} onChange={e => updateForm("contactEmail", e.target.value)}
                                    placeholder="temple@example.com" className="w-full border border-gray-300 rounded-lg p-2.5 text-sm" />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setStep(0)} className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">戻る</button>
                            <button onClick={() => setStep(2)} disabled={!step2Valid}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">
                                契約内容を確認する <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: 契約確認 */}
                {step === 2 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary" />
                            <h1 className="text-2xl font-bold text-gray-800">契約内容の確認</h1>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h2 className="font-bold text-gray-700 mb-4 text-sm">申込内容</h2>
                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                {[
                                    ["施設名", form.templeName],
                                    ["所在地", `${form.prefName} ${form.city} ${form.addressLine}`],
                                    ["担当者", `${form.representativeName}（${form.representativeTitle}）`],
                                    ["メール", form.contactEmail],
                                    ["選択プラン", `${selectedPlan.label}（${selectedPlan.monthly}）`],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex flex-col">
                                        <span className="text-xs text-gray-400">{label}</span>
                                        <span className="font-medium text-gray-800">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                            <h2 className="font-bold text-gray-700 mb-3 text-sm">契約条項（抜粋）</h2>
                            <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto font-mono">
                                {CONTRACT_SUMMARY}
                            </div>
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={form.agreed}
                                onChange={e => updateForm("agreed", e.target.checked)}
                                className="mt-0.5 w-5 h-5 accent-primary" />
                            <span className="text-sm text-gray-700">
                                上記の契約条項および<a href="/terms" target="_blank" className="text-primary underline">利用規約</a>に同意します。
                                本フォームの送信をもって電子契約が成立することを確認しました。
                            </span>
                        </label>

                        {error && (
                            <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">戻る</button>
                            <button onClick={handleSubmit} disabled={!form.agreed || loading}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                同意して申込む・契約書PDFを受け取る
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 text-center">
                            申込後、担当者より3営業日以内にご連絡します。掲載開始は審査完了後です。
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
