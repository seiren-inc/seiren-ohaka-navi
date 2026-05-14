"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RefreshCw, Sprout, Building, Waves, HeartHandshake, Gem, Landmark, AlertCircle, Home, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/Button";

// --- Types ---
type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5";
type CandidateKey = "general" | "perpetual" | "ossuary" | "tree" | "sea" | "home" | "diamond";

interface AnswerOption {
    label: string;
    value: string;
    scores: Partial<Record<CandidateKey, number>>;
    reasonPhrase: string;
}

interface Question {
    id: QuestionId;
    title: string;
    options: AnswerOption[];
}

interface CandidateData {
    key: CandidateKey;
    name: string;
    description: string;
    link: string;
    icon: React.ElementType;
    suitability: string; // "向いている傾向"
    caution?: string;
    subOptions?: { label: string; link: string; icon?: React.ElementType }[];
}

// --- Data Definitions ---

const CANDIDATES: Record<CandidateKey, CandidateData> = {
    general: {
        key: "general",
        name: "一般墓",
        description: "代々継承していく従来のお墓です。\n家族の絆を形に残し、親族が集まる場所として最も馴染みがあります。",
        link: "/search?type=ippan",
        icon: Landmark,
        suitability: "伝統を重んじ、家族で守る場所が欲しい方に向いています。",
        caution: "承継者（管理する人）が必要で、費用も高くなる傾向があります。"
    },
    perpetual: {
        key: "perpetual",
        name: "永代供養墓",
        description: "寺院や霊園が家族に代わって管理・供養を行います。\n継承者がいなくても安心で、費用も抑えられます。",
        link: "/choices/eitai-kuyou",
        icon: Landmark,
        suitability: "子供に負担を残したくないが、お参り場所は欲しい方に適しています。",
        caution: "合祀（他の方と一緒になる）タイプの場合、後から遺骨を取り出せないことがあります。"
    },
    ossuary: {
        key: "ossuary",
        name: "納骨堂",
        description: "屋内の施設に遺骨を収蔵します。\n天候に左右されずお参りができ、駅近などアクセスが良い場所が多いです。",
        link: "/choices/noukotsudou",
        icon: Building,
        suitability: "利便性を重視し、快適にお参りしたい方に選ばれています。",
        caution: "建物の老朽化リスクや、一定期間後に合祀される契約内容の確認が必要です。"
    },
    tree: {
        key: "tree",
        name: "樹木葬",
        description: "墓石の代わりに木や花をシンボルにします。\n自然に還りたい方や、明るい雰囲気を好む方に人気です。",
        link: "/choices/jumokusou",
        icon: Sprout,
        suitability: "自然志向が強く、仰々しいお墓を作りたくない方に向いています。",
        caution: "個別に埋葬されるタイプと、最初から合祀されるタイプがあり、確認が必要です。"
    },
    sea: {
        key: "sea",
        name: "海洋散骨",
        description: "粉末化した遺骨を海に撒きます。\nお墓を持たず、自然の大きなサイクルに還りたい方に適しています。",
        link: "/choices/sankotsu",
        icon: Waves,
        suitability: "特定の場所に縛られたくない、形を残したくないという考えに近い選択肢です。",
        caution: "遺骨が手元に残らないため、後から「お墓参りしたい」と思っても場所がありません（分骨など事前の検討が必要です）。"
    },
    home: {
        key: "home",
        name: "自宅供養（手元供養）",
        description: "遺骨を自宅で保管したり、アクセサリーとして身につけたりする方法です。\n最も身近に故人を感じられます。",
        link: "/choices/temoto-kuyou",
        icon: Home,
        suitability: "まだ離れがたい方、形式よりも気持ちの整理を優先したい方に適しています。",
        caution: "将来的にご自身の管理が難しくなった際の最終的な行き先（永代供養など）を考えておく必要があります。",
        subOptions: [
            { label: "骨箱・自宅安置", link: "/choices/temoto-kuyou" },
            { label: "アクセサリー", link: "/choices/temoto-kuyou", icon: HeartHandshake }
        ]
    },
    diamond: {
        key: "diamond",
        name: "遺骨ダイヤモンド",
        description: "遺骨から抽出した成分で人工ダイヤモンドを作ります。\n究極の形見として、世代を超えて受け継ぐことができます。",
        link: "/choices/ikotsu-diamond",
        icon: Gem,
        suitability: "費用をかけてでも、美しく変わらない形で手元に残したいという想いに応える選択肢です。",
        caution: "製作に数十万円〜の費用と、半年以上の期間がかかります。また、紛失への注意も必要です。"
    }
};

