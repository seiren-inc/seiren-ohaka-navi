"use client";

import Link from "next/link";
import Image from "next/image";
import { PrefectureSelector } from "./components/features/search/PrefectureSelector";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SearchWidget } from "./components/features/search/SearchWidget";
import { OpeningAnimation } from "./components/features/OpeningAnimation";
import { Button } from "./components/ui/Button";
import { ArrowRight, ChevronRight, Phone, MessageSquare } from "lucide-react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";

// ========================
// アニメーション共通設定
// ========================
function useFadeUp(delay = 0): MotionProps {
  const reduce = useReducedMotion();
  if (reduce) {
    return {};
  }
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: {
      duration: 0.28,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  };
}

// 供養のカタチ データ
const BURIAL_TYPES = [
  {
    key: "eitai",
    title: "永代供養墓",
    desc: "継承者がいなくても安心。お寺が管理・供養を続けてくれるお墓です。",
    link: "/choices/eitai-kuyou",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.2" />
        <path d="M24 14v20M16 22h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    key: "jumoku",
    title: "樹木葬",
    desc: "自然に還る、新しい供養のカタチ。墓石の代わりに木や花をシンボルにします。",
    link: "/choices/jumokusou",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <path d="M24 38V26M24 26L16 18M24 26L32 18M18 30L10 22M30 30L38 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: "nokotsu",
    title: "納骨堂",
    desc: "天候に左右されない屋内のお墓。アクセスの良さと管理の手軽さが魅力です。",
    link: "/choices/noukotsudou",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden="true">
        <rect x="10" y="18" width="28" height="22" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 18V14a8 8 0 0116 0v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="24" cy="29" r="3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function Home() {
  const heroFade = useFadeUp(0);
  const heroSearchFade = useFadeUp(0.08);

  return (
    <div className="min-h-screen flex flex-col bg-bg">
      <OpeningAnimation />
      <Navbar />

      <main className="flex-grow">

        {/* ======================== HERO ======================== */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 bg-primary-dark">
          {/* 背景テクスチャ */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,_rgba(30,76,95,0.6)_0%,_rgba(15,46,58,1)_100%)] z-0" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9zdmc+')] opacity-20 z-0" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-[--content-px] py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

              {/* Left: コピー + 検索 */}
              <div>
                <motion.div {...heroFade}>
                  <p className="text-secondary/80 text-xs font-medium tracking-[0.25em] uppercase mb-8">
                    Ohaka Navi — 清蓮
                  </p>
                  <h1 className="font-serif text-white text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.35] tracking-tight mb-7">
                    墓地・永代供養で<br />
                    迷ったら、<br />
                    <span className="text-secondary">専門家に相談。</span>
                  </h1>
                  <p className="text-white/50 text-sm md:text-base leading-[1.8] mb-12 max-w-md">
                    比較も相談も、供養の専門家が中立の立場でご案内します。
                    あなたとご家族にとって最適な選択を一緒に探しましょう。
                  </p>
                </motion.div>

                {/* 検索カード */}
                <motion.div {...heroSearchFade}>
                  <SearchWidget />
                </motion.div>

                {/* サブリンク */}
                <motion.div
                  {...useFadeUp(0.14)}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <Link
                    href="/consult/grave-search"
                    className="inline-flex items-center px-5 py-2.5 bg-white/8 text-white/70 hover:bg-white/14 rounded-full text-sm transition-all border border-white/8"
                  >
                    まずは専門家に相談
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                  <Link
                    href="/consult/grave-closure"
                    className="inline-flex items-center px-5 py-2.5 bg-white/8 text-white/70 hover:bg-white/14 rounded-full text-sm transition-all border border-white/8"
                  >
                    墓じまい・改葬の相談
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </motion.div>
              </div>

              {/* Right: ヒーロー画像 */}
              <div className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] rounded-[--radius-2xl] overflow-hidden border border-white/8 shadow-[--shadow-xl]"
                >
                  <Image
                    src="/hero.png"
                    alt="豪華な納骨堂内観。黄金の仏像とクリスタルシャンデリア"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 0vw, 50vw"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ======================== AREA SEARCH ======================== */}
        <section className="py-[--section-gap] bg-bg">
          <div className="max-w-7xl mx-auto px-[--content-px]">
            <motion.div {...useFadeUp()} className="mb-14 text-center">
              <span className="text-secondary font-medium tracking-[0.2em] text-xs uppercase mb-4 block">
                Area Search
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-primary-dark mb-4">
                地域から霊園・墓地を探す
              </h2>
              <p className="text-text-muted text-sm max-w-lg mx-auto leading-relaxed">
                都道府県から、墓地・永代供養・納骨堂などの納骨先を探せます。
              </p>
            </motion.div>

            <motion.div {...useFadeUp(0.06)}>
              <PrefectureSelector />
            </motion.div>
          </div>
        </section>

        {/* ======================== CONCEPT ======================== */}
        <section id="about" className="py-[--section-gap] bg-surface">
          <div className="max-w-6xl mx-auto px-[--content-px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 items-center">

              {/* 画像 */}
              <motion.div {...useFadeUp()} className="relative aspect-[4/3] rounded-[--radius-xl] overflow-hidden border border-border">
                <Image
                  src="/images/concept_main.jpg"
                  alt="和室で行われる丁寧な供養相談のイメージ"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>

              {/* テキスト */}
              <motion.div {...useFadeUp(0.1)}>
                <span className="text-secondary font-medium tracking-[0.2em] text-xs uppercase mb-6 block">
                  Concept
                </span>
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary-dark mb-8 leading-[1.4]">
                  「売る」ためではなく<br />
                  「納得する」ための<br />
                  お手伝い。
                </h2>
                <p className="text-text-secondary leading-[1.9] mb-10 text-sm md:text-base">
                  お墓選びは、人生でそう何度も経験することではありません。
                  だからこそ、情報過多の現代では「何が良いのかわからない」というお悩みを抱える方が増えています。
                  <br /><br />
                  清蓮は、特定の霊園や寺院に偏らない「中立」な立場を徹底。
                  メリットだけでなく、デメリットもしっかりとお伝えすることで、
                  後悔のない供養選びをサポートします。
                </p>
                <Link href="/about/strength">
                  <Button variant="secondary" className="group active:scale-[0.98] transition-transform">
                    清蓮の強みをもっと見る
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ======================== 供養のカタチ ======================== */}
        <section className="py-[--section-gap] bg-bg">
          <div className="max-w-7xl mx-auto px-[--content-px]">
            <motion.div {...useFadeUp()} className="text-center mb-16">
              <span className="text-secondary font-medium tracking-[0.2em] text-xs uppercase mb-4 block">
                Guide
              </span>
              <h2 className="font-serif text-2xl md:text-3xl text-primary-dark">
                供養のカタチを知る
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {BURIAL_TYPES.map((item, i) => (
                <motion.div key={item.key} {...useFadeUp(i * 0.07)}>
                  <Link href={item.link} className="block h-full group">
                    <div className="h-full bg-white rounded-[--radius-lg] border border-border p-8 lg:p-10 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[--shadow-md] hover:border-primary/20">
                      <div className="text-primary/70 mb-7 transition-colors group-hover:text-primary">
                        {item.icon}
                      </div>
                      <h3 className="font-serif text-xl text-primary-dark mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed flex-grow mb-7">
                        {item.desc}
                      </p>
                      <span className="text-primary/60 text-xs font-medium flex items-center gap-1 group-hover:text-primary group-hover:gap-2 transition-all">
                        詳しく見る <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================== CTA ======================== */}
        <section className="py-[--section-gap-lg] bg-primary-dark relative overflow-hidden">
          {/* 背景装飾 */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,_rgba(30,76,95,0.4)_0%,_transparent_100%)]" />
          <div className="max-w-3xl mx-auto px-[--content-px] text-center relative z-10">
            <motion.div {...useFadeUp()}>
              <span className="text-secondary/70 font-medium tracking-[0.2em] text-xs uppercase mb-6 block">
                Free Consultation
              </span>
              <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-7 leading-[1.4]">
                お墓のことで悩んだら、<br />
                まずは無料相談へ。
              </h2>
              <p className="text-white/40 mb-14 text-sm md:text-base leading-[1.8]">
                「まずは資料だけ」「金額の目安が知りたい」など、<br />
                どんな小さなお悩みでも、専門スタッフが丁寧にお答えします。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* 主CTA：WEB問い合わせ */}
                <Link href="/consult/request-material">
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-white border-0 shadow-[--shadow-md] min-w-[220px] active:scale-[0.98] transition-transform"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WEBから無料相談
                  </Button>
                </Link>
                {/* 従CTA：電話 */}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white/70 hover:bg-white/8 hover:border-white/40 min-w-[220px] active:scale-[0.98] transition-transform"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  電話で相談する
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
