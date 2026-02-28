import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Phone } from "lucide-react";

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        {/* 
                          Using natural size for specific logo dimensions. 
                          Adjust width/height as needed based on the actual aspect ratio.
                        */}
                        <Image
                            src="/seiren-logo-v2.png"
                            alt="Seiren Logo"
                            width={80}
                            height={80}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/search"
                            className="text-gray-600 hover:text-primary transition-colors font-medium text-sm tracking-wide"
                        >
                            墓地を探す
                        </Link>
                        <Link
                            href="/guide"
                            className="text-gray-600 hover:text-primary transition-colors font-medium text-sm tracking-wide"
                        >
                            供養の知識
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 hover:text-primary transition-colors font-medium text-sm tracking-wide"
                        >
                            清蓮について
                        </Link>
                    </nav>

                    {/* CTA Group */}
                    <div className="flex items-center gap-4">
                        <a
                            href="tel:0120-000-000"
                            className="hidden lg:flex items-center gap-2 text-primary font-bold text-lg"
                        >
                            <Phone className="w-5 h-5 fill-current" />
                            <span>0120-000-000</span>
                        </a>

                        <div className="relative group">
                            <Link href="/consult/request-material">
                                <Button size="sm" className="hidden sm:inline-flex shadow-xl shadow-secondary/20">
                                    無料相談予約
                                </Button>
                            </Link>

                            {/* Hover Dropdown */}
                            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 w-64">
                                <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                                    <div className="p-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 text-center">
                                        ご希望の内容をお選びください
                                    </div>
                                    <div className="flex flex-col">
                                        <Link href="/consult/grave-search" className="px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors border-b border-gray-50">
                                            お墓探しの相談
                                            <span className="block text-[10px] text-gray-400 mt-0.5">永代供養・樹木葬など</span>
                                        </Link>
                                        <Link href="/consult/grave-closure" className="px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors border-b border-gray-50">
                                            お墓じまいの相談
                                            <span className="block text-[10px] text-gray-400 mt-0.5">改葬・撤去工事など</span>
                                        </Link>
                                        <Link href="/consult/ikotsu-service" className="px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                                            遺骨サービスの相談
                                            <span className="block text-[10px] text-gray-400 mt-0.5">粉骨・洗骨・手元供養</span>
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
