import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get("period") || "30";

    const now = new Date();
    const dateFrom = period !== "all"
        ? new Date(now.getTime() - Number(period) * 24 * 60 * 60 * 1000)
        : undefined;

    // 全期間 + 当月 + 先月 の件数を並列取得
    const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [allInquiries, thisMonthCount, lastMonthCount] = await Promise.all([
        prisma.inquiry.findMany({
            where: dateFrom ? { createdAt: { gte: dateFrom } } : {},
            select: {
                templeId: true,
                templeNameSnapshot: true,
                category: true,
                type: true,
                kind: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        }),
        prisma.inquiry.count({
            where: { createdAt: { gte: startOfThisMonth } },
        }),
        prisma.inquiry.count({
            where: {
                createdAt: { gte: startOfLastMonth, lt: startOfThisMonth },
            },
        }),
    ]);

    // カテゴリ判定ヘルパー
    const getCategory = (inq: { category: string | null; type: string | null; kind: string }) => {
        if (inq.kind === "business") return "business";
        if (inq.category === "grave_closure" || inq.type === "grave_closure") return "grave_closure";
        if (inq.category === "ikotsu_service") return "ikotsu_service";
        if (inq.category === "grave_search" || inq.category === "consult") return "grave_search";
        return "general";
    };

    // 全体カテゴリ集計
    const byCategory: Record<string, number> = {};
    for (const inq of allInquiries) {
        const cat = getCategory(inq);
        byCategory[cat] = (byCategory[cat] || 0) + 1;
    }

    // 施設別集計
    const templeMap = new Map<string, {
        templeId: string;
        templeName: string;
        total: number;
        byCategory: Record<string, number>;
        lastLeadAt: Date | null;
    }>();

    for (const inq of allInquiries) {
        const key = inq.templeId || "__none__";
        const name = inq.templeNameSnapshot || "(施設未指定)";
        const cat = getCategory(inq);

        if (!templeMap.has(key)) {
            templeMap.set(key, { templeId: key, templeName: name, total: 0, byCategory: {}, lastLeadAt: null });
        }
        const entry = templeMap.get(key)!;
        entry.total++;
        entry.byCategory[cat] = (entry.byCategory[cat] || 0) + 1;
        if (!entry.lastLeadAt || inq.createdAt > entry.lastLeadAt) {
            entry.lastLeadAt = inq.createdAt;
        }
    }

    const byTemple = Array.from(templeMap.values())
        .sort((a, b) => b.total - a.total)
        .map(t => ({ ...t, lastLeadAt: t.lastLeadAt?.toISOString() || null }));

    return NextResponse.json({
        totalLeads: allInquiries.length,
        thisMonth: thisMonthCount,
        lastMonth: lastMonthCount,
        byCategory,
        byTemple,
    });
}
