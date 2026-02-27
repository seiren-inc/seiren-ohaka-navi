import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-surface text-text-secondary pt-20 pb-10 border-t border-border">
            <div className="max-w-7xl mx-auto px-[--content-px]">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-14">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-5">
                            <Image
                                src="/seiren-logo-v2.png"
                                alt="お墓探しナビ"
                                width={80}
                                height={80}
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <p className="text-text-muted text-sm leading-relaxed">
                            中立的な立場で、あなたに最適な<br />
                            墓地・永代供養をご提案します。
                        </p>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h4 className="font-serif text-sm tracking-widest uppercase mb-6 text-primary-dark">探す</h4>
                        <ul className="space-y-3.5 text-sm">
                            <li><Link href="/search?type=general" className="text-text-secondary hover:text-primary transition-colors">一般墓</Link></li>
                            <li><Link href="/search?type=eitai" className="text-text-secondary hover:text-primary transition-colors">永代供養墓</Link></li>
                            <li><Link href="/search?type=tree" className="text-text-secondary hover:text-primary transition-colors">樹木葬</Link></li>
                            <li><Link href="/search?type=nokotsu" className="text-text-secondary hover:text-primary transition-colors">納骨堂</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h4 className="font-serif text-sm tracking-widest uppercase mb-6 text-primary-dark">知る・相談する</h4>
                        <ul className="space-y-3.5 text-sm">
                            <li><Link href="/guide" className="text-text-secondary hover:text-primary transition-colors">供養の知識コラム</Link></li>
                            <li><Link href="/about/strength" className="text-text-secondary hover:text-primary transition-colors">清蓮の強み</Link></li>
                            <li><Link href="/about/company" className="text-text-secondary hover:text-primary transition-colors">運営会社</Link></li>
                            <li><Link href="/privacy" className="text-text-secondary hover:text-primary transition-colors">プライバシーポリシー</Link></li>
                            <li><Link href="/terms" className="text-text-secondary hover:text-primary transition-colors">利用規約</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-serif text-sm tracking-widest uppercase mb-6 text-primary-dark">お問い合わせ</h4>
                        <a href="tel:0120-000-000" className="block w-fit hover:opacity-80 transition-opacity">
                            <p className="text-2xl font-medium font-serif mb-2 text-primary-dark tracking-wide">0120-000-000</p>
                        </a>
                        <p className="text-xs text-text-muted mb-6">受付時間：9:00 - 18:00（年中無休）</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
                        >
                            WEBからのお問い合わせ →
                        </Link>
                    </div>
                </div>

                <div className="border-t border-border pt-8 text-center">
                    <p className="text-xs text-text-muted tracking-wide">
                        &copy; {new Date().getFullYear()} Seiren Co., Ltd. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
