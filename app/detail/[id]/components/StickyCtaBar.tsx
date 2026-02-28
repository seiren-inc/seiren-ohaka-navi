import { Button } from "../../../components/ui/Button";
import { Mail, Phone, CalendarCheck } from "lucide-react";
import Link from "next/link";

export function StickyCtaBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-white/90 backdrop-blur-md border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
            <div className="max-w-4xl mx-auto flex gap-3">
                <Link href="/consult/grave-search" className="flex-1">
                    <Button variant="outline" className="w-full text-xs sm:text-sm font-bold border-seiren-navy text-seiren-navy h-12">
                        <Mail className="w-4 h-4 mr-1 sm:mr-2" />
                        資料請求
                    </Button>
                </Link>
                <div className="hidden sm:block flex-1">
                    <a href="tel:0120-000-000" className="w-full h-full">
                        <Button variant="outline" className="w-full text-xs sm:text-sm font-bold border-seiren-navy text-seiren-navy h-12">
                            <Phone className="w-4 h-4 mr-2" />
                            電話相談
                        </Button>
                    </a>
                </div>
                <Link href="/consult/grave-search" className="flex-[1.5]">
                    <Button className="w-full text-xs sm:text-sm font-bold bg-warm-gold hover:bg-warm-gold/90 text-white h-12">
                        <CalendarCheck className="w-4 h-4 mr-1 sm:mr-2" />
                        見学予約（無料）
                    </Button>
                </Link>
            </div>
        </div>
    );
}
