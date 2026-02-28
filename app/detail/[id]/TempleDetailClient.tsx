"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Info, Car, Train, CheckCircle2, AlertTriangle, Sparkles, Building2, Trees, Accessibility, CreditCard, Users, Home, X, Tag, FileText, Dog, Sun, Umbrella } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Temple, Plan, ContentIcon, PlanCategoryType, PlanAvailability, RELIGION_CATEGORIES, BUDDHIST_SECTS, PLAN_CATEGORIES, PLAN_PERIOD_LABELS, BURIAL_METHOD_LABELS, PET_ALLOWED_LABELS, PLAN_AVAILABILITY_LABELS } from "../../../lib/store";
import { ReservationCalendar } from "./components/ReservationCalendar";
import { InquiryModal } from "./components/InquiryModal";

// Icon Map
const ICON_MAP: Record<ContentIcon, React.ComponentType<any>> = {
    '駅近': Train, '個室': Home, '屋内': Building2, 'バリアフリー': Accessibility, '管理不要': Users, '継承者不要': Users, '宗教不問': Users, 'カード参拝': CreditCard, '駐車場': Car, '自然': Trees, 'ペット可': Dog, '費用抑えめ': CreditCard, '人気': Sparkles, '新しい施設': Building2, '歴史ある寺院': Building2, '相談可': Info
};

function Gallery({ images, mainImage }: { images: string[], mainImage: string }) {
    const [selected, setSelected] = useState(mainImage);
    const displayImages = [mainImage, ...images].filter(Boolean);

    if (displayImages.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] mb-8">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-lg group bg-gray-100">
                {selected ? <img src={selected} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex items-center justify-center h-full text-gray-400 font-bold">No Image</div>}
            </div>
            <div className="grid grid-cols-2 gap-4 h-full content-start">
                {displayImages.slice(1, 5).map((src, i) => <div key={i} className="relative rounded-xl overflow-hidden cursor-pointer h-48 bg-gray-100" onClick={() => setSelected(src)}><img src={src} className="w-full h-full object-cover hover:opacity-80 transition-opacity" /></div>)}
            </div>
        </div>
    );
}

function SectionTitle({ en, ja }: { en: string; ja: string }) {
    return (
        <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold font-serif text-primary mb-2">{ja}</h2>
            <p className="text-warm-gold tracking-widest text-sm font-bold uppercase">{en}</p>
        </div>
    );
}

const StatusBadge = ({ availability }: { availability: PlanAvailability }) => {
    const colors: Record<PlanAvailability, string> = {
        'available': 'bg-blue-100 text-blue-700',
        'limited': 'bg-orange-100 text-orange-700',
        'unknown': 'bg-gray-100 text-gray-700',
        'none': 'bg-red-100 text-red-700'
    };
    return <span className={`px-2 py-1 rounded text-xs font-bold ${colors[availability]}`}>{PLAN_AVAILABILITY_LABELS[availability]}</span>;
}

interface Props {
    temple: Temple;
    plans: Plan[];
}

