"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader2, Send, Building, User, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";

// --- Schema Definition ---
const partnerSchema = z.object({
    organizationName: z.string().min(1, "会社名・寺院名は必須です"),
    contactName: z.string().min(1, "担当者名は必須です"),
    phone: z.string().min(10, "正しい電話番号を入力してください").regex(/^[\d-]+$/, "半角数字とハイフンのみ使用可能です"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    address: z.string().min(1, "所在地は必須です"),
    inquiryType: z.string().min(1, "お問い合わせ種別を選択してください"),
    websiteUrl: z.string().optional(),
    areas: z.string().optional(),
    preferredContact: z.enum(["phone", "email"]).optional(),
    preferredTime: z.string().optional(),
    message: z.string().optional(),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

export default function PartnerContactPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<PartnerFormData>({
        resolver: zodResolver(partnerSchema),
        defaultValues: {
            preferredContact: "email",
        },
    });

    // Auto-format phone number on blur
    const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/[^\d]/g, "");
        if (val.length > 9) {
            // Simple logic: 03-1234-5678 or 090-1234-5678
            let formatted = val;
            if (val.length === 10) {
                // Landline (general)
                if (val.startsWith("03") || val.startsWith("06")) {
                    formatted = `${val.slice(0, 2)}-${val.slice(2, 6)}-${val.slice(6)}`;
                } else {
                    formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`; // 011-xxx-xxxx
                }
            } else if (val.length === 11) {
                // Mobile
                formatted = `${val.slice(0, 3)}-${val.slice(3, 7)}-${val.slice(7)}`;
            }
            setValue("phone", formatted, { shouldValidate: true });
        }
    };

    const onSubmit = async (data: PartnerFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const payload = {
                ...data,
                kind: "business",
                context: {
                    source: "partner_contact",
                    pagePath: typeof window !== 'undefined' ? window.location.pathname : '/partner/contact',
                    referrer: typeof document !== 'undefined' ? document.referrer : '',
                },
                createdAt: new Date().toISOString(),
            };

            const response = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("送信に失敗しました");
            }

            router.push("/partner/contact/thanks");
        } catch (error) {
            console.error(error);
            setSubmitError("送信中にエラーが発生しました。時間をおいて再度お試しください。");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="grow pt-32 px-4 pb-20">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">
                            For Partners
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            提携をご希望の寺院・事業者様へ
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            清蓮への掲載依頼、提携のご相談はこちらのフォームより承っております。<br />
                            内容を確認の上、担当者より折り返しご連絡させていただきます。
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                            {/* Error Message */}
                            {submitError && (
                                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center text-sm">
                                    <span className="mr-2">⚠️</span>
                                    {submitError}
                                </div>
                            )}

                            {/* Section 1: Basic Info */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-6 flex items-center">
                                    <Building className="w-5 h-5 mr-2 text-secondary" />
                                    貴社情報
                                </h3>

                                <div className="space-y-6">
                                    {/* Inquiry Type */}
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-700">
                                            お問い合わせ種別 <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            {...register("inquiryType")}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                                        >
                                            <option value="">選択してください</option>
                                            <option value="listing">掲載希望（霊園/寺院/納骨堂）</option>
                                            <option value="referral">送客提携（紹介/送客/共同集客）</option>
                                            <option value="plan_linked">料金/プラン連携（価格表・プラン登録）</option>
                                            <option value="overseas">海外散骨提携</option>
                                            <option value="ikotsu_service">遺骨加工・供養関連（粉骨/洗骨/ダイヤ等）</option>
                                            <option value="other">その他</option>
                                        </select>
                                        {errors.inquiryType && <p className="text-red-500 text-xs mt-1">{errors.inquiryType.message}</p>}
                                    </div>

                                    {/* Organization Name */}
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-700">
                                            会社名・寺院名 <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            {...register("organizationName")}
                                            placeholder="例: 株式会社清蓮 / 清蓮寺"
                                            className={errors.organizationName ? "border-red-300 bg-red-50" : ""}
                                        />
                                        {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>}
                                    </div>

                                    {/* Website */}
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center">
                                            <Globe className="w-4 h-4 mr-1 text-gray-400" />
                                            ウェブサイトURL
                                        </label>
                                        <Input
                                            {...register("websiteUrl")}
                                            placeholder="https://example.com"
                                        />
                                    </div>

                                    {/* Address */}
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-700 flex items-center">
                                            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                                            所在地 <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            {...register("address")}
                                            placeholder="都道府県・市区町村・番地"
                                            className={errors.address ? "border-red-300 bg-red-50" : ""}
                                        />
                                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                                    </div>

                                    {/* Areas */}
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-700">取扱エリア（任意）</label>
                                        <Input
                                            {...register("areas")}
                                            placeholder="例: 東京都全域、神奈川県東部"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Contact Person */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-6 flex items-center">
                                    <User className="w-5 h-5 mr-2 text-secondary" />
                                    ご担当者様情報
                                </h3>

                                <div className="space-y-6">
                                    {/* Contact Name */}
                                    <div className="grid gap-2">
                                        <label className="text-sm font-bold text-gray-700">
                                            ご担当者名 <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            {...register("contactName")}
                                            placeholder="山田 太郎"
                                            className={errors.contactName ? "border-red-300 bg-red-50" : ""}
                                        />
                                        {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName.message}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Email */}
                                        <div className="grid gap-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center">
                                                <Mail className="w-4 h-4 mr-1 text-gray-400" />
                                                メールアドレス <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                {...register("email")}
                                                type="email"
                                                placeholder="info@example.com"
                                                className={errors.email ? "border-red-300 bg-red-50" : ""}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div className="grid gap-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center">
                                                <Phone className="w-4 h-4 mr-1 text-gray-400" />
                                                電話番号 <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                {...register("phone")}
                                                onBlur={handlePhoneBlur}
                                                placeholder="03-1234-5678"
                                                className={errors.phone ? "border-red-300 bg-red-50" : ""}
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Preferred Contact */}
                                        <div className="grid gap-2">
                                            <label className="text-sm font-bold text-gray-700">希望連絡方法</label>
                                            <div className="flex gap-4 pt-2">
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="radio" value="email" {...register("preferredContact")} className="w-4 h-4 text-secondary focus:ring-secondary" />
                                                    <span className="ml-2 text-sm text-gray-600">メール</span>
                                                </label>
                                                <label className="flex items-center cursor-pointer">
                                                    <input type="radio" value="phone" {...register("preferredContact")} className="w-4 h-4 text-secondary focus:ring-secondary" />
                                                    <span className="ml-2 text-sm text-gray-600">電話</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Preferred Time */}
                                        <div className="grid gap-2">
                                            <label className="text-sm font-bold text-gray-700">連絡可能な時間帯（任意）</label>
                                            <Input
                                                {...register("preferredTime")}
                                                placeholder="例: 平日 10:00〜17:00"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Message */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-700 border-b pb-2 mb-6">
                                    ご相談内容詳細（任意）
                                </h3>
                                <textarea
                                    {...register("message")}
                                    className="w-full p-4 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all resize-none"
                                    placeholder="具体的なご相談内容や、ご質問事項がございましたらご記入ください。"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <div className="pt-4 text-center">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full md:w-auto min-w-[200px] h-14 text-lg shadow-lg font-bold bg-secondary hover:bg-secondary/90 text-white"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            送信中...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5 mr-2" />
                                            上記の内容で送信する
                                        </>
                                    )}
                                </Button>
                                <p className="text-xs text-gray-400 mt-4">
                                    ご入力いただいた情報は、お問い合わせ対応の目的のみに使用し、<br />
                                    法令に基づく場合を除き、第三者に提供することはありません。
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
