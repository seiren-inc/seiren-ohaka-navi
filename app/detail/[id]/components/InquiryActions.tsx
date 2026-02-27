import { Button } from "../../../components/ui/Button";
import { Mail, CalendarCheck } from "lucide-react";
import Link from "next/link";

export function InquiryActions() {
    return (
        <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <Link href="/consult/grave-search" className="flex-1">
                    <Button size="lg" className="w-full bg-warm-gold hover:bg-warm-gold/90 text-white font-bold h-14 shadow-lg">
                        <CalendarCheck className="w-5 h-5 mr-2" />
                        見学予約（無料）
                    </Button>
                </Link>
                <Link href="/consult/grave-search" className="flex-1">
                    <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold h-14 shadow-sm">
                        <Mail className="w-5 h-5 mr-2" />
                        資料請求（無料）
                    </Button>
                </Link>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {["費用の見積もりが欲しい", "空き区画が知りたい", "納骨可能数が知りたい", "埋葬方法が知りたい", "宗派を確認したい", "支払い方法を確認したい"].map((label, idx) => (
                    <Link key={idx} href="/consult/grave-search">
                        <span className="inline-block bg-bg border border-border text-text-muted text-xs px-3 py-2 rounded-full hover:border-warm-gold hover:text-warm-gold transition-colors">
                            {label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
