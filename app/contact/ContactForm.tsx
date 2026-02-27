"use client";

import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Search } from "lucide-react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        furigana: "",
        phone: "",
        postalCode: "",
        prefecture: "",
        city: "",
        address1: "",
        address2: "",
        remarks: "",
    });

    const [isLoadingAddress, setIsLoadingAddress] = useState(false);
    const [addressError, setAddressError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Auto-fetch address on 7-digit postal code
        if (name === "postalCode" && value.length === 7) {
            fetchAddress(value);
        }
    };

    const fetchAddress = async (zip: string) => {
        setIsLoadingAddress(true);
        setAddressError("");
        try {
            const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
            const data = await response.json();

            if (data.results) {
                const result = data.results[0];
                setFormData((prev) => ({
                    ...prev,
                    prefecture: result.address1,
                    city: result.address2,
                    address1: result.address3,
                }));
            } else {
                setAddressError("住所が見つかりませんでした。");
            }
        } catch (error) {
            setAddressError("住所検索に失敗しました。");
        } finally {
            setIsLoadingAddress(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("送信機能は現在デモモードです。\n\n" + JSON.stringify(formData, null, 2));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-border">

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-bold text-text-primary">
                        お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-bg/50"
                        placeholder="山田 太郎"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="furigana" className="block text-sm font-bold text-text-primary">
                        ふりがな <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="furigana"
                        name="furigana"
                        required
                        className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-bg/50"
                        placeholder="やまだ たろう"
                        value={formData.furigana}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-bold text-text-primary">
                    電話番号 <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-bg/50"
                    placeholder="090-1234-5678"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            {/* Address Section */}
            <div className="p-6 bg-bg rounded-xl space-y-6 border border-border">
                <h3 className="font-bold text-text-primary border-b border-border pb-2">ご住所</h3>

                {/* Zip */}
                <div className="space-y-2">
                    <label htmlFor="postalCode" className="block text-sm font-bold text-text-primary">
                        郵便番号 <span className="text-red-500">*</span> <span className="text-xs font-normal text-text-muted ml-2">（ハイフンなしで自動入力）</span>
                    </label>
                    <div className="flex gap-4 items-center">
                        <input
                            type="text"
                            id="postalCode"
                            name="postalCode"
                            required
                            maxLength={7}
                            className="w-40 h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            placeholder="1000001"
                            value={formData.postalCode}
                            onChange={handleChange}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => fetchAddress(formData.postalCode)}
                            disabled={isLoadingAddress}
                        >
                            {isLoadingAddress ? "検索中..." : "住所検索"}
                        </Button>
                    </div>
                    {addressError && <p className="text-red-500 text-xs">{addressError}</p>}
                </div>

                {/* Prefecture & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label htmlFor="prefecture" className="block text-sm font-bold text-text-primary">
                            都道府県 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="prefecture"
                            name="prefecture"
                            required
                            className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            value={formData.prefecture}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="city" className="block text-sm font-bold text-text-primary">
                            市区町村 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Address1 & 2 */}
                <div className="space-y-2">
                    <label htmlFor="address1" className="block text-sm font-bold text-text-primary">
                        番地・地名 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="address1"
                        name="address1"
                        required
                        className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        value={formData.address1}
                        onChange={handleChange}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="address2" className="block text-sm font-bold text-text-primary">
                        建物名・部屋番号
                    </label>
                    <input
                        type="text"
                        id="address2"
                        name="address2"
                        className="w-full h-12 px-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        placeholder="○○マンション 101号室"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
                <label htmlFor="remarks" className="block text-sm font-bold text-text-primary">
                    備考・ご相談内容
                </label>
                <textarea
                    id="remarks"
                    name="remarks"
                    className="w-full h-32 p-4 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-bg/50 resize-y"
                    placeholder="ご質問やご希望があればご記入ください。"
                    value={formData.remarks}
                    onChange={handleChange}
                />
            </div>

            {/* Submit */}
            <div className="pt-6 text-center">
                <Button type="submit" size="lg" className="w-full sm:w-2/3 shadow-xl shadow-primary/20 text-lg py-6">
                    上記の内容で送信する
                </Button>
            </div>
        </form>
    );
}
