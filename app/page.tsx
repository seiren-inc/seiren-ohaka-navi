import Link from "next/link";
import Image from "next/image";
import { PrefectureSelector } from "./components/features/search/PrefectureSelector";

import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { SearchWidget } from "./components/features/search/SearchWidget";
import { OpeningAnimation } from "./components/features/OpeningAnimation";
import { Button } from "./components/ui/Button";
import { Card } from "./components/ui/Card";
import { ArrowRight, ChevronRight, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <OpeningAnimation />
      <Navbar />

      <main className="flex-grow">
        {/* HERO SECTION - Image on Top, CTA Below */}
        <section className="relative bg-white pt-20">
          <div className="w-full">
            {/* Hero Image - Full Width */}
            <div className="w-full bg-white">
              <div className="max-w-7xl mx-auto">
                <Image
                  src="/hero-consultant-v2.png"
                  alt="清蓮の供養コンサルタント"
                  width={1280}
                  height={720}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* CTA Section Below Image */}
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="max-w-3xl mx-auto text-center">
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <Link href="/consult/request-material" className="sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto px-8 bg-primary hover:bg-primary-dark text-white font-bold">
                      無料相談する（WEB相談）
                    </Button>
                  </Link>
                  <a href="tel:0120-000-000" className="sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold">
                      <Phone className="w-5 h-5 mr-2" />
                      電話で相談する
                    </Button>
                  </a>
                </div>

                <p className="text-sm text-gray-500">
                  📞 0120-000-000（受付時間：9:00〜18:00）
                </p>
              </div>
            </div>
          </div>

          {/* Search Widget Section */}
          <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-8">
                <p className="text-gray-600 text-sm mb-2">＼ お近くの霊園・墓地を探す ／</p>
              </div>
              <SearchWidget />
            </div>
          </div>
        </section>

        {/* AREA SEARCH SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">
                Area Search
              </span>
              <h2 className="font-serif text-3xl font-bold text-primary-dark mb-4">
                地域から霊園・墓地を探す
              </h2>
              <p className="text-gray-600 text-sm">
                都道府県から、墓地・永代供養・納骨堂などの納骨先を探せます。
              </p>
            </div>

            <div className="animate-fade-in">
              <PrefectureSelector />
            </div>
          </div>
        </section>

        {/* CONCEPT SECTION */}
        <section id="about" className="py-24 bg-white relative">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                  {/* Photo Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif">
                    Concept Image
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                  Concept
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-8 leading-relaxed">
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

        {/* FEATURES / KNOWLEDGE GRID */}
        <section className="py-24 bg-white-smoke">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">
                Guide
              </span>
              <h2 className="font-serif text-3xl font-bold text-primary-dark">
                供養のカタチを知る
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "永代供養墓", desc: "継承者がいなくても安心。お寺が管理・供養を続けてくれるお墓です。", link: "/choices/eitai-kuyou" },
                { title: "樹木葬", desc: "自然に還る、新しい供養のカタチ。墓石の代わりに木や花をシンボルにします。", link: "/choices/jumokusou" },
                { title: "納骨堂", desc: "天候に左右されない屋内のお墓。アクセスの良さと管理の手軽さが魅力です。", link: "/choices/noukotsudou" },
              ].map((item, i) => (
                <Link key={i} href={item.link} className="block h-full">
                  <Card hoverEffect className="h-full flex flex-col p-0 overflow-hidden group cursor-pointer">
                    <div className="h-48 bg-gray-300 relative overflow-hidden">
                      {/* Image Placeholder */}
                      <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors" />
                    </div>
                    <div className="p-8 flex-grow">
                      <h3 className="font-serif text-xl font-bold text-primary-dark mb-4 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {item.desc}
                      </p>
                      <span className="text-primary text-xs font-bold flex items-center">
                        詳しく見る <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-6">
              お墓のことで悩んだら、<br className="md:hidden" />まずは無料相談へ
            </h2>
            <p className="text-gray-300 mb-10 text-sm md:text-base">
              「まずは資料だけ」「金額の目安が知りたい」など、<br />
              どんな小さなお悩みでも、専門スタッフが丁寧にお答えします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-white hover:text-primary border border-transparent hover:border-white w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                電話で相談する
              </Button>
              <Link href="/consult/request-material">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto">
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
