"use client";

import { useState, Suspense } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { CheckCircle, Phone, Mail, ArrowDown, Heart } from "lucide-react";

function IkotsuServiceConsultForm() {
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
        serviceItems: [] as string[],
        boneStatus: "不明",
        deliveryMethod: "未定",
        desiredTiming: "未定",
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
            serviceItems: checked
                ? [...prev.serviceItems, value]
                : prev.serviceItems.filter(t => t !== value)
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
            category: "ikotsu_service",
            contact: {
                name: formData.name,
                furigana: formData.furigana,
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
                serviceItems: formData.serviceItems,
                boneStatus: formData.boneStatus,
                deliveryMethod: formData.deliveryMethod,
                desiredTiming: formData.desiredTiming,
            },
            context: {
                sourceLabel: "HeaderConsultDropdown",
                sourcePath: "/consult/ikotsu-service",
                refUrl: window.location.href,
            }
        };

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setIsSuccess(true);
                window.scrollTo(0, 0);
            } else {
                alert("送信に失敗しました。");
            }
        } catch (error) {
            console.error(error);
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
                        お問い合わせありがとうございます。<br />
                        ご遺骨サポートの担当者より、折り返しご連絡させていただきます。
                    </p>
                    <a href="/" className="text-primary hover:underline">トップへ戻る</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-bg flex flex-col">
            <Navbar />

            {/* Hero */}
            <div className="bg-white pt-32 pb-16 px-4 text-center border-b border-gray-100">
                <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                    Remains Service
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                    遺骨サービスの無料相談
                </h1>
                <p className="text-gray-600">
                    粉骨・洗骨・手元供養・散骨など、<br className="sm:hidden" />大切なご遺骨のケアについて丁寧にご案内します
                </p>
            </div>

            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">

                {/* 3 Reassurances */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "丁寧な取り扱い", text: "専門スタッフが心込めてご遺骨をお取り扱いします" },
                        { title: "プライバシー配慮", text: "ご近所の方に分からないよう配慮して送迎・対応します" },
                        { title: "個別相談", text: "ご家庭ごとの事情に合わせて最適なプランを提案します" },
                    ].map((item, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 text-secondary rounded-full mb-4">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.text}</p>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-8 max-w-3xl mx-auto">

                    <section className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">ご希望のサービス</h2>

                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-700">興味のある内容（複数選択可）</label>
                            <div className="flex flex-wrap gap-4">
                                {["粉骨（パウダー化）", "洗骨（洗浄・乾燥）", "手元供養品", "散骨", "その他"].map(type => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={type}
                                            checked={formData.serviceItems.includes(type)}
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
                                <label className="block text-sm font-bold text-gray-700">現在のご遺骨の状態</label>
                                <select name="boneStatus" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.boneStatus} onChange={handleChange}>
                                    <option value="不明">不明・相談したい</option>
                                    <option value="骨壷のまま">骨壷に入っている</option>
                                    <option value="お墓の中">お墓の中にある</option>
                                    <option value="一部">分骨・一部のみ</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">お引き渡し方法</label>
                                <select name="deliveryMethod" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.deliveryMethod} onChange={handleChange}>
                                    <option value="未定">未定（相談）</option>
                                    <option value="郵送">郵送希望</option>
                                    <option value="持込">持ち込み希望</option>
                                    <option value="訪問">訪問引き取り希望（有料）</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">実施希望時期</label>
                            <select name="desiredTiming" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.desiredTiming} onChange={handleChange}>
                                <option value="未定">未定</option>
                                <option value="急ぎ">急ぎ</option>
                                <option value="1ヶ月以内">1ヶ月以内</option>
                                <option value="3ヶ月以内">3ヶ月以内</option>
                            </select>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">お客様情報</h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">お名前 <span className="text-red-500">*</span></label>
                                <input type="text" name="name" required className="w-full h-12 px-4 border rounded-lg" placeholder="山田 太郎" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">フリガナ <span className="text-red-500">*</span></label>
                                <input type="text" name="furigana" required className="w-full h-12 px-4 border rounded-lg" placeholder="やまだ たろう" value={formData.furigana} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">電話番号 <span className="text-red-500">*</span></label>
                                <input type="tel" name="phone" required className="w-full h-12 px-4 border rounded-lg" placeholder="090-1234-5678" value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">メールアドレス <span className="text-red-500">*</span></label>
                                <input type="email" name="email" required className="w-full h-12 px-4 border rounded-lg" placeholder="example@email.com" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">郵便番号 (住所自動入力)</label>
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        name="zipCode"
                                        maxLength={8}
                                        className="w-32 h-12 px-4 border rounded-lg"
                                        placeholder="123-4567"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                    />
                                    <span className="text-xs text-gray-500 self-center">ハイフンなしでもOK</span>
                                </div>
                                {postalError && <p className="text-red-500 text-xs">{postalError}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" name="prefecture" className="w-full h-12 px-4 border rounded-lg" placeholder="都道府県" value={formData.prefecture} onChange={handleChange} />
                                <input type="text" name="city" className="w-full h-12 px-4 border rounded-lg" placeholder="市区町村" value={formData.city} onChange={handleChange} />
                            </div>
                            <div className="space-y-2">
                                <input type="text" name="address1" className="w-full h-12 px-4 border rounded-lg" placeholder="番地" value={formData.address1} onChange={handleChange} />
                                <input type="text" name="address2" className="w-full h-12 px-4 border rounded-lg" placeholder="建物名・部屋番号" value={formData.address2} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">その他・ご要望</label>
                            <textarea name="message" className="w-full h-32 p-4 border rounded-lg" placeholder="具体的なご質問があればご記入ください" value={formData.message} onChange={handleChange} />
                        </div>
                    </section>

                    <div className="text-center pt-4">
                        <Button type="submit" size="lg" className="w-full sm:w-2/3 py-4 text-lg shadow-xl" disabled={isSubmitting}>
                            {isSubmitting ? "送信中..." : "無料で相談する"}
                        </Button>
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
            <IkotsuServiceConsultForm />
        </Suspense>
    );
}
