"use client";

import { FacilityPlan } from "../mock";
import { X, CheckCircle2, MapPin, CalendarCheck, Mail, Phone } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import Link from "next/link";
import { useEffect } from "react";

interface PlanDetailModalProps {
    plan: FacilityPlan | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PlanDetailModal({ plan, isOpen, onClose }: PlanDetailModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleEsc);
        } else {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEsc);
        }
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !plan) return null;

    // stop propagation for modal content click
    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 transition-opacity animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200"
                onClick={handleContentClick}
                role="dialog"
                aria-modal="true"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
                    aria-label="閉じる"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                {/* Header Section */}
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex gap-2 mb-2">
                        <span className="bg-primary text-white text-xs px-2 py-0.5 rounded font-bold">
                            {plan.typeName}
                        </span>
                        <span className="bg-safe-green/10 text-safe-green text-xs px-2 py-0.5 rounded font-bold border border-safe-green/20">
                            空きあり
                        </span>
                    </div>
                    <h2 className="font-serif text-2xl font-bold text-primary mb-2">
                        {plan.name}
                    </h2>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-warm-gold">
                            {plan.price.toLocaleString()}
                        </span>
                        <span className="text-sm font-bold text-gray-600">円</span>
                        <span className="text-xs text-gray-500 ml-2">（総額目安）</span>
                    </div>
                    {plan.maintenanceFee !== undefined && (
                        <p className="text-xs text-gray-500 mt-1">
                            年間管理費: {plan.maintenanceFee === 0 ? "なし" : `${plan.maintenanceFee.toLocaleString()}円`}
                        </p>
                    )}
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Image */}
                    <div>
                        <div className="aspect-video w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 mb-4 overflow-hidden relative">
                            {/* In real implementation, use Image component */}
                            {plan.imageUrl ? (
                                <div className={`w-full h-full bg-cover bg-center`} style={{ backgroundImage: `url(${plan.imageUrl})` }} />
                            ) : (
                                <span className="flex flex-col items-center">
                                    <MapPin className="w-8 h-8 mb-2 opacity-50" />
                                    No Image
                                </span>
                            )}
                            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                                イメージ
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-loose">
                            {plan.description}
                        </p>
                    </div>

                    {/* Right: Spec & Features */}
                    <div className="space-y-6">
                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                            {plan.features.map((f, i) => (
                                <span key={i} className="flex items-center text-xs text-primary bg-white border border-primary/20 px-3 py-1.5 rounded-full shadow-sm">
                                    <CheckCircle2 className="w-3 h-3 mr-1.5 text-secondary" />
                                    {f}
                                </span>
                            ))}
                        </div>

                        {/* Specs Table */}
                        <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                            <dl className="divide-y divide-gray-100 text-sm">
                                <div className="grid grid-cols-3 p-3">
                                    <dt className="text-gray-500 font-bold text-xs pt-1">埋葬方法</dt>
                                    <dd className="col-span-2 text-gray-700 font-medium">
                                        {plan.type === 'tree' ? '樹木葬（個別/合祀）' : plan.type === 'eitai' ? '合祀' : plan.type === 'noukotsudou' ? '納骨堂' : '一般墓'}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                    <dt className="text-gray-500 font-bold text-xs pt-1">利用人数</dt>
                                    <dd className="col-span-2 text-gray-700 font-medium">{plan.capacity || "要確認"}</dd>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                    <dt className="text-gray-500 font-bold text-xs pt-1">使用期限</dt>
                                    <dd className="col-span-2 text-gray-700 font-medium">
                                        {plan.type === 'general' ? '永代使用' : '13年〜33年（その後合祀）'}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                    <dt className="text-gray-500 font-bold text-xs pt-1">ペット</dt>
                                    <dd className="col-span-2 text-gray-700 font-medium">
                                        {plan.features.some(f => f.includes("ペット")) ? "共葬可" : "不可"}
                                    </dd>
                                </div>
                                <div className="grid grid-cols-3 p-3">
                                    <dt className="text-gray-500 font-bold text-xs pt-1">備考</dt>
                                    <dd className="col-span-2 text-gray-500 text-xs leading-relaxed">
                                        ※価格は税込です。年間管理費は別途必要になる場合があります。詳細はお問い合わせください。
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="p-6 bg-white border-t border-gray-100 mt-auto sticky bottom-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <p className="text-center text-xs text-gray-500 mb-4">
                        この区画について、まずは空き状況や詳細資料をお問い合わせください
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        <Link href="/consult/grave-search" className="w-full">
                            <Button size="lg" className="w-full bg-warm-gold hover:bg-warm-gold/90 text-white font-bold h-12 shadow-md">
                                <CalendarCheck className="w-5 h-5 mr-2" />
                                見学予約（無料）
                            </Button>
                        </Link>
                        <Link href="/consult/grave-search" className="w-full">
                            <Button size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white font-bold h-12">
                                <Mail className="w-5 h-5 mr-2" />
                                資料請求（無料）
                            </Button>
                        </Link>
                        <div className="hidden lg:block w-full">
                            <a href="tel:0120-000-000" className="w-full">
                                <Button size="lg" variant="ghost" className="w-full text-gray-600 hover:text-primary hover:bg-gray-50 font-bold h-12">
                                    <Phone className="w-5 h-5 mr-2" />
                                    電話で相談
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
