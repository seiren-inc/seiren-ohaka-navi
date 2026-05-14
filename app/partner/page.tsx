import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, BarChart3, Users, ShieldCheck, ArrowRight, Building2, FileText, Phone } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ohakanavi.jp";

export const metadata: Metadata = {
    title: "寺院・霊園の掲載・提携募集｜清蓮 お墓探しナビ",
    description: "清蓮への掲載・提携をご希望の寺院・霊園・納骨堂の管理者様へ。月間数千件の供養相談を持つポータルサイトに掲載し、見学・問い合わせを増やしましょう。審査制・掲載無料相談受付中。",
    alternates: { canonical: `${BASE_URL}/partner` },
    openGraph: {
        title: "寺院・霊園の掲載・提携募集｜清蓮",
        description: "中立的な供養相談ポータル「清蓮」への掲載で、供養先を探すご家族と繋がりましょう。",
        url: `${BASE_URL}/partner`,
    },
};

const partnerLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/partner#webpage`,
    "name": "寺院・霊園の掲載・提携募集｜清蓮",
    "description": "清蓮への掲載・提携をご希望の寺院・霊園・納骨堂の管理者様向けページ。",
    "url": `${BASE_URL}/partner`,
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "トップ", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "提携・掲載のご案内", "item": `${BASE_URL}/partner` },
        ],
    },
};

const BENEFITS = [
    {
        icon: Users,
        title: "供養を真剣に探すご家族へ直接リーチ",
        body: "清蓮を訪れるユーザーは、すでに供養先を探している方が中心です。情報収集段階の方から、見学予約を検討している方まで、購買意欲の高い層に施設情報を届けられます。",
    },
    {
        icon: ShieldCheck,
        title: "中立審査で信頼性を担保",
        body: "清蓮は特定施設に偏らない中立的な情報提供を徹底しています。審査を経た施設のみを掲載しているため、ユーザーからの信頼性が高く、問い合わせの質も安定しています。",
    },
    {
        icon: BarChart3,
        title: "掲載後の反響をデータで確認",
        body: "掲載施設には、問い合わせ数・ページ閲覧数などの基本データをご共有します。施設の露出状況を把握しながら、効果的な情報発信にお役立てください。",
    },
];

const CRITERIA = [
    { label: "費用・契約の透明性", detail: "費用体系、解約条件、管理費の内訳を明確に開示いただけること。" },
    { label: "適法な運営", detail: "宗教法人法および墓地埋葬法に基づき適正に運営されていること。" },
    { label: "理念への共感", detail: "特定施設への誘導ではなく、ご相談者の最善を優先する清蓮の方針に同意いただけること。" },
    { label: "情報提供の継続", detail: "掲載情報（空き状況・費用・アクセス）を定期的に更新いただけること。" },
];

const STEPS = [
    { num: "01", title: "お問い合わせ", detail: "下記フォームより、施設の概要と掲載希望の旨をお送りください。" },
    { num: "02", title: "ヒアリング", detail: "担当者より施設の詳細・理念・費用体系についてお伺いします（オンライン可）。" },
    { num: "03", title: "審査", detail: "掲載基準をもとに審査を行います。通常1〜2週間程度です。" },
    { num: "04", title: "掲載開始", detail: "審査通過後、施設ページを作成し、検索・一覧ページに掲載します。" },
];