export default function TempleDetailClient({ temple, plans }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : pathname;

    // Inquiry State
    const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    // Plan Modal State
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    // Scroll Logic
    const [activeSection, setActiveSection] = useState("about");
    const sectionRefs = {
        about: useRef<HTMLElement>(null),
        plans: useRef<HTMLElement>(null),
        access: useRef<HTMLElement>(null),
        consult: useRef<HTMLElement>(null),
    };

    const sections = [{ id: "about", label: "霊園について" }, { id: "plans", label: "区画・費用" }, { id: "access", label: "アクセス" }, { id: "consult", label: "見学予約" },];
    const scrollTo = (id: string) => {
        setActiveSection(id);
        const ref = sectionRefs[id as keyof typeof sectionRefs];
        if (ref.current) {
            const offset = 80;
            const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    // Group Plans
    // plans.category is PlanCategoryType (key).
    // distinct categories
    const categoriesTyped = Array.from(new Set(plans.map(p => p.category)));

    // Generate Attributes for Display
    const attributes = [
        {
            label: "宗教",
            value: RELIGION_CATEGORIES[temple.religion] || '要確認',
            icon: Users
        },
        {
            label: "宗派",
            value: (temple.religion === 'buddhism' && temple.buddhistSect)
                ? BUDDHIST_SECTS[temple.buddhistSect]
                : (temple.religion === 'other' ? 'その他' : '-'),
            icon: Users
        },
        {
            label: "対応可能宗派",
            value: temple.sects.includes('無宗派') || temple.religion === 'unknown'
                ? '宗教不問 (在来仏教など)'
                : temple.sects.join("・"),
            icon: Users
        },
        { label: "屋内外", value: temple.indoorOutdoor === 'indoor' ? '屋内' : temple.indoorOutdoor === 'outdoor' ? '屋外' : '屋内・屋外両方', icon: temple.indoorOutdoor === 'indoor' ? Building2 : Sun },
        { label: "ペット", value: temple.petAllowed === 'allowed' ? '全区画可' : temple.petAllowed === 'conditional' ? '一部可/要相談' : '不可', icon: Dog },
        { label: "バリアフリー", value: temple.barrierFree ? '対応' : '一部/未対応', icon: Accessibility },
    ];

    return (
        <main className="min-h-screen bg-gray-50 pb-32">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-400 flex items-center gap-2">
                <Link href="/" className="hover:underline">TOP</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/search" className="hover:underline">検索結果</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-gray-600 font-bold">{temple.name}</span>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="mb-8 relative">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {temple.status === 'public' ? <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">受付中</span> : <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded">{temple.status}</span>}
                        <span className="bg-primary text-white text-xs px-2 py-1 rounded">{temple.type}</span>
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">{RELIGION_CATEGORIES[temple.religion] || '要確認'}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3 font-serif">{temple.name}</h1>
                    <div className="text-lg md:text-xl font-bold text-warm-gold mb-4">{temple.catchphrase}</div>

                    {/* Basic Info Row */}
                    <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-600 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {temple.prefecture}{temple.cityName}{temple.addressLine}</p>
                        {temple.nearestStations.length > 0 && <p className="flex items-center gap-2"><Train className="w-4 h-4 text-primary" /> {temple.nearestStations[0].name}駅 徒歩{temple.nearestStations[0].walkMinutes}分</p>}
                    </div>

                    <div className="flex flex-wrap gap-2">{temple.tags?.map(tag => <span key={tag} className="border border-blue-200 bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full">#{tag}</span>)}</div>
                </div>

                <Gallery images={temple.galleryImages} mainImage={temple.mainImage} />

                {/* AI Summary */}
                {temple.aiSummary && (
                    <div className="bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-6 rounded-xl mb-12 shadow-sm">
                        <div className="flex items-center gap-2 mb-3 text-primary font-bold"><Sparkles className="w-5 h-5 text-warm-gold" /><span>AI要約</span></div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">{temple.aiSummary}</p>
                    </div>
                )}

                {/* Sticky Nav */}
                <div className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-sm border-b border-gray-100 mb-12 -mx-4 px-4 md:mx-0 md:px-0 md:rounded-xl">
                    <div className="flex justify-center gap-1 md:gap-8 overflow-x-auto no-scrollbar">
                        {sections.map(sec => (
                            <button key={sec.id} onClick={() => scrollTo(sec.id)} className={`py-4 px-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeSection === sec.id ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"}`}>{sec.label}</button>
                        ))}
                    </div>
                </div>

                {/* About Section */}
                <section ref={sectionRefs.about} className="mb-20 scroll-mt-24">
                    <SectionTitle en="ABOUT" ja="当霊園の特徴" />

                    {/* Attributes Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {attributes.map((attr, i) => (
                            <div key={i} className="bg-white p-4 rounded-lg border border-gray-100 flex flex-col items-center text-center">
                                <attr.icon className="w-6 h-6 text-primary mb-2 opacity-50" />
                                <span className="text-xs text-gray-400 font-bold mb-1">{attr.label}</span>
                                <span className="text-sm font-bold text-gray-800">{attr.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {temple.keyFeatures?.map((feature, i) => { const Icon = ICON_MAP[feature.icon] || Info; return (<div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"><div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-primary mb-4"><Icon className="w-6 h-6" /></div><h3 className="font-bold text-lg mb-2 text-primary">{feature.title}</h3><p className="text-gray-600 text-sm leading-relaxed">{feature.text}</p></div>); })}
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">
                            <div><h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center before:content-[''] before:w-1 before:h-6 before:bg-warm-gold before:mr-3">施設のご案内</h3><p className="text-gray-600 leading-loose text-justify whitespace-pre-wrap">{temple.overview}</p></div>
                            <div className="bg-green-50 p-6 rounded-xl border border-green-100"><h4 className="font-bold text-green-800 mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> こんな方におすすめ</h4><ul className="space-y-2">{temple.suitableFor?.filter(Boolean).map((item, i) => <li key={i} className="flex items-start gap-2 text-sm text-green-900 font-bold"><span className="text-green-500">✔</span> {item}</li>)}</ul></div>
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200"><h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-gray-400" /> 注意点・確認ポイント</h4><ul className="list-disc list-inside space-y-2 text-sm text-gray-600">{temple.notesPoints?.filter(Boolean).map((item, i) => <li key={i}>{item}</li>)}</ul></div>
                        </div>
                    </div>
                </section>

                {/* Plans Section */}
                <section ref={sectionRefs.plans} className="mb-20 scroll-mt-24">
                    <SectionTitle en="PLANS" ja="区画・費用" />
                    {plans.length === 0 ? <p className="text-center text-gray-500">現在ご案内できるプランの詳細はお問い合わせください。</p> : (
                        <div className="space-y-8">
                            {categoriesTyped.map(catKey => {
                                const catPlans = plans.filter(p => p.category === catKey);
                                const catLabel = PLAN_CATEGORIES[catKey];
                                return (
                                    <div key={catKey} className="space-y-4">
                                        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2 border-b-2 border-primary/10 pb-2">
                                            <Tag className="w-5 h-5 text-primary" /> {catLabel} <span className="text-sm text-gray-400 font-normal">({catPlans.length}件)</span>
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {catPlans.map(plan => (
                                                <div key={plan.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer overflow-hidden group" onClick={() => setSelectedPlan(plan)}>
                                                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                                                        {plan.images && plan.images[0] ? <img src={plan.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>}
                                                        <div className="absolute top-2 right-2"><StatusBadge availability={plan.availability} /></div>
                                                    </div>
                                                    <div className="p-5">
                                                        <h4 className="font-bold text-lg mb-1 leading-snug">{plan.name}</h4>
                                                        {plan.subDescription && <p className="text-xs text-gray-500 mb-3 line-clamp-1">{plan.subDescription}</p>}
                                                        <div className="flex items-baseline gap-2 text-primary mb-4"><span className="text-2xl font-bold">¥{plan.price.toLocaleString()}</span>{plan.priceNote && <span className="text-xs text-gray-400">({plan.priceNote})</span>}</div>
                                                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg mb-4">
                                                            <div className="flex justify-between border-b border-gray-200 pb-1"><span>埋葬</span><b>{plan.burialMethod ? BURIAL_METHOD_LABELS[plan.burialMethod] : '-'}</b></div>
                                                            <div className="flex justify-between border-b border-gray-200 pb-1"><span>期間</span><b>{PLAN_PERIOD_LABELS[plan.periodType]} {plan.periodType === 'years' && plan.periodYears ? `(${plan.periodYears}年)` : ''}</b></div>
                                                            <div className="flex justify-between"><span>人数</span><b>{plan.capacity || '-'}</b></div>
                                                            <div className="flex justify-between"><span>ペット</span><b>{plan.petAllowed ? PET_ALLOWED_LABELS[plan.petAllowed] : '-'}</b></div>
                                                        </div>
                                                        <div className="text-center font-bold text-primary text-sm flex items-center justify-center gap-1 group-hover:underline">詳細を見る <ChevronRight className="w-4 h-4" /></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Access Section */}
                <section ref={sectionRefs.access} className="mb-20 scroll-mt-24">
                    <SectionTitle en="ACCESS" ja="交通アクセス" />
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div><h3 className="font-bold text-lg mb-2 flex items-center gap-2"><MapPin className="text-primary" /> 住所</h3><p className="text-gray-600 pl-8">{temple.prefecture}{temple.cityName}{temple.addressLine}</p></div>
                                <div>
                                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Train className="text-primary" /> 最寄駅・アクセス</h3>
                                    <div className="pl-8 space-y-2">
                                        {temple.nearestStations.length > 0 ? (
                                            <ul className="list-disc list-inside text-gray-600">
                                                {temple.nearestStations.map((st, i) => (
                                                    <li key={i}>{st.line} <b>{st.name}駅</b> から徒歩{st.walkMinutes}分</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-600">-</p>
                                        )}
                                        {temple.access && <p className="text-sm text-gray-500 mt-2 border-t pt-2">{temple.access}</p>}
                                    </div>
                                </div>
                                <div><h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Car className="text-primary" /> 駐車場について</h3><p className="text-gray-600 pl-8">{temple.parking}</p></div>
                            </div>

                            {/* Map Placeholder - In real app, Google Maps Embed here */}
                            <div className="bg-gray-100 rounded-lg min-h-[300px] flex flex-col items-center justify-center text-gray-400">
                                <MapPin className="w-12 h-12 mb-2 opacity-30" />
                                <span className="text-sm font-bold">Map Loading...</span>
                                <span className="text-xs mt-1">Lat: {temple.lat}, Lng: {temple.lng}</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section ref={sectionRefs.consult} className="mb-20 scroll-mt-24">
                    <SectionTitle en="RESERVATION" ja="見学予約・お問い合わせ" />
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        <div className="grid md:grid-cols-5">
                            <div className="md:col-span-2 bg-primary text-white p-8 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold mb-4">お急ぎの方はお電話で</h3>
                                <p className="text-white/80 text-sm mb-6">受付時間: {temple.officeHours}<br />定休日: {temple.calendar?.availableWeekdays?.length === 7 ? 'なし' : 'あり'}</p>
                                <a href={`tel:${temple.phone}`} className="bg-white text-primary text-center py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 mb-4"><Phone className="fill-current w-5 h-5" /> {temple.phone}</a>
                                <div className="text-center relative">
                                    <span className="text-xs text-white/60 bg-primary px-2 z-10 relative">または</span>
                                    <hr className="absolute top-1/2 w-full border-white/20" />
                                </div>
                                <Button
                                    className="mt-4 w-full border-2 border-white text-white hover:bg-white hover:text-primary transition-colors font-bold h-14"
                                    onClick={() => router.push(`/consult/request-material?templeId=${temple.id}&templeName=${encodeURIComponent(temple.name)}&ref=detail&refUrl=${encodeURIComponent(currentUrl || '')}`)}
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    資料請求のみ（見学なし）
                                </Button>
                            </div>
                            <div className="md:col-span-3 p-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><Info className="text-warm-gold" />ご希望の日時を選択してください</h3>
                                <ReservationCalendar
                                    temple={temple}
                                    onSelectDate={(date) => {
                                        setSelectedDate(date);
                                        setIsInquiryModalOpen(true);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-40 flex gap-2 safe-area-pb">
                <a href={`tel:${temple.phone}`} className="flex-1 bg-gray-100 text-gray-800 font-bold rounded-lg flex flex-col items-center justify-center text-xs py-2"><Phone className="w-4 h-4 mb-1" /> 電話</a>
                <button onClick={() => { setSelectedDate(null); setIsInquiryModalOpen(true); }} className="flex-[2] bg-primary text-white font-bold rounded-lg py-2">資料請求・見学予約</button>
            </div>

            <InquiryModal isOpen={isInquiryModalOpen} onClose={() => setIsInquiryModalOpen(false)} temple={temple} defaultDate={selectedDate} />

            {selectedPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedPlan(null)}>
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-start p-6 border-b bg-gray-50">
                            <div><span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">{PLAN_CATEGORIES[selectedPlan.category]}</span><h3 className="text-2xl font-bold text-gray-900">{selectedPlan.name}</h3>{selectedPlan.subDescription && <p className="text-gray-500 text-sm mt-1">{selectedPlan.subDescription}</p>}</div>
                            <button onClick={() => setSelectedPlan(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors"><X className="w-6 h-6 text-gray-500" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="grid md:grid-cols-2 gap-8 mb-8">
                                <div className="space-y-4">
                                    <div className="bg-gray-100 rounded-xl overflow-hidden h-64 border border-gray-200">{selectedPlan.images && selectedPlan.images[0] ? <img src={selectedPlan.images[0]} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-400">No Image</div>}</div>
                                    {selectedPlan.images && selectedPlan.images.length > 1 && (<div className="grid grid-cols-4 gap-2">{selectedPlan.images.map((img, i) => <img key={i} src={img} className="h-16 w-full object-cover rounded border" />)}</div>)}
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                        <div className="flex items-center gap-2 mb-2"><span className="text-sm font-bold text-gray-600">販売価格</span><StatusBadge availability={selectedPlan.availability} /></div>
                                        <div className="flex items-end gap-1 text-primary"><span className="text-3xl font-bold">¥{selectedPlan.price.toLocaleString()}</span><span className="text-sm font-bold mb-1 opacity-70">〜</span></div>
                                        <div className="mt-4 pt-4 border-t border-blue-200 flex justify-between items-center text-sm font-bold text-gray-700"><span>年間管理費</span><span>{selectedPlan.managementFee ? `¥${selectedPlan.managementFee.toLocaleString()}` : "なし"}</span></div>
                                    </div>
                                    <div className="text-sm text-gray-600 space-y-2"><p><b className="text-gray-800">参拝形式:</b> {selectedPlan.burialMethod ? BURIAL_METHOD_LABELS[selectedPlan.burialMethod] : '不明'}</p><p><b className="text-gray-800">屋内外:</b> {selectedPlan.burialMethod || '-'}</p></div>
                                </div>
                            </div>
                            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 border-l-4 border-primary pl-3">詳細スペック</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8 text-sm border-t border-b py-6 mb-8">
                                <div><div className="text-gray-400 text-xs mb-1">収容人数</div><div className="font-bold">{selectedPlan.capacity || '-'}</div></div>
                                <div><div className="text-gray-400 text-xs mb-1">埋葬方法</div><div className="font-bold">{selectedPlan.burialMethod ? BURIAL_METHOD_LABELS[selectedPlan.burialMethod] : '-'}</div></div>
                                <div><div className="text-gray-400 text-xs mb-1">使用期間</div><div className="font-bold">{PLAN_PERIOD_LABELS[selectedPlan.periodType]} {selectedPlan.periodType === 'years' && selectedPlan.periodYears ? `(${selectedPlan.periodYears}年)` : ''}</div></div>
                                <div><div className="text-gray-400 text-xs mb-1">ペット共葬</div><div className="font-bold">{selectedPlan.petAllowed ? PET_ALLOWED_LABELS[selectedPlan.petAllowed] : '-'}</div></div>
                                <div><div className="text-gray-400 text-xs mb-1">備考</div><div className="font-bold">{selectedPlan.note || '-'}</div></div>
                            </div>
                        </div>
                        <div className="bg-white border-t p-4 flex gap-4 items-center justify-between">
                            <div className="hidden md:block"><div className="text-xs font-bold text-gray-400">お電話でのご相談</div><div className="text-xl font-bold text-primary font-serif">{temple.phone}</div></div>
                            <div className="flex gap-3 flex-1 md:flex-none">
                                <Button variant="outline" className="flex-1 md:w-40" onClick={() => router.push(`/consult/request-material?templeId=${temple.id}&templeName=${encodeURIComponent(temple.name)}&planId=${selectedPlan.id}&planName=${encodeURIComponent(selectedPlan.name)}&ref=plan_modal&refUrl=${encodeURIComponent(currentUrl || '')}`)}><FileText className="w-4 h-4 mr-2" /> 資料請求</Button>
                                <Button className="flex-1 md:w-56 bg-primary text-white hover:bg-gray-800" onClick={() => { setSelectedPlan(null); scrollTo('consult'); setIsInquiryModalOpen(true); }}>見学予約・相談する</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
