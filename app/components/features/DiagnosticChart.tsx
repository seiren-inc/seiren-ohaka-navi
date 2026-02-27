"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, RefreshCw, ArrowRight, User, Users, Heart, Sprout, Building, Wallet, Landmark } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

type Step = "successor" | "priority" | "result";
type SuccessorAnswer = "yes" | "no" | "unsure";
type PriorityAnswer = "tradition" | "cost" | "nature" | "convenience";

interface DiagnosisResult {
    type: string;
    description: string;
    link: string;
    icon: React.ElementType;
}

export function DiagnosticChart() {
    const [step, setStep] = useState<Step>("successor");
    const [successor, setSuccessor] = useState<SuccessorAnswer | null>(null);
    const [priority, setPriority] = useState<PriorityAnswer | null>(null);

    const handleSuccessor = (answer: SuccessorAnswer) => {
        setSuccessor(answer);
        setStep("priority");
    };

    const handlePriority = (answer: PriorityAnswer) => {
        setPriority(answer);
        setStep("result");
    };

    const reset = () => {
        setStep("successor");
        setSuccessor(null);
        setPriority(null);
    };

    const getResult = (): DiagnosisResult => {
        // Logic:
        // Priority takes precedence for Nature (Tree) and Convenience (Ossuary).
        // If Cost is priority, encourage Perpetual.
        // If Tradition is priority:
        //    - AND has successor -> General Grave
        //    - AND no successor -> Perpetual (with explanation) or General (with caveat)
        //      *Standard advice is General requires successor. So if No Successor & Tradition -> Suggest Perpetual/General is hard.*
        //      Let's stick to the prompt's implied logic but keep it safe.

        if (priority === "nature") {
            return {
                type: "樹木葬 (じゅもくそう)",
                description: "自然に還りたい、明るい雰囲気で眠りたい方に最適です。継承者がいなくても利用できるプランが一般的です。",
                link: "/choices/jumokusou",
                icon: Sprout
            };
        }

        if (priority === "convenience") {
            return {
                type: "納骨堂 (のうこつどう)",
                description: "天候を気にせずお参りでき、アクセスが良い場所に多いのが特徴です。管理の手間も少なく安心です。",
                link: "/choices/noukotsudou",
                icon: Building
            };
        }

        if (priority === "cost") {
            return {
                type: "永代供養墓 (えいたいくようぼ)",
                description: "費用を抑えつつ、お寺や霊園に供養・管理を任せられます。後々の負担を残したくない方にも選ばれています。",
                link: "/choices/eitai-kuyou",
                icon: Wallet
            };
        }

        if (priority === "tradition") {
            if (successor === "yes") {
                return {
                    type: "一般墓 (いっぱんぼ)",
                    description: "代々受け継いでいく伝統的なお墓です。家族の絆を形に残し、個別にゆっくりとお参りできます。",
                    link: "/search?type=general", // Assuming search supports type or just general search
                    icon: Landmark
                };
            } else {
                // Tradition wanted but no successor -> Perpetual or suggestion to reconsider
                return {
                    type: "永代供養墓 (個別安置タイプ)",
                    description: "「本当は石のお墓がいいけれど、継ぐ人がいない」という方には、一定期間個別に安置される永代供養墓がおすすめです。",
                    link: "/choices/eitai-kuyou",
                    icon: Landmark
                };
            }
        }

        // Fallback
        return {
            type: "永代供養墓",
            description: "将来の負担が少なく、お寺や霊園が責任を持って供養してくれるお墓です。",
            link: "/choices/eitai-kuyou",
            icon: Heart
        };
    };

    const result = getResult();

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-3xl mx-auto my-12">
            <div className="bg-seiren-navy p-6 text-center text-white">
                <h3 className="font-serif text-xl font-bold flex items-center justify-center gap-2">
                    <CheckCircle className="w-6 h-6 text-secondary" />
                    あなたに合う供養方法は？ 10秒診断
                </h3>
            </div>

            <div className="p-6 md:p-10 min-h-[300px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {step === "successor" && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <h4 className="text-xl font-bold text-center text-primary-dark mb-8">
                                Q1. お墓を継ぐ人（承継者）はいますか？
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <button
                                    onClick={() => handleSuccessor("yes")}
                                    className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all group"
                                >
                                    <Users className="w-8 h-8 text-gray-400 group-hover:text-secondary mb-3" />
                                    <span className="font-bold text-gray-700">いる</span>
                                </button>
                                <button
                                    onClick={() => handleSuccessor("no")}
                                    className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all group"
                                >
                                    <User className="w-8 h-8 text-gray-400 group-hover:text-secondary mb-3" />
                                    <span className="font-bold text-gray-700">いない</span>
                                </button>
                                <button
                                    onClick={() => handleSuccessor("unsure")}
                                    className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all group"
                                >
                                    <span className="text-xl font-bold text-gray-400 group-hover:text-secondary mb-3">?</span>
                                    <span className="font-bold text-gray-700">わからない</span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === "priority" && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full"
                        >
                            <h4 className="text-xl font-bold text-center text-primary-dark mb-8">
                                Q2. もっとも重視したいポイントは？
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => handlePriority("tradition")}
                                    className="flex items-center p-5 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all text-left group"
                                >
                                    <Landmark className="w-6 h-6 text-gray-400 group-hover:text-secondary mr-4 flex-shrink-0" />
                                    <span className="font-bold text-gray-700">伝統や格式を大切にしたい</span>
                                </button>
                                <button
                                    onClick={() => handlePriority("cost")}
                                    className="flex items-center p-5 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all text-left group"
                                >
                                    <Wallet className="w-6 h-6 text-gray-400 group-hover:text-secondary mr-4 flex-shrink-0" />
                                    <span className="font-bold text-gray-700">費用をなるべく抑えたい</span>
                                </button>
                                <button
                                    onClick={() => handlePriority("nature")}
                                    className="flex items-center p-5 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all text-left group"
                                >
                                    <Sprout className="w-6 h-6 text-gray-400 group-hover:text-secondary mr-4 flex-shrink-0" />
                                    <span className="font-bold text-gray-700">自然な雰囲気・明るさ</span>
                                </button>
                                <button
                                    onClick={() => handlePriority("convenience")}
                                    className="flex items-center p-5 rounded-xl border-2 border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all text-left group"
                                >
                                    <Building className="w-6 h-6 text-gray-400 group-hover:text-secondary mr-4 flex-shrink-0" />
                                    <span className="font-bold text-gray-700">お参りのしやすさ・手軽さ</span>
                                </button>
                            </div>
                            <div className="mt-6 text-center">
                                <button onClick={() => setStep("successor")} className="text-sm text-gray-400 hover:text-gray-600 underline">
                                    戻る
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === "result" && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full text-center"
                        >
                            <p className="text-sm font-bold text-gray-500 mb-2">診断結果</p>
                            <h4 className="text-xl md:text-3xl font-bold text-primary-dark mb-6">
                                あなたにおすすめなのは<br />
                                <span className="text-secondary mt-2 inline-block font-serif text-3xl md:text-4xl border-b-4 border-secondary/20 pb-1">
                                    {result.type}
                                </span>
                            </h4>

                            <div className="bg-gray-50 p-6 rounded-xl mb-8 border border-gray-100 max-w-lg mx-auto">
                                <result.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                                <p className="text-gray-700 leading-relaxed">
                                    {result.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href={result.link}>
                                    <Button size="lg" className="w-full sm:w-auto px-8 shadow-md">
                                        詳しく見る <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <button
                                    onClick={reset}
                                    className="flex items-center text-gray-400 hover:text-primary-dark px-4 py-3 text-sm font-bold transition-colors"
                                >
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    はじめからやり直す
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
