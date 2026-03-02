
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
    // Fetch counts directly from DB
    const newInquiriesCount = await prisma.inquiry.count({
        where: { status: 'new' }
    });
    const totalTemplesCount = await prisma.temple.count();

    // For now, let's just show links
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">新着問い合わせ</h3>
                    <p className="text-4xl font-bold text-primary">
                        {newInquiriesCount}
                        <span className="text-sm font-normal text-gray-500 ml-2">件</span>
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">登録寺院数</h3>
                    <p className="text-4xl font-bold text-primary">
                        {totalTemplesCount}
                        <span className="text-sm font-normal text-gray-500 ml-2">件</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
