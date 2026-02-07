"use client";

import { useState } from "react";
import { FacilityPlan } from "../mock";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { PlanDetailModal } from "./PlanDetailModal";

interface PlanAccordionProps {
    plans: FacilityPlan[];
}

export function PlanAccordion({ plans }: PlanAccordionProps) {
    // Group plans by typeName
    const grouped = plans.reduce((acc, plan) => {
        if (!acc[plan.typeName]) acc[plan.typeName] = [];
        acc[plan.typeName].push(plan);
        return acc;
    }, {} as Record<string, FacilityPlan[]>);

    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
        Object.keys(grouped).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Modal State
    const [selectedPlan, setSelectedPlan] = useState<FacilityPlan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggle = (key: string) => {
        setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const openModal = (plan: FacilityPlan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Optional: clear selectedPlan after animation if needed, but keeping it ensures content doesn't jump while fading out
    };

    return (
        <div className="space-y-6">
            {Object.entries(grouped).map(([typeName, groupPlans]) => (
                <div key={typeName} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    {/* Header */}
                    <button
                        onClick={() => toggle(typeName)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                        <h3 className="font-bold text-lg text-seiren-navy flex items-center">
                            <span className="w-1 h-6 bg-seiren-navy mr-3 rounded-full" />
                            {typeName}
                            <span className="ml-2 text-sm text-gray-500 font-normal">({groupPlans.length}件)</span>
                        </h3>
                        {openGroups[typeName] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>

                    {/* Content */}
                    {openGroups[typeName] && (
                        <div className="divide-y divide-gray-100">
                            {groupPlans.map(plan => (
                                <div
                                    key={plan.id}
                                    className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                                    onClick={() => openModal(plan)}
                                >
                                    {/* Image Placeholder */}
                                    <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center text-xs text-gray-400 relative overflow-hidden">
                                        {plan.imageUrl ? (
                                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${plan.imageUrl})` }} />
                                        ) : (
                                            "No Image"
                                        )}
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-10 transition-opacity" />
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex flex-col sm:flex-row justify-between mb-2">
                                            <div>
                                                <div className="flex gap-2 mb-2">
                                                    {plan.maintenanceFee === 0 && (
                                                        <span className="bg-safe-green/10 text-safe-green text-[10px] px-2 py-0.5 rounded font-bold">年間管理費0円</span>
                                                    )}
                                                    <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded">
                                                        {plan.capacity}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-seiren-navy text-lg mb-1 group-hover:text-secondary transition-colors">{plan.name}</h4>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-warm-gold">
                                                    {plan.price >= 10000 ? `${plan.price / 10000}` : plan.price.toLocaleString()}
                                                    <span className="text-sm font-normal text-gray-600 ml-1">{plan.price >= 10000 ? '万円' : '円'}</span>
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    (総額目安)
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {plan.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-dotted border-gray-200 pt-3 mt-auto">
                                            <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                                                {plan.features.map(f => (
                                                    <span key={f} className="text-[10px] text-gray-500 border border-gray-200 px-2 py-1 rounded-full">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="w-full sm:w-auto text-xs group-hover:bg-seiren-navy group-hover:text-white group-hover:border-seiren-navy transition-all"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal(plan);
                                                }}
                                            >
                                                詳細を見る <ChevronRight className="w-3 h-3 ml-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <PlanDetailModal
                plan={selectedPlan}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}
