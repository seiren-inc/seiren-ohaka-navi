"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Phone, Menu, X, ChevronDown, ExternalLink } from "lucide-react";

import { useFavorites } from "@/lib/hooks/useFavorites";

const KUYOU_LINKS = [
    { label: "永代供養墓", description: "継承不要・お寺が供養を続ける", href: "/choices/eitai-kuyou" },
    { label: "樹木葬", description: "自然に還る、新しい供養のカタチ", href: "/choices/jumokusou" },
    { label: "納骨堂", description: "屋内で管理しやすいお墓", href: "/choices/noukotsudou" },
    { label: "一般墓（墓石）", description: "従来型のお墓を探す", href: "/choices/general" },
    { label: "供養の知識コラム", description: "選び方・費用・手続きを学ぶ", href: "/guide" },
];

const RELATED_SERVICES = [
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
];

// カウント表示用クライアントコンポーネント（Hydrationエラー防止）
function DesktopFavoriteCount() {
    const { count, isInitialized } = useFavorites();
    if (!isInitialized || count === 0) return null;
    return (
        <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ml-1">
            {count}
        </span>
    );
}

function MobileFavoriteCount() {
    const { count, isInitialized } = useFavorites();
    if (!isInitialized || count === 0) return null;
    return (
        <span className="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {count}
        </span>
    );
}

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [kuyouOpen, setKuyouOpen] = useState(false);
    const [serviceOpen, setServiceOpen] = useState(false);
    const [ctaOpen, setCtaOpen] = useState(false);
    const kuyouRef = useRef<HTMLDivElement>(null);
    const serviceRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    const navLinkClass =
        "text-gray-600 hover:text-lotus-pink transition-colors font-medium text-sm tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-lotus-pink hover:after:w-full after:transition-all after:duration-300";

    return (
        <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            {/* Utility Bar (上段) - JTB風 */}
            <div className="bg-bg-muted border-b border-border hidden md:block">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-8 gap-6 text-xs text-gray-500">
                    <Link href="/faq" className="hover:text-primary transition-colors">よくある質問</Link>
                    <Link href="/consult/request-material" className="hover:text-primary transition-colors">資料請求</Link>
                    <Link href="/about/company" className="hover:text-primary transition-colors">会社情報</Link>
                    <a href="tel:0800-888-8788" className="hover:text-primary transition-colors font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3" /> 0800-888-8788
                    </a>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-[60px] w-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Image
                            src="/seiren-logo-v2.png"
                            alt="Seiren Logo"
                            width={80}
                            height={80}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                        <span className="font-bold text-primary-dark text-sm md:text-base tracking-wide">お墓探しナビ</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex ml-auto items-center gap-5 lg:gap-8 pr-4 lg:pr-6">
                        {/* 墓地を探す */}
                        <Link href="/search" className={navLinkClass}>
                            墓地を探す
                        </Link>

                        {/* 供養のカタチ ドロップダウン */}
                        <div
                            ref={kuyouRef}
                            className="relative"
                            onMouseEnter={() => setKuyouOpen(true)}
                            onMouseLeave={() => setKuyouOpen(false)}
                        >
                            <button
                                className={`${navLinkClass} flex items-center gap-1 pb-0`}
                                onClick={() => setKuyouOpen(v => !v)}
                                aria-expanded={kuyouOpen}
                            >
                                供養のカタチ
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${kuyouOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown */}
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
                                    kuyouOpen
                                        ? "opacity-100 scale-y-100 pointer-events-auto"
                                        : "opacity-0 scale-y-95 pointer-events-none"
                                }`}
                            >
                                {/* 三角 */}
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                                <div className="py-2">
                                    {KUYOU_LINKS.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                            onClick={() => setKuyouOpen(false)}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <span className="flex items-center gap-1 font-bold text-sm text-gray-800 group-hover:text-primary transition-colors">
                                                    {item.label}
                                                </span>
                                                <span className="text-xs text-gray-400 mt-0.5 block">{item.description}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 墓じまい・改葬 */}
                        <a
                            href="https://www.ohakajimai-navi.jp/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${navLinkClass} flex items-center gap-1`}
                        >
                            墓じまい・改葬
                            <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>

                        {/* よくある質問 */}
                        <Link href="/faq" className={navLinkClass}>
                            よくある質問
                        </Link>

                        {/* 関連サービス ドロップダウン */}
                        <div
                            ref={serviceRef}
                            className="relative"
                            onMouseEnter={() => setServiceOpen(true)}
                            onMouseLeave={() => setServiceOpen(false)}
                        >
                            <button
                                className={`${navLinkClass} flex items-center gap-1 pb-0`}
                                onClick={() => setServiceOpen(v => !v)}
                                aria-expanded={serviceOpen}
                            >
                                関連サービス
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${serviceOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown */}
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top ${
                                    serviceOpen
                                        ? "opacity-100 scale-y-100 pointer-events-auto"
                                        : "opacity-0 scale-y-95 pointer-events-none"
                                }`}
                            >
                                {/* 三角 */}
                                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                                <div className="py-2">
                                    {RELATED_SERVICES.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <span className="flex items-center gap-1 font-bold text-sm text-gray-800 group-hover:text-lotus-pink transition-colors">
                                                    {s.label}
                                                    <ExternalLink className="w-3 h-3 opacity-40" />
                                                </span>
                                                <span className="text-xs text-gray-400 mt-0.5 block">{s.description}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* デスクトップ用 お気に入りリンク */}
                        <Link href="/favorites" className={`${navLinkClass} flex items-center gap-1`}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            お気に入り
                            <DesktopFavoriteCount />
                        </Link>
                    </nav>

                    {/* CTA Group */}
                    <div className="flex items-center gap-4 shrink-0 md:ml-0 ml-auto">
                        {/* Desktop Dropdown CTA */}
                        <div
                            ref={ctaRef}
                            className="hidden sm:block relative"
                            onMouseEnter={() => setCtaOpen(true)}
                            onMouseLeave={() => setCtaOpen(false)}
                        >
                            <Button 
                                size="md" 
                                className="shadow-lg shadow-primary/20 text-sm h-10 bg-primary hover:bg-primary-hover text-white border-transparent flex items-center gap-1 px-4"
                                onClick={() => setCtaOpen(v => !v)}
                            >
                                無料相談予約
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${ctaOpen ? "rotate-180" : ""}`} />
                            </Button>

                            <div
                                className={`absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${
                                    ctaOpen
                                        ? "opacity-100 scale-y-100 pointer-events-auto"
                                        : "opacity-0 scale-y-95 pointer-events-none"
                                }`}
                            >
                                <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                                <div className="p-5 flex flex-col gap-3">
                                    <div className="text-center mb-1">
                                        <p className="text-sm font-bold text-gray-800">お墓・供養の無料相談</p>
                                        <p className="text-xs text-gray-500 mt-1">専門スタッフが丁寧にお答えします</p>
                                    </div>
                                    <a
                                        href="tel:0800-888-8788"
                                        className="flex items-center justify-center gap-3 text-primary font-bold py-3 px-2 border border-primary/20 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
                                    >
                                        <Phone className="w-5 h-5 shrink-0" />
                                        <div className="text-left">
                                            <span className="block text-[10px] font-normal text-gray-500 leading-tight">お電話でのご相談（無料）</span>
                                            <span className="text-xl tracking-wider">0800-888-8788</span>
                                        </div>
                                    </a>
                                    <Link 
                                        href="/consult" 
                                        className="flex flex-col items-center justify-center gap-0.5 w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl transition-colors shadow-md shadow-primary/20"
                                        onClick={() => setCtaOpen(false)}
                                    >
                                        <span className="font-bold text-sm">Webから無料相談予約</span>
                                        <span className="text-[10px] opacity-80">24時間受付中</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`md:hidden absolute top-section-tablet left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    isMobileMenuOpen ? "max-h-[700px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col px-4 py-4 space-y-1">
                    {/* 墓地を探す */}
                    <Link
                        href="/search"
                        className="text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        墓地を探す
                    </Link>

                    {/* 供養のカタチ（モバイル：展開リスト） */}
                    <div className="border-b border-gray-50">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-3 pb-2">供養のカタチ</p>
                        {KUYOU_LINKS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between py-2.5 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="font-medium text-sm text-gray-700">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* 墓じまい・改葬 */}
                    <a
                        href="https://www.ohakajimai-navi.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-3 border-b border-gray-50 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <span className="font-medium text-gray-700">墓じまい・改葬</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </a>

                    {/* よくある質問 */}
                    <Link
                        href="/faq"
                        className="text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        よくある質問
                    </Link>

                    {/* お気に入りリスト（モバイル） */}
                    <Link
                        href="/favorites"
                        className="flex items-center justify-between text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-primary transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <div className="flex items-center gap-2">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className="w-4 h-4"
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            お気に入りリスト
                        </div>
                        <MobileFavoriteCount />
                    </Link>

                    {/* 関連サービス（モバイル） */}
                    <div className="border-b border-gray-50">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-3 pb-2">関連サービス</p>
                        {RELATED_SERVICES.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between py-2.5 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="font-medium text-sm text-gray-700">{s.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                            </a>
                        ))}
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <Link href="/consult" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
                            <Button className="w-full bg-primary hover:bg-primary-hover text-white justify-center shadow-md">
                                無料相談予約
                            </Button>
                        </Link>
                        <a
                            href="tel:0800-888-8788"
                            className="flex items-center justify-center gap-2 text-primary font-bold py-2 border border-primary/20 rounded-md bg-primary/5"
                        >
                            <Phone className="w-4 h-4" />
                            <div className="text-center">
                                <span className="block text-[10px] font-normal text-gray-400">無料電話相談</span>
                                <span>0800-888-8788</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
