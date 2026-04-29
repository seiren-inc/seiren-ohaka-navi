"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

const PATH_LABELS: Record<string, string> = {
    search: "墓地を探す",
    area: "エリアから探す",
    detail: "霊園詳細",
    choices: "供養のカタチ",
    "eitai-kuyou": "永代供養墓",
    jumokusou: "樹木葬",
    noukotsudou: "納骨堂",
    general: "一般墓（墓石）",
    "temoto-kuyou": "手元供養",
    "ikotsu-diamond": "遺骨ダイヤモンド",
    sankotsu: "散骨",
    diagnosis: "供養タイプ診断",
    "grave-closure": "墓じまい",
    what: "墓じまいとは",
    flow: "進め方・流れ",
    cost: "費用・相場",
    consult: "無料相談",
    "grave-search": "お墓探し相談",
    "ikotsu-service": "遺骨サービス相談",
    "request-material": "資料請求",
    kaisou: "改葬・お墓の引っ越し",
    guide: "お墓ガイド",
    "grave-basics": "お墓の基礎知識",
    "flow-after-death": "亡くなった後の流れ",
    about: "清蓮について",
    company: "会社概要",
    strength: "選ばれる理由",
    partner: "掲載・提携について",
    faq: "よくある質問",
    privacy: "プライバシーポリシー",
    terms: "利用規約",
};

// 都道府県リスト（エリアページのセグメントラベル用）
const PREFECTURE_SET = new Set([
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県",
    "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
    "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県",
    "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
]);

function getLabel(seg: string): string | null {
    if (PATH_LABELS[seg]) return PATH_LABELS[seg];
    const decoded = decodeURIComponent(seg);
    if (PREFECTURE_SET.has(decoded)) return decoded;
    // IDっぽいセグメント（英数字20文字超）はスキップ
    if (/^[a-z0-9]{20,}$/i.test(seg)) return null;
    return decoded;
}

export function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    type Crumb = { href: string; label: string; isLast: boolean };
    const crumbs: Crumb[] = [];

    segments.forEach((seg, i) => {
        const label = getLabel(seg);
        if (!label) return; // IDセグメントはスキップ
        const href = "/" + segments.slice(0, i + 1).join("/");
        crumbs.push({ href, label, isLast: i === segments.length - 1 });
    });

    if (crumbs.length === 0) return null;

    // JSON-LD BreadcrumbList
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: "https://ohakanavi.jp/" },
            ...crumbs.map((c, i) => ({
                "@type": "ListItem",
                position: i + 2,
                name: c.label,
                item: `https://ohakanavi.jp${c.href}`,
            })),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <nav aria-label="パンくずリスト" className="flex items-center gap-1.5 text-[13px] text-text-muted flex-wrap">
                <Link href="/" className="flex items-center hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm">
                    <Home className="w-3.5 h-3.5" />
                </Link>
                {crumbs.map((crumb) => (
                    <span key={crumb.href} className="flex items-center gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                        {crumb.isLast ? (
                            <span className="text-text font-medium" aria-current="page">{crumb.label}</span>
                        ) : (
                            <Link href={crumb.href} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm">
                                {crumb.label}
                            </Link>
                        )}
                    </span>
                 ))}
            </nav>
        </>
    );
}
