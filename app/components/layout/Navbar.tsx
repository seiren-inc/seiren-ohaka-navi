import Link from "next/link";
import Image from "next/image";
import { NavbarDesktop } from "./NavbarDesktop";
import { NavbarMobileMenu } from "./NavbarMobileMenu";

export function Navbar() {
    return (
        <header className="fixed top-0 w-full z-50 bg-white backdrop-blur-md border-b border-border transition-all duration-300">
            <div className="bg-[#fdf5e6] border-b border-border hidden md:block">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center h-8 gap-6 text-xs text-gray-500">
                    <Link href="/faq" className="hover:text-gray-900 transition-colors">よくある質問</Link>
                    <Link href="/consult/request-material" className="hover:text-gray-900 transition-colors">資料請求</Link>
                    <Link href="/about/company" className="hover:text-gray-900 transition-colors">会社情報</Link>
                    <a href="tel:0800-888-8788" className="hover:text-gray-900 transition-colors font-bold">
                        0800-888-8788
                    </a>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-[60px] w-full">
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
                    <div className="flex items-center gap-4 shrink-0 md:ml-0 ml-auto">
                        <NavbarDesktop />
                        <NavbarMobileMenu />
                    </div>
                </div>
            </div>
        </header>
    );
}
