import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-bg-muted text-gray-600 pt-16 pb-8 border-t border-border">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="mb-4">
                            <Image
                                src="/seiren-logo-v2.png"
                                alt="Seiren Logo"
                                width={80}
                                height={80}
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            中立的な立場で、あなたに最適な<br />
                            墓地・永代供養をご提案します。
                        </p>
                    </div>

                    {/* Links 1: 探す・知る */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-primary-hover">探す・知る</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link href="/search?type=general" className="hover:text-primary text-gray-600 transition-colors">一般墓</Link></li>
                            <li><Link href="/search?type=eitai" className="hover:text-primary text-gray-600 transition-colors">永代供養墓</Link></li>
                            <li><Link href="/search?type=tree" className="hover:text-primary text-gray-600 transition-colors">樹木葬</Link></li>
                            <li><Link href="/search?type=nokotsu" className="hover:text-primary text-gray-600 transition-colors">納骨堂</Link></li>
                            <li className="pt-2"><Link href="/guide" className="hover:text-primary font-bold text-gray-700 transition-colors">供養の知識コラム</Link></li>
                            <li><Link href="/kaisou" className="hover:text-primary font-bold text-gray-700 transition-colors">改葬・お墓じまいについて</Link></li>
                        </ul>
                    </div>

                    {/* Links 2: 関連サービス */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-primary-hover">関連サービス</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a href="https://ohakajimai-navi.jp/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary text-gray-600 transition-colors">
                                    お墓じまいナビ <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.sankotu-cruise.com/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary text-gray-600 transition-colors">
                                    散骨クルーズ <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </li>
                            <li>
                                <a href="https://ikotsu-lab.com/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary text-gray-600 transition-colors">
                                    遺骨ラボ <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </li>
                            <li>
                                <span className="flex items-center text-gray-400 cursor-not-allowed">
                                    終活コンシェルジュ <span className="ml-2 text-[10px] bg-gray-200 px-1 py-0.5 rounded">準備中</span>
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Links 3: 会社情報・お問い合わせ */}
                    <div>
                        <h4 className="font-serif font-bold text-lg mb-6 text-primary-hover">会社情報</h4>
                        <ul className="space-y-3 text-sm text-gray-600 mb-6">
                            <li><Link href="/about/strength" className="hover:text-primary text-gray-600 transition-colors">清蓮の強み</Link></li>
                            <li><Link href="/about/company" className="hover:text-primary text-gray-600 transition-colors">運営会社</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary text-gray-600 transition-colors">プライバシーポリシー</Link></li>
                        </ul>
                        <div className="bg-white p-4 rounded-[12px] border border-gray-100 text-center">
                            <p className="text-xs text-gray-500 mb-1 font-bold">お電話での無料相談</p>
                            <a href="tel:0800-888-8788" className="block text-xl font-bold font-serif text-primary hover:text-primary-hover transition-colors">
                                0800-888-8788
                            </a>
                            <p className="text-[10px] text-gray-400 mt-1">受付：9:00 - 18:00 (年中無休)</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Seiren Co., Ltd. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
