"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { CheckCircle, Phone, Mail, FileText, ArrowDown } from "lucide-react";
import { trackEvent, FormEvents } from "@/lib/analytics/events";

function GraveSearchConsultForm() {
    const searchParams = useSearchParams();
    const templeId = searchParams.get("templeId");
    const templeName = searchParams.get("templeName");

    useEffect(() => {
        trackEvent(FormEvents.START, { form_type: 'grave_search' });
    }, []);

    const [formData, setFormData] = useState({
        name: "",
        furigana: "",
        phone: "",
        email: "",
        zipCode: "",
        prefecture: "",
        city: "",
        address1: "",
        address2: "",
        // Additional
        wantedTypes: [] as string[],
        otherType: "",
        areaPref: "",
        areaCity: "",
        budget: "",
        visitHope: "未定",
        timing: "未定",
        message: "",
    });

    const [postalError, setPostalError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "zipCode" && value.length === 7) {
            fetchAddress(value);
        }
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            wantedTypes: checked
                ? [...prev.wantedTypes, value]
                : prev.wantedTypes.filter(t => t !== value)
        }));
    };

    const fetchAddress = async (zip: string) => {
        setPostalError("");
        try {
            const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
            const data = await res.json();
            if (data.results) {
                const result = data.results[0];
                setFormData((prev) => ({
                    ...prev,
                    prefecture: result.address1,
                    city: result.address2,
                    address1: result.address3,
                }));
            } else {
                setPostalError("住所が見つかりませんでした");
            }
        } catch {
            setPostalError("検索に失敗しました");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            type: "consult",
            category: "grave_search",
            contact: {
                name: formData.name,
                furigana: formData.furigana, // Simple mapping, ideally split sei/mei
                phone: formData.phone,
                email: formData.email,
            },
            address: {
                zipCode: formData.zipCode,
                pref: formData.prefecture,
                city: formData.city,
                line1: formData.address1,
                building: formData.address2,
            },
            message: formData.message,
            additionalFields: {
                wantedTypes: formData.wantedTypes,
                areaPref: formData.areaPref,
                areaCity: formData.areaCity,
                budget: formData.budget,
                visitHope: formData.visitHope,
                timing: formData.timing,
            },
            context: {
                sourceLabel: "HeaderConsultDropdown",
                sourcePath: "/consult/grave-search",
                refUrl: window.location.href,
                temple: templeId ? { id: templeId, name: templeName } : undefined,
            }
        };

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                trackEvent(FormEvents.COMPLETE, { form_type: 'grave_search' });
                setIsSuccess(true);
                window.scrollTo(0, 0);
            } else {
                trackEvent(FormEvents.ERROR, { form_type: 'grave_search', error_type: 'submit_failed' });
                alert("送信に失敗しました。");
            }
        } catch (error) {
            console.error(error);
            trackEvent(FormEvents.ERROR, { form_type: 'grave_search', error_type: 'submit_error' });
            alert("エラーが発生しました。");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-primary mb-6">送信完了</h1>
                    <p className="text-gray-600 mb-10">
                        お墓探しのご相談ありがとうございます。<br />
                        専門スタッフが条件に合う霊園をお探しし、ご連絡いたします。
                    </p>
                    <Link href="/" className="text-primary hover:underline">トップへ戻る</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            {/* Hero */}
            <div className="bg-white pt-32 pb-16 px-4 text-center border-b border-gray-100">
                <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                    Grave Search
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                    お墓探しの無料相談
                </h1>
                <p className="text-gray-600">
                    永代供養墓、樹木葬、納骨堂など<br className="sm:hidden" />ご希望に合わせてご提案します
                </p>
            </div>

            <main className="grow container mx-auto px-4 py-12 max-w-4xl">

                {/* 3 Reassurances */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "完全無料", text: "ご相談から見学予約まで費用は一切かかりません" },
                        { title: "中立的な立場", text: "特定の霊園に偏らず、公平な視点でアドバイス" },
                        { title: "専門スタッフ", text: "経験豊富なアドバイザーが親身に対応します" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-full mb-4">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Context Card */}
                {templeName && (
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8 flex items-start gap-4 mx-auto max-w-3xl">
                        <FileText className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                            <p className="text-xs text-blue-600 font-bold mb-1">以下の霊園について相談する</p>
                            <p className="font-bold text-gray-800 text-lg">{templeName}</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-8 max-w-3xl mx-auto">

                    <section className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">ご希望の条件</h2>

                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-700">お墓の種類（複数選択可）</label>
                            <div className="flex flex-wrap gap-4">
                                {["一般墓", "樹木葬", "納骨堂", "永代供養墓", "その他"].map(type => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={type}
                                            checked={formData.wantedTypes.includes(type)}
                                            onChange={handleCheckbox}
                                            className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                                        />
                                        <span className="text-gray-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">希望エリア（都道府県） <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">任意</span></label>
                                <input type="text" name="areaPref" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="例：東京都" value={formData.areaPref} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">希望エリア（市区町村） <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">任意</span></label>
                                <input type="text" name="areaCity" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="例：世田谷区" value={formData.areaCity} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">ご予算</label>
                                <select name="budget" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.budget} onChange={handleChange}>
                                    <option value="">未定・わからない</option>
                                    <option value="under_50">50万円以下</option>
                                    <option value="under_100">100万円以下</option>
                                    <option value="under_150">150万円以下</option>
                                    <option value="under_200">200万円以下</option>
                                    <option value="no_limit">こだわらない</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">検討時期</label>
                                <select name="timing" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.timing} onChange={handleChange}>
                                    <option value="unknown">未定</option>
                                    <option value="asap">なるべく早く</option>
                                    <option value="within_3m">3ヶ月以内</option>
                                    <option value="within_6m">半年以内</option>
                                    <option value="within_1y">1年以内</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">見学希望</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="visitHope" value="あり" checked={formData.visitHope === "あり"} onChange={handleChange} className="text-primary" />
                                    <span>見学したい</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="visitHope" value="なし" checked={formData.visitHope === "なし"} onChange={handleChange} className="text-primary" />
                                    <span>まずは資料だけ</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input type="radio" name="visitHope" value="未定" checked={formData.visitHope === "未定"} onChange={handleChange} className="text-primary" />
                                    <span>未定</span>
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">お客様情報</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">お名前 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">必須</span></label>
                                <input type="text" name="name" required className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="山田 太郎" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">フリガナ <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">必須</span></label>
                                <input type="text" name="furigana" required className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="やまだ たろう" value={formData.furigana} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">電話番号 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">必須</span></label>
                                <input type="tel" name="phone" required className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="090-1234-5678" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">メールアドレス <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">必須</span></label>
                                <input type="email" name="email" required className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="example@email.com" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-bold text-gray-700">送付先 / お住まいの住所 <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">任意</span></label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="zipCode"
                                        maxLength={8}
                                        className="w-32 h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary"
                                        placeholder="123-4567"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                    />
                                    <span className="text-xs text-gray-500 self-center">※郵便番号で住所を自動入力</span>
                                </div>
                                {postalError && <p className="text-red-500 text-xs">{postalError}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" name="prefecture" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="都道府県" value={formData.prefecture} onChange={handleChange} />
                                <input type="text" name="city" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="市区町村" value={formData.city} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <input type="text" name="address1" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="番地" value={formData.address1} onChange={handleChange} />
                                <input type="text" name="address2" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="建物名・部屋番号" value={formData.address2} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-bold text-gray-700">その他・ご要望 <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">任意</span></label>
                            <textarea name="message" className="w-full h-32 p-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="ご質問や、特に重視したい条件などがあればご記入ください" value={formData.message} onChange={handleChange} />
                        </div>
                    </section>

                    <div className="text-center pt-8 border-t border-gray-100">
                        <Button type="submit" size="lg" className="w-full sm:w-2/3 py-4 h-auto text-lg shadow-md font-bold transition-transform active:scale-[0.98]" disabled={isSubmitting}>
                            {isSubmitting ? "送信中..." : "無料で相談する"}
                        </Button>
                        <div className="mt-6 text-center">
                            <p className="text-xs font-bold text-gray-600 flex items-center justify-center gap-1">
                                <span role="img" aria-label="lock">🔒</span> ご入力いただいた情報はSSL暗号化通信で安全に送信されます
                            </p>
                            <p className="text-[11px] text-gray-500 mt-2">※無理な営業電話等は一切行いませんので、安心してご相談ください。</p>
                        </div>
                    </div>
                </form>

                {/* Flow */}
                <div className="mt-16 max-w-3xl mx-auto">
                    <h3 className="text-center font-bold text-gray-800 mb-8">送信後の流れ</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="relative">
                            <div className="bg-white border rounded-lg p-4 mb-2 z-10 relative">
                                <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="font-bold text-sm">受付完了</div>
                            </div>
                            <ArrowDown className="w-4 h-4 text-gray-300 absolute -right-2 top-1/2 -translate-y-1/2 -rotate-90" />
                        </div>
                        <div className="relative">
                            <div className="bg-white border rounded-lg p-4 mb-2 z-10 relative">
                                <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="font-bold text-sm">内容確認</div>
                            </div>
                            <ArrowDown className="w-4 h-4 text-gray-300 absolute -right-2 top-1/2 -translate-y-1/2 -rotate-90" />
                        </div>
                        <div>
                            <div className="bg-white border rounded-lg p-4 mb-2">
                                <Phone className="w-6 h-6 text-primary mx-auto mb-2" />
                                <div className="font-bold text-sm">ご連絡</div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GraveSearchConsultForm />
        </Suspense>
    );
}
