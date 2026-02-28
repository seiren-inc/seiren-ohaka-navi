"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, ArrowRight, CheckCircle, RefreshCw,
    Sprout, Building, Waves, HeartHandshake, Gem, Landmark, Home,
    AlertCircle, BookOpen, Search, SkipForward,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/Button";
import { Disclaimer } from "../../diagnosis/Disclaimer";

// --- 分離ロジック ---
import { DIAGNOSIS_QUESTIONS } from "../../../../lib/diagnosis/rules";
import { calculateScores, getTopTypes } from "../../../../lib/diagnosis/score";
import { generateExplanation } from "../../../../lib/diagnosis/explain";
import { SUPPLY_TYPE_INFO, type SupplyTypeKey, type DiagnosisAnswers } from "../../../../lib/diagnosis/types";
import { DiagnosisEvents, trackDiagnosisEvent } from "../../../../lib/analytics/events";

// --- アイコンマッピング ---
const TYPE_ICONS: Record<SupplyTypeKey, React.ElementType> = {
    general: Landmark,
    perpetual: Landmark,
    ossuary: Building,
    tree: Sprout,
    sea: Waves,
    home: Home,
    diamond: Gem,
};

// --- Component ---
export function DiagnosisWizard() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<DiagnosisAnswers>({});
    const [showResult, setShowResult] = useState(false);
    const [hasTrackedStart, setHasTrackedStart] = useState(false);

    const currentQuestion = DIAGNOSIS_QUESTIONS[currentStepIndex];
    const totalSteps = DIAGNOSIS_QUESTIONS.length;

    // 診断開始イベント（初回のみ）
    useEffect(() => {
        if (!hasTrackedStart) {
            trackDiagnosisEvent(DiagnosisEvents.START);
            setHasTrackedStart(true);
        }
    }, [hasTrackedStart]);

    const handleOptionSelect = (value: string) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    };

    const handleNext = () => {
        // ステップ完了イベント
        trackDiagnosisEvent(DiagnosisEvents.STEP_COMPLETE, {
            step: currentQuestion.id,
            step_index: currentStepIndex + 1,
        });

        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleSkip = () => {
        // 任意質問のスキップ
        trackDiagnosisEvent(DiagnosisEvents.STEP_COMPLETE, {
            step: currentQuestion.id,
            step_index: currentStepIndex + 1,
            skipped: true,
        });

        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const handleRestart = () => {
        setAnswers({});
        setCurrentStepIndex(0);
        setShowResult(false);
    };

    // --- スコア算出（分離ロジック使用） ---
    const { topScores, explanation } = useMemo(() => {
        if (!showResult) return { topScores: [], explanation: null };

        const allScores = calculateScores(answers);
        const top = getTopTypes(allScores, 3);
        const explain = generateExplanation(answers, top);

        // 診断完了イベント
        trackDiagnosisEvent(DiagnosisEvents.COMPLETE);
        top.forEach((s) => {
            trackDiagnosisEvent(DiagnosisEvents.RESULT_TYPE, {
                type: s.type,
                score: s.score,
            });
        });

        return { topScores: top, explanation: explain };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showResult]);

    // --- 結果画面 ---
    if (showResult && explanation) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* ヘッダー */}
                    <div className="bg-primary p-8 text-center text-white">
                        <h2 className="text-2xl font-serif font-bold mb-4">
                            あなたの考え方に近い供養の選択肢
                        </h2>
                        <p className="text-sm opacity-90 leading-relaxed">
                            診断結果はあくまで目安です。状況や気持ちによって最適な選択は変わります。<br />
                            この結果をもとに、少しずつ考えを整理していきましょう。
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50">
                        {/* 重視された点 */}
                        {explanation.topReasons.length > 0 && (
                            <div className="bg-white border border-primary/20 rounded-xl p-5 mb-8">
                                <h3 className="text-sm font-bold text-primary mb-3 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    あなたの回答で重視された点
                                </h3>
                                <ul className="space-y-1">
                                    {explanation.topReasons.map((reason, i) => (
                                        <li key={i} className="text-sm text-gray-700 flex items-start">
                                            <span className="text-secondary mr-2 mt-0.5">•</span>
                                            {reason}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* 候補カード */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {topScores.map((scoreResult, index) => {
                                const info = SUPPLY_TYPE_INFO[scoreResult.type];
                                const Icon = TYPE_ICONS[scoreResult.type];
                                const reason = explanation.typeReasons[scoreResult.type];
                                const caution = explanation.cautions[scoreResult.type];

                                return (
                                    <motion.div
                                        key={scoreResult.type}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white rounded-xl shadow-md border-t-4 border-secondary p-6 flex flex-col relative"
                                    >
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                                            候補 {index + 1}
                                        </div>
                                        <div className="mt-4 flex flex-col items-center text-center grow">
                                            <Icon className="w-12 h-12 text-primary-dark mb-4" />
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{info.name}</h3>

                                            {/* スコアバー */}
                                            <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                                                <div
                                                    className="bg-secondary h-2 rounded-full transition-all"
                                                    style={{ width: `${scoreResult.score}%` }}
                                                />
                                            </div>

                                            {/* 合致理由 */}
                                            {reason && (
                                                <div className="bg-primary/5 px-4 py-3 rounded-lg mb-4 text-xs text-primary-dark border border-primary/10 w-full text-left">
                                                    <span className="font-bold block mb-1">この結果の理由</span>
                                                    <p className="leading-relaxed">{reason}</p>
                                                </div>
                                            )}

                                            <p className="text-sm text-gray-600 leading-relaxed mb-4 grow text-left">
                                                {info.description}
                                            </p>

                                            <div className="text-xs text-left w-full mb-4 bg-gray-50 p-2 rounded">
                                                <span className="font-bold text-secondary block mb-1">向いている傾向:</span>
                                                {info.suitability}
                                            </div>

                                            {/* 注意点 */}
                                            {caution && (
                                                <div className="bg-yellow-50 p-3 rounded text-[10px] text-yellow-800 text-left w-full mb-4 flex gap-2">
                                                    <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
                                                    <span className="leading-tight">{caution}</span>
                                                </div>
                                            )}

                                            <Link href={info.link} className="w-full mt-auto">
                                                <Button variant="outline" className="w-full text-sm font-bold">
                                                    詳しく見る
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* CTA */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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

                            <Link
                                href="/consult"
                                className="block"
                                onClick={() => trackDiagnosisEvent(DiagnosisEvents.CLICK_CONSULT)}
                            >
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

                        {/* 免責 */}
                        <Disclaimer />

                        <div className="text-center mt-6">
                            <Button
                                variant="ghost"
                                onClick={handleRestart}
                                className="text-gray-400 hover:text-gray-600 flex items-center text-sm mx-auto"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                診断をやり直す
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- ウィザード画面 ---
    return (
        <div className="max-w-2xl mx-auto">
            {/* ステップ表示 */}
            <div className="mb-4 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span>Step {currentStepIndex + 1}</span>
                <span>of {totalSteps}</span>
            </div>

            {/* 進捗バー */}
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
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-2 text-center leading-relaxed">
                        {currentQuestion.title}
                    </h3>
                    {currentQuestion.subtitle && (
                        <p className="text-sm text-gray-400 text-center mb-6">{currentQuestion.subtitle}</p>
                    )}
                    {!currentQuestion.subtitle && <div className="mb-6" />}

                    {/* 必須/任意バッジ */}
                    <div className="flex justify-center mb-4">
                        {currentQuestion.required ? (
                            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">必須</span>
                        ) : (
                            <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded">任意（スキップ可）</span>
                        )}
                    </div>

                    {/* 選択肢 */}
                    <div className="space-y-3 grow">
                        {currentQuestion.options.map((option) => (
                            <label
                                key={option.value}
                                className={`
                                    flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                                    ${answers[currentQuestion.id as keyof DiagnosisAnswers] === option.value
                                        ? "border-secondary bg-secondary/5 shadow-md"
                                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name={currentQuestion.id}
                                    value={option.value}
                                    checked={answers[currentQuestion.id as keyof DiagnosisAnswers] === option.value}
                                    onChange={() => handleOptionSelect(option.value)}
                                    className="hidden"
                                />
                                <div className={`
                                    w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center shrink-0
                                    ${answers[currentQuestion.id as keyof DiagnosisAnswers] === option.value
                                        ? "border-secondary"
                                        : "border-gray-300"
                                    }
                                `}>
                                    {answers[currentQuestion.id as keyof DiagnosisAnswers] === option.value && (
                                        <div className="w-3 h-3 rounded-full bg-secondary" />
                                    )}
                                </div>
                                <span className={`font-bold text-sm ${answers[currentQuestion.id as keyof DiagnosisAnswers] === option.value ? "text-secondary" : "text-gray-600"}`}>
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    {/* ナビゲーション */}
                    <div className="mt-8 flex items-center justify-between pt-6 border-t border-gray-100">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={currentStepIndex === 0}
                            className={`flex items-center ${currentStepIndex === 0 ? "invisible" : "text-gray-400 hover:text-gray-600"}`}
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            戻る
                        </Button>

                        <div className="flex items-center gap-2">
                            {/* 任意質問のスキップボタン */}
                            {!currentQuestion.required && (
                                <Button
                                    variant="ghost"
                                    onClick={handleSkip}
                                    className="text-gray-400 hover:text-gray-600 flex items-center text-sm"
                                >
                                    <SkipForward className="w-4 h-4 mr-1" />
                                    スキップ
                                </Button>
                            )}

                            <Button
                                variant="primary"
                                onClick={handleNext}
                                disabled={currentQuestion.required && !answers[currentQuestion.id as keyof DiagnosisAnswers]}
                                className="px-8"
                            >
                                {currentStepIndex === totalSteps - 1 ? "診断結果を見る" : "次へ"}
                                {currentStepIndex < totalSteps - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
