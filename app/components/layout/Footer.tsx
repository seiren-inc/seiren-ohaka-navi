import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-white text-gray-600 pt-16 pb-8 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center text-center">
                        <div className="mb-4">
                            <Image
                                src="/seiren-logo-v2.png"
                                alt="Seiren Logo"
                                width={80}
                                height={80}
                                className="h-14 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            中立的な立場で、あなたに最適な<br />
                            墓地・永代供養をご提案します。
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-primary-dark">探す</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/search?type=general" className="hover:text-primary-dark text-primary transition-colors">一般墓</Link></li>
                            <li><Link href="/search?type=eitai" className="hover:text-primary-dark text-primary transition-colors">永代供養墓</Link></li>
                            <li><Link href="/search?type=tree" className="hover:text-primary-dark text-primary transition-colors">樹木葬</Link></li>
                            <li><Link href="/search?type=nokotsu" className="hover:text-primary-dark text-primary transition-colors">納骨堂</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-primary-dark">知る・相談する</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/guide" className="hover:text-primary-dark text-primary transition-colors">供養の知識コラム</Link></li>
                            <li><Link href="/about/strength" className="hover:text-primary-dark text-primary transition-colors">清蓮の強み</Link></li>
                            <li><Link href="/about/company" className="hover:text-primary-dark text-primary transition-colors">運営会社</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary-dark text-primary transition-colors">プライバシーポリシー</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-primary-dark">お問い合わせ</h4>
                        <a href="tel:0120-000-000" className="block w-fit hover:opacity-80 transition-opacity">
                            <p className="text-2xl font-bold font-serif mb-2 text-gray-800">0120-000-000</p>
                        </a>
                        <p className="text-xs text-gray-500 mb-4">受付時間：9:00 - 18:00 (年中無休)</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 text-center">
                    <p className="text-xs text-gray-400">
                        &copy; {new Date().getFullYear()} Seiren Co., Ltd. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
