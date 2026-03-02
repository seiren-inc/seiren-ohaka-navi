import { prisma } from "@/lib/prisma";
import { Temple } from "@/lib/store";
import { GraveyardCard } from "../../features/search/GraveyardCard";

export async function NearbyTemples({ currentId }: { currentId: string }) {
    const nearbyData = await prisma.temple.findMany({
        where: { id: { not: currentId }, status: 'public', listedInSearch: true },
        take: 3,
        orderBy: { createdAt: 'desc' }
    });
    const nearby = nearbyData as unknown as Temple[];

    if (nearby.length === 0) return null;

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-primary text-center mb-8 relative">
                <span className="bg-white-smoke px-4 relative z-10">近隣・関連の霊園</span>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-0"></div>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearby.map(t => (
                    <GraveyardCard key={t.id} data={t} />
                ))}
            </div>
        </div>
    );
}
