"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Phone, Menu, X } from "lucide-react";

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-[72px]">
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
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/search"
                            className="text-gray-600 hover:text-lotus-pink transition-colors font-medium text-sm tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-lotus-pink hover:after:w-full after:transition-all after:duration-300"
                        >
                            墓地を探す
                        </Link>
                        <Link
                            href="/grave-closure"
                            className="text-gray-600 hover:text-lotus-pink transition-colors font-medium text-sm tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-lotus-pink hover:after:w-full after:transition-all after:duration-300"
                        >
                            お墓じまい
                        </Link>
                        <Link
                            href="/consult/ikotsu-service"
                            className="text-gray-600 hover:text-lotus-pink transition-colors font-medium text-sm tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-lotus-pink hover:after:w-full after:transition-all after:duration-300"
                        >
                            関連サービス
                        </Link>
                        <Link
                            href="/about/company"
                            className="text-gray-600 hover:text-lotus-pink transition-colors font-medium text-sm tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-lotus-pink hover:after:w-full after:transition-all after:duration-300"
                        >
                            会社概要
                        </Link>
                    </nav>

                    {/* CTA Group */}
                    <div className="flex items-center gap-4">
                        <a
                            href="tel:0120-000-000"
                            className="hidden lg:flex items-center gap-2 text-primary font-bold text-lg hover:opacity-80 transition-opacity"
                        >
                            <Phone className="w-5 h-5 fill-current" />
                            <span>0120-000-000</span>
                        </a>

                        <div className="relative group">
                            <Link href="/consult">
                                <Button size="md" className="hidden sm:inline-flex shadow-lg shadow-primary/20 text-sm h-10 bg-primary hover:bg-primary-hover text-white border-transparent">
                                    無料相談予約
                                </Button>
                            </Link>
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
                className={`md:hidden absolute top-[72px] left-0 w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
                    isMobileMenuOpen ? "max-h-[500px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
                }`}
            >
                <div className="flex flex-col px-4 py-4 space-y-4">
                    <Link
                        href="/search"
                        className="text-gray-700 font-medium py-2 border-b border-gray-50 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        墓地を探す
                    </Link>
                    <Link
                        href="/grave-closure"
                        className="text-gray-700 font-medium py-2 border-b border-gray-50 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        お墓じまい
                    </Link>
                    <Link
                        href="/consult/ikotsu-service"
                        className="text-gray-700 font-medium py-2 border-b border-gray-50 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        関連サービス
                    </Link>
                    <Link
                        href="/about/company"
                        className="text-gray-700 font-medium py-2 border-b border-gray-50 hover:text-primary transition-colors block"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        会社概要
                    </Link>
                    <div className="pt-4 flex flex-col gap-3">
                        <Link
                            href="/consult"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full"
                        >
                            <Button className="w-full bg-primary hover:bg-primary-hover text-white justify-center shadow-md">
                                無料相談予約
                            </Button>
                        </Link>
                        <a
                            href="tel:0120-000-000"
                            className="flex items-center justify-center gap-2 text-primary font-bold py-2 border border-primary/20 rounded-md bg-primary/5"
                        >
                            <Phone className="w-4 h-4" />
                            <span>0120-000-000</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
