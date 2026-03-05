"use client";

import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

// 非表示にするパスプレフィックス
const HIDDEN_PATHS = ["/consult", "/apply", "/detail"];

export function FixedCTA() {
    const pathname = usePathname();
    const isHidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));
    if (isHidden) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] pb-safe">
            <div className="flex gap-2 px-3 py-2.5 max-w-lg mx-auto">
                {/* 電話相談 */}
                <a
                    href="tel:0120-000-000"
                    className="flex-1 flex items-center justify-center gap-1.5 h-12 rounded-lg border border-primary text-primary font-bold text-sm hover:bg-primary/5 transition-colors"
                >
                    <Phone className="w-4 h-4" />
                    電話相談
                </a>
                {/* 無料相談予約 */}
                <Link
                    href="/consult"
                    className="flex-2 flex items-center justify-center gap-1.5 h-12 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                >
                    <MessageCircle className="w-4 h-4" />
                    無料相談予約
                </Link>
            </div>
        </div>
    );
}
