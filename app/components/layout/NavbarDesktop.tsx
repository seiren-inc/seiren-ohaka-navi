import Link from "next/link";
import { ChevronDown, ExternalLink, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { FavoriteIcon, KUYOU_LINKS, RELATED_SERVICES } from "./navbarData";

const navLinkClass =
    "text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm tracking-wide relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-border hover:after:w-full focus-visible:after:w-full after:transition-all after:duration-300";

export function NavbarDesktop() {
    return (
        <>
            <nav className="hidden md:flex ml-auto items-center gap-5 lg:gap-8 pr-4 lg:pr-6">
                <Link href="/search" className={navLinkClass}>
                    墓地を探す
                </Link>

                <div className="relative group/kuyou">
                    <button
                        type="button"
                        className={`${navLinkClass} flex items-center gap-1 pb-0`}
                        aria-haspopup="menu"
                    >
                        供養のカタチ
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/kuyou:rotate-180 group-focus-within/kuyou:rotate-180" />
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden opacity-0 scale-y-95 pointer-events-none transition-all duration-200 origin-top group-hover/kuyou:opacity-100 group-hover/kuyou:scale-y-100 group-hover/kuyou:pointer-events-auto group-focus-within/kuyou:opacity-100 group-focus-within/kuyou:scale-y-100 group-focus-within/kuyou:pointer-events-auto">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                        <div className="py-2">
                            {KUYOU_LINKS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <span className="flex items-center gap-1 font-bold text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5 block">{item.description}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <a
                    href="https://www.ohakajimai-navi.jp/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${navLinkClass} flex items-center gap-1`}
                >
                    墓じまい・改葬
                    <ExternalLink className="w-3 h-3 opacity-50" />
                </a>

                <div className="relative group/service">
                    <button
                        type="button"
                        className={`${navLinkClass} flex items-center gap-1 pb-0`}
                        aria-haspopup="menu"
                    >
                        関連サービス
                        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/service:rotate-180 group-focus-within/service:rotate-180" />
                    </button>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden opacity-0 scale-y-95 pointer-events-none transition-all duration-200 origin-top group-hover/service:opacity-100 group-hover/service:scale-y-100 group-hover/service:pointer-events-auto group-focus-within/service:opacity-100 group-focus-within/service:scale-y-100 group-focus-within/service:pointer-events-auto">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                        <div className="py-2">
                            {RELATED_SERVICES.map((service) => (
                                <a
                                    key={service.label}
                                    href={service.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                                >
                                    <div className="flex-1 min-w-0">
                                        <span className="flex items-center gap-1 font-bold text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                                            {service.label}
                                            <ExternalLink className="w-3 h-3 opacity-40" />
                                        </span>
                                        <span className="text-xs text-gray-400 mt-0.5 block">{service.description}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <Link href="/favorites" className={`${navLinkClass} flex items-center gap-1`}>
                    <FavoriteIcon />
                    お気に入り
                </Link>
            </nav>

            <div className="hidden sm:block relative group/cta">
                <Button
                    size="md"
                    type="button"
                    className="text-sm h-10 bg-bg hover:bg-bg-muted text-gray-900 border border-border flex items-center gap-1 px-4 shadow-sm"
                    aria-haspopup="menu"
                >
                    無料相談予約
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/cta:rotate-180 group-focus-within/cta:rotate-180" />
                </Button>

                <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden opacity-0 scale-y-95 pointer-events-none transition-all duration-200 origin-top-right group-hover/cta:opacity-100 group-hover/cta:scale-y-100 group-hover/cta:pointer-events-auto group-focus-within/cta:opacity-100 group-focus-within/cta:scale-y-100 group-focus-within/cta:pointer-events-auto">
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                    <div className="p-5 flex flex-col gap-3">
                        <div className="text-center mb-1">
                            <p className="text-sm font-bold text-gray-800">お墓・供養の無料相談</p>
                            <p className="text-xs text-gray-500 mt-1">専門スタッフが丁寧にお答えします</p>
                        </div>
                        <a
                            href="tel:0800-888-8788"
                            className="flex items-center justify-center gap-3 text-gray-900 font-bold py-3 px-2 border border-border rounded-xl bg-bg hover:bg-bg-muted transition-colors"
                        >
                            <Phone className="w-5 h-5 shrink-0" />
                            <div className="text-left">
                                <span className="block text-xs font-normal text-gray-500 leading-tight">お電話でのご相談（無料）</span>
                                <span className="text-xl tracking-wider">0800-888-8788</span>
                            </div>
                        </a>
                        <Link
                            href="/consult"
                            className="flex flex-col items-center justify-center gap-0.5 w-full bg-bg-muted hover:bg-bg text-gray-900 py-3 rounded-xl transition-colors border border-border"
                        >
                            <span className="font-bold text-sm">Webから無料相談予約</span>
                            <span className="text-xs text-gray-500">24時間受付中</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
