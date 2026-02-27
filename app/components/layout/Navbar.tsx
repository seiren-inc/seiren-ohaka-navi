import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Phone } from "lucide-react";

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-border-light transition-all duration-300">
            <div className="max-w-7xl mx-auto px-[--content-px]">
                <div className="flex justify-between items-center h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/seiren-logo-v2.png"
                            alt="お墓探しナビ"
                            width={80}
                            height={80}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        <Link
                            href="/search"
                            className="text-text-secondary hover:text-primary transition-colors text-[13px] tracking-widest uppercase"
                        >
                            墓地を探す
                        </Link>
                        <Link
                            href="/guide"
                            className="text-text-secondary hover:text-primary transition-colors text-[13px] tracking-widest uppercase"
                        >
                            供養の知識
                        </Link>
                        <Link
                            href="/about"
                            className="text-text-secondary hover:text-primary transition-colors text-[13px] tracking-widest uppercase"
                        >
                            清蓮について
                        </Link>
                    </nav>

                    {/* CTA Group */}
                    <div className="flex items-center gap-5">
                        <a
                            href="tel:0120-000-000"
                            className="hidden lg:flex items-center gap-2 text-primary font-medium text-sm tracking-wide"
                        >
                            <Phone className="w-4 h-4" />
                            <span>0120-000-000</span>
                        </a>

                        <div className="relative group">
                            <Link href="/consult/request-material">
                                <Button size="sm" className="hidden sm:inline-flex">
                                    無料相談予約
                                </Button>
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute right-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 w-64">
                                <div className="bg-white rounded-[--radius-lg] shadow-[--shadow-lg] border border-border overflow-hidden">
                                    <div className="px-4 py-3 bg-bg border-b border-border text-[11px] font-medium text-text-muted text-center tracking-wide">
                                        ご希望の内容をお選びください
                                    </div>
                                    <div className="flex flex-col">
                                        <Link href="/consult/grave-search" className="px-5 py-3.5 text-sm text-text-secondary hover:bg-bg hover:text-primary transition-colors border-b border-border-light">
                                            お墓探しの相談
                                            <span className="block text-[10px] text-text-muted mt-0.5">永代供養・樹木葬など</span>
                                        </Link>
                                        <Link href="/consult/grave-closure" className="px-5 py-3.5 text-sm text-text-secondary hover:bg-bg hover:text-primary transition-colors border-b border-border-light">
                                            お墓じまいの相談
                                            <span className="block text-[10px] text-text-muted mt-0.5">改葬・撤去工事など</span>
                                        </Link>
                                        <Link href="/consult/ikotsu-service" className="px-5 py-3.5 text-sm text-text-secondary hover:bg-bg hover:text-primary transition-colors">
                                            遺骨サービスの相談
                                            <span className="block text-[10px] text-text-muted mt-0.5">粉骨・洗骨・手元供養</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