const QUESTIONS: Question[] = [
    {
        id: "q1",
        title: "供養の場所について、一番近い考えは？",
        options: [
            {
                label: "手を合わせる場所がほしい（現地で参拝）",
                value: "visit",
                scores: { general: 3, perpetual: 2, tree: 1 },
                reasonPhrase: "お参りできる場所を重視する"
            },
            {
                label: "屋内で天候に左右されず参拝したい",
                value: "indoor",
                scores: { ossuary: 3 },
                reasonPhrase: "天候や快適さを重視する"
            },
            {
                label: "自然の中に還る形がよい",
                value: "nature",
                scores: { tree: 3, perpetual: 1, sea: 1 },
                reasonPhrase: "自然志向である"
            },
            {
                label: "場所に縛られず、形式より気持ち重視",
                value: "free",
                scores: { sea: 3, home: 1, diamond: 1 },
                reasonPhrase: "場所や形式にとらわれない"
            },
            {
                label: "自宅で身近に感じたい",
                value: "home",
                scores: { home: 3, diamond: 2 },
                reasonPhrase: "身近で供養したい"
            }
        ]
    },
    {
        id: "q2",
        title: "管理や継承（後継ぎ・維持負担）について",
        options: [
            {
                label: "できれば家族に負担を残したくない",
                value: "no_burden",
                scores: { perpetual: 3, tree: 3, sea: 3, home: 2, diamond: 2 },
                reasonPhrase: "ご家族への負担軽減を優先する"
            },
            {
                label: "多少の管理は問題ない",
                value: "some_mgmt",
                scores: { general: 3 },
                reasonPhrase: "ある程度の管理が可能である"
            },
            {
                label: "管理は任せられる形が安心",
                value: "trusted_mgmt",
                scores: { ossuary: 3, perpetual: 2 },
                reasonPhrase: "管理を施設に任せたい"
            },
            {
                label: "管理や手続きがシンプルなものが良い",
                value: "simple",
                scores: { sea: 3, tree: 2, home: 2 },
                reasonPhrase: "シンプルさを重視する"
            }
        ]
    },
    {
        id: "q3",
        title: "費用感のイメージ（初期費用＋維持費）",
        options: [
            {
                label: "なるべく抑えたい",
                value: "low",
                scores: { sea: 3, home: 2, perpetual: 2, tree: 1 },
                reasonPhrase: "費用を抑えたい"
            },
            {
                label: "標準的ならよい",
                value: "standard",
                scores: { ossuary: 3, perpetual: 2, tree: 2, general: 1 },
                reasonPhrase: "標準的な費用感で考えている"
            },
            {
                label: "納得できれば良い（価値重視）",
                value: "value",
                scores: { general: 2, home: 1, diamond: 3 },
                reasonPhrase: "費用よりも納得感や価値を重視する"
            }
        ]
    },
    {
        id: "q4",
        title: "形式・宗教・家族の合意について",
        options: [
            {
                label: "家族や親族の理解を優先したい",
                value: "family_first",
                scores: { general: 3, perpetual: 2, ossuary: 2 },
                reasonPhrase: "親族等の理解を優先する"
            },
            {
                label: "形式より、本人や家族の気持ち優先",
                value: "feeling_first",
                scores: { sea: 3, home: 3, tree: 2, diamond: 3 },
                reasonPhrase: "本人や家族の気持ちを優先する"
            },
            {
                label: "どちらも大事でバランスを取りたい",
                value: "balance",
                scores: { perpetual: 3, ossuary: 2, tree: 2, general: 2 },
                reasonPhrase: "バランスを重視する"
            }
        ]
    },
    {
        id: "q5",
        title: "お墓じまい（改葬）や遺骨準備の状況",
        options: [
            {
                label: "すでに改葬を検討している／必要そう",
                value: "closure",
                scores: { sea: 3, perpetual: 2, home: 2, ossuary: 2 },
                reasonPhrase: "改葬も視野に検討している"
            },
            {
                label: "まだ未定（これから考えたい）",
                value: "undecided",
                scores: { general: 2 },
                reasonPhrase: ""
            },
            {
                label: "すぐではないが将来は整理したい",
                value: "future",
                scores: { perpetual: 2, ossuary: 2, home: 2, tree: 2, diamond: 1 },
                reasonPhrase: "将来的な整理を考慮している"
            }
        ]
    }
];

