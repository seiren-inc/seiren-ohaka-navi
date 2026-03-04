"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle2, Building2 } from "lucide-react";

interface TempleProfile {
    id: string;
    name: string;
    pref: string;
    city: string;
    addressLine: string;
    sect: string;
    phone: string;
    description: string;
    transportation: string;
    parkingInfo: string;
    officeHours: string;
}

export default function PortalProfilePage() {
    const [profile, setProfile] = useState<TempleProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/portal/profile")
            .then(r => r.json())
            .then(data => { setProfile(data); setLoading(false); })
            .catch(() => { setError("データの取得に失敗しました。"); setLoading(false); });
    }, []);

    const handleSave = async () => {
        if (!profile) return;
        setSaving(true);
        setError(null);
        try {
            const res = await fetch("/api/portal/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(profile),
            });
            if (!res.ok) throw new Error("保存に失敗しました。");
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました。");
        } finally {
            setSaving(false);
        }
    };

    const update = (key: keyof TempleProfile, value: string) =>
        setProfile(prev => prev ? { ...prev, [key]: value } : prev);

    if (loading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-gray-300 w-8 h-8" /></div>;
    if (!profile) return <p className="text-gray-400 py-12 text-center">施設情報が見つかりません。</p>;

    const Field = ({ label, field, placeholder, multiline = false }: { label: string; field: keyof TempleProfile; placeholder?: string; multiline?: boolean }) => (
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">{label}</label>
            {multiline ? (
                <textarea value={(profile[field] as string) || ""} onChange={e => update(field, e.target.value)}
                    rows={3} placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            ) : (
                <input value={(profile[field] as string) || ""} onChange={e => update(field, e.target.value)}
                    placeholder={placeholder}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            )}
        </div>
    );

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Building2 className="w-6 h-6 text-primary" /> 施設情報の管理
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">掲載ページに表示される施設情報を編集できます</p>
                </div>
                <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                    {saved ? "保存しました" : "保存する"}
                </button>
            </div>

            {error && <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3 text-sm">{error}</p>}

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <h2 className="font-bold text-gray-700 text-sm border-b pb-2">基本情報</h2>
                <Field label="施設名" field="name" placeholder="○○霊苑" />
                <div className="grid grid-cols-2 gap-3">
                    <Field label="都道府県" field="pref" placeholder="東京都" />
                    <Field label="市区町村" field="city" placeholder="渋谷区" />
                </div>
                <Field label="番地以降" field="addressLine" placeholder="代々木1-1-1" />
                <div className="grid grid-cols-2 gap-3">
                    <Field label="宗派" field="sect" placeholder="曹洞宗" />
                    <Field label="電話番号" field="phone" placeholder="03-xxxx-xxxx" />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <h2 className="font-bold text-gray-700 text-sm border-b pb-2">掲載コンテンツ</h2>
                <Field label="施設紹介文" field="description" placeholder="施設の特徴・強みを記入してください。" multiline />
                <Field label="アクセス情報" field="transportation" placeholder="〇〇駅から徒歩5分など" multiline />
                <Field label="駐車場情報" field="parkingInfo" placeholder="駐車場あり（20台）など" />
                <Field label="営業時間・受付時間" field="officeHours" placeholder="9:00〜17:00（年中無休）など" />
            </div>

            <div className="flex justify-end">
                <button onClick={handleSave} disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark disabled:opacity-50">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    変更を保存する
                </button>
            </div>
        </div>
    );
}
