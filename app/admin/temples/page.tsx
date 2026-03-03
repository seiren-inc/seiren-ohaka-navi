import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { prisma } from "../../../lib/prisma";
import { TempleListClient } from "./TempleListClient";

export const dynamic = 'force-dynamic';

export default async function TempleList() {
    const temples = await prisma.temple.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            phone: true,
            status: true,
            prefecture: true,
            calendar: true,
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">登録寺院一覧</h2>
                <Link href="/admin/temples/new">
                    <Button className="font-bold">＋ 新規登録</Button>
                </Link>
            </div>
            <TempleListClient temples={temples} />
        </div>
    );
}
