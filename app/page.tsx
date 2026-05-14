import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Metadata } from "next";
import { PrefectureSelector } from "./components/features/search/PrefectureSelector";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SearchWidget } from "./components/features/search/SearchWidget";
import { OpeningAnimation } from "./components/features/OpeningAnimation";

import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { ArrowRight, ChevronRight, Phone, ChevronDown, Download, FileText, ExternalLink, Building2 } from "lucide-react";
import { KaisouFlow } from "./components/features/KaisouFlow";
import { RelatedServices } from "./components/features/RelatedServices";

export const metadata: Metadata = {
    title: "清蓮（Seiren）| お墓探しナビ - 永代供養・樹木葬・納骨堂の比較",
    description: "墓地、永代供養、樹木葬、納骨堂の検索・比較なら清蓮。専門家が中立な立場で「あなたに合った供養」をご提案。改葬や墓じまいもワンストップサポート。《相談無料》",
    alternates: { canonical: "https://www.ohakanavi.jp" },
    openGraph: {
        url: "https://www.ohakanavi.jp",
        title: "清蓮（Seiren）| お墓探しナビ",
        description: "墓地、永代供養、樹木葬、納骨堂の検索・比較なら清蓮。専門家が中立な立場でご提案。",
    },
};

const HOME_FAQ = [
  {
    q: "お墓探しの相談は本当に無料ですか？",
    a: "はい、完全無料です。電話・Web相談ともに費用は一切かかりません。清蓮は特定の霊園・寺院から紹介料を受け取る形態ではなく、中立的な立場でご相談を承っております。",
  },
  {
    q: "永代供養と一般墓の違いは何ですか？",
    a: "一般墓は家族が継承して管理するお墓です。永代供養は霊園や寺院が継続的に管理・供養を行う形態で、後継ぎがいない方や家族への負担を減らしたい方に選ばれています。費用は永代供養の方が一般的に低く抑えられます。",
  },
  {
    q: "樹木葬と納骨堂はどう選べばいいですか？",
    a: "樹木葬は屋外の自然の中に埋葬する形態で、自然回帰を望む方に人気です。納骨堂は屋内施設のため天候に左右されず、都市部のアクセスが良い場所に多くあります。お参りの頻度・交通手段・費用などを比較してご検討ください。",
  },
  {
    q: "墓じまい（改葬）の費用はどのくらいかかりますか？",
    a: "費用は「現在のお墓の撤去費用（石材店）＋行政手続き費用＋新しい納骨先の費用」の合計です。撤去費用は墓石の大きさによりますが10〜30万円程度、新しい納骨先は永代供養墓であれば5〜150万円が目安です。",
  },
];

const homeFaqLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "mainEntity": HOME_FAQ.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
      })),
    },
    {
      "@type": "WebPage",
      "@id": "https://www.ohakanavi.jp/#webpage",
      "url": "https://www.ohakanavi.jp/",
      "name": "清蓮（Seiren）| お墓探しナビ",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", "details summary dt", "details dd p"],
      },
    },
  ],
};

