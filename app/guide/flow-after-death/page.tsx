import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "没後の手続きフロー｜死亡届から納骨まで｜清蓮",
    description: "死亡届の提出から葬儀・相続・納骨まで、没後に必要な主な手続きを時系列でわかりやすく整理しました。",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/flow-after-death" },
};

const phases = [
    {
        period: "亡くなった直後〜7日以内",
        color: "bg-blue-50 border-blue-200",
        headerColor: "bg-blue-100 text-blue-800",
        steps: [
            { title: "死亡診断書の受け取り", desc: "医師から死亡診断書（死体検案書）を受け取ります。原本は複数枚用意しておくと後の手続きに便利です。" },
            { title: "死亡届の提出（7日以内）", desc: "死亡診断書を添えて、死亡地・本籍地・住所地のいずれかの市区町村役所に届け出ます。24時間受け付け可の窓口も多数あります。" },
            { title: "火葬許可証の取得", desc: "死亡届と同時に「火葬許可申請書」を提出し、火葬許可証を取得します。火葬場に持参し、火葬後は埋葬許可証として保管します。" },
            { title: "葬儀・告別式の手配", desc: "葬儀社に連絡し、葬儀の日程・形式（一般葬・家族葬・直葬など）を決定します。" },
        ],
    },
    {
        period: "葬儀後〜49日まで",
        color: "bg-amber-50 border-amber-200",
        headerColor: "bg-amber-100 text-amber-800",
        steps: [
            { title: "遺産・相続財産の把握", desc: "預金通帳・不動産・保険証書・有価証券などの財産と借金（負債）をリストアップします。" },
            { title: "初七日・四十九日法要の準備", desc: "菩提寺や葬儀社と調整して、初七日・四十九日の法要を手配します。" },
            { title: "健康保険・年金の資格喪失届", desc: "健康保険（会社経由または協会けんぽ）および国民年金・厚生年金の資格喪失届を提出します。期限は死亡後14日以内が目安です。" },
            { title: "世帯主変更届", desc: "住民票の世帯主が亡くなった場合は、死亡後14日以内に市区町村に変更届を提出します。" },
        ],
    },
    {
        period: "49日以降〜3ヶ月以内",
        color: "bg-green-50 border-green-200",
        headerColor: "bg-green-100 text-green-800",
        steps: [
            { title: "相続放棄の検討（3ヶ月以内）", desc: "負債が資産を上回る場合、相続放棄が可能です。期限は「相続を知った日から3ヶ月以内」。家庭裁判所に申し立てます。" },
            { title: "遺言書の確認・遺産分割協議", desc: "公正証書遺言・自筆証書遺言を確認します。遺言がない場合は相続人全員で遺産分割協議書を作成します。" },
            { title: "納骨・永代供養の手配", desc: "四十九日の法要に合わせて、お墓・納骨堂・樹木葬などの供養先に納骨します。埋葬許可証（火葬許可証）を持参します。" },
            { title: "各種名義変更・解約手続き", desc: "銀行口座、不動産、自動車、電気・ガス・水道、クレジットカードなどの名義変更または解約を順次進めます。" },
        ],
    },
    {
        period: "10ヶ月以内",
        color: "bg-purple-50 border-purple-200",
        headerColor: "bg-purple-100 text-purple-800",
        steps: [
            { title: "相続税申告（10ヶ月以内）", desc: "遺産の総額が基礎控除（3,000万円＋600万円×法定相続人数）を超える場合は、相続税の申告・納税が必要です。" },
            { title: "準確定申告（4ヶ月以内）", desc: "被相続人が個人事業主または年収2,000万円超の会社員だった場合、死亡後4ヶ月以内に確定申告が必要です。" },
        ],
    },
];

export default function GuideFlowAfterDeathPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />
            <main id="main-content" className="grow pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-4">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>没後の手続きフロー</span>
                    </div>

                    {/* Hero */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-6 leading-tight">
                            没後の手続きフロー<br className="md:hidden" />死亡届から納骨まで
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            大切な方が亡くなられた後、ご遺族には多くの手続きが待っています。
                            ここでは、死亡届の提出から相続・納骨まで、時系列でやるべきことを整理しました。
                        </p>
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                            ※期限があるものは特に注意が必要です。心身ともに負担の多い時期ですが、優先順位をつけて進めましょう。
                        </div>
                    </div>

                    {/* Phases */}
                    <div className="space-y-10">
                        {phases.map((phase, pi) => (
                            <section key={pi} className={`border rounded-2xl overflow-hidden ${phase.color}`}>
                                <div className={`px-6 py-3 font-bold text-sm ${phase.headerColor}`}>
                                    {phase.period}
                                </div>
                                <div className="p-6 space-y-5">
                                    {phase.steps.map((step, si) => (
                                        <div key={si} className="flex gap-4">
                                            <div className="w-7 h-7 rounded-full bg-white border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                {si + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 mb-1">{step.title}</p>
                                                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-14 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold text-primary mb-3">納骨先・供養先を探したい方へ</h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            四十九日に合わせた納骨先選びは、時間的な余裕が少ない場合も多いです。<br />
                            清蓮では無料でご相談をお受けします。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link href="/search">
                                <Button variant="primary" className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                                    お墓・納骨堂を探す
                                </Button>
                            </Link>
                            <Link href="/consult/grave-search">
                                <Button variant="outline" className="w-full sm:w-auto">
                                    無料相談を申し込む
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
