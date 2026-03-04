import { Temple } from "@/lib/store";
import { prisma } from "@/lib/prisma";
import { GraveyardCard } from "../search/GraveyardCard";
import { Button } from "../../ui/Button";
import Link from "next/link";
import { FileText } from "lucide-react";

interface AreaTempleListProps {
    prefecture: string;
    city?: string;
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function AreaTempleList({ prefecture, city, searchParams }: AreaTempleListProps) {
    let templesData = await prisma.temple.findMany({
        where: { status: 'public', listedInSearch: true },
        orderBy: { createdAt: 'desc' }
    });
    let temples = templesData as unknown as Temple[];

    // 1. Area Filter
    temples = temples.filter(t => t.prefecture === prefecture);
    if (city) {
        temples = temples.filter(t => t.cityName === city); // Precise match for now
    }

    // 2. Type Filter
    const typeParams = searchParams['type'];
    if (typeParams) {
        const types = Array.isArray(typeParams) ? typeParams : [typeParams];
        // If temple supports ANY of the selected types
        temples = temples.filter(t => t.supportedMemorialTypes.some(type => types.includes(type)));
    }

    // 3. Tag Filter
    const tagParams = searchParams['tag'];
    if (tagParams) {
        const tags = Array.isArray(tagParams) ? tagParams : [tagParams];
        // If temple has ANY of the selected tags (OR logic for tags usually, or AND?)
        // Let's use AND for tags to narrow down? Or OR?
        // UI says "Filter", implying narrowing. Let's use OR for user friendliness initially, but AND is stricter.
        // Let's use AND logic: Must have ALL selected tags.
        temples = temples.filter(t => tags.every(tag => t.tags?.includes(tag as import('@/lib/store').AppealTag)));
    }

    // Sort by plan tier: PR slot → standard → free
    const planOrder = (t: Temple) => (t.isPrSlot ? 0 : t.planType === 'sponsor' ? 0 : t.planType === 'standard' ? 1 : 2);
    temples.sort((a, b) => planOrder(a) - planOrder(b));


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

    // Inject "CvIntervention" after 5th item
    const interventionIndex = 4;

    return (
        <div className="space-y-6">
            {temples.map((temple, index) => (
                <div key={temple.id}>
                    {/* Render Card */}
                    {/* 
                       Note: We are reusing GraveyardCard.
                       The User Requirement says: "Direct Request (Shortcut)" mode.
                       The current GraveyardCard *already* has a "Request Material" button that links to form with context.
                       So it fits the requirement "Data Request Button -> /consult/request-material...".
                       We verify this in code review:
                       `const requestUrl = /consult/request-material?templeId=${data.id}...` -> YES.
                    */}
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
    );
}
