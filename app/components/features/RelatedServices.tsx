import { ExternalLink, Anchor, BookUser, ShieldCheck, HeartHandshake, Diamond } from "lucide-react";
import { Card } from "../ui/Card";

export function RelatedServices() {
    const services = [
        {
            title: "お墓じまいナビ",
            description: "改葬・墓じまいの実務サポートに特化。",
            url: "https://ohakajimai-navi.jp/",
            icon: <BookUser className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />,
            status: "active" as const
        },
        {
            title: "散骨クルーズ",
            description: "海洋散骨（国内・国外）に特化したブランド。",
            url: "https://www.sankotu-cruise.com/",
            icon: <Anchor className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />,
            status: "active" as const
        },
        {
            title: "遺骨ラボ",
            description: "遺骨の粉骨・洗骨・乾燥サービス。",
            url: "https://ikotsu-lab.com/",
            icon: <ShieldCheck className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />,
            status: "active" as const
        },
        {
            title: "終活コンシェルジュ",
            description: "総合的な終活の相談窓口。",
            url: "#",
            icon: <HeartHandshake className="w-8 h-8 text-gray-400 mb-3" />,
            status: "coming_soon" as const
        },
        {
            title: "遺骨ダイヤモンドアドバイザー",
            description: "遺骨から作るダイヤモンドのご案内。",
            url: "#",
            icon: <Diamond className="w-8 h-8 text-gray-400 mb-3" />,
            status: "coming_soon" as const
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
                const isComingSoon = service.status === "coming_soon";
                
                const cardContent = (
                    <Card 
                        hoverEffect={false} 
                        className={`h-full flex flex-col items-center text-center p-8 group transition-all duration-300 ${isComingSoon ? 'opacity-60 bg-gray-50 border-gray-100' : 'border-border hover:border-primary hover:shadow-[0_8px_30px_rgb(76,181,195,0.15)] hover:-translate-y-1 flex-1'}`}
                    >
                        {service.icon}
                        
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <h3 className={`font-bold font-serif ${isComingSoon ? 'text-gray-500' : 'text-gray-800 group-hover:text-primary transition-colors'}`}>
                                {service.title}
                            </h3>
                            {isComingSoon && (
                                <span className="text-[10px] bg-lotus-pink/10 text-lotus-pink px-2 py-0.5 rounded font-bold border border-lotus-pink/20">準備中</span>
                            )}
                            {!isComingSoon && (
                                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary" />
                            )}
                        </div>
                        
                        <p className={`text-sm ${isComingSoon ? 'text-gray-400' : 'text-gray-600'}`}>
                            {service.description}
                        </p>
                        
                        {!isComingSoon && (
                            <div className="mt-auto pt-4 flex items-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                サイトを見る 
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        )}
                    </Card>
                );

                if (isComingSoon) {
                    return <div key={index} className="cursor-not-allowed">{cardContent}</div>;
                }

                return (
                    <a 
                        key={index} 
                        href={service.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="block h-full"
                    >
                        {cardContent}
                    </a>
                );
            })}
        </div>
    );
}
