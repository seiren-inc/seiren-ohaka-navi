import { Shield, BookOpen, Phone } from "lucide-react";
import Link from "next/link";

interface ExpertProfileProps {
    /** この記事が監修・確認された日付 */
    reviewedDate?: string;
}

export function ExpertProfile({ reviewedDate }: ExpertProfileProps) {
    return (
        <aside className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 my-12 flex flex-col sm:flex-row gap-6 items-center shadow-sm">
            {/* Avatar */}
            <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                <span className="text-primary font-bold text-xl font-serif">清</span>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
                <p className="text-xs font-bold text-secondary tracking-widest uppercase mb-1">監修者情報</p>
                <h3 className="text-lg font-bold text-gray-800 mb-1">清蓮（Seiren）供養相談専門チーム</h3>
                <p className="text-sm text-gray-500 mb-3">
                    株式会社清蓮 / お墓探しナビ 編集部
                    {reviewedDate && <span className="ml-3 text-xs text-gray-400">最終確認：{reviewedDate}</span>}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                    お墓じまい・改葬・永代供養の相談実績を持つ専門スタッフが執筆・監修しています。石材業界・寺院事情を熟知した中立な立場から、正確な情報をお届けします。
                </p>
            </div>

            {/* Trust badges */}
            <div className="flex sm:flex-col gap-3 shrink-0">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 font-medium">
                    <Shield className="w-4 h-4 text-primary shrink-0" />
                    <span>中立・宗派不問</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-xs text-gray-600 font-medium">
                    <BookOpen className="w-4 h-4 text-secondary shrink-0" />
                    <span>専門知識に基づく情報</span>
                </div>
                <Link href="/consult" className="flex items-center gap-2 bg-primary text-white rounded-lg px-3 py-2 text-xs font-bold hover:bg-primary-dark transition-colors">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>無料相談する</span>
                </Link>
            </div>
        </aside>
    );
}
