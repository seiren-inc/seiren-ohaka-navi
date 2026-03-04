'use client';

import { useState } from 'react';
import { Zap, Star, CreditCard } from 'lucide-react';

interface PlanUpgradeButtonProps {
    planType: string;
    hasStripeCustomer: boolean;
}

const PLANS = [
    {
        key: 'standard',
        label: 'Standard',
        price: '¥3,000',
        period: '/ 月',
        description: '一覧優先表示・CTA強化・AI紹介文',
        icon: Zap,
        buttonClass: 'bg-primary text-white hover:bg-primary/90',
        cardClass: 'border-primary/30 bg-primary/5',
    },
    {
        key: 'sponsor',
        label: 'Sponsor',
        price: '¥9,800',
        period: '/ 月',
        description: '地域TOP固定枠・リアルタイムレポート',
        icon: Star,
        buttonClass: 'bg-amber-500 text-white hover:bg-amber-600',
        cardClass: 'border-amber-300 bg-amber-50',
    },
];

export function PlanUpgradeButton({ planType, hasStripeCustomer }: PlanUpgradeButtonProps) {
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUpgrade = async (selectedPlan: string) => {
        setLoading(selectedPlan);
        setError(null);
        try {
            const res = await fetch('/api/portal/billing/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planType: selectedPlan }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'エラーが発生しました。');
                return;
            }
            window.location.href = data.url;
        } catch {
            setError('通信エラーが発生しました。');
        } finally {
            setLoading(null);
        }
    };

    const handleManageBilling = async () => {
        setLoading('portal');
        setError(null);
        try {
            const res = await fetch('/api/portal/billing/portal', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'エラーが発生しました。');
                return;
            }
            window.location.href = data.url;
        } catch {
            setError('通信エラーが発生しました。');
        } finally {
            setLoading(null);
        }
    };

    // 有料プラン加入済み → 請求管理のみ表示
    if (planType !== 'free') {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 flex items-center justify-between gap-4">
                <div>
                    <p className="font-bold text-gray-800 text-sm">
                        現在のプラン: {planType === 'standard' ? 'Standard' : 'Sponsor'}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        プランの変更・解約はStripeの請求管理から行えます。
                    </p>
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>
                {hasStripeCustomer && (
                    <button
                        id="stripe-billing-portal-btn"
                        onClick={handleManageBilling}
                        disabled={loading === 'portal'}
                        className="shrink-0 flex items-center gap-2 border border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        <CreditCard className="w-4 h-4" />
                        {loading === 'portal' ? '処理中...' : '請求管理'}
                    </button>
                )}
            </div>
        );
    }

    // 無料プラン → プラン選択 UI
    return (
        <div className="border border-gray-200 rounded-xl p-5 space-y-3">
            <p className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                プランをアップグレード
            </p>
            <div className="grid grid-cols-2 gap-3">
                {PLANS.map(plan => (
                    <div key={plan.key} className={`border rounded-xl p-4 ${plan.cardClass}`}>
                        <div className="flex items-center gap-2 mb-1">
                            <plan.icon className="w-4 h-4" />
                            <span className="font-bold text-sm">{plan.label}</span>
                        </div>
                        <p className="text-lg font-black text-gray-800">
                            {plan.price}
                            <span className="text-xs font-normal text-gray-500">{plan.period}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1 mb-3">{plan.description}</p>
                        <button
                            id={`stripe-upgrade-${plan.key}-btn`}
                            onClick={() => handleUpgrade(plan.key)}
                            disabled={loading === plan.key}
                            className={`w-full py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 ${plan.buttonClass}`}
                        >
                            {loading === plan.key ? '処理中...' : `${plan.label} にする`}
                        </button>
                    </div>
                ))}
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}
