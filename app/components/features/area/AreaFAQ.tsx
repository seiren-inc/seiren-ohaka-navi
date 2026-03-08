import { HelpCircle, ChevronDown } from "lucide-react";
import { JsonLd } from "../../seo/JsonLd";

export function AreaFAQ({ prefecture }: { prefecture: string }) {
    const faqData = [
        {
            q: `${prefecture}でお墓・永代供養を探す際の費用相場はどのくらいですか？`,
            a: `一般的に、${prefecture}での永代供養の相場は数万円〜100万円程度、樹木葬は30万円〜150万円程度が目安です。立地や区画の広さ、個別安置の期間によって費用は大きく変動します。最新の料金は各施設の詳細ページにてご確認ください。`
        },
        {
            q: `${prefecture}で宗教・宗派不問の霊園はありますか？`,
            a: `はい、${prefecture}内にも「宗教・宗派不問」の霊園や永代供養墓は多数ございます。清蓮の検索機能で「宗教不問」の条件を絞り込んでご確認いただけます。`
        },
        {
            q: `${prefecture}で交通アクセスの良いお墓を探すことはできますか？`,
            a: `可能です。${prefecture}の都市部においては駅から徒歩圏内の納骨堂や樹木葬も多く存在します。また、郊外の霊園でも送迎バスが運行されている場合があります。「駐車場あり」などの条件で絞り込み検索をご活用ください。`
        }
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map((item) => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <section className="bg-white border-t border-gray-200 py-16 px-4">
            <JsonLd data={jsonLd} />
            <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-2xl font-bold text-primary-dark mb-8 flex items-center justify-center text-center">
                    <HelpCircle className="w-6 h-6 mr-3 text-secondary" />
                    {prefecture}のお墓・供養に関するよくある質問
                </h2>
                <div className="space-y-4">
                    {faqData.map((item, idx) => (
                        <details key={idx} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                            <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                                <span className="flex items-start gap-3">
                                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">Q</span>
                                    <span className="font-medium text-gray-800 text-sm md:text-base leading-relaxed">{item.q}</span>
                                </span>
                                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180" />
                            </summary>
                            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                <div className="flex items-start gap-3">
                                    <span className="bg-soft-teal text-white text-xs font-bold px-2 py-1 rounded shrink-0">A</span>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                                </div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