const TrustMetrics = dynamic(
  () => import("./components/features/TrustMetrics").then((mod) => mod.TrustMetrics),
  {
    loading: () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        {["提携・掲載霊園数", "対応エリア", "累計お墓相談件数"].map((label) => (
          <div
            key={label}
            className="h-[212px] rounded-[12px] border border-gray-100 bg-white shadow-sm"
            aria-hidden="true"
          />
        ))}
      </div>
    ),
  },
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqLd) }} />
      <OpeningAnimation />
      <Navbar />

      <main id="main-content" className="grow pt-section-tablet">
        {/* 1. HERO SECTION & SEARCH */}
        <section
          className="relative min-h-[calc(100svh-32px)] md:min-h-[760px] flex items-center justify-center overflow-hidden pt-20 pb-12 md:pt-32 md:pb-24"
        >
          <div className="absolute inset-0 z-0">
            <Image
                src="/images/hero_memorial.webp"
                alt="清蓮 お墓探しナビ - 理想の供養を一緒に見つける"
                fill
                priority
                className="object-cover"
                sizes="100vw"
                quality={72}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 flex flex-col items-center">
            {/* Catch Copy */}
            <div className="text-center mb-6 md:mb-10 animate-fade-in">
              <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-white/90 backdrop-blur-sm mb-5">
                無料相談・資料請求に対応
              </p>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-4 md:mb-6 hero-text-shadow">
                清蓮のお墓探しナビ
              </h1>
              <p className="text-white/90 text-base md:text-lg tracking-wide max-w-2xl mx-auto leading-relaxed hero-text-shadow">
                墓地・永代供養・樹木葬・納骨堂を、専門スタッフが中立の立場で整理します。<br className="hidden sm:block" />
                比較から見学・資料請求まで、迷いを一つずつ減らします。
              </p>
            </div>

            {/* Search Widget */}
            <div className="w-full animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <SearchWidget />
            </div>

            {/* Area Search Link */}
            <div className="mt-8 text-center animate-fade-in w-full max-w-4xl" style={{ animationDelay: "0.3s" }}>
              <div className="bg-white p-6 rounded-[12px] shadow-sm border border-border">
                <h3 className="text-gray-800 font-bold mb-4 font-serif">地域から探す</h3>
                <PrefectureSelector />
              </div>
            </div>
            
            {/* Consult Guidance */}
            <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <p className="text-white/80 text-sm mb-3 hero-text-shadow">＼ どの供養がいいか迷っている方へ ／</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/consult/grave-search" className="inline-flex items-center px-5 py-2.5 bg-white text-forest rounded-full text-sm font-bold hover:bg-bg-muted transition-colors">
                  まずは専門家に相談する
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="/kaisou" className="inline-flex items-center px-5 py-2.5 bg-white/10 text-white border border-white/30 rounded-full text-sm font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">
                  墓じまい・改葬について知る
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE BANNERS */}
        <section className="bg-bg py-12 md:py-16 border-b border-border">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
              <div>
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">Start Here</span>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-gray-800">目的から探す</h2>
              </div>
              <Link href="/search" className="text-sm text-primary font-bold hover:underline flex items-center gap-1">
                すべて見る <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                {
                  label: "樹木葬を探す",
                  sub: "自然に近い供養を検討したい",
                  href: "/search?memorial=樹木葬",
                },
                {
                  label: "納骨堂を探す",
                  sub: "天候や距離の負担を減らしたい",
                  href: "/search?memorial=納骨堂",
                },
                {
                  label: "継承者不要",
                  sub: "永代供養で安心な選択肢",
                  href: "/choices/eitai-kuyou",
                },
                {
                  label: "墓じまい相談",
                  sub: "遠方のお墓を整理したい",
                  href: "/kaisou",
                },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block bg-white border border-border rounded-lg p-4 md:p-5 hover:shadow-card-hover hover:border-primary/30 transition-all group"
                >
                  <div className="h-1 w-10 rounded-full bg-primary mb-4" />
                  <div className="font-bold text-sm md:text-base text-forest mb-1">{item.label}</div>
                  <div className="text-xs text-gray-500 leading-snug">{item.sub}</div>
                  <div className="mt-3 flex items-center text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">
                    詳しく見る <ChevronRight className="w-3 h-3 ml-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 2. 供養のカタチを知る (Moved up to be prominent) */}

        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                Guide
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-800">
                供養のカタチを知る
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {[
                { title: "永代供養墓", desc: "継承者がいなくても安心。お寺が管理・供養を続けてくれるお墓です。", link: "/choices/eitai-kuyou", color: "text-soft-teal", img: "/images/guide_eitai.webp" },
                { title: "樹木葬", desc: "自然に還る、新しい供養のカタチ。墓石の代わりに木や花をシンボルにします。", link: "/choices/jumokusou", color: "text-soft-teal", img: "/images/guide_jumokusou.webp" },
                { title: "納骨堂", desc: "天候に左右されない屋内のお墓。アクセスの良さと管理の手軽さが魅力です。", link: "/choices/noukotsudou", color: "text-primary-soft", img: "/images/guide_noukotsu.webp" },
              ].map((item, i) => (
                <Link key={i} href={item.link} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg">
                  <Card hoverEffect className="h-full flex flex-col p-0 overflow-hidden group cursor-pointer border-border rounded-lg">
                    <div className="h-48 bg-bg-muted relative overflow-hidden flex items-center justify-center">
                       <Image 
                           src={item.img} 
                           alt={item.title} 
                           fill 
                           className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                           sizes="(max-width: 768px) 100vw, 33vw"
                           quality={60}
                       />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>
                    <div className="p-8 grow flex flex-col">
                      <h3 className={`font-serif text-xl font-bold ${item.color} mb-4 group-hover:text-primary transition-colors`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                        {item.desc}
                      </p>
                      <span className="text-primary text-sm font-bold flex items-center group-hover:text-primary-hover transition-colors mt-auto">
                        詳しく見る <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-12">
                <Link href="/guide" className="text-primary hover:text-primary-hover font-bold text-sm border-b border-primary pb-0.5 transition-colors">
                    供養の知識コラムをもっと読む
                </Link>
            </div>
          </div>
        </section>

        {/* 3. TRUST METRICS (New) */}
        <section className="py-20 md:py-24 bg-bg-muted">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                Trust & Track Record
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-800">
                安心して探せる理由
              </h2>
            </div>
            
            <TrustMetrics />
            
          </div>
        </section>

        {/* 4. CONCEPT SECTION */}
        <section id="about" className="py-20 md:py-24 bg-white relative">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-4/3 bg-bg-muted rounded-lg overflow-hidden shadow-card border border-border group">
                  <Image
                      src="/images/hero-memorial-garden.png"
                      alt="静かな日本の霊園・供養の場"
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      quality={60}
                  />
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                  Concept
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-relaxed">
                  「売る」ためではなく<br />
                  「納得する」ための<br />
                  お手伝い。
                </h2>
                <p className="text-gray-600 leading-loose mb-8 text-sm md:text-base">
                  お墓選びは、人生でそう何度も経験することではありません。
                  だからこそ、情報過多の現代では「何が良いのかわからない」というお悩みを抱える方が増えています。
                  <br /><br />
                  清蓮は、特定の霊園や寺院に偏らない「中立」な立場を徹底。
                  メリットだけでなく、デメリットもしっかりとお伝えすることで、
                  後悔のない供養選びをサポートします。
                </p>
                <Link href="/about/strength">
                  <Button variant="secondary" className="group">
                    清蓮の強みをもっと見る
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 改葬の流れ (New) */}
        <section className="py-20 md:py-24 bg-bg-muted border-y border-border">
            <div className="max-w-[1280px] mx-auto px-4">
                <div className="text-center mb-8">
                  <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                    Grave Closure
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-gray-800 mb-4">
                    近年増えている「お墓じまい」「改葬」
                  </h2>
                  <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                      遠方にあるお墓の管理が難しい、後継ぎがいないといった理由で、お墓を撤去して新しい納骨先へ移す「改葬（かいそう）」を選ぶ方が増えています。
                  </p>
                </div>
                
                <KaisouFlow />

                {/* お墓じまいナビ プロモーションバナー */}
                <div className="mt-12 max-w-3xl mx-auto">
                    <div className="bg-forest rounded-2xl overflow-hidden shadow-xl">
                        {/* ヘッダーバー */}
                        <div className="bg-white/10 px-6 py-3 flex items-center gap-3 border-b border-white/10">
                            <span className="text-white/60 text-xs font-bold tracking-widest uppercase">提携サービス</span>
                            <span className="ml-auto bg-lotus-pink text-white text-xs font-bold px-3 py-1 rounded-full">全国対応</span>
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="mb-6">
                                <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">お墓じまいナビ</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    改葬の実務をまるごとサポートする専門サービス。手続きの流れから書類準備まで、これ一つで解決。
                                </p>
                            </div>

                            {/* 注目機能：改葬申請書DL */}
                            <div className="bg-white rounded-xl p-5 mb-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Download className="w-6 h-6 text-forest" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-bold text-gray-800 text-sm md:text-base">全国の自治体の改葬申請書を無料でダウンロード</span>
                                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded shrink-0">注目機能</span>
                                        </div>
                                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                                            全国の多くの市区町村の「改葬許可申請書」をPDFでその場でダウンロードできます。
                                            役所に足を運ぶ前に書類を準備して、手続きをスムーズに進められます。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* サブ機能 2列 */}
                            <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-4 h-4 text-white/80 shrink-0" />
                                        <span className="font-bold text-white text-sm">わかりやすい流れを全公開</span>
                                    </div>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        お墓じまいの全ステップ・注意点・費用感を詳しく掲載。初めてでも迷わず進められます。
                                    </p>
                                </div>
                                <div className="bg-white/10 rounded-xl p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Building2 className="w-4 h-4 text-white/80 shrink-0" />
                                        <span className="font-bold text-white text-sm">全国の優良石材店ネットワーク</span>
                                    </div>
                                    <p className="text-white/60 text-xs leading-relaxed">
                                        墓石の解体・撤去を依頼できる全国の石材店を紹介。お見積もりは無料です。
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://ohakajimai-navi.jp/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <div className="w-full bg-white text-forest hover:bg-white/90 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer text-sm md:text-base">
                                    お墓じまいナビで書類をDLする・流れを確認する
                                    <ExternalLink className="w-4 h-4 shrink-0" />
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <Link href="/kaisou" className="text-sm text-gray-500 hover:text-primary transition-colors">
                            清蓮のお墓じまい・改葬サポートページを見る →
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. 関連サービス (New) */}
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
                Related Services
              </span>
              <h2 className="font-serif text-3xl font-bold text-gray-800">
                供養・終活の総合支援
              </h2>
              <p className="text-gray-600 text-sm mt-4">
                  お墓探しだけでなく、供養から終活まで、ワンストップでサポートする専門サービスを展開しています。
              </p>
            </div>
            
            <RelatedServices />
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 md:py-24 bg-white border-t border-border">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">FAQ</span>
              <h2 className="font-serif text-3xl font-bold text-gray-800">よくある質問</h2>
            </div>
            <dl className="space-y-3">
              {HOME_FAQ.map((item, i) => (
                <details key={i} className="group border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none bg-bg-muted hover:bg-gray-100 transition-colors">
                    <dt className="flex items-center gap-3 font-medium text-gray-800 text-sm leading-snug">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">Q</span>
                      {item.q}
                    </dt>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <dd className="px-6 py-5 bg-white border-t border-border">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-feather text-white text-xs font-bold flex items-center justify-center">A</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  </dd>
                </details>
              ))}
            </dl>
            <div className="text-center mt-10">
              <Link href="/faq" className="text-primary hover:text-primary-hover font-bold text-sm border-b border-primary pb-0.5 transition-colors">
                すべてのよくある質問を見る <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 md:py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-hover opacity-50" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              お墓のことで悩んだら、<br className="md:hidden" />まずは無料相談へ
            </h2>
            <p className="text-white/90 mb-10 text-sm md:text-base leading-relaxed">
              「まずは資料だけ」「金額の目安が知りたい」「どの供養が合っているかわからない」<br className="hidden md:block"/>
              どんな小さなお悩みでも、専門スタッフが中立的な立場で丁寧にお答えします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0800-888-8788" className="w-full sm:w-auto">
                  <Button size="lg" className="bg-white text-primary hover:bg-bg-muted w-full font-bold shadow-lg h-14">
                    <Phone className="w-5 h-5 mr-2" />
                    電話で無料相談
                  </Button>
              </a>
              <Link href="/consult/request-material" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="border-2 border-white text-white hover:bg-white/10 w-full font-bold h-14">
                  WEBから問い合わせ
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
