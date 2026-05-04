export const KUYOU_LINKS = [
    { label: "供養の選択肢一覧", description: "比較トップ・診断で整理", href: "/choices" },
    { label: "永代供養墓", description: "継承不要・お寺が供養を続ける", href: "/choices/eitai-kuyou" },
    { label: "樹木葬", description: "自然に還る、新しい供養のカタチ", href: "/choices/jumokusou" },
    { label: "納骨堂", description: "屋内で管理しやすいお墓", href: "/choices/noukotsudou" },
    { label: "一般墓（墓石）", description: "従来型のお墓を探す", href: "/choices/general" },
    { label: "供養の知識コラム", description: "選び方・費用・手続きを学ぶ", href: "/guide" },
] as const;

export const RELATED_SERVICES = [
    {
        label: "散骨クルーズ",
        description: "海への散骨・自然葬",
        href: "https://www.sankotu-cruise.com/",
        external: true,
    },
    {
        label: "遺骨ラボ",
        description: "粉骨・洗骨の専門機関",
        href: "https://ikotsu-lab.com/",
        external: true,
    },
    {
        label: "お墓じまいナビ",
        description: "墓じまいの専門サポート",
        href: "https://www.ohakajimai-navi.jp/",
        external: true,
    },
] as const;

export function FavoriteIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}
