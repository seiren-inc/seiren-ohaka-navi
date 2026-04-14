/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../../components/ui/Button";
import { Temple, Plan, FacilityType, ManagementBody, ReligionCategory, Parking, BarrierFree, PetSupport, SuccessorReq, PublishStatus, Prefecture, ContentIcon, AppealTag, RELIGION_CATEGORIES, BUDDHIST_SECTS, BUDDHIST_SECT_GROUPS, BuddhistSect, PLAN_CATEGORIES, PLAN_AVAILABILITY_LABELS, PlanCategoryType, PlanAvailability, ManagementFeeType, IndoorOutdoor, PetAllowed, BookingStatus, Sect, MemorialType } from "../../../../../lib/store";
import { ImageUploader } from "../../../../components/admin/ImageUploader";
import { GalleryUploader } from "../../../../components/admin/GalleryUploader";
import { Loader2, Plus, Trash2, GripVertical, Image as ImageIcon, MapPin, Calendar as CalIcon, FileText, Tag, Search, Sparkles, X, ChevronDown, ChevronRight, Save, Clock, Settings, Bell, Ban, Globe, HelpCircle, Code, DollarSign, CheckSquare, Info } from "lucide-react";

// Lists (Reused)
// Lists (Reused)
const PREFECTURES: Prefecture[] = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];
const CONTENT_ICONS: ContentIcon[] = ['駅近', '個室', '屋内', 'バリアフリー', '管理不要', '継承者不要', '宗教不問', 'カード参拝', '駐車場', '自然', 'ペット可', '費用抑えめ', '人気', '新しい施設', '歴史ある寺院', '相談可'];
const APPEAL_TAGS: AppealTag[] = ['宗教不問', '檀家義務なし', '管理料不要', '駅近', '駐車場', 'バリアフリー', '屋内', '個室参拝', 'カード参拝', '会食可', '生前申込可', 'ペット供養可', '永代供養あり', '樹木葬あり', '納骨堂あり', '合祀墓あり'];

// UI Options Lists
const SECT_OPTIONS: BuddhistSect[] = ['jodo', 'jodoShin', 'nichiren', 'shingon', 'tendai', 'zen', 'other', 'unknown']; // Simplified for UI or use Groups
// Actually, specific SECTS array was used for "Supported Sects" (string[]). 
// The Store defines `sects: Sect[]` where Sect is a string union.
const SUPPORTED_SECT_OPTIONS: string[] = ['無宗派', '仏教全般', '浄土宗', '浄土真宗', '日蓮宗', '真言宗', '天台宗', '曹洞宗', '禅宗', 'その他'];
const MEMORIAL_TYPE_OPTIONS: string[] = ['一般墓', '永代供養墓', '樹木葬', '納骨堂', '合祀', '海洋散骨', '手元供養', '遺骨ダイヤモンド'];

// Plan Options (Local UI helpers)
const PLAN_CAPACITY_OPTIONS = ['1霊', '2霊', '〜4霊', '〜6霊', '〜8霊', '10霊以上', '不明'];
const BURIAL_METHOD_OPTIONS = ['individual', 'joint', 'other'];
const PERIOD_SUB_OPTIONS = ['3年', '6年', '13年', '33年']; // Examples for helper text or select?


