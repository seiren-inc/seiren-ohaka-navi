"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BarChart2, TrendingUp, Users, MessageSquare, FileText, Download, ChevronRight, Trophy } from "lucide-react";
import Link from "next/link";

interface TempleLeadStat {
    templeId: string;
    templeName: string;
    total: number;
    byCategory: Record<string, number>;
    lastLeadAt: string | null;
}

interface Stats {
    totalLeads: number;
    thisMonth: number;
    lastMonth: number;
    byCategory: Record<string, number>;
    byTemple: TempleLeadStat[];
}

const CATEGORY_LABELS: Record<string, string> = {
    grave_search: "お墓探し",
    grave_closure: "墓じまい",
    ikotsu_service: "遺骨供養",
    general: "その他",
};

const CATEGORY_COLORS: Record<string, string> = {
    grave_search: "bg-emerald-100 text-emerald-700",
    grave_closure: "bg-amber-100 text-amber-700",
    ikotsu_service: "bg-purple-100 text-purple-700",
    general: "bg-gray-100 text-gray-600",
};

export default function LeadAnalyticsPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState<"all" | "30" | "90">("30");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const r = await fetch(`/api/admin/leads?period=${period}`);
                const data = await r.json();
                setStats(data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [period]);

    const handleExportCSV = () => {
        if (!stats) return;
        const rows = [
            ["施設名", "合計リード数", "お墓探し", "墓じまい", "遺骨供養", "その他", "最終リード日"],
            ...stats.byTemple.map(t => [
                t.templeName,
                t.total,
                t.byCategory.grave_search || 0,
                t.byCategory.grave_closure || 0,
                t.byCategory.ikotsu_service || 0,
                t.byCategory.general || 0,
                t.lastLeadAt ? new Date(t.lastLeadAt).toLocaleDateString("ja-JP") : "-",
            ]),
        ];
        const csv = rows.map(r => r.join(",")).join("\n");
        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `leads_${period === "all" ? "全期間" : period + "日"}_${new Date().toLocaleDateString("ja-JP").replace(/\//g, "")}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const growthRate = stats && stats.lastMonth > 0
        ? Math.round(((stats.thisMonth - stats.lastMonth) / stats.lastMonth) * 100)
        : null;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <BarChart2 className="w-6 h-6 text-primary" /> リード集計レポート
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">施設別の問い合わせ・資料請求実績（営業資料として活用可）</p>
                </div>
                <button
                    onClick={handleExportCSV}
                    disabled={!stats}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                    <Download className="w-4 h-4" /> CSV出力
                </button>
            </div>

            {/* Period Filter */}
            <div className="flex gap-2 bg-white border border-gray-200 rounded-lg p-1 w-fit">
                {[{ key: "30", label: "直近30日" }, { key: "90", label: "直近90日" }, { key: "all", label: "全期間" }].map(({ key, label }) => (
                    <button
                        key={key}
                        onClick={() => setPeriod(key as any)}
                        className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${period === key ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
                    {[1, 2, 3].map(i => <div key={i} className="h-28 bg-gray-100 rounded-xl" />)}
                </div>
            ) : stats ? (
                <>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: MessageSquare, label: "総リード数", value: `${stats.totalLeads}件`, color: "text-primary", bg: "bg-primary/5" },
                            { icon: TrendingUp, label: "今月のリード", value: `${stats.thisMonth}件`, color: "text-emerald-600", bg: "bg-emerald-50", sub: growthRate !== null ? `前月比 ${growthRate >= 0 ? "+" : ""}${growthRate}%` : undefined },
                            { icon: Users, label: "掲載施設数", value: `${stats.byTemple.length}施設`, color: "text-blue-600", bg: "bg-blue-50" },
                            { icon: Trophy, label: "最多リード施設", value: stats.byTemple[0]?.templeName?.slice(0, 10) || "-", color: "text-amber-600", bg: "bg-amber-50", sub: stats.byTemple[0] ? `${stats.byTemple[0].total}件` : undefined },
                        ].map(card => (
                            <div key={card.label} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center mb-3`}>
                                    <card.icon className={`w-5 h-5 ${card.color}`} />
                                </div>
                                <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                                <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                                {card.sub && <p className="text-xs text-gray-400 mt-1">{card.sub}</p>}
                            </div>
                        ))}
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                        <h2 className="font-bold text-gray-800 mb-4">カテゴリ別リード内訳</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {Object.entries(stats.byCategory).map(([cat, count]) => (
                                <div key={cat} className={`rounded-lg p-3 text-center ${CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-600"}`}>
                                    <p className="text-xs font-bold mb-1">{CATEGORY_LABELS[cat] || cat}</p>
                                    <p className="text-2xl font-bold">{count}</p>
                                    <p className="text-xs mt-0.5">件</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Per-Temple Table */}
                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="font-bold text-gray-800 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" /> 施設別リード実績
                            </h2>
                            <span className="text-xs text-gray-400">{stats.byTemple.length}施設</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                                    <tr>
                                        <th className="px-5 py-3 text-left">施設名</th>
                                        <th className="px-4 py-3 text-right">合計</th>
                                        <th className="px-4 py-3 text-right">お墓探し</th>
                                        <th className="px-4 py-3 text-right">墓じまい</th>
                                        <th className="px-4 py-3 text-right">遺骨供養</th>
                                        <th className="px-4 py-3 text-right">最終日</th>
                                        <th className="px-4 py-3" />
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {stats.byTemple.length === 0 ? (
                                        <tr><td colSpan={7} className="text-center py-12 text-gray-400">データなし</td></tr>
                                    ) : stats.byTemple.map((t, i) => (
                                        <tr key={t.templeId} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3.5 font-bold text-gray-800 flex items-center gap-2">
                                                {i < 3 && (
                                                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${i === 0 ? "bg-amber-100 text-amber-600" : i === 1 ? "bg-gray-100 text-gray-500" : "bg-orange-50 text-orange-500"}`}>
                                                        {i + 1}位
                                                    </span>
                                                )}
                                                {t.templeName || "(施設未指定)"}
                                            </td>
                                            <td className="px-4 py-3.5 text-right font-bold text-primary text-base">{t.total}</td>
                                            <td className="px-4 py-3.5 text-right text-gray-600">{t.byCategory.grave_search || 0}</td>
                                            <td className="px-4 py-3.5 text-right text-gray-600">{t.byCategory.grave_closure || 0}</td>
                                            <td className="px-4 py-3.5 text-right text-gray-600">{t.byCategory.ikotsu_service || 0}</td>
                                            <td className="px-4 py-3.5 text-right text-gray-400 text-xs">
                                                {t.lastLeadAt ? new Date(t.lastLeadAt).toLocaleDateString("ja-JP") : "-"}
                                            </td>
                                            <td className="px-4 py-3.5 text-right">
                                                <Link href={`/admin/inquiries?templeId=${t.templeId}`} className="text-primary hover:underline text-xs font-bold flex items-center justify-end gap-0.5">
                                                    詳細 <ChevronRight className="w-3 h-3" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-gray-400 text-center py-12">データの取得に失敗しました。</p>
            )}
        </div>
    );
}
