import Image from "next/image";
import Link from "next/link";
import { PrefectureSelector } from "./components/features/search/PrefectureSelector";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SearchWidget } from "./components/features/search/SearchWidget";
import { OpeningAnimation } from "./components/features/OpeningAnimation";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";
import { TrustMetrics } from "./components/features/TrustMetrics";
import { KaisouFlow } from "./components/features/KaisouFlow";
import { RelatedServices } from "./components/features/RelatedServices";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <OpeningAnimation />
      <Navbar />

      <main className="grow pt-[72px]">
        {/* 1. HERO SECTION & SEARCH */}
        <section
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12 md:py-20 lg:py-24"
        >
          <div className="absolute inset-0 z-0">
            <Image
                src="/images/hero_memorial.png"
                alt="清蓮 お墓探しナビ - 理想の供養を一緒に見つける"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 flex flex-col items-center">
            {/* Catch Copy */}
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="sr-only">清蓮｜お墓探し・永代供養・墓じまいの無料相談</h1>
              <h2 className="font-serif text-[25px] md:text-5xl font-bold text-white leading-tight mb-6 hero-text-shadow">
                お墓探し・墓じまいで迷ったら<br />
                <span className="text-amber-200">清蓮</span>のお墓探しナビ
              </h2>
              <p className="text-white/90 text-[18px] md:text-lg tracking-wide max-w-2xl mx-auto leading-relaxed hero-text-shadow">
                比較も相談も、供養の専門家が中立の立場でご案内します。<br className="hidden sm:block" />
                あなたとご家族にとって、最適な選択を一緒に探しませんか？
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
                <Link href="/consult/grave-search" className="inline-flex items-center px-5 py-2.5 bg-primary/10 text-primary rounded-full text-sm font-bold hover:bg-primary/20 transition-colors">
                  まずは専門家に相談する
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
                <Link href="/kaisou" className="inline-flex items-center px-5 py-2.5 bg-lotus-pink/10 text-lotus-pink rounded-full text-sm font-bold hover:bg-lotus-pink/20 transition-colors">
                  墓じまい・改葬について知る
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 供養のカタチを知る (Moved up to be prominent) */}
        <section className="py-[120px] bg-white">
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
                { title: "永代供養墓", desc: "継承者がいなくても安心。お寺が管理・供養を続けてくれるお墓です。", link: "/choices/eitai-kuyou", color: "text-soft-teal", img: "/images/guide_eitai.png" },
                { title: "樹木葬", desc: "自然に還る、新しい供養のカタチ。墓石の代わりに木や花をシンボルにします。", link: "/choices/jumokusou", color: "text-soft-teal", img: "/images/guide_jumokusou.png" },
                { title: "納骨堂", desc: "天候に左右されない屋内のお墓。アクセスの良さと管理の手軽さが魅力です。", link: "/choices/noukotsudou", color: "text-primary-soft", img: "/images/guide_noukotsu.png" },
              ].map((item, i) => (
                <Link key={i} href={item.link} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl">
                  <Card hoverEffect className="h-full flex flex-col p-0 overflow-hidden group cursor-pointer border-border">
                    <div className="h-48 bg-bg-muted relative overflow-hidden flex items-center justify-center">
                       <Image 
                           src={item.img} 
                           alt={item.title} 
                           fill 
                           className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                           sizes="(max-width: 768px) 100vw, 33vw"
                       />
                       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className={`font-serif text-xl font-bold ${item.color} mb-4 group-hover:text-primary transition-colors`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
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
        <section className="py-[120px] bg-bg-muted">
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
        <section id="about" className="py-[120px] bg-white relative">
          <div className="max-w-[1280px] mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] bg-bg-muted rounded-2xl overflow-hidden shadow-lg border border-border group">
                  <Image 
                      src="/images/concept_support.png" 
                      alt="お客様に寄り添う相談窓口" 
                      fill 
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
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
        <section className="py-[120px] bg-bg-muted border-y border-border">
            <div className="max-w-[1280px] mx-auto px-4">
                <div className="text-center mb-8">
                  <span className="text-lotus-pink font-bold tracking-widest text-xs uppercase mb-2 block">
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
                
                <div className="text-center mt-8">
                    <Link href="/kaisou">
                        <Button variant="primary" className="bg-lotus-pink hover:bg-lotus-pink/90 text-primary font-bold border-none shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            改葬についてさらに詳しく見る
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>

        {/* 6. 関連サービス (New) */}
        <section className="py-[120px] bg-white">
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

        {/* CTA SECTION */}
        <section className="py-[120px] bg-primary text-white relative overflow-hidden">
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