// Helper for Tag Input
const TagInput = ({ tags, onChange, placeholder }: { tags: string[], onChange: (files: string[]) => void, placeholder: string }) => {
    const [val, setVal] = useState("");
    const add = () => { if (val.trim()) { onChange([...new Set([...tags, val.trim()])]); setVal(""); } };
    return (
        <div className="w-full">
            <div className="flex gap-2 mb-2 flex-wrap min-h-[32px]">
                {tags.map((t, i) => (
                    <span key={i} className="bg-gray-100 border border-gray-200 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 text-gray-700">
                        {t} <button type="button" onClick={() => onChange(tags.filter((_, idx) => idx !== i))} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} className="border p-2 rounded flex-1" placeholder={placeholder} />
                <Button onClick={add} type="button" variant="outline" size="sm"><Plus className="w-4 h-4" /></Button>
            </div>
        </div>
    )
}

export default function EditTemplePage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [temple, setTemple] = useState<Temple | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);

    // Plan Modal
    const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
    console.log("Edit Page Rendered. ImageUploader should be visible.");
    const [editingPlan, setEditingPlan] = useState<Partial<Plan>>({});
    const [planModalTab, setPlanModalTab] = useState<'basic' | 'specs' | 'extra'>('basic');
    // AI生成ヘルパー (Hooks は early return より前に宣言必須)
    const [aiLoading, setAiLoading] = useState<Record<string, boolean>>({});
    const [catchphraseCandidates, setCatchphraseCandidates] = useState<string[]>([]);

    // Derived Cities for suggestion (Simplified for now, as fetching all temples here is heavy)
    const citySuggestions = useMemo(() => {
        // Ideally fetch from a dedicated API endpoint like `/api/cities?prefecture=${temple.prefecture}`
        return []; 
    }, [temple?.prefecture]);

    // zipcloud API による郵便番号自動入力
    const handleZipCode = async (zip: string) => {
        setTemple(prev => prev ? { ...prev, ...{ zipCode: zip } } as any : prev);

        const digits = zip.replace(/-/g, '');
        if (digits.length !== 7) return;

        try {
            const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${digits}`);
            const data = await res.json();
            if (data.status === 200 && data.results?.[0]) {
                const r = data.results[0];
                setTemple(prev => prev ? ({
                    ...prev,
                    prefecture: r.address1 as any,
                    cityName: r.address2 + (r.address3 || ''),
                    ...{ zipCode: zip }
                } as any) : prev);
            }
        } catch {
            // API失敗時はサイレント
        }
    };


    useEffect(() => {
        Promise.resolve(params).then(p => {
            fetch(`/api/temples/${p.id}`)
                .then(res => {
                    if (!res.ok) throw new Error('Not found');
                    return res.json();
                })
                .then(t => {
                    // Update city suggestions dynamically by fetching all temples later if needed, 
                    // or just use a generic list. For now, we fallback to an empty array to avoid fetching all temples.
                    // If we really need suggestions, we should make a separate API call for cities.

                    // Data Migration Logic (similar to before, kept for safety)
                    const rawRel = t.religion as unknown as string;
                let newRel: ReligionCategory = 'other';
                if (rawRel === '仏教' || rawRel === 'buddhism') newRel = 'buddhism';
                else if (rawRel === '神道' || rawRel === 'shinto') newRel = 'shinto';
                else if (rawRel === 'キリスト教' || rawRel === 'christianity') newRel = 'christianity';
                else if (rawRel === '宗教不問') newRel = 'unknown';

                const migratedTemple: Temple = {
                    ...t,
                    religion: newRel,
                    // Attempt to map first sect from array or default
                    buddhistSect: t.buddhistSect || (newRel === 'buddhism' ? 'jodo' : undefined),

                    prefectureCode: t.prefectureCode || 13,
                    cityName: t.cityName || "",
                    addressLine: t.addressLine || t.address, // fallback
                    nearestStations: t.nearestStations || [],

                    sects: t.sects || ['無宗派'],
                    supportedMemorialTypes: t.supportedMemorialTypes || [],
                    indoorOutdoor: t.indoorOutdoor || 'both',
                    petAllowed: t.petAllowed || 'unknown',

                    // Aggregated fields are auto-calculated, but load if present
                    priceAggMin: t.priceAggMin,
                    priceAggMax: t.priceAggMax,
                    managementFeeAggType: t.managementFeeAggType || 'unknown',

                    listedInSearch: t.listedInSearch ?? true,
                    // Ensure SEO exists
                    seo: t.seo || {
                        title: (t as any).seoTitle || "",
                        description: (t as any).seoDescription || "",
                        summary: "",
                        primaryKeywords: [],
                        secondaryKeywords: [],
                        structuredDataEnabled: true,
                        faqSource: 'facilityFaq',
                        indexControl: 'index'
                    },
                    // Ensure Calendar exists
                    calendar: t.calendar || {
                        bookingStatus: 'paused', bookingChannels: ['form', 'phone'], availableWeekdays: [1, 2, 4, 5, 6, 0], startTime: "10:00", endTime: "16:00", slotIntervalMinutes: 60, visitDurationMinutes: 60, bufferMinutes: 0, cutoffRule: "hours48", bookingWindowDays: 60, dailyCapacity: 3, blackoutDates: [], requestMessage: ""
                    }
                };
                    setTemple(migratedTemple);
                    setPlans(t.plans || []);
                })
                .catch(() => {
                    router.push("/admin/temples");
                });
        });
    }, [params, router]);

    if (!temple) return <div className="p-8">Loading...</div>;

    const handleSave = async () => {
        const errors: string[] = [];

        if (!temple.name) errors.push("・施設名");
        if (!temple.kana) errors.push("・ふりがな");
        if (!temple.type) errors.push("・施設タイプ");
        if (!temple.prefecture) errors.push("・都道府県");

        // Address Check
        const hasAddress = temple.address || (temple.cityName && temple.addressLine);
        if (!hasAddress) errors.push("・所在地（市区町村・番地）");

        // Conditional Checks
        if (temple.religion === 'buddhism' && !temple.buddhistSect) errors.push("・仏教宗派");
        if (!temple.catchphrase) errors.push("・キャッチコピー");

        if (errors.length > 0) {
            alert(`以下の必須項目が未入力です。\n入力内容をご確認ください。\n\n${errors.join('\n')}`);
            return;
        }

        // Data Prep
        const finalTemple = { ...temple };
        // Sync address for legacy compatibility
        if (!finalTemple.address && finalTemple.cityName && finalTemple.addressLine) {
            finalTemple.address = `${finalTemple.cityName}${finalTemple.addressLine}`;
        }

        setIsLoading(true);
        try {
            const res = await fetch(`/api/temples/${temple.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalTemple),
            });
            
            if (!res.ok) {
                if (res.status === 409) {
                    throw new Error('他のユーザーによってデータが更新されています。\nページを再読み込みして最新の情報を取得してください。');
                }
                throw new Error('保存に失敗しました');
            }
            
            const updatedTemple = await res.json();
            setTemple(prev => prev ? { ...prev, version: updatedTemple.version } : prev);
            alert("保存しました");
        } catch (e: any) {
            alert(e.message || "エラーが発生しました");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSavePlan = () => {
        // Validation
        if (!editingPlan.name) { alert("プラン名を入力してください"); return; }
        if (!editingPlan.price || editingPlan.price <= 0) { alert("販売価格は0より大きい数値を入力してください"); return; }
        // Required selections
        if (!editingPlan.burialMethod) { alert("埋葬方法を選択してください"); return; }
        if (!editingPlan.petAllowed) { alert("ペット共葬を選択してください"); return; }
        if (!editingPlan.availability) { alert("空き状況を選択してください"); return; }

        // Determine Category implicitly if missing (Fallback)
        // Since we removed input, we assume it's set on init. If not, default to 'generalGrave'
        const planToSave = {
            ...editingPlan,
            category: editingPlan.category || 'generalGrave',
            periodType: editingPlan.periodType || 'perpetual',
            images: editingPlan.images || []
        } as Plan;

        const method = planToSave.id ? 'PUT' : 'POST';
        const url = planToSave.id ? `/api/plans/${planToSave.id}` : '/api/plans';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planToSave)
        })
        .then(async res => {
            if (!res.ok) {
                if (res.status === 409) {
                    throw new Error('他のユーザーによってデータが更新されています。\nページを再読み込みして最新の情報を取得してください。');
                }
                throw new Error("Failed to save plan");
            }
            return res.json();
        })
        .then(() => {
            // Re-fetch plans
            fetch(`/api/plans?templeId=${temple.id}`)
                .then(res => res.json())
                .then(data => setPlans(data));
            setIsPlanModalOpen(false);
        })
        .catch(err => {
            console.error(err);
            alert(err.message || "プランの保存に失敗しました");
        });
    };

    // --- Tab Renderers ---

    // 1. BASIC INFO
    const renderBasicTab = () => (
        <div className="space-y-8 max-w-4xl animate-in fade-in">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><Info className="w-5 h-5" /> 基本情報</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">施設ID (自動)</label><input className="w-full border bg-gray-100 p-2.5 rounded-lg text-gray-500" value={temple.id} disabled /></div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">ステータス <span className="text-red-500">*</span></label>
                    <select className="w-full border border-gray-300 p-2.5 rounded-lg font-bold" value={temple.status} onChange={e => setTemple({ ...temple, status: e.target.value as PublishStatus })}>
                        <option value="public">公開</option>
                        <option value="private">非公開</option>
                        <option value="draft">準備中</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">施設名 <span className="text-red-500">*</span></label><input className="w-full border border-gray-300 p-2.5 rounded-lg" value={temple.name} onChange={e => setTemple({ ...temple, name: e.target.value })} /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">ふりがな <span className="text-red-500">*</span></label><input className="w-full border border-gray-300 p-2.5 rounded-lg" value={temple.kana} onChange={e => setTemple({ ...temple, kana: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div><label className="block text-sm font-bold text-gray-700 mb-1">施設タイプ <span className="text-red-500">*</span></label><select className="w-full border border-gray-300 p-2.5 rounded-lg" value={temple.type} onChange={e => setTemple({ ...temple, type: e.target.value as FacilityType })}> {['寺院墓地', '民営霊園', '公営霊園', '納骨堂', '複合型', 'その他'].map(v => <option key={v} value={v}>{v}</option>)} </select></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">運営主体</label><select className="w-full border border-gray-300 p-2.5 rounded-lg" value={temple.managementBody} onChange={e => setTemple({ ...temple, managementBody: e.target.value as ManagementBody })}> {['寺院', '宗教法人', '地方自治体', '民間企業', '公益法人'].map(v => <option key={v} value={v}>{v}</option>)} </select></div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">宗教 <span className="text-red-500">*</span></label>
                    <div className="flex gap-4">
                        <select
                            className="w-full border border-gray-300 p-2.5 rounded-lg"
                            value={temple.religion}
                            onChange={e => {
                                const newRel = e.target.value as ReligionCategory;
                                setTemple({
                                    ...temple,
                                    religion: newRel,
                                    buddhistSect: newRel === 'buddhism' ? temple.buddhistSect || 'jodo' : undefined
                                });
                            }}
                        >
                            {Object.entries(RELIGION_CATEGORIES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Conditional Buddhist Sect Select */}
            {temple.religion === 'buddhism' && (
                <div className="mt-6 animate-in fade-in slide-in-from-top-2">
                    <label className="block text-sm font-bold text-gray-700 mb-1">仏教宗派 <span className="text-red-500">*</span></label>
                    <select
                        className="w-full border border-gray-300 p-2.5 rounded-lg bg-blue-50"
                        value={temple.buddhistSect || ''}
                        onChange={e => setTemple({ ...temple, buddhistSect: e.target.value as BuddhistSect })}
                    >
                        <option value="">選択してください</option>
                        {BUDDHIST_SECT_GROUPS.map(group => (
                            <optgroup key={group.label} label={group.label}>
                                {group.options.map(opt => (
                                    <option key={opt} value={opt}>{BUDDHIST_SECTS[opt as BuddhistSect]}</option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">※寺院の主な宗派を選択してください</p>
                </div>
            )}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">問い合わせ先</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="text-xs text-gray-500">電話番号</label><input className="w-full border p-2.5 rounded-lg" value={temple.phone} onChange={e => setTemple({ ...temple, phone: e.target.value })} /></div>
                    <div><label className="text-xs text-gray-500">受付時間</label><input className="w-full border p-2.5 rounded-lg" value={temple.officeHours} onChange={e => setTemple({ ...temple, officeHours: e.target.value })} /></div>
                </div>
            </div>
            <div className="pt-6 border-t">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={temple.listedInSearch} onChange={e => setTemple({ ...temple, listedInSearch: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="font-bold text-gray-800">サイト内検索結果に表示する</span>
                </label>
                <p className="text-xs text-gray-500 ml-7 mt-1">オフにすると、検索結果には表示されませんが、直接リンク（詳細ページ）は機能します。</p>
            </div>

            {/* 掲載プラン管理 */}
            <div className="pt-6 border-t bg-amber-50 rounded-lg p-4">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-amber-500">★</span> 掲載プラン設定
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">プラン区分</label>
                        <select
                            className="w-full border border-gray-300 p-2.5 rounded-lg bg-white"
                            value={(temple as any).planType || 'free'}
                            onChange={e => setTemple({ ...temple, planType: e.target.value as 'free' | 'standard' | 'sponsor' })}
                        >
                            <option value="free">無料（Free）</option>
                            <option value="standard">標準（Standard） - おすすめ表示</option>
                            <option value="sponsor">スポンサー（Sponsor）</option>
                        </select>
                        <p className="text-xs text-gray-400 mt-1">standard以上は検索一覧で上位表示されます</p>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">PR固定枠</label>
                        <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg bg-white">
                            <input
                                type="checkbox"
                                checked={(temple as any).isPrSlot || false}
                                onChange={e => setTemple({ ...temple, isPrSlot: e.target.checked })}
                                className="w-5 h-5 accent-amber-500"
                            />
                            <span className="font-bold text-sm">「PR」バッジを表示する</span>
                        </label>
                        <p className="text-xs text-gray-400 mt-1">エリアページ上部にPRカードとして固定表示されます</p>
                    </div>
                </div>
            </div>
        </div>
    );

    // 2. LOCATION & ACCESS Tab
    const renderAccessTab = () => (
        <div className="space-y-8 max-w-4xl animate-in fade-in">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><MapPin className="w-5 h-5" /> 所在地・アクセス</h3>

            {/* 所在地 */}
            <div className="space-y-4">
                <h4 className="font-bold text-sm text-gray-700">所在地</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">郵便番号</label>
                        <input
                            className="w-full border p-2.5 rounded-lg"
                            placeholder="例: 123-4567"
                            value={(temple as any).zipCode || ''}
                            onChange={e => handleZipCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">都道府県</label>
                        <select className="w-full border p-2.5 rounded-lg" value={temple.prefecture} onChange={e => setTemple({ ...temple, prefecture: e.target.value as Prefecture })}>
                            {PREFECTURES.map(v => <option key={v} value={v}>{v}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">市区町村</label>
                        <input
                            className="w-full border p-2.5 rounded-lg"
                            placeholder="例: 港区"
                            value={temple.cityName || ''}
                            onChange={e => setTemple({ ...temple, cityName: e.target.value })}
                            list="city-options"
                        />
                        <datalist id="city-options">
                            {citySuggestions.map(city => <option key={city} value={city} />)}
                        </datalist>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">番地以下</label>
                        <input className="w-full border p-2.5 rounded-lg" placeholder="例: 芝公園4-2-8" value={temple.addressLine || ''} onChange={e => setTemple({ ...temple, addressLine: e.target.value })} />
                    </div>
                </div>
            </div>

            {/* 最寄り駅 */}
            <div className="space-y-3">
                <h4 className="font-bold text-sm text-gray-700">最寄り駅</h4>
                {temple.nearestStations?.map((st, i) => (
                    <div key={i} className="flex gap-2 items-center">
                        <input className="border p-2 rounded flex-1" placeholder="駅名" value={st.name} onChange={e => { const newSt = [...temple.nearestStations]; newSt[i].name = e.target.value; setTemple({ ...temple, nearestStations: newSt }) }} />
                        <input className="border p-2 rounded flex-1" placeholder="路線名" value={st.line} onChange={e => { const newSt = [...temple.nearestStations]; newSt[i].line = e.target.value; setTemple({ ...temple, nearestStations: newSt }) }} />
                        <div className="flex items-center gap-1 shrink-0">
                            <input className="border p-2 rounded w-16 text-center" type="number" placeholder="0" value={st.walkMinutes} onChange={e => { const newSt = [...temple.nearestStations]; newSt[i].walkMinutes = parseInt(e.target.value); setTemple({ ...temple, nearestStations: newSt }) }} />
                            <span className="text-sm text-gray-500">分</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setTemple({ ...temple, nearestStations: temple.nearestStations.filter((_, idx) => idx !== i) })}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setTemple({ ...temple, nearestStations: [...(temple.nearestStations || []), { name: '', line: '', walkMinutes: 0 }] })}><Plus className="w-4 h-4 mr-2" /> 駅を追加</Button>
            </div>

            {/* 交通アクセス説明 */}
            <div>
                <label className="block text-sm font-bold mb-1">交通アクセス説明</label>
                <textarea
                    className="w-full border p-2.5 rounded-lg h-24"
                    placeholder="例: 都営大江戸線「赤羽橋駅」より徒歩5分。東京駅よりバスで絀15分。"
                    value={temple.access}
                    onChange={e => setTemple({ ...temple, access: e.target.value })}
                />
            </div>

            {/* 駐車場 */}
            <div>
                <label className="block text-sm font-bold mb-2">駐車場</label>
                <div className="flex flex-wrap gap-3">
                    {(['あり（無料）', 'あり（有料）', 'なし', '近隣コインパーキングあり'] as const).map(v => (
                        <label key={v} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors text-sm font-bold ${temple.parking === v ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                            <input
                                type="radio"
                                name="parking"
                                className="hidden"
                                value={v}
                                checked={temple.parking === v}
                                onChange={() => setTemple({ ...temple, parking: v as Parking, parkingAvailable: v !== 'なし' })}
                            />
                            {v}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );


    // 3. ATTRIBUTES Tab
    const renderAttributesTab = () => (
        <div className="space-y-8 max-w-4xl animate-in fade-in">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><CheckSquare className="w-5 h-5" /> 特徴・設備プロパティ</h3>

            <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">対応宗派 <span className="text-xs font-normal text-gray-500 ml-1">複数選択可</span></label>
                <div className="flex flex-wrap gap-2">
                    {SUPPORTED_SECT_OPTIONS.map(s => (
                        <label key={s} className={`cursor-pointer px-4 py-2 rounded-full border transition-all text-sm font-bold ${temple.sects.includes(s as any) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                            <input type="checkbox" className="hidden" checked={temple.sects.includes(s as any)} onChange={e => setTemple({ ...temple, sects: e.target.checked ? [...temple.sects, s] as any : temple.sects.filter(x => x !== s) })} />
                            {s}
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <label className="block text-sm font-bold text-gray-700">対応供養タイプ <span className="text-xs font-normal text-gray-500 ml-1">複数選択可</span></label>
                <div className="flex flex-wrap gap-2">
                    {MEMORIAL_TYPE_OPTIONS.map(m => (
                        <label key={m} className={`cursor-pointer px-4 py-2 rounded-full border transition-all text-sm font-bold ${temple.supportedMemorialTypes.includes(m as any) ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                            <input type="checkbox" className="hidden" checked={temple.supportedMemorialTypes.includes(m as any)} onChange={e => setTemple({ ...temple, supportedMemorialTypes: e.target.checked ? [...temple.supportedMemorialTypes, m] as any : temple.supportedMemorialTypes.filter(x => x !== m) })} />
                            {m}
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">屋内・屋外</label>
                    <div className="flex gap-2">
                        {([{ v: 'indoor', l: '屋内のみ' }, { v: 'outdoor', l: '屋外のみ' }, { v: 'both', l: '両方あり' }] as const).map(({ v, l }) => (
                            <label key={v} className={`flex-1 text-center cursor-pointer px-3 py-2 rounded-lg border transition-all text-sm font-bold ${temple.indoorOutdoor === v ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                                <input type="radio" name="indoorOutdoor" className="hidden" value={v} checked={temple.indoorOutdoor === v} onChange={() => setTemple({ ...temple, indoorOutdoor: v as IndoorOutdoor })} />
                                {l}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">ペット対応</label>
                    <div className="flex gap-2 flex-wrap">
                        {([{ v: 'allowed', l: '可（全区画）' }, { v: 'conditional', l: '条件付き' }, { v: 'notAllowed', l: '不可' }] as const).map(({ v, l }) => (
                            <label key={v} className={`cursor-pointer px-4 py-2 rounded-lg border transition-all text-sm font-bold ${temple.petAllowed === v ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                                <input type="radio" name="petAllowed" className="hidden" value={v} checked={temple.petAllowed === v} onChange={() => setTemple({ ...temple, petAllowed: v as PetAllowed })} />
                                {l}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">バリアフリー</label>
                    <div className="flex gap-2">
                        {([{ v: true, l: '対応あり', desc: '車椅子・段差なし' }, { v: false, l: '対応なし', desc: '未整備' }] as const).map(({ v, l, desc }) => (
                            <label key={String(v)} className={`flex-1 cursor-pointer px-4 py-3 rounded-xl border transition-all ${temple.barrierFree === v ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                                <input type="radio" name="barrierFree" className="hidden" checked={temple.barrierFree === v} onChange={() => setTemple({ ...temple, barrierFree: v })} />
                                <div className="font-bold text-sm">{l}</div>
                                <div className={`text-xs mt-0.5 ${temple.barrierFree === v ? 'text-white/80' : 'text-gray-400'}`}>{desc}</div>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-700">継承者要件</label>
                    <div className="flex gap-2 flex-wrap">
                        {(['継承者不要', '継承者必要', '一定期間後合祀'] as const).map(v => (
                            <label key={v} className={`cursor-pointer px-4 py-2 rounded-lg border transition-all text-sm font-bold ${temple.successorRequirements === v ? 'bg-primary text-white border-primary shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>
                                <input type="radio" name="successorReq" className="hidden" value={v} checked={temple.successorRequirements === v} onChange={() => setTemple({ ...temple, successorRequirements: v as SuccessorReq })} />
                                {v}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );


    const generateAI = async (type: 'catchphrase' | 'overview' | 'features' | 'seo') => {
        if (!temple.name) { alert('施設名を入力してからAI生成してください'); return; }
        setAiLoading(prev => ({ ...prev, [type]: true }));
        try {
            const res = await fetch('/api/ai/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type,
                    context: {
                        name: temple.name, prefecture: temple.prefecture, cityName: temple.cityName,
                        type: temple.type, sects: temple.sects as string[],
                        supportedMemorialTypes: temple.supportedMemorialTypes as string[],
                        tags: temple.tags as string[], access: temple.access,
                    }
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            if (type === 'catchphrase') {
                const lines = (data.result as string).split('\n').filter((l: string) => /^\d\./.test(l.trim()));
                const candidates = lines.map((l: string) => l.replace(/^\d\.\s*/, '').trim()).filter(Boolean);
                setCatchphraseCandidates(candidates.length > 0 ? candidates : [data.result]);
            } else if (type === 'overview') {
                setTemple(prev => prev ? ({ ...prev, overview: data.result as string }) as typeof prev : prev);
            } else if (type === 'features') {
                const features = Array.isArray(data.result) ? data.result : [];
                if (features.length > 0) setTemple(prev => prev ? ({ ...prev, keyFeatures: features }) as typeof prev : prev);
            } else if (type === 'seo' && typeof data.result === 'object') {
                setTemple(prev => prev ? ({ ...prev, seo: { ...prev.seo, ...data.result } }) as typeof prev : prev);
            }
        } catch (err) {
            alert(`AI生成に失敗しました: ${err instanceof Error ? err.message : err}`);
        } finally {
            setAiLoading(prev => ({ ...prev, [type]: false }));
        }
    };

    // 4. CONTENT Tab
    const renderContentTab = () => (
        <div className="space-y-8 max-w-4xl animate-in fade-in">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><CheckSquare className="w-5 h-5" /> 特徴・設備プロパティ</h3>

            <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">A. 対応宗派 (複数選択可)</label>
                <div className="flex flex-wrap gap-3">
                    {SUPPORTED_SECT_OPTIONS.map(s => (
                        <label key={s} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors ${temple.sects.includes(s as any) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                            <input type="checkbox" className="hidden" checked={temple.sects.includes(s as any)} onChange={e => setTemple({ ...temple, sects: e.target.checked ? [...temple.sects, s] as any : temple.sects.filter(x => x !== s) })} />
                            {s}
                        </label>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">B. 対応供養タイプ (複数選択可)</label>
                <div className="flex flex-wrap gap-3">
                    {MEMORIAL_TYPE_OPTIONS.map(m => (
                        <label key={m} className={`cursor-pointer px-4 py-2 rounded-full border transition-colors ${temple.supportedMemorialTypes.includes(m as any) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
                            <input type="checkbox" className="hidden" checked={temple.supportedMemorialTypes.includes(m as any)} onChange={e => setTemple({ ...temple, supportedMemorialTypes: e.target.checked ? [...temple.supportedMemorialTypes, m] as any : temple.supportedMemorialTypes.filter(x => x !== m) })} />
                            {m}
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">C. 屋内・屋外</label>
                    <select className="w-full border p-2.5 rounded-lg" value={temple.indoorOutdoor || 'both'} onChange={e => setTemple({ ...temple, indoorOutdoor: e.target.value as IndoorOutdoor })}>
                        <option value="indoor">屋内のみ</option>
                        <option value="outdoor">屋外のみ</option>
                        <option value="both">両方あり</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">D. ペット対応</label>
                    <select className="w-full border p-2.5 rounded-lg" value={temple.petAllowed || 'unknown'} onChange={e => setTemple({ ...temple, petAllowed: e.target.value as PetAllowed })}>
                        <option value="allowed">可 (全区画)</option>
                        <option value="conditional">条件付き (専用区画など)</option>
                        <option value="notAllowed">不可</option>
                        <option value="unknown">不明</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">E. バリアフリー</label>
                    <label className="flex items-center gap-2 border p-3 rounded-lg bg-gray-50 cursor-pointer">
                        <input type="checkbox" checked={temple.barrierFree} onChange={e => setTemple({ ...temple, barrierFree: e.target.checked })} className="w-5 h-5 accent-primary" />
                        <span className="font-bold">バリアフリー対応 (車椅子可)</span>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">F. 継承者要件</label>
                    <select className="w-full border p-2.5 rounded-lg" value={temple.successorRequirements} onChange={e => setTemple({ ...temple, successorRequirements: e.target.value as SuccessorReq })}>
                        {['継承者必要', '継承者不要', '一定期間後合祀'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                </div>
            </div>
        </div>
    );

    // 4b. CONTENT DETAIL Tab
    const renderContentDetailTab = () => (
        <div className="space-y-8 max-w-4xl animate-in fade-in">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> 詳細コンテンツ</h3>

            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-700">キャッチコピー <span className="text-red-500">*</span></label>
                    <button type="button" onClick={() => generateAI('catchphrase')} disabled={aiLoading['catchphrase']} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold shadow hover:shadow-md transition-all disabled:opacity-60">
                        {aiLoading['catchphrase'] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI生成
                    </button>
                </div>
                <input className="w-full border p-3 rounded-lg font-bold text-lg" placeholder="例: 東京タワーを望む、都心の安らぎの聖地" value={temple.catchphrase || ''} onChange={e => setTemple({ ...temple, catchphrase: e.target.value })} />
                <div className="flex justify-end"><span className={`text-xs font-bold ${(temple.catchphrase || '').length > 30 ? 'text-red-500' : 'text-gray-400'}`}>{(temple.catchphrase || '').length} / 30文字</span></div>
                {catchphraseCandidates.length > 0 && (
                    <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-violet-700 mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3" /> AI生成候補（クリックで選択）</p>
                        <div className="space-y-2">{catchphraseCandidates.map((c, i) => (<button key={i} type="button" onClick={() => { setTemple({ ...temple, catchphrase: c }); setCatchphraseCandidates([]); }} className="w-full text-left px-3 py-2 bg-white border border-violet-200 rounded-lg text-sm font-medium hover:bg-violet-50 hover:border-violet-400 transition-colors">{c}</button>))}</div>
                        <button type="button" onClick={() => setCatchphraseCandidates([])} className="mt-2 text-xs text-gray-400 hover:text-gray-600">閉じる</button>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-700">3つの特徴 <span className="text-red-500">*</span></h4>
                    <button type="button" onClick={() => generateAI('features')} disabled={aiLoading['features']} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold shadow hover:shadow-md transition-all disabled:opacity-60">
                        {aiLoading['features'] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI一括生成
                    </button>
                </div>
                {[0, 1, 2].map(i => (
                    <div key={i} className="border rounded-xl p-4 bg-gray-50">
                        <div className="text-xs font-bold text-gray-500 mb-3">特徴 {i + 1}</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div><label className="text-xs text-gray-500 block mb-1">アイコン</label><select className="w-full border rounded-lg p-2 text-sm" value={temple.keyFeatures?.[i]?.icon} onChange={e => { const next = [...(temple.keyFeatures || [])]; if (!next[i]) next[i] = { title: '', text: '', icon: '駅近' }; next[i].icon = e.target.value as any; setTemple({ ...temple, keyFeatures: next }); }}>{CONTENT_ICONS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                            <div><label className="text-xs text-gray-500 block mb-1">タイトル（15文字以内）</label><input className="w-full border rounded-lg p-2 text-sm" value={temple.keyFeatures?.[i]?.title || ''} onChange={e => { const next = [...(temple.keyFeatures || [])]; if (!next[i]) next[i] = { title: '', text: '', icon: '駅近' }; next[i].title = e.target.value; setTemple({ ...temple, keyFeatures: next }); }} /></div>
                            <div><label className="text-xs text-gray-500 block mb-1">説明（50文字以内）</label><textarea className="w-full border rounded-lg p-2 text-sm h-16 resize-none" value={temple.keyFeatures?.[i]?.text || ''} onChange={e => { const next = [...(temple.keyFeatures || [])]; if (!next[i]) next[i] = { title: '', text: '', icon: '駅近' }; next[i].text = e.target.value; setTemple({ ...temple, keyFeatures: next }); }} /></div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-bold text-gray-700">全体説明（Overview）</label>
                    <button type="button" onClick={() => generateAI('overview')} disabled={aiLoading['overview']} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-xs font-bold shadow hover:shadow-md transition-all disabled:opacity-60">
                        {aiLoading['overview'] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />} AI生成
                    </button>
                </div>
                <textarea className="w-full border h-40 rounded-lg p-3 leading-relaxed" value={temple.overview} onChange={e => setTemple({ ...temple, overview: e.target.value })} />
                <div className="flex justify-end mt-1"><span className={`text-xs font-bold ${(temple.overview || '').length > 300 ? 'text-amber-500' : 'text-gray-400'}`}>{(temple.overview || '').length}文字</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">おすすめな人</label>
                    <div className="space-y-2">
                        {(temple.suitableFor || ['', '', '']).map((v, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <span className="text-gray-400 text-sm shrink-0">・</span>
                                <input className="flex-1 border rounded-lg p-2 text-sm" value={v} onChange={e => { const next = [...(temple.suitableFor || [])]; next[i] = e.target.value; setTemple({ ...temple, suitableFor: next }); }} />
                                {i >= 3 && <button type="button" onClick={() => setTemple({ ...temple, suitableFor: (temple.suitableFor || []).filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
                            </div>
                        ))}
                        <button type="button" onClick={() => setTemple({ ...temple, suitableFor: [...(temple.suitableFor || []), ''] })} className="text-xs text-primary font-bold flex items-center gap-1 mt-1 hover:underline"><Plus className="w-3 h-3" /> 追加</button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">注意点</label>
                    <div className="space-y-2">
                        {(temple.notesPoints || ['', '', '']).map((v, i) => (
                            <div key={i} className="flex gap-2 items-center">
                                <span className="text-gray-400 text-sm shrink-0">・</span>
                                <input className="flex-1 border rounded-lg p-2 text-sm" value={v} onChange={e => { const next = [...(temple.notesPoints || [])]; next[i] = e.target.value; setTemple({ ...temple, notesPoints: next }); }} />
                                {i >= 3 && <button type="button" onClick={() => setTemple({ ...temple, notesPoints: (temple.notesPoints || []).filter((_, idx) => idx !== i) })} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>}
                            </div>
                        ))}
                        <button type="button" onClick={() => setTemple({ ...temple, notesPoints: [...(temple.notesPoints || []), ''] })} className="text-xs text-primary font-bold flex items-center gap-1 mt-1 hover:underline"><Plus className="w-3 h-3" /> 追加</button>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-bold border-b pb-2 mb-3">アピールタグ</h4>
                <div className="flex flex-wrap gap-2">{APPEAL_TAGS.map(t => (<button key={t} type="button" onClick={() => setTemple({ ...temple, tags: temple.tags?.includes(t) ? temple.tags.filter(x => x !== t) : [...(temple.tags || []), t] })} className={`px-3 py-1.5 rounded-full border text-xs font-bold transition-colors ${temple.tags?.includes(t) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>{t}</button>))}</div>
            </div>
        </div>
    );

    // 5. PLANS & PRICE SOURCE
    const renderPlanTab = () => (
        <div className="space-y-8 max-w-4xl animate-in fade-in">
            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><DollarSign className="w-5 h-5" /> 区画プラン管理</h3>

            {/* Note: Price Range Inputs are completely removed as per requirement */}

            <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold text-lg">販売区画プラン (全{plans.length}件)</h3>
                    <Button onClick={() => {
                        setEditingPlan({
                            templeId: temple.id,
                            order: plans.length + 1,
                            images: [], // Default empty
                            category: 'generalGrave', // Default
                            availability: 'available',
                            periodType: 'perpetual'
                        });
                        setPlanModalTab('basic');
                        setIsPlanModalOpen(true);
                    }}>
                        <Plus className="w-4 h-4 mr-1" /> 新規区画登録
                    </Button>
                </div>

                <div className="space-y-4">
                    {/* Simplified List - No Category Grouping Headers needed if we only have one category mostly, but keeping iteration for safety */}
                    {plans.length === 0 ? (
                        <div className="text-center text-gray-400 py-12 border-2 border-dashed rounded-xl bg-gray-50">区画が登録されていません。<br />「新規区画登録」ボタンから作成してください。</div>
                    ) : (
                        <div className="grid gap-4">
                            {plans.map(plan => (
                                <div key={plan.id} className="flex items-center gap-4 bg-white p-4 border rounded shadow-sm hover:shadow transition-shadow">
                                    <GripVertical className="text-gray-300 w-5 h-5 cursor-move" />
                                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden shrink-0 flex items-center justify-center">
                                        <span className="text-xs text-gray-400 font-bold">Plan</span>
                                    </div>

                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded ${plan.availability === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {PLAN_AVAILABILITY_LABELS[plan.availability]}
                                                </span>
                                                <span className="font-bold text-lg">{plan.name}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600 flex flex-col justify-center">
                                            <div className="flex gap-4">
                                                <span className="font-bold text-primary">¥ {plan.price.toLocaleString()}</span>
                                                <span className="text-gray-400">|</span>
                                                <span>管理費: {plan.managementFee ? `¥${plan.managementFee.toLocaleString()}` : 'なし'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => { setEditingPlan(plan); setIsPlanModalOpen(true); }}>編集</Button>
                                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => { 
                                            if (confirm("削除しますか？")) { 
                                                fetch(`/api/plans/${plan.id}`, { method: 'DELETE' })
                                                    .then(res => {
                                                        if (!res.ok) throw new Error("Failed to delete plan");
                                                        // Re-fetch plans
                                                        return fetch(`/api/plans?templeId=${temple.id}`);
                                                    })
                                                    .then(res => res.json())
                                                    .then(data => setPlans(data))
                                                    .catch(err => alert("削除に失敗しました"));
                                            } 
                                        }}>削除</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderCalendarTab = () => {
        const cal = temple.calendar;
        const updateCal = (updates: Partial<typeof cal>) => setTemple({ ...temple, calendar: { ...cal, ...updates } });
        return (
            <div className="space-y-12 max-w-4xl animate-in fade-in">
                <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><CalIcon className="w-5 h-5" /> 予約カレンダー設定</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200"><label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"> <Bell className="w-4 h-4" /> 予約受付ステータス</label><select className={`w-full border p-3 rounded-lg font-bold ${cal.bookingStatus === 'open' ? 'bg-green-50 text-green-700 border-green-200' : cal.bookingStatus === 'closed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700'}`} value={cal.bookingStatus} onChange={e => updateCal({ bookingStatus: e.target.value as BookingStatus })}><option value="open">受付中 (Open)</option><option value="paused">一時停止 (Paused)</option><option value="preparing">準備中 (Preparing)</option><option value="closed">受付終了 (Closed)</option></select></div>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full flex flex-col"><label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"> <Settings className="w-4 h-4" /> 予約受付チャネル</label><div className="flex-1 flex gap-4 w-full"><label className="flex-1 flex items-center justify-center gap-3 cursor-pointer bg-white px-4 py-2 border-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm h-full"><input type="checkbox" checked={cal.bookingChannels.includes('form')} onChange={e => updateCal({ bookingChannels: e.target.checked ? [...cal.bookingChannels, 'form'] : cal.bookingChannels.filter(c => c !== 'form') })} className="w-5 h-5 text-primary rounded border-gray-300 accent-primary" /><span className="font-bold text-sm text-gray-800 whitespace-nowrap">Webフォーム</span></label><label className="flex-1 flex items-center justify-center gap-3 cursor-pointer bg-white px-4 py-2 border-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm h-full"><input type="checkbox" checked={cal.bookingChannels.includes('phone')} onChange={e => updateCal({ bookingChannels: e.target.checked ? [...cal.bookingChannels, 'phone'] : cal.bookingChannels.filter(c => c !== 'phone') })} className="w-5 h-5 text-primary rounded border-gray-300 accent-primary" /><span className="font-bold text-sm text-gray-800 whitespace-nowrap">電話</span></label></div></div>
                </div>
                {/* ... (Weekdays, Time, etc - simplified for brevity but included) ... */}
                <div className="space-y-6"> <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><Clock className="w-5 h-5" /> 受付日時設定</h3> <div><label className="block text-sm font-bold text-gray-700 mb-2">受付可能な曜日</label><div className="flex gap-2 flex-wrap">{['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (<button key={i} type="button" onClick={() => updateCal({ availableWeekdays: cal.availableWeekdays.includes(i) ? cal.availableWeekdays.filter(x => x !== i) : [...cal.availableWeekdays, i].sort() })} className={`w-12 h-12 rounded-full font-bold flex items-center justify-center transition-colors shadow-sm border ${cal.availableWeekdays.includes(i) ? 'bg-primary text-white border-primary hover:bg-gray-800' : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}`}>{d}</button>))}</div></div> <div><label className="block text-sm font-bold text-gray-700 mb-2">基本受付時間</label><div className="flex items-center gap-4"><input type="time" className="border p-3 rounded-lg text-lg font-bold" value={cal.startTime} onChange={e => updateCal({ startTime: e.target.value })} /><span className="text-gray-400">〜</span><input type="time" className="border p-3 rounded-lg text-lg font-bold" value={cal.endTime} onChange={e => updateCal({ endTime: e.target.value })} /></div></div> </div>
                <div className="space-y-4"><h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><FileText className="w-5 h-5" /> 自動返信メッセージ</h3><textarea className="w-full border p-4 rounded-lg h-32" value={cal.requestMessage} onChange={e => updateCal({ requestMessage: e.target.value })} placeholder="予約リクエストを受け付けました..." /></div>
            </div>
        );
    };

    const renderSEOTab = () => {
        const seo = temple.seo;
        const updateSeo = (updates: Partial<typeof seo>) => setTemple({ ...temple, seo: { ...seo, ...updates } });
        return (
            <div className="space-y-10 max-w-4xl animate-in fade-in">
                <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-5 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-violet-800 flex items-center gap-2"><Sparkles className="w-4 h-4" /> SEO情報をAIで一括生成</p>
                        <p className="text-xs text-violet-600 mt-0.5">施設名・宗派・特徴をもとに、タイトル・説明・キーワードを自動生成します</p>
                    </div>
                    <button type="button" onClick={() => generateAI('seo')} disabled={aiLoading['seo']} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-bold shadow hover:shadow-md transition-all disabled:opacity-60 shrink-0 ml-4">
                        {aiLoading['seo'] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />} AI一括生成
                    </button>
                </div>
                <div className="space-y-6">
                    <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><Search className="w-5 h-5" /> 基本SEO設定</h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">ページタイトル</label>
                            <input className="w-full border p-2.5 rounded-lg" placeholder="未入力時: 施設名やエリアから自動生成" value={seo.title || ''} onChange={e => updateSeo({ title: e.target.value })} />
                            <div className="flex justify-between mt-1"><p className="text-xs text-gray-500">32文字以内推奨</p><span className={`text-xs font-bold ${(seo.title || '').length > 32 ? 'text-red-500' : 'text-gray-400'}`}>{(seo.title || '').length}文字</span></div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">ディスクリプション</label>
                            <textarea className="w-full border p-2.5 rounded-lg h-24" placeholder="未入力時: 施設概要から自動生成" value={seo.description || ''} onChange={e => updateSeo({ description: e.target.value })} />
                            <div className="flex justify-between mt-1"><p className="text-xs text-gray-500">120文字以内推奨</p><span className={`text-xs font-bold ${(seo.description || '').length > 120 ? 'text-red-500' : (seo.description || '').length > 100 ? 'text-amber-500' : 'text-gray-400'}`}>{(seo.description || '').length}文字</span></div>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><Sparkles className="w-5 h-5 text-warm-gold" /> AI検索対策（SGE / AI Overview）</h3>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg"><div className="flex items-start gap-2"><HelpCircle className="w-5 h-5 text-yellow-600 mt-0.5" /><div className="text-sm text-yellow-800"><p className="font-bold mb-1">AI要約（Summary）の書き方</p><ol className="list-decimal list-inside space-y-1 ml-2"><li><span className="font-bold">結論</span>: 施設の最大の特徴</li><li><span className="font-bold">理由</span>: なぜおすすめか</li><li><span className="font-bold">補足</span>: 具体的な設備・プラン</li></ol></div></div></div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">SEO要約 <span className="text-red-500 font-normal text-xs ml-2">※AI検索での引用率に影響</span></label>
                        <textarea className="w-full border p-4 rounded-lg h-40 font-medium leading-relaxed" placeholder="例：〇〇霊園は、△△市にある..." value={seo.summary || ''} onChange={e => updateSeo({ summary: e.target.value })} />
                        <div className="flex justify-between mt-1"><p className="text-xs text-gray-500">目安: 300〜400文字</p><p className={`text-xs font-bold ${(seo.summary || '').length > 400 ? 'text-red-500' : 'text-gray-400'}`}>{(seo.summary || '').length}文字</p></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><Tag className="w-5 h-5" /> キーワード設定</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">主SEOキーワード</label><TagInput tags={seo.primaryKeywords} onChange={tags => updateSeo({ primaryKeywords: tags })} placeholder="例: 東京 永代供養 (Enterで追加)" /><p className="text-xs text-gray-500 mt-1">最も重視するキーワードを3〜5個</p></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">補助SEOキーワード</label><TagInput tags={seo.secondaryKeywords} onChange={tags => updateSeo({ secondaryKeywords: tags })} placeholder="例: ペット可 (Enterで追加)" /><p className="text-xs text-gray-500 mt-1">特徴・設備に関連するキーワード</p></div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><Code className="w-5 h-5" /> テクニカル設定</h3>
                    <div className="grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">構造化データ出力</label><div className="flex items-center gap-3"><button type="button" onClick={() => updateSeo({ structuredDataEnabled: !seo.structuredDataEnabled })} className={`relative w-12 h-6 rounded-full transition-colors ${seo.structuredDataEnabled ? 'bg-primary' : 'bg-gray-300'}`}><span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${seo.structuredDataEnabled ? 'translate-x-6' : ''}`} /></button><span className="font-bold text-sm">{seo.structuredDataEnabled ? '有効' : '無効'}</span></div></div>
                        <div><label className="block text-sm font-bold text-gray-700 mb-2">FAQソース</label><select className="w-full border p-2 rounded bg-white" value={seo.faqSource} onChange={e => updateSeo({ faqSource: e.target.value as any })}><option value="facilityFaq">施設の特徴から生成</option><option value="globalFaq">共通FAQを使用</option><option value="none">出力しない</option></select></div>
                        <div className="md:col-span-2 border-t pt-4"><label className="block text-sm font-bold text-gray-700 mb-2">インデックス制御 (robots)</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="indexControl" checked={seo.indexControl === 'index'} onChange={() => updateSeo({ indexControl: 'index' })} /><span className="font-bold">index（検索結果に表示）</span></label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="indexControl" checked={seo.indexControl === 'noindex'} onChange={() => updateSeo({ indexControl: 'noindex' })} /><span className="font-bold text-red-600">noindex（表示しない）</span></label></div></div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">寺院編集: {temple.name}</h2>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => router.push("/admin/temples")}>キャンセル</Button>
                    <Button onClick={handleSave} disabled={isLoading} className="font-bold min-w-[120px]">
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />} 保存
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex min-h-[600px]">
                <div className="w-56 bg-gray-50 border-r border-gray-100 shrink-0 pt-4">
                    {[
                        { id: 'basic', label: '基本情報', icon: Info },
                        { id: 'access', label: 'アクセス', icon: MapPin },
                        { id: 'attributes', label: '特徴・設備', icon: CheckSquare },
                        { id: 'plans', label: '価格・プラン', icon: DollarSign },
                        { id: 'content', label: 'コンテンツ', icon: FileText },
                        { id: 'images', label: '画像設定', icon: ImageIcon },
                        { id: 'calendar', label: 'カレンダー', icon: CalIcon },
                        { id: 'seo', label: 'SEO設定', icon: Code },
                    ].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-4 font-bold text-sm flex items-center gap-3 transition-colors ${activeTab === tab.id ? 'bg-white text-primary border-l-4 border-primary' : 'text-gray-500 hover:bg-gray-100 border-l-4 border-transparent'}`}>
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 p-8">
                    {activeTab === 'basic' && renderBasicTab()}
                    {activeTab === 'access' && renderAccessTab()}
                    {activeTab === 'attributes' && renderAttributesTab()}
                    {activeTab === 'plans' && renderPlanTab()}
                    {activeTab === 'content' && renderContentTab()}
                    {activeTab === 'calendar' && renderCalendarTab()}
                    {activeTab === 'seo' && renderSEOTab()}
                    {activeTab === 'images' && (
                        <div className="space-y-8 animate-in fade-in max-w-4xl">
                            <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><ImageIcon className="w-5 h-5" /> 画像設定</h3>

                            <div className="space-y-8">
                                <ImageUploader
                                    label="メイン画像 (一覧・詳細ヘッダー)"
                                    value={temple.mainImage}
                                    onChange={(url: string | null) => {
                                        try {
                                            console.log("MainImage onChange called with:", url);
                                            console.log("Current temple state:", temple);
                                            if (!temple) throw new Error("Temple state is null");
                                            setTemple({ ...temple, mainImage: url || "" });
                                        } catch (e) {
                                            console.error("Error updating main image:", e);
                                            alert("エラーが発生しました: " + e);
                                        }
                                    }}
                                    folder={`temples/${temple.id}/main`}
                                />

                                <GalleryUploader
                                    label="ギャラリー画像 (詳細ページ)"
                                    images={temple.galleryImages}
                                    onChange={(urls: string[]) => {
                                        try {
                                            console.log("GalleryImages onChange called with:", urls);
                                            if (!temple) throw new Error("Temple state is null");
                                            setTemple({ ...temple, galleryImages: urls });
                                        } catch (e) {
                                            console.error("Error updating gallery images:", e);
                                            alert("エラーが発生しました: " + e);
                                        }
                                    }}
                                    folder={`temples/${temple.id}/gallery`}
                                />
                            </div>

                            <details className="pt-8 border-t">
                                <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-700 font-bold">高度な設定 (URL直接入力)</summary>
                                <div className="mt-4 space-y-4 p-4 bg-gray-50 rounded border border-gray-100">
                                    <div><label className="block text-sm font-bold text-gray-500 mb-1">メイン画像URL</label><input className="w-full border p-2 rounded text-sm text-gray-600" value={temple.mainImage} onChange={e => setTemple({ ...temple, mainImage: e.target.value })} /></div>
                                    <div><label className="block text-sm font-bold text-gray-500 mb-1">ギャラリーURL (改行区切り)</label><textarea className="w-full border p-2 rounded h-24 text-sm text-gray-600" value={temple.galleryImages.join('\n')} onChange={e => setTemple({ ...temple, galleryImages: e.target.value.split('\n').filter(s => s.trim()) })} /></div>
                                </div>
                            </details>
                        </div>
                    )}
                </div>
            </div>

            {/* Plan Modal (Reused) */}
            {isPlanModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-bold text-xl">区画プラン登録・編集</h3>
                            <button onClick={() => setIsPlanModalOpen(false)}><X className="w-6 h-6 text-gray-400 hover:text-gray-600" /></button>
                        </div>

                        <div className="space-y-6">
                            {/* 1. Name */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">区画プラン名 <span className="text-red-500">*</span></label>
                                <input className="w-full border p-2.5 rounded-lg" placeholder="例: 一般墓地 1.2聖地" value={editingPlan.name || ''} onChange={e => setEditingPlan({ ...editingPlan, name: e.target.value })} />
                            </div>

                            {/* 2 & 3. Price & Mgmt Fee */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">販売価格 (円) <span className="text-red-500">*</span></label>
                                    <input type="number" className="w-full border p-2.5 rounded-lg" value={editingPlan.price || ''} onChange={e => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">年間管理費 (円)</label>
                                    <input type="number" className="w-full border p-2.5 rounded-lg" placeholder="0 or 空欄でなし" value={editingPlan.managementFee || ''} onChange={e => setEditingPlan({ ...editingPlan, managementFee: e.target.value ? Number(e.target.value) : undefined })} />
                                </div>
                            </div>

                            {/* 4 & 5. Burial & Pet */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">埋葬方法 <span className="text-red-500">*</span></label>
                                    <select className="w-full border p-2.5 rounded-lg bg-white" value={editingPlan.burialMethod} onChange={e => setEditingPlan({ ...editingPlan, burialMethod: e.target.value as any })}>
                                        <option value="">選択してください</option>
                                        <option value="individual">個別 (一般墓・個別永代)</option>
                                        <option value="joint">合祀</option>
                                        <option value="other">その他・要確認</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">ペット共葬 <span className="text-red-500">*</span></label>
                                    <select className="w-full border p-2.5 rounded-lg bg-white" value={editingPlan.petAllowed || ''} onChange={e => setEditingPlan({ ...editingPlan, petAllowed: e.target.value as any })}>
                                        <option value="">選択してください</option>
                                        <option value="allowed">可</option>
                                        <option value="conditional">条件付き</option>
                                        <option value="notAllowed">不可</option>
                                        <option value="unknown">不明・要確認</option>
                                    </select>
                                </div>
                            </div>

                            {/* 6. Availability */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">空き状況 <span className="text-red-500">*</span></label>
                                <select className="w-full border p-2.5 rounded-lg bg-white" value={editingPlan.availability} onChange={e => setEditingPlan({ ...editingPlan, availability: e.target.value as any })}>
                                    <option value="">選択してください</option>
                                    {Object.entries(PLAN_AVAILABILITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                                </select>
                            </div>

                            {/* 7. Notes */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">備考 (任意)</label>
                                <textarea className="w-full border p-2.5 rounded-lg h-24" placeholder="区画に関する補足情報など" value={editingPlan.note || ''} onChange={e => setEditingPlan({ ...editingPlan, note: e.target.value })} />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t mt-6">
                            <Button variant="outline" onClick={() => setIsPlanModalOpen(false)}>キャンセル</Button>
                            <Button onClick={handleSavePlan} className="min-w-[120px] font-bold">確定</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
