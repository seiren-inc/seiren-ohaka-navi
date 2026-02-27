
import { Store } from "../../lib/store";

export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-xl font-medium text-primary-dark mb-8">ダッシュボード</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-7 rounded-[--radius-lg] shadow-[--shadow-xs] border border-border">
                    <h3 className="text-sm font-medium text-text-muted mb-3 tracking-wide">新着問い合わせ</h3>
                    <p className="text-3xl font-medium text-primary-dark">
                        {Store.getInquiries().filter(i => i.status === 'new').length}
                        <span className="text-sm font-normal text-text-muted ml-2">件</span>
                    </p>
                </div>
                <div className="bg-white p-7 rounded-[--radius-lg] shadow-[--shadow-xs] border border-border">
                    <h3 className="text-sm font-medium text-text-muted mb-3 tracking-wide">登録寺院数</h3>
                    <p className="text-3xl font-medium text-primary-dark">
                        {Store.getTemples().length}
                        <span className="text-sm font-normal text-text-muted ml-2">件</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
