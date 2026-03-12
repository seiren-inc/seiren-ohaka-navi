"use client";

import { Plan, Temple, PLAN_AVAILABILITY_LABELS, BURIAL_METHOD_LABELS, PET_ALLOWED_LABELS } from "@/lib/store";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { FileText } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface PlanListProps {
    plans: Plan[];
    temple: Temple;
}

export function PlanList({ plans, temple }: PlanListProps) {
    const [currentUrl, setCurrentUrl] = useState("");

    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        if (typeof window !== 'undefined') setCurrentUrl(window.location.href);
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    if (plans.length === 0) {
        return (
            <div className="bg-gray-50 p-8 rounded-lg text-center text-gray-500">
                現在公開されているプランはありません。<br />
                詳細はお問い合わせください。
            </div>
        );
    }

    return (
        <div id="plans" className="space-y-6">
            <h2 className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1">
                プラン・費用一覧
            </h2>

            {/* Plan Comparison Table - 2件以上ある場合のみ表示 */}
            {plans.length >= 2 && (
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                    <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
                        <h3 className="text-sm font-bold text-gray-700">📊 プラン比較</h3>
                    </div>
                    <table className="w-full text-sm min-w-[500px]">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left px-4 py-3 text-xs text-gray-400 font-bold w-28">項目</th>
                                {plans.map((p) => (
                                    <th key={p.id} className="text-center px-4 py-3 text-xs font-bold text-primary">
                                        {p.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">販売価格</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3 font-bold text-primary text-base">
                                        {p.price.toLocaleString()}<span className="text-xs text-gray-500 ml-0.5">円</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">年間管理費</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3 text-sm text-gray-700">
                                        {p.managementFee > 0 ? `${p.managementFee.toLocaleString()}円` : <span className="text-green-600 font-bold">不要</span>}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">埋葬方法</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3 text-sm text-gray-700">
                                        {BURIAL_METHOD_LABELS[p.burialMethod || 'other']}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">ペット</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3 text-sm text-gray-700">
                                        {PET_ALLOWED_LABELS[p.petAllowed || 'unknown']}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">期間</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3 text-sm text-gray-700">
                                        {p.periodType === 'perpetual' ? '永代' : `${p.periodYears}年`}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">人数</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3 text-sm text-gray-700">
                                        {p.capacity || '-'}
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-xs text-gray-500 font-bold">空き状況</td>
                                {plans.map((p) => (
                                    <td key={p.id} className="text-center px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${p.availability === 'available' ? 'bg-blue-100 text-blue-800' :
                                                p.availability === 'limited' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-500'
                                            }`}>
                                            {PLAN_AVAILABILITY_LABELS[p.availability]}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <div className="grid lg:grid-cols-2 gap-6">
                {plans.map((plan) => {
                    const requestUrl = `/consult/request-material?templeId=${temple.id}&templeName=${encodeURIComponent(temple.name)}&planId=${plan.id}&planName=${encodeURIComponent(plan.name)}&ref=plan_list&refUrl=${encodeURIComponent(currentUrl)}`;

                    return (
                        <Card key={plan.id} className="flex flex-col h-full overflow-hidden border-t-4 border-t-primary p-0 bg-white shadow-sm">
                            {/* Header / Name */}
                            <div className="p-5 border-b border-gray-100 flex justify-between items-start gap-4">
                                <div>
                                    <div className="text-xs font-bold text-gray-400 mb-1">{temple.type}</div>
                                    <h3 className="text-lg font-bold text-gray-800">{plan.name}</h3>
                                    {plan.subDescription && (
                                        <p className="text-xs text-gray-500 mt-1">{plan.subDescription}</p>
                                    )}
                                </div>
                                <div className="shrink-0 text-right">
                                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${plan.availability === 'available' ? 'bg-blue-100 text-blue-800' :
                                            plan.availability === 'limited' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-500'
                                        }`}>
                                        {PLAN_AVAILABILITY_LABELS[plan.availability]}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 grow">
                                {/* Price Block */}
                                <div className="flex flex-col sm:flex-row sm:items-end justify-between bg-gray-50 p-4 rounded-lg mb-6">
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 mb-1">販売価格</div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-2xl font-bold text-primary">{plan.price.toLocaleString()}</span>
                                            <span className="text-sm text-gray-600">円</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:mt-0 sm:text-right">
                                        <div className="text-xs font-bold text-gray-500 mb-1">年間管理費</div>
                                        <div className="font-bold text-gray-800">
                                            {plan.managementFee > 0 ? `${plan.managementFee.toLocaleString()}円` : '不要'}
                                        </div>
                                    </div>
                                </div>

                                {/* Specs Grid */}
                                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                                    <SpecItem label="埋葬方法" value={BURIAL_METHOD_LABELS[plan.burialMethod || 'other']} />
                                    <SpecItem label="ペット" value={PET_ALLOWED_LABELS[plan.petAllowed || 'unknown']} />
                                    <SpecItem label="期間" value={plan.periodType === 'perpetual' ? '永代' : `${plan.periodYears}年`} />
                                    <SpecItem label="人数" value={plan.capacity || '-'} />
                                </div>

                                {plan.note && (
                                    <div className="text-xs text-gray-500 bg-yellow-50 p-3 rounded mb-6 border border-yellow-100">
                                        {plan.note}
                                    </div>
                                )}

                                <Link href={requestUrl}>
                                    <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold shadow-sm rounded-lg flex items-center justify-center">
                                        <FileText className="w-4 h-4 mr-2" /> このプランで資料請求
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

function SpecItem({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold mb-0.5">{label}</span>
            <span className="text-sm font-bold text-gray-700">{value}</span>
        </div>
    );
}
