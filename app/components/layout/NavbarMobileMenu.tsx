"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Menu, Phone, X } from "lucide-react";
import { Button } from "../ui/Button";
import { FavoriteIcon, KUYOU_LINKS, RELATED_SERVICES } from "./navbarData";

export function NavbarMobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <button
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen((value) => !value)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
                className={`md:hidden absolute top-[60px] left-0 w-full bg-white border-b border-border shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[700px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col px-4 py-4 space-y-1">
                    <Link
                        href="/search"
                        className="text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-gray-900 transition-colors block"
                        onClick={closeMenu}
                    >
                        墓地を探す
                    </Link>

                    <div className="border-b border-gray-50">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-3 pb-2">供養のカタチ</p>
                        {KUYOU_LINKS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center justify-between py-2.5 hover:text-gray-900 transition-colors"
                                onClick={closeMenu}
                            >
                                <span className="font-medium text-sm text-gray-700">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    <a
                        href="https://www.ohakajimai-navi.jp/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-3 border-b border-gray-50 hover:text-gray-900 transition-colors"
                        onClick={closeMenu}
                    >
                        <span className="font-medium text-gray-700">墓じまい・改葬</span>
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </a>

                    <Link
                        href="/favorites"
                        className="flex items-center justify-between text-gray-700 font-medium py-3 border-b border-gray-50 hover:text-gray-900 transition-colors"
                        onClick={closeMenu}
                    >
                        <div className="flex items-center gap-2">
                            <FavoriteIcon />
                            お気に入りリスト
                        </div>
                    </Link>

                    <div className="border-b border-gray-50">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-3 pb-2">関連サービス</p>
                        {RELATED_SERVICES.map((service) => (
                            <a
                                key={service.label}
                                href={service.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between py-2.5 hover:text-gray-900 transition-colors"
                                onClick={closeMenu}
                            >
                                <span className="font-medium text-sm text-gray-700">{service.label}</span>
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                            </a>
                        ))}
                    </div>

                    <div className="pt-4 flex flex-col gap-3">
                        <Link href="/consult" onClick={closeMenu} className="w-full">
                            <Button className="w-full bg-bg-muted hover:bg-bg text-gray-900 justify-center border border-border shadow-none">
                                無料相談予約
                            </Button>
                        </Link>
                        <a
                            href="tel:0800-888-8788"
                            className="flex items-center justify-center gap-2 text-gray-900 font-bold py-2 border border-border rounded-md bg-bg"
                        >
                            <Phone className="w-4 h-4" />
                            <div className="text-center">
                                <span className="block text-xs font-normal text-gray-400">無料電話相談</span>
                                <span>0800-888-8788</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
