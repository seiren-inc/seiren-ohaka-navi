import { AlertCircle } from "lucide-react";

/**
 * YMYL免責コンポーネント（Doc-36 §9）
 * 診断結果ページ末尾に常時表示。
 */
export function Disclaimer() {
    return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
            <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
                <div className="text-xs text-gray-500 leading-relaxed space-y-2">
                    <p className="font-bold text-gray-600">ご利用にあたっての注意事項</p>
                    <p>
                        本診断結果は、お客様の回答内容をもとに統計的な傾向から候補を整理したものであり、
                        特定の施設や供養方法を断定・推奨するものではありません。
                    </p>
                    <p>
                        供養方法の選択にあたっては、ご家族との話し合い、実際の施設見学、
                        専門家への相談を経たうえで最終的なご判断をお願いいたします。
                    </p>
                    <p>
                        掲載情報は調査時点のものであり、料金・条件等は変更される場合があります。
                        最新情報は各施設へ直接ご確認ください。
                    </p>
                </div>
            </div>
        </div>
    );
}
