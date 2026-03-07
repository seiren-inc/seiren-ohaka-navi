"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function GraveClosureForm() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") || "general"; // 'general' or 'estimate'

    const [formData, setFormData] = useState({
        name: "",
        furigana: "",
        phone: "",
        email: "",
        currentPrefecture: "",
        currentCity: "",
        closureType: "grave_closure", // 'grave_closure' (墓じまい) or 'relocation' (改葬)
        desiredDate: "",
        newPlace: "", // For relocation
        details: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const payload = {
                type: "grave_closure",
                category: "grave_closure_consult",
                contact: {
                    name: formData.name,
                    furigana: formData.furigana,
                    phone: formData.phone,
                    email: formData.email,
                },
                currentLocation: {
                    prefecture: formData.currentPrefecture,
                    city: formData.currentCity,
                },
                details: {
                    mode: mode,
                    closureType: formData.closureType,
                    desiredDate: formData.desiredDate,
                    newPlace: formData.newPlace,
                    note: formData.details,
                },
                context: {
                    source: "grave-closure",
                    sourcePath: "/grave-closure/consult",
                    refUrl: window.location.href,
                }
            };

            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsSuccess(true);
                window.scrollTo(0, 0);
            } else {
                alert("送信に失敗しました。時間をおいて再度お試しください。");
            }
        } catch (error) {
            console.error("Submission error", error);
            alert("エラーが発生しました。");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <main className="flex-grow pt-32 px-4 pb-20">
                    <div className="max-w-2xl mx-auto text-center py-20">
                        <h1 className="text-3xl font-bold text-primary mb-6">送信完了</h1>
                        <p className="text-gray-600 mb-10 leading-loose">
                            お問い合わせありがとうございます。<br />
                            担当者より折り返しご連絡させていただきます。
                        </p>
                        <Link href="/grave-closure">
                            <Button variant="outline">トップへ戻る</Button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="flex-grow pt-32 px-4 pb-20">
                <div className="max-w-3xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link href="/grave-closure" className="text-gray-500 hover:text-primary flex items-center text-sm">
                            <ArrowLeft className="w-4 h-4 mr-1" /> 墓じまいトップへ戻る
                        </Link>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                            墓じまい・改葬 無料相談フォーム
                        </h1>
                        <p className="text-gray-600 text-sm">
                            {mode === 'estimate' ? "概算見積もりのご依頼もこちらから承ります。" : "まずはお気軽にご相談ください。"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-gray-200 space-y-8">

                        {/* 1. Contact Info */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">お客様情報</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">お名前 <span className="text-red-500">*</span></label>
                                    <input type="text" name="name" required className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="山田 太郎" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">フリガナ <span className="text-red-500">*</span></label>
                                    <input type="text" name="furigana" required className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="やまだ たろう" value={formData.furigana} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">電話番号 <span className="text-red-500">*</span></label>
                                <input type="tel" name="phone" required className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="090-1234-5678" value={formData.phone} onChange={handleChange} />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">メールアドレス <span className="text-red-500">*</span></label>
                                <input type="email" name="email" required className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="example@email.com" value={formData.email} onChange={handleChange} />
                            </div>
                        </section>

                        {/* 2. Grave Info */}
                        <section className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-800 border-b pb-2">お墓について</h2>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">現在のお墓の場所 <span className="text-red-500">*</span></label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" name="currentPrefecture" required className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="都道府県" value={formData.currentPrefecture} onChange={handleChange} />
                                    <input type="text" name="currentCity" required className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="市区町村" value={formData.currentCity} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-700">ご希望の内容 <span className="text-red-500">*</span></label>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer p-4 border rounded-lg flex-1 hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="closureType"
                                            value="grave_closure"
                                            checked={formData.closureType === "grave_closure"}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-primary"
                                        />
                                        <span className="font-bold text-gray-700">墓じまい（撤去）</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer p-4 border rounded-lg flex-1 hover:bg-gray-50 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                                        <input
                                            type="radio"
                                            name="closureType"
                                            value="relocation"
                                            checked={formData.closureType === "relocation"}
                                            onChange={handleChange}
                                            className="w-5 h-5 text-primary"
                                        />
                                        <span className="font-bold text-gray-700">改葬（引越し）</span>
                                    </label>
                                </div>
                            </div>

                            {formData.closureType === "relocation" && (
                                <div className="space-y-2 animate-fade-in">
                                    <label className="block text-sm font-bold text-gray-700">新しい供養先の希望（あれば）</label>
                                    <input type="text" name="newPlace" className="w-full h-12 px-4 border rounded-lg bg-gray-50" placeholder="例：都内の納骨堂、樹木葬など" value={formData.newPlace} onChange={handleChange} />
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">実施希望時期</label>
                                <select name="desiredDate" className="w-full h-12 px-4 border rounded-lg bg-gray-50" value={formData.desiredDate} onChange={handleChange}>
                                    <option value="">未定</option>
                                    <option value="asap">なるべく早く</option>
                                    <option value="within_3m">3ヶ月以内</option>
                                    <option value="within_6m">半年以内</option>
                                    <option value="within_1y">1年以内</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">詳細・ご相談内容</label>
                                <textarea name="details" className="w-full h-32 p-4 border rounded-lg bg-gray-50 resize-y" placeholder="現地のお写真がある、階段がある、など詳細があればご記入ください。" value={formData.details} onChange={handleChange} />
                            </div>
                        </section>

                        <div className="pt-4 text-center">
                            <Button type="submit" size="lg" className="w-full sm:w-2/3 py-4 text-lg shadow-xl" disabled={isSubmitting}>
                                {isSubmitting ? "送信中..." : "上記の内容で送信する"}
                            </Button>
                        </div>

                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default function GraveClosurePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white" />}>
            <GraveClosureForm />
        </Suspense>
    );
}
