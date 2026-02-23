"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import Link from "next/link";
import { CheckCircle2, ChevronRight, AlertCircle, Building2, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, InquiryFormData } from "./schema";
import { fetchAddressFromZip } from "../../lib/address";
import { Store } from "../../../lib/store";

// Helper Formatters
const formatPhoneNumber = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    return val;
};

const formatZipCode = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length === 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return val;
};

const PREFECTURES = [
    '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県',
    '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県',
    '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県',
    '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県',
    '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県',
    '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県',
    '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
];

function RequestForm() {
    const searchParams = useSearchParams();
    const router = useRouter(); // Need for redirect? No, link is fine.
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [step, setStep] = useState<1 | 2>(1);
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Context Params
    const paramTempleId = searchParams.get('templeId') || "";
    const paramTempleName = searchParams.get('templeName') || "";
    const paramPlanId = searchParams.get('planId') || "";
    const paramPlanName = searchParams.get('planName') || "";
    const paramRef = searchParams.get('ref') || "";
    const paramRefUrl = searchParams.get('refUrl') || "";

    // Resolve Context
    const storeTemple = paramTempleId ? Store.getTemple(paramTempleId) : null;
    const storePlan = paramPlanId ? Store.getPlan(paramPlanId) : null;

    const displayTempleName = storeTemple?.name || paramTempleName;
    const displayPlanName = storePlan?.name || paramPlanName;
    const displayTemplePref = storeTemple?.prefecture || "";
    const displayPlanPrice = storePlan ? `¥${storePlan.price.toLocaleString()}〜` : "";

    const { register, handleSubmit, setValue, getValues, trigger, watch, formState: { errors, isValid, isSubmitting } } = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
        mode: "onBlur",
        defaultValues: {
            templeId: paramTempleId,
            templeName: displayTempleName,
            planId: paramPlanId,
            planName: displayPlanName,
            ref: paramRef,
            refUrl: paramRefUrl,
            // Step 1
            lastName: "", firstName: "", lastNameKana: "", firstNameKana: "",
            phone: "", email: "", zipCode: "", prefecture: "", city: "", addressLine: "", building: "",
            // Step 2
            boneStatus: undefined,
            graveTypes: [],
            nearbyCemeteryOptIn: false,
            visitDate: "", visitTime: "",
            message: "",
            agreedToTerms: false
        }
    });

    // Formatting Handlers
    const handleZipBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        let val = e.target.value;
        const formatted = formatZipCode(val);
        if (formatted !== val) {
            setValue("zipCode", formatted, { shouldValidate: true });
            val = formatted;
        }

        const digits = val.replace(/-/g, '');
        if (digits.length === 7) {
            const addr = await fetchAddressFromZip(digits);
            if (addr) {
                setValue("prefecture", addr.prefecture, { shouldValidate: true });
                setValue("city", addr.city, { shouldValidate: true });
                setValue("addressLine", addr.town, { shouldValidate: true });
            }
        }
    };

    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const formatted = formatPhoneNumber(val);
        if (formatted !== val) {
            setValue("phone", formatted, { shouldValidate: true });
        }
    };

    const handleNextStep = async () => {
        const step1Fields: (keyof InquiryFormData)[] = [
            'lastName', 'firstName', 'lastNameKana', 'firstNameKana',
            'phone', 'email', 'zipCode', 'prefecture', 'city', 'addressLine'
        ];
        const isStep1Valid = await trigger(step1Fields);
        if (isStep1Valid) {
            setStep(2);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const onSubmit = async (data: InquiryFormData) => {
        try {
            const requestId = crypto.randomUUID();
            // Prepare Payload
            const payload = {
                ...data, // Send all granular fields
                requestId,
                phoneRaw: data.phone.replace(/-/g, ''),
                name: `${data.lastName} ${data.firstName}`, // Legacy support
                kana: `${data.lastNameKana} ${data.firstNameKana}`, // Legacy support
                address: `${data.prefecture}${data.city}${data.addressLine}${data.building ? ' ' + data.building : ''}`, // Legacy support

                context: {
                    templeId: data.templeId || "",
                    templeName: data.templeName || "",
                    planId: data.planId || "",
                    planName: data.planName || "",
                    ref: data.ref || "",
                    refUrl: data.refUrl || ""
                },

                user: {
                    name: `${data.lastName} ${data.firstName}`,
                    lastName: data.lastName,
                    firstName: data.firstName,
                    kana: `${data.lastNameKana} ${data.firstNameKana}`,
                    lastNameKana: data.lastNameKana,
                    firstNameKana: data.firstNameKana,
                    phone: data.phone,
                    email: data.email,
                    zipCode: data.zipCode,
                    prefecture: data.prefecture,
                    city: data.city,
                    addressLine: data.addressLine,
                    building: data.building,
                    address: `${data.prefecture}${data.city}${data.addressLine}${data.building ? ' ' + data.building : ''}`
                },

                // Questionnaire answers
                boneStatus: data.boneStatus,
                graveTypes: data.graveTypes,
                nearbyCemeteryOptIn: data.nearbyCemeteryOptIn,
                visitDate: data.visitDate,
                visitTime: data.visitTime,
                message: data.message
            };

            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!result.success) {
                const msg = result.error?.message || "送信に失敗しました。時間をおいて再度お試しください。";
                setSubmitError(msg);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            if (!result.saved?.id) {
                setSubmitError("サーバーでの保存確認ができませんでした。管理者にご連絡ください。");
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            console.log(`[INQUIRY_SENT] id=${result.saved.id} receipt=${result.saved.receiptNumber}`);

            // Sync to Client Store (Legacy Mirror - Optional)
            Store.addInquiry({
                templeId: data.templeId,
                desiredTempleId: data.templeId,
                desiredTempleName: data.templeName,
                desiredPlanId: data.planId,
                desiredPlanName: data.planName,
                ref: data.ref,
                refUrl: data.refUrl,
                context: payload.context,
                preferredDateTime: "資料請求のみ",
                user: payload.user,
                message: data.message || "",
                boneStatus: data.boneStatus,
                graveTypes: data.graveTypes,
                nearbyCemeteryOptIn: data.nearbyCemeteryOptIn,
                visitDate: data.visitDate,
                visitTime: data.visitTime,
                receiptNumber: result.saved.receiptNumber,
            } as any);

            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (e) {
            console.error(e);
            setSubmitError("通信エラーが発生しました。インターネット接続を確認して再度お試しください。");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-seiren-navy mb-4">資料請求を受け付けました</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    お問い合わせありがとうございます。<br />
                    資料の発送準備が整い次第、郵送にてお送りさせていただきます。
                </p>
                <Link href="/">
                    <Button>トップページへ戻る</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-seiren-navy mb-6 text-center">資料請求・お問い合わせ</h1>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4 mb-8 text-sm font-bold">
                <div className={`px-4 py-2 rounded-full ${step === 1 ? 'bg-seiren-navy text-white' : 'bg-gray-100 text-gray-400'}`}>1. お客様情報</div>
                <div className="text-gray-300">→</div>
                <div className={`px-4 py-2 rounded-full ${step === 2 ? 'bg-seiren-navy text-white' : 'bg-gray-100 text-gray-400'}`}>2. アンケート・確認</div>
            </div>

            {/* Context Card */}
            {(displayTempleName || displayPlanName) && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
                    <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4" /> 資料請求およびお問い合わせの対象
                    </h3>
                    <div className="flex flex-col gap-2">
                        {displayTempleName && (
                            <div className="text-xl font-bold text-seiren-navy">
                                {displayTempleName}
                                {displayTemplePref && <span className="text-sm font-normal text-gray-600 ml-2">({displayTemplePref})</span>}
                            </div>
                        )}
                        {displayPlanName && (
                            <div className="bg-white p-3 rounded border border-blue-100 mt-1">
                                <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">希望プラン</span>
                                <span className="font-bold text-gray-800">{displayPlanName}</span>
                                {displayPlanPrice && <span className="text-sm text-gray-500 ml-2">{displayPlanPrice}</span>}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {submitError && (
                <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{submitError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* STEP 1 */}
                <div className={step === 1 ? 'block space-y-8' : 'hidden'}>
                    <p className="text-gray-600 mb-8 text-center text-sm">
                        下記フォームに必要事項をご入力の上、「次に進む」を押してください。<br />
                        <span className="text-xs text-red-500">※ 全て必須項目です</span>
                    </p>

                    {/* Name */}
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">氏名 (姓) <span className="text-red-500">*</span></label>
                                <Input {...register("lastName")} className={`w-full bg-white ${errors.lastName ? 'border-red-500 bg-red-50' : ''}`} placeholder="例：山田" />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">氏名 (名) <span className="text-red-500">*</span></label>
                                <Input {...register("firstName")} className={`w-full bg-white ${errors.firstName ? 'border-red-500 bg-red-50' : ''}`} placeholder="例：太郎" />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ふりがな (せい) <span className="text-red-500">*</span></label>
                                <Input {...register("lastNameKana")} className={`w-full bg-white ${errors.lastNameKana ? 'border-red-500 bg-red-50' : ''}`} placeholder="例：やまだ" />
                                {errors.lastNameKana && <p className="text-red-500 text-xs mt-1">{errors.lastNameKana.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">ふりがな (めい) <span className="text-red-500">*</span></label>
                                <Input {...register("firstNameKana")} className={`w-full bg-white ${errors.firstNameKana ? 'border-red-500 bg-red-50' : ''}`} placeholder="例：たろう" />
                                {errors.firstNameKana && <p className="text-red-500 text-xs mt-1">{errors.firstNameKana.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">電話番号 <span className="text-red-500">*</span></label>
                                <Input type="tel" {...register("phone")} onBlur={(e) => { register("phone").onBlur(e); handlePhoneBlur(e); }} className={`w-full bg-white ${errors.phone ? 'border-red-500 bg-red-50' : ''}`} placeholder="090-1234-5678" />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">メールアドレス <span className="text-red-500">*</span></label>
                                <Input type="email" {...register("email")} className={`w-full bg-white ${errors.email ? 'border-red-500 bg-red-50' : ''}`} placeholder="example@seiren.jp" />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700 mb-2">送付先住所 <span className="text-red-500">*</span></label>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="col-span-1">
                                <label className="text-xs text-gray-500 mb-1 block">郵便番号</label>
                                <Input {...register("zipCode")} onBlur={(e) => { register("zipCode").onBlur(e); handleZipBlur(e); }} className={`w-full bg-white ${errors.zipCode ? 'border-red-500 bg-red-50' : ''}`} placeholder="123-4567" maxLength={8} inputMode="numeric" />
                                {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode.message}</p>}
                            </div>
                            <div className="col-span-2">
                                <label className="text-xs text-gray-500 mb-1 block">都道府県</label>
                                <select {...register("prefecture")} className={`w-full border rounded-lg p-3 ${errors.prefecture ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}>
                                    <option value="">選択してください</option>
                                    {PREFECTURES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                                {errors.prefecture && <p className="text-red-500 text-xs mt-1">{errors.prefecture.message}</p>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">市区町村</label>
                                <Input {...register("city")} className={`w-full bg-white ${errors.city ? 'border-red-500 bg-red-50' : ''}`} placeholder="港区" />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">番地</label>
                                <Input {...register("addressLine")} className={`w-full bg-white ${errors.addressLine ? 'border-red-500 bg-red-50' : ''}`} placeholder="芝公園4-2-8" />
                                {errors.addressLine && <p className="text-red-500 text-xs mt-1">{errors.addressLine.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">建物名・部屋番号 <span className="text-gray-400 font-normal">(任意)</span></label>
                            <Input {...register("building")} className="w-full bg-white" placeholder="東京タワービル 3F" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="button" onClick={handleNextStep} className="w-full font-bold py-4 bg-seiren-navy text-white hover:bg-gray-800">
                            次に進む <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>

                {/* STEP 2 */}
                <div className={step === 2 ? 'block space-y-8' : 'hidden'}>
                    <p className="text-gray-600 mb-8 text-center text-sm">
                        簡単なアンケートにご協力ください。
                    </p>

                    {/* Bone Status */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">ご遺骨の有無 <span className="text-red-500">*</span></label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" value="exist" {...register("boneStatus")} className="text-seiren-navy focus:ring-seiren-navy" />
                                <span>ご遺骨あり</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" value="none" {...register("boneStatus")} className="text-seiren-navy focus:ring-seiren-navy" />
                                <span>ご遺骨なし</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input type="radio" value="unknown" {...register("boneStatus")} className="text-seiren-navy focus:ring-seiren-navy" />
                                <span>未定・その他</span>
                            </label>
                        </div>
                        {errors.boneStatus && <p className="text-red-500 text-xs mt-1">{errors.boneStatus.message}</p>}
                    </div>

                    {/* Checkboxes */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">ご検討中のお墓の種類 <span className="text-gray-400 text-xs font-normal">(複数選択可・任意)</span></label>
                        <div className="grid grid-cols-2 gap-3">
                            {['一般墓', '永代供養墓', '樹木葬', '納骨堂'].map(type => (
                                <label key={type} className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input type="checkbox" value={type} {...register("graveTypes")} className="text-seiren-navy rounded focus:ring-seiren-navy" />
                                    <span className="text-sm">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Opt-in */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" {...register("nearbyCemeteryOptIn")} className="mt-1 text-seiren-navy rounded focus:ring-seiren-navy" />
                            <div className="text-sm">
                                <span className="font-bold">周辺のおすすめ霊園の資料も受け取る（無料）</span>
                                <p className="text-xs text-gray-500 mt-1">
                                    ご希望の条件に近い、近隣の優良霊園の資料もあわせてお送りします。
                                </p>
                            </div>
                        </label>
                    </div>

                    {/* Visit Invite (Optional) */}
                    <div className="border-t border-gray-200 pt-6 mt-6">
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">任意</span>
                            この機会に霊園見学しませんか？
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">見学希望日</label>
                                <Input type="date" {...register("visitDate")} className="w-full bg-white" />
                            </div>
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">時間帯</label>
                                <select {...register("visitTime")} className="w-full border border-gray-300 rounded-lg p-3">
                                    <option value="">指定なし</option>
                                    <option value="午前">午前</option>
                                    <option value="午後">午後</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">備考 <span className="text-gray-400 text-xs font-normal">（任意）</span></label>
                        <textarea {...register("message")} className="w-full border border-gray-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-seiren-navy focus:border-transparent" placeholder="ご質問などございましたらご自由にご記入ください。"></textarea>
                    </div>

                    {/* Terms */}
                    <div className="border-t border-gray-200 pt-6">
                        <label className="flex items-center justify-center gap-2 cursor-pointer mb-4">
                            <input type="checkbox" {...register("agreedToTerms")} className="text-seiren-navy rounded focus:ring-seiren-navy w-5 h-5" />
                            <span className="text-sm font-bold">
                                <a href="#" className="text-blue-600 underline">利用規約</a> と <a href="#" className="text-blue-600 underline">プライバシーポリシー</a> に同意する
                            </span>
                        </label>
                        {errors.agreedToTerms && <p className="text-red-500 text-xs text-center mb-4">{errors.agreedToTerms.message}</p>}

                        <div className="flex gap-4">
                            <Button type="button" onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 bg-gray-100 text-gray-600 hover:bg-gray-200 py-4 font-bold">
                                戻る
                            </Button>
                            <Button disabled={isSubmitting} type="submit" className="flex-[2] bg-seiren-navy text-white hover:bg-gray-800 py-4 font-bold">
                                {isSubmitting ? '送信中...' : '資料を請求する (無料)'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default function RequestMaterialPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <Navbar />
            <main className="flex-grow pt-32 px-4 pb-20">
                <Suspense fallback={<div className="text-center py-20">Loading form...</div>}>
                    <RequestForm />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
