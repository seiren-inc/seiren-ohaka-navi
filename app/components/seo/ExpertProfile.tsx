import { Shield, BookOpen, Phone } from "lucide-react";
import Link from "next/link";

interface ExpertProfileProps {
    /** この記事が監修・確認された日付 */
    reviewedDate?: string;
}

// 監修者情報（曹洞宗 武応山 大昭寺 住職 眞如 和仁 師）
const EXPERT = {
    name: "眞如 和仁",
    nameKana: "しんにょ かずひと",
    title: "住職",
    affiliation: "曹洞宗 武応山 大昭寺",
    avatarChar: "眞",
    description:
        "曹洞宗の僧侶として長年にわたり葬儀・法事・永代供養・納骨の相談に携わる。寺院墓地の運営や離檀・改葬の実務にも精通しており、宗派を問わず仏事全般についての正確な情報提供を行っている。",
} as const;

export function ExpertProfile({ reviewedDate }: ExpertProfileProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": `${EXPERT.name} ${EXPERT.title}`,
        "honorificPrefix": EXPERT.title,
        "affiliation": {
            "@type": "Organization",
            "name": EXPERT.affiliation,
        },
        "knowsAbout": ["葬儀", "納骨", "改葬", "永代供養", "寺院墓地", "離檀"],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        <aside className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 my-12 flex flex-col sm:flex-row gap-6 items-center shadow-sm">
            {/* Avatar */}
            <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                <span className="text-primary font-bold text-xl font-serif">{EXPERT.avatarChar}</span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-1">監修者情報</p>
                <h3 className="text-lg font-bold text-gray-800 mb-0.5">
                    {EXPERT.name}　{EXPERT.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                    {EXPERT.affiliation}
                    {reviewedDate && <span className="ml-3 text-xs text-gray-400">最終確認：{reviewedDate}</span>}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {EXPERT.description}
                </p>
            </div>

            {/* Trust badges */}
            <div className="flex sm:flex-col gap-3 shrink-0">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 font-medium">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <span>現役僧侶による監修</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 font-medium">
                    <BookOpen className="w-4 h-4 text-secondary shrink-0" />
                    <span>葬儀・納骨・改葬に精通</span>
                </div>
                <Link href="/consult" className="flex items-center gap-2 bg-primary text-white rounded-lg px-3 py-2 text-xs font-bold hover:bg-primary-dark transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>無料相談する</span>
                </Link>
            </div>
        </aside>
        </>
    );
}
