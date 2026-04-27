import { Temple } from "@/lib/store";
import { prisma } from "@/lib/prisma";
import { GraveyardCard } from "../search/GraveyardCard";
import { Button } from "../../ui/Button";
import Link from "next/link";
import { FileText, Sparkles } from "lucide-react";

interface AreaTempleListProps {
    prefecture: string;
    city?: string;
    searchParams: { [key: string]: string | string[] | undefined };
}

function isPrismaConnectivityError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P1001"
    );
}

export async function AreaTempleList({ prefecture, city, searchParams }: AreaTempleListProps) {
    let templesData: unknown[] = [];
    try {
        templesData = await prisma.temple.findMany({
            where: { status: 'public', listedInSearch: true },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        if (isPrismaConnectivityError(error)) {
            console.error("[AreaTempleList] Prisma connectivity error; falling back to empty list", error);
            templesData = [];
        } else {
            throw error;
        }
    }
    let temples = templesData as unknown as Temple[];

    // 1. Area Filter
    temples = temples.filter(t => t.prefecture === prefecture);
    if (city) {
        temples = temples.filter(t => t.cityName === city);
    }

    // 2. Type Filter
    const typeParams = searchParams['type'];
    if (typeParams) {
        const types = Array.isArray(typeParams) ? typeParams : [typeParams];
        temples = temples.filter(t => t.supportedMemorialTypes.some(type => types.includes(type)));
    }

    // 3. Tag Filter
    const tagParams = searchParams['tag'];
    if (tagParams) {
        const tags = Array.isArray(tagParams) ? tagParams : [tagParams];
        temples = temples.filter(t => tags.every(tag => t.tags?.includes(tag as import('@/lib/store').AppealTag)));
    }

    // Sort by plan tier: PR slot / sponsor → standard → free
    const planOrder = (t: Temple) => (t.isPrSlot ? 0 : t.planType === 'sponsor' ? 0 : t.planType === 'standard' ? 1 : 2);
    temples.sort((a, b) => planOrder(a) - planOrder(b));

    // PR固定枠（isPrSlot=true または planType=sponsor）とそれ以外に分割
    const prTemples = temples.filter(t => t.isPrSlot || t.planType === 'sponsor');
    const regularTemples = temples.filter(t => !t.isPrSlot && t.planType !== 'sponsor');

    if (temples.length === 0) {
        return (
            <div className="bg-gray-50 p-12 text-center rounded-lg">
                <p className="text-gray-600 mb-4">条件に一致する霊園は見つかりませんでした。</p>
                <Link href="/search">
                    <Button variant="outline">条件をリセットして検索</Button>
                </Link>
            </div>
        );
    }

    // Inject "CvIntervention" after 5th regular item
    const interventionIndex = 4;

    return (
        <div className="space-y-8">
            {/* PR固定枠セクション */}
            {prTemples.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                            PR・おすすめ掲載
                        </span>
                        <div className="flex-1 h-px bg-amber-100" />
                    </div>
                    <div className="space-y-4">
                        {prTemples.map(temple => (
                            <div key={temple.id} className="ring-1 ring-amber-300 rounded-xl overflow-hidden shadow-sm">
                                <GraveyardCard data={temple} />
                            </div>
                        ))}
                    </div>
                    {regularTemples.length > 0 && (
                        <div className="flex items-center gap-2 pt-2">
                            <div className="flex-1 h-px bg-gray-100" />
                            <span className="text-xs text-gray-400">通常掲載</span>
                            <div className="flex-1 h-px bg-gray-100" />
                        </div>
                    )}
                </div>
            )}

            {/* 通常掲載 */}
            <div className="space-y-6">
                {regularTemples.map((temple, index) => (
                    <div key={temple.id}>
                        <GraveyardCard data={temple} />

                        {/* Intervention */}
                        {index === interventionIndex && (
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center my-8">
                                <h3 className="font-bold text-orange-800 mb-2">条件が決まらない方へ</h3>
                                <p className="text-sm text-orange-700 mb-4">
                                    「どの霊園が良いかわからない」「プロに探してほしい」という方は、<br className="hidden md:block" />
                                    専門スタッフが無料でご提案します。
                                </p>
                                <Link href="/consult/grave-search">
                                    <Button className="bg-orange-600 hover:bg-orange-700 text-white font-bold w-full md:w-auto">
                                        <FileText className="w-4 h-4 mr-2" /> プロに相談する（無料）
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
