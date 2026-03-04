'use client';

import { useState } from 'react';
import { Zap, CreditCard } from 'lucide-react';

interface PlanUpgradeButtonProps {
    planType: string;
    hasStripeCustomer: boolean;
}

export function PlanUpgradeButton({ planType, hasStripeCustomer }: PlanUpgradeButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpgrade = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/portal/billing/checkout', { method: 'POST' });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'エラーが発生しました。');
                return;
            }
            window.location.href = data.url;
        } catch {
            setError('通信エラーが発生しました。');
        } finally {
            setLoading(false);
        }
    };

    const handleManageBilling = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="font-bold text-gray-800 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        {planType === 'free' ? 'プランをアップグレード' : '請求管理'}
                    </p>
                    {planType === 'free' ? (
                        <p className="text-xs text-gray-500 mt-1">
                            標準プランにアップグレードして露出を強化しましょう。
                        </p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1">
                            サブスクリプションの管理・解約はこちらから。
                        </p>
                    )}
                    {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
                </div>
                {planType === 'free' ? (
                    <button
                        id="stripe-upgrade-btn"
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="shrink-0 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        <Zap className="w-4 h-4" />
                        {loading ? '処理中...' : 'アップグレード'}
                    </button>
                ) : hasStripeCustomer ? (
                    <button
                        id="stripe-billing-portal-btn"
                        onClick={handleManageBilling}
                        disabled={loading}
                        className="shrink-0 flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/5 transition-colors disabled:opacity-50"
                    >
                        <CreditCard className="w-4 h-4" />
                        {loading ? '処理中...' : '請求管理'}
                    </button>
                ) : null}
            </div>
        </div>
    );
}