export default function PartnerPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(partnerLd) }}
            />
            <Navbar />

            <main id="main-content" className="grow">

                {/* ── HERO ── */}
                <section className="relative bg-forest overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
                    <div
                        className="absolute inset-0 opacity-[0.06]"
                        style={{
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px)",
                        }}
                    />
                    <div className="relative max-w-4xl mx-auto px-6 text-center">
                        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white/80 mb-8">
                            <Building2 className="w-3.5 h-3.5" />
                            寺院・霊園・納骨堂 運営者様へ
                        </p>
                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                            清蓮に掲載して、<br />
                            供養先を探すご家族と<br className="md:hidden" />出会いましょう
                        </h1>
                        <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                            清蓮は「売らない・偏らない」中立的な供養相談ポータルです。
                            真剣に供養先を検討しているご家族に、施設の正確な情報を届けます。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/partner/contact"
                                className="inline-flex items-center justify-center gap-2 bg-marine text-white font-bold px-8 py-4 rounded-lg hover:bg-primary-hover transition-colors shadow-lg text-sm"
                            >
                                掲載・提携のお問い合わせ
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="tel:0800-888-8788"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-sm"
                            >
                                <Phone className="w-4 h-4" />
                                電話でまず相談
                            </a>
                        </div>
                    </div>
                </section>

                {/* ── STATS ── */}
                <section className="bg-bg-muted border-b border-border py-12">
                    <div className="max-w-4xl mx-auto px-6">
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
                            {[
                                { value: "3,200+", label: "累計お墓相談件数" },
                                { value: "全国", label: "47都道府県に対応" },
                                { value: "中立", label: "特定施設への誘導なし" },
                            ].map((s) => (
                                <div key={s.label} className="bg-bg-muted px-8 py-10 text-center">
                                    <dd className="font-serif text-4xl font-bold text-forest mb-2">{s.value}</dd>
                                    <dt className="text-xs text-gray-500 tracking-wide">{s.label}</dt>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                {/* ── BENEFITS ── */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Benefits</span>
                            <h2 className="font-serif text-3xl font-bold text-gray-800">清蓮に掲載するメリット</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {BENEFITS.map((b) => (
                                <div key={b.title} className="flex flex-col">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                                        <b.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-gray-800 mb-3 leading-snug">{b.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{b.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CRITERIA ── */}
                <section className="py-20 md:py-28 bg-bg-muted border-y border-border">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Criteria</span>
                            <h2 className="font-serif text-3xl font-bold text-gray-800">掲載基準</h2>
                            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                                清蓮は審査を経た施設のみを掲載しています。<br />
                                ご相談者への誠実な情報提供にご賛同いただける施設を募集しています。
                            </p>
                        </div>
                        <ul className="space-y-4">
                            {CRITERIA.map((c) => (
                                <li key={c.label} className="flex items-start gap-4 bg-white rounded-xl border border-border p-6 shadow-sm">
                                    <CheckCircle className="w-5 h-5 text-marine flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-gray-800 mb-1">{c.label}</p>
                                        <p className="text-sm text-gray-600 leading-relaxed">{c.detail}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className="text-xs text-gray-400 mt-6 text-center">
                            ※審査の結果、掲載をお断りする場合もございます。あらかじめご了承ください。
                        </p>
                    </div>
                </section>

                {/* ── PROCESS ── */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Process</span>
                            <h2 className="font-serif text-3xl font-bold text-gray-800">掲載までの流れ</h2>
                        </div>
                        <ol className="relative border-l-2 border-border ml-5 space-y-10">
                            {STEPS.map((s, i) => (
                                <li key={s.num} className="relative pl-8">
                                    <span className="absolute -left-[22px] flex items-center justify-center w-10 h-10 rounded-full bg-forest text-white font-bold text-xs font-mono">
                                        {s.num}
                                    </span>
                                    <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{s.detail}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="py-20 md:py-28 bg-primary text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-forest/30" />
                    <div className="relative max-w-2xl mx-auto px-6 text-center">
                        <FileText className="w-8 h-8 mx-auto mb-6 opacity-80" />
                        <h2 className="font-serif text-3xl font-bold mb-4">
                            掲載・提携のご相談はこちら
                        </h2>
                        <p className="text-white/85 text-sm leading-relaxed mb-10">
                            本フォームは法人・提携希望専用です。<br />
                            内容を確認の上、担当者より2営業日以内にご連絡します。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/partner/contact"
                                className="inline-flex items-center justify-center gap-2 bg-white text-forest font-bold px-8 py-4 rounded-lg hover:bg-bg-muted transition-colors shadow-lg text-sm"
                            >
                                お問い合わせフォームへ
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <a
                                href="tel:0800-888-8788"
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-sm"
                            >
                                <Phone className="w-4 h-4" />
                                0800-888-8788
                            </a>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
