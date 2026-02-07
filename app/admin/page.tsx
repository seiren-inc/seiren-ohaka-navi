
import { Store } from "../../lib/store";
import { Card } from "../../components/ui/Card";

export default function AdminDashboard() {
    // Note: In real app, this should be server component fetching data via API or DB
    // Since Store is in-memory and shared via module import in this dev environment, it works.
    // In production, GET /api/stats would be better.

    // For now, let's just show links
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ダッシュボード</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">新着問い合わせ</h3>
                    <p className="text-4xl font-bold text-seiren-navy">
                        {Store.getInquiries().filter(i => i.status === 'new').length}
                        <span className="text-sm font-normal text-gray-500 ml-2">件</span>
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-700 mb-2">登録寺院数</h3>
                    <p className="text-4xl font-bold text-seiren-navy">
                        {Store.getTemples().length}
                        <span className="text-sm font-normal text-gray-500 ml-2">件</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