// --- Component ---

export function DiagnosisWizard() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = QUESTIONS[currentStepIndex];
    const totalSteps = QUESTIONS.length;

    const handleOptionSelect = (value: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    };

    const handleNext = () => {
        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(prev => prev - 1);
        }
    };

    const handleRestart = () => {
        setAnswers({});
        setCurrentStepIndex(0);
        setShowResult(false);
    };

    // Calculate Result
    const sortedCandidates = useMemo(() => {
        const scores: Record<CandidateKey, number> = {
            general: 0, perpetual: 0, ossuary: 0, tree: 0, sea: 0, home: 0, diamond: 0
        };
        const reasons: Record<CandidateKey, string[]> = {
            general: [], perpetual: [], ossuary: [], tree: [], sea: [], home: [], diamond: []
        };

        // Sum up scores and collect reasons
        Object.entries(answers).forEach(([qId, selectedValue]) => {
            const question = QUESTIONS.find(q => q.id === qId);
            const option = question?.options.find(o => o.value === selectedValue);

            if (option && option.scores) {
                Object.entries(option.scores).forEach(([key, score]) => {
                    const cKey = key as CandidateKey;
                    if (score && score > 0) {
                        scores[cKey] += score;
                        // Add reason phrase if it exists and hasn't been added yet
                        if (option.reasonPhrase && !reasons[cKey].includes(option.reasonPhrase)) {
                            reasons[cKey].push(option.reasonPhrase);
                        }
                    }
                });
            }
        });

        // Convert to array and sort
        return Object.entries(scores)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([key, score]) => {
                const cKey = key as CandidateKey;
                const contributingReasons = reasons[cKey];

                let reasonText = "";
                if (contributingReasons.length > 0) {
                    reasonText = `「${contributingReasons.join("」「")}」傾向があるため、\nこの考え方に近い選択肢です。`;
                } else {
                    reasonText = "あなたの回答傾向から、\nバランスの取れた選択肢としておすすめします。";
                }

                return {
                    ...CANDIDATES[cKey],
                    score,
                    generatedReason: reasonText
                };
            });
    }, [answers, showResult]);

    // --- Render ---

    if (showResult) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-primary p-8 text-center text-white">
                        <h2 className="text-2xl font-serif font-bold mb-4">あなたの考え方に近い供養の選択肢</h2>
                        <p className="text-sm opacity-90 leading-relaxed">
                            診断結果はあくまで目安です。状況や気持ちによって最適な選択は変わります。<br />
                            この結果をもとに、少しずつ考えを整理していきましょう。
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {sortedCandidates.map((candidate, index) => (
                                <motion.div
                                    key={candidate.key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-md border-t-4 border-secondary p-6 flex flex-col relative"
                                >
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                        候補 {index + 1}
                                    </div>
                                    <div className="mt-4 flex flex-col items-center text-center grow">
                                        <candidate.icon className="w-12 h-12 text-primary-dark mb-4" />
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{candidate.name}</h3>

                                        {/* Reason Display */}
                                        <div className="bg-primary/5 px-4 py-3 rounded-lg mb-4 text-xs text-primary-dark border border-primary/10 w-full text-left">
                                            <span className="font-bold block mb-1">この結果の理由</span>
                                            <p className="whitespace-pre-wrap leading-relaxed">{candidate.generatedReason}</p>
                                        </div>

                                        <p className="text-sm text-gray-600 leading-relaxed mb-4 grow text-left whitespace-pre-wrap">
                                            {candidate.description}
                                        </p>

                                        <div className="text-xs text-left w-full mb-4 bg-gray-50 p-2 rounded">
                                            <span className="font-bold text-secondary block mb-1">向いている傾向:</span>
                                            {candidate.suitability}
                                        </div>

                                        {/* Sub Options for Home */}
                                        {candidate.key === 'home' && candidate.subOptions && (
                                            <div className="w-full mb-4 space-y-2">
                                                <div className="flex flex-wrap gap-1 sm:gap-2 text-[10px] sm:text-sm">
                                                    {candidate.subOptions.map(sub => (
                                                        <Link key={sub.label} href={sub.link} className="flex-1 min-w-[85px] sm:min-w-[100px]">
                                                            <span className="block py-2 px-1 sm:py-3 sm:px-2 bg-white border border-gray-200 rounded sm:rounded-lg hover:bg-secondary/5 hover:border-secondary hover:text-secondary whitespace-nowrap text-center transition-colors font-bold shadow-sm">
                                                                {sub.label}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {candidate.caution && (
                                            <div className="bg-yellow-50 p-3 rounded text-[10px] text-yellow-800 text-left w-full mb-4 flex gap-2">
                                                <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                                                <span className="leading-tight">{candidate.caution}</span>
                                            </div>
                                        )}

                                        <Link href={candidate.link} className="w-full mt-auto">
                                            <Button variant="outline" className="w-full text-sm font-bold">
                                                詳しく見る
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {/* Search */}
                            <Link href="/search" className="block">
                                <div className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow flex items-center h-full">
                                    <div className="bg-primary/10 p-2 rounded-full mr-3 shrink-0">
                                        <Search className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-primary block">こだわり条件から</span>
                                        <span className="font-bold text-gray-700 text-sm">具体的に探す</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Choices (All) */}
                            <Link href="/choices" className="block">
                                <div className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow flex items-center h-full">
                                    <div className="bg-gray-100 p-2 rounded-full mr-3 shrink-0">
                                        <BookOpen className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-gray-500 block">すべてを比較</span>
                                        <span className="font-bold text-gray-700 text-sm">選択肢一覧へ</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Consult */}
                            <Link href="/consult" className="block">
                                <div className="bg-white border border-secondary/20 p-4 rounded-xl hover:shadow-md transition-shadow flex items-center h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-secondary text-white text-[9px] font-bold px-2 py-0.5 rounded-bl">
                                        無料
                                    </div>
                                    <div className="bg-secondary/10 p-2 rounded-full mr-3 shrink-0">
                                        <HeartHandshake className="w-5 h-5 text-secondary" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-secondary block">個別に相談したい</span>
                                        <span className="font-bold text-gray-700 text-sm">状況を整理する</span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div className="text-center mb-10">
                            <p className="text-[10px] text-gray-500">
                                診断結果と実際の選択は必ずしも一致する必要はありません。<br />
                                迷いがある場合は、まず状況を整理するところから始めましょう。
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <Button variant="ghost" onClick={handleRestart} className="text-gray-400 hover:text-gray-600 flex items-center text-sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                診断をやり直す
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Wizard Render
    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-4 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Step {currentStepIndex + 1}</span>
                <span>of {totalSteps}</span>
            </div>

            <div className="h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 min-h-[400px] flex flex-col"
                >
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-8 text-center leading-relaxed">
                        {currentQuestion.title}
                    </h3>

                    <div className="space-y-4 grow">
                        {currentQuestion.options.map((option) => (
                            <label
                                key={option.value}
                                className={`
                                    flex items-center p-5 rounded-xl border-2 cursor-pointer transition-all
                                    ${answers[currentQuestion.id] === option.value
                                        ? 'border-secondary bg-secondary/5 shadow-md'
                                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name={currentQuestion.id}
                                    value={option.value}
                                    checked={answers[currentQuestion.id] === option.value}
                                    onChange={() => handleOptionSelect(option.value)}
                                    className="hidden"
                                />
                                <div className={`
                                    w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0
                                    ${answers[currentQuestion.id] === option.value
                                        ? 'border-secondary'
                                        : 'border-gray-300'
                                    }
                                `}>
                                    {answers[currentQuestion.id] === option.value && (
                                        <div className="w-3 h-3 rounded-full bg-secondary" />
                                    )}
                                </div>
                                <span className={`font-bold ${answers[currentQuestion.id] === option.value ? 'text-secondary' : 'text-gray-600'}`}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStepIndex === 0}
                            className={`flex items-center ${currentStepIndex === 0 ? 'invisible' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            戻る
                        </Button>

                        <Button
                            variant="primary"
                            onClick={handleNext}
                            disabled={!answers[currentQuestion.id]}
                            className="px-8"
                        >
                            {currentStepIndex === totalSteps - 1 ? "診断結果を見る" : "次へ"}
                            {currentStepIndex < totalSteps - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
