"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { CheckCircle, Phone, Mail, ArrowDown, Calculator, Search, MapPin, Building, X } from "lucide-react";
import Link from "next/link";
import { cn } from "../../../lib/utils";

const PREFECTURES = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

// Temple Type
type TempleCandidate = {
    id: string;
    name: string;
    sect?: string;
    fullAddress: string;
    pref: string;
    city: string;
    addressLine?: string;
    zip: string;
};

function GraveClosureConsultForm() {
    // Basic Form Data
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
        serviceMode: "未定", // 墓じまい | 改葬 | 未定

        // New Grave Info
        graveTempleName: "",
        graveTemplePref: "",
        graveTempleCity: "",
        graveTempleAddressLine: "", // Street/Building
        graveTempleId: "",

        areaPref: "",
        areaCity: "",
        newPref: "",
        newCity: "",

        graveType: "不明", // 一般墓 | 納骨堂 | 不明
        hasNextPlace: "未定",
        desiredTiming: "未定",
        needDocumentHelp: "未定",
        message: "",
    });

    const [postalError, setPostalError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Temple Search State
    const [templeQuery, setTempleQuery] = useState("");
    const [templeCandidates, setTempleCandidates] = useState<TempleCandidate[]>([]);
    const [showCandidates, setShowCandidates] = useState(false);
    const [isSearchingTemple, setIsSearchingTemple] = useState(false);
    const [addressHighlight, setAddressHighlight] = useState(false);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Sync initial state if needed, but primary source is templeQuery for the input
    useEffect(() => {
        if (formData.graveTempleName && !templeQuery) {
            setTempleQuery(formData.graveTempleName);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "zipCode" && value.length === 7) {
            fetchAddress(value);
        }
    };

    // Temple Search Logic    
    const fetchTemples = async (query: string) => {
        setIsSearchingTemple(true);
        try {
            // Prevent caching issues with timestamp or headers if needed, mostly fetch default is ok but user asked for no-store
            const res = await fetch(`/api/temples/search?q=${encodeURIComponent(query)}`, {
                cache: 'no-store'
            });
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            setTempleCandidates(data.results || []);
            setShowCandidates(true);
        } catch (err) {
            console.error(err);
            setTempleCandidates([]);
        } finally {
            setIsSearchingTemple(false);
        }
    };

    const handleTempleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTempleQuery(val);

        // Update form data name immediately, clear ID (treat as manual entry until selected)
        setFormData(prev => ({
            ...prev,
            graveTempleName: val,
            graveTempleId: ""
        }));

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        if (val.length < 1) { // 1 char is enough as per requirement
            setTempleCandidates([]);
            setShowCandidates(false);
            return;
        }

        searchTimeoutRef.current = setTimeout(() => {
            fetchTemples(val);
        }, 300); // Debounce 300ms
    };

    const handleTempleInputFocus = () => {
        if (templeQuery.length >= 1 && templeCandidates.length > 0) {
            setShowCandidates(true);
        }
    };

    const clearTempleSearch = () => {
        setTempleQuery("");
        setTempleCandidates([]);
        setShowCandidates(false);
        setFormData(prev => ({
            ...prev,
            graveTempleName: "",
            graveTemplePref: "", // Clear fields as user requested "clear or keep", but usually clear is safer for "reset"
            graveTempleCity: "",
            graveTempleAddressLine: "",
            graveTempleId: ""
        }));
        inputRef.current?.focus();
    };

    const selectTempleCandidate = (temple: TempleCandidate) => {
        setFormData(prev => ({
            ...prev,
            graveTempleName: temple.name,
            graveTemplePref: temple.pref,
            graveTempleCity: temple.city,
            graveTempleAddressLine: temple.addressLine || "",
            graveTempleId: temple.id
        }));
        setTempleQuery(temple.name);
        setShowCandidates(false);

        // Trigger Highlight
        setAddressHighlight(true);
        setTimeout(() => setAddressHighlight(false), 1500);
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

        const fullTempleAddress = `${formData.graveTemplePref}${formData.graveTempleCity}${formData.graveTempleAddressLine}`;

        const payload = {
            type: "consult",
            category: "grave_closure",
            kind: "hakajimai",
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

            graveTempleName: formData.graveTempleName,
            graveTemplePref: formData.graveTemplePref,
            graveTempleCity: formData.graveTempleCity,
            graveTempleAddress: fullTempleAddress,
            graveTempleId: formData.graveTempleId,

            additionalFields: {
                serviceMode: formData.serviceMode,
                graveType: formData.graveType,
                hasNextPlace: formData.hasNextPlace,
                desiredTiming: formData.desiredTiming,
                needDocumentHelp: formData.needDocumentHelp,
                graveTempleAddressLine: formData.graveTempleAddressLine,
            },
            context: {
                sourceLabel: "GraveClosureForm",
                sourcePath: "/consult/grave-closure",
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
                        担当者より折り返しご連絡させていただきます。
                    </p>
                    <a href="/" className="text-primary hover:underline">トップへ戻る</a>
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
                    Grave Closure
                </span>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-4">
                    お墓じまい・改葬の無料相談
                </h1>
                <p className="text-gray-600">
                    書類手続き、寺院との調整、撤去工事、<br className="sm:hidden" />次の供養先までワンストップでサポート
                </p>
            </div>

            <main className="grow container mx-auto px-4 py-12 max-w-4xl">

                {/* 3 Reassurances */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "全国対応", text: "遠方のお墓でも対応可能です（一部離島を除く）" },
                        { title: "トラブル防止", text: "「離檀」などのお寺様との調整もサポート" },
                        { title: "明朗会計", text: "事前にしっかり現地調査し、お見積もりを出します" },
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

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-gray-100 space-y-8 max-w-3xl mx-auto">

                    <section className="space-y-6">
                        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">ご相談内容</h2>

                        <div className="space-y-3">
                            <label className="block text-sm font-bold text-gray-700">ご希望の内容</label>
                            <div className="flex flex-wrap gap-6">
                                {["墓じまい（撤去のみ）", "改葬（お墓の引越し）", "未定"].map(mode => (
                                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="serviceMode"
                                            value={mode.split("（")[0]}
                                            checked={formData.serviceMode === mode.split("（")[0]}
                                            onChange={handleChange}
                                            className="text-primary focus:ring-primary w-4 h-4"
                                        />
                                        <span className="text-gray-700">{mode}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Updated Temple Section */}
                        <div className={cn(
                            "space-y-6 bg-blue-50/50 p-6 rounded-xl border border-blue-100 relative transition-colors duration-1000",
                            addressHighlight && "bg-yellow-50 border-yellow-200"
                        )}>
                            <div className="flex items-center gap-2 mb-2">
                                <Building className="w-5 h-5 text-secondary" />
                                <h3 className="font-bold text-gray-800">現在のお墓について</h3>
                            </div>

                            {/* Temple Name with Suggestions */}
                            <div className="relative space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    お寺・霊園の名前 <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        name="graveTempleName"
                                        required
                                        className="w-full h-12 pl-10 pr-10 border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none placeholder:text-gray-400"
                                        placeholder="例：〇〇寺、〇〇霊園（入力で候補表示）"
                                        value={templeQuery}
                                        onChange={handleTempleNameChange}
                                        onFocus={handleTempleInputFocus}
                                        onBlur={() => setTimeout(() => setShowCandidates(false), 200)}
                                        autoComplete="off"
                                    />
                                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

                                    {/* Actions Right: Loading or Clear */}
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                        {isSearchingTemple ? (
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary"></div>
                                        ) : templeQuery.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={clearTempleSearch}
                                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Suggestions Dropdown */}
                                {showCandidates && (
                                    <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
                                        {templeCandidates.length > 0 ? (
                                            <ul>
                                                {templeCandidates.map(temple => (
                                                    <li
                                                        key={temple.id}
                                                        onClick={() => selectTempleCandidate(temple)}
                                                        className="px-4 py-3 hover:bg-secondary/5 cursor-pointer border-b border-gray-50 last:border-0"
                                                    >
                                                        <div className="font-bold text-gray-800">
                                                            {temple.name}
                                                            {temple.sect && (
                                                                <span className="text-xs text-secondary ml-2 font-normal">
                                                                    ({temple.sect})
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500 flex items-center mt-1">
                                                            <MapPin className="w-3 h-3 mr-1" />
                                                            {temple.fullAddress}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-gray-400 text-center">
                                                該当する寺院が見つかりません。<br />
                                                手入力してください。
                                            </div>
                                        )}
                                    </div>
                                )}
                                <p className="text-xs text-gray-500">
                                    ※候補が出ない場合は、そのまま正式名称をご入力ください。
                                </p>
                            </div>

                            {/* Temple Address Logic: Split Pref / City / Line */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        都道府県 <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="graveTemplePref"
                                        required
                                        className={cn(
                                            "w-full h-12 px-4 border rounded-lg bg-white focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-colors",
                                            addressHighlight && "bg-yellow-100 border-yellow-300"
                                        )}
                                        value={formData.graveTemplePref}
                                        onChange={handleChange}
                                    >
                                        <option value="">選択してください</option>
                                        {PREFECTURES.map(pref => (
                                            <option key={pref} value={pref}>{pref}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-700">
                                        市区町村 <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="graveTempleCity"
                                        required
                                        className={cn(
                                            "w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-colors",
                                            addressHighlight && "bg-yellow-100 border-yellow-300"
                                        )}
                                        placeholder="例：港区、横浜市"
                                        value={formData.graveTempleCity}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">
                                    以降の住所（町名・番地等）
                                </label>
                                <input
                                    type="text"
                                    name="graveTempleAddressLine"
                                    className={cn(
                                        "w-full h-12 px-4 border rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-colors",
                                        addressHighlight && "bg-yellow-100 border-yellow-300"
                                    )}
                                    placeholder="例：芝公園4-7-35"
                                    value={formData.graveTempleAddressLine}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">実施希望時期</label>
                                <select name="desiredTiming" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.desiredTiming} onChange={handleChange}>
                                    <option value="未定">未定</option>
                                    <option value="急ぎ">急ぎ</option>
                                    <option value="3ヶ月以内">3ヶ月以内</option>
                                    <option value="半年以内">半年以内</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-bold text-gray-700">次の供養先</label>
                                <select name="hasNextPlace" className="w-full h-12 px-4 border rounded-lg bg-white" value={formData.hasNextPlace} onChange={handleChange}>
                                    <option value="未定">決まっていない（提案希望）</option>
                                    <option value="決まっている">すでに決まっている</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                            <Calculator className="w-5 h-5 text-gray-400" />
                            <span>費用でお悩みですか？</span>
                            <Link href="/grave-closure/cost" target="_blank" className="text-primary underline font-bold ml-1">
                                費用の目安を確認する
                            </Link>
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

                        <div className="space-y-4">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">現在のお墓がある場所 <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">必須</span></label>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="areaPref" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="都道府県 (例: 静岡県)" value={formData.areaPref} onChange={handleChange} required />
                                <input type="text" name="areaCity" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="市区町村 (例: 沼津市)" value={formData.areaCity} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center text-sm font-bold text-gray-700 mb-2">新しい供養先の希望エリア <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">任意</span></label>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="newPref" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="都道府県 (例: 東京都)" value={formData.newPref} onChange={handleChange} />
                                <input type="text" name="newCity" className="w-full h-12 px-4 border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary" placeholder="市区町村 (例: 港区)" value={formData.newCity} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-bold text-gray-700">その他・ご詳細 <span className="bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded-sm ml-2 font-normal">任意</span></label>
                            <textarea name="message" className="w-full h-32 p-4 border rounded-lg" placeholder="お墓の場所（山の上、階段があるなど）や、具体的なご事情があればご記入ください" value={formData.message} onChange={handleChange} />
                        </div>
                    </section>

                    {/* Updated Submit Button */}
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
            <GraveClosureConsultForm />
        </Suspense>
    );
}
