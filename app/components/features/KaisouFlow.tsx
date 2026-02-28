import { FileText, Building2, Banknote, ClipboardCheck, ArrowDown } from "lucide-react";

export function KaisouFlow() {
    const steps = [
        {
            num: 1,
            title: "親族間での合意形成",
            desc: "まずはご家族や親族とお墓じまい・改葬について十分に話し合い、同意を得ることが最も重要です。",
            icon: <Building2 className="w-5 h-5 text-primary" />
        },
        {
            num: 2,
            title: "改葬先（新しい納骨先）の決定",
            desc: "永代供養墓、樹木葬、納骨堂など、遺骨の新しい引越し先（改葬先）を決定し、契約・「受入証明書」を発行してもらいます。",
            icon: <FileText className="w-5 h-5 text-primary" />
        },
        {
            num: 3,
            title: "現在のお墓の管理者（お寺等）へ相談",
            desc: "現在お墓があるお寺や霊園の管理者へ改葬の意思を伝え、「埋蔵証明書」を発行してもらいます。",
            icon: <ClipboardCheck className="w-5 h-5 text-primary" />
        },
        {
            num: 4,
            title: "自治体で「改葬許可証」の発行手続き",
            desc: "現在のお墓がある市区町村の役所へ赴き、上記2つの証明書を提出して「改葬許可証」を発行してもらいます。",
            icon: <FileText className="w-5 h-5 text-primary" />
        },
        {
            num: 5,
            title: "現在のお墓の撤去（墓じまい工事）",
            desc: "石材店に依頼し、墓石の解体・撤去・区画の更地化を行います。また、お寺の場合は閉眼供養（魂抜き）を行います。",
            icon: <Banknote className="w-5 h-5 text-primary" />
        },
        {
            num: 6,
            title: "新しい納骨先での納骨",
            desc: "発行された「改葬許可証」とご遺骨を新しい納骨先へ持参し、納骨（必要に応じて開眼供養・納骨法要）を行います。",
            icon: <Building2 className="w-5 h-5 text-primary" />
        }
    ];

    return (
        <div className="max-w-4xl mx-auto py-12">
            <h2 className="text-3xl font-serif text-center font-bold text-gray-800 mb-12">
                改葬・お墓じまいの基本的な流れ（6ステップ）
            </h2>

            <div className="space-y-6">
                {steps.map((step, index) => (
                    <div key={step.num} className="relative">
                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div className="absolute left-8 top-16 bottom-[-24px] w-0.5 bg-border pointer-events-none md:left-1/2" />
                        )}

                        <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-[12px] shadow-sm border border-border transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative z-10 w-full md:w-4/5 mx-auto">
                            
                            {/* Number Badge */}
                            <div className="shrink-0 w-16 h-16 rounded-full bg-bg-muted border-2 border-primary flex items-center justify-center font-bold text-2xl text-primary font-serif">
                                {step.num}
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center md:text-left">
                                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                                    <div className="bg-primary/5 p-2 rounded-full hidden md:block">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>

                        {/* Arrow between steps */}
                        {index < steps.length - 1 && (
                            <div className="hidden md:flex justify-center my-4">
                                <ArrowDown className="text-border w-6 h-6" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
