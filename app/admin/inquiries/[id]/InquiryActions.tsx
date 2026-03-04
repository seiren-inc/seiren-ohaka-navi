'use client';
import { useState, useTransition } from 'react';
import { CheckCircle2, Clock, Archive, Mail } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'new', label: '新着', color: 'bg-red-100 text-red-700', icon: Clock },
    { value: 'inProgress', label: '対応中', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
    { value: 'done', label: '完了', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
    { value: 'archived', label: 'アーカイブ', color: 'bg-gray-100 text-gray-600', icon: Archive },
];

export function InquiryActions({
    inquiryId,
    initialStatus,
    initialAdminNotes,
    contactEmail,
    contactName,
    templeNameSnapshot,
}: {
    inquiryId: string;
    initialStatus: string;
    initialAdminNotes: string | null;
    contactEmail?: string | null;
    contactName?: string | null;
    templeNameSnapshot?: string | null;
}) {
    const [status, setStatus] = useState(initialStatus);
    const [adminNotes, setAdminNotes] = useState(initialAdminNotes || '');
    const [saved, setSaved] = useState(false);
    const [isPending, startTransition] = useTransition();

    const patch = (data: Record<string, string>) => {
        startTransition(async () => {
            await fetch(`/api/inquiries/${inquiryId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        });
    };

    const handleStatusChange = (newStatus: string) => {
        setStatus(newStatus);
        patch({ status: newStatus });
    };

    const handleSaveNotes = () => {
        patch({ adminNotes });
    };

    const current = STATUS_OPTIONS.find(s => s.value === status) || STATUS_OPTIONS[0];

    return (
        <div className="space-y-6">
            {/* ステータス変更 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <current.icon className="w-4 h-4" /> 対応ステータス
                </h3>
                <div className="flex gap-2 flex-wrap">
                    {STATUS_OPTIONS.map(s => (
                        <button
                            key={s.value}
                            onClick={() => handleStatusChange(s.value)}
                            disabled={isPending}
                            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all ${
                                status === s.value
                                    ? `${s.color} border-transparent ring-2 ring-offset-1 ring-primary/30`
                                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
                {saved && <p className="text-xs text-green-600 mt-2 font-bold">✓ 保存しました</p>}
            </div>

            {/* 管理者メモ */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-3">管理者メモ（社内用）</h3>
                <textarea
                    className="w-full border p-3 rounded-lg h-32 text-sm resize-none"
                    placeholder="対応内容・引き継ぎ事項などを記入..."
                    value={adminNotes}
                    onChange={e => setAdminNotes(e.target.value)}
                />
                <div className="flex items-center justify-between mt-2">
                    {contactEmail && (
                        <a
                            href={`mailto:${contactEmail}?subject=${encodeURIComponent(`【お問い合わせ返信】${templeNameSnapshot || ''}に関するご連絡`)}&body=${encodeURIComponent(`${contactName || 'お客様'}様\n\nこのたびはお問い合わせいただきありがとうございます。\n${templeNameSnapshot ? `${templeNameSnapshot}についてのご連絡です。` : ''}\n\n`)}`}
                            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/5 transition-colors"
                        >
                            <Mail className="w-4 h-4" /> 返信メールを作成
                        </a>
                    )}
                    <button
                        onClick={handleSaveNotes}
                        disabled={isPending}
                        className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60 ml-auto"
                    >
                        {isPending ? '保存中...' : 'メモを保存'}
                    </button>
                </div>
            </div>
        </div>
    );
}
