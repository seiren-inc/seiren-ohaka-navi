'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InquiryStatus } from '@/lib/store';
import { Save, AlertCircle } from 'lucide-react';

interface InquiryStatusUpdaterProps {
    inquiryId: string;
    initialStatus: InquiryStatus;
    initialAdminNotes: string | null;
}

export default function InquiryStatusUpdater({
    inquiryId,
    initialStatus,
    initialAdminNotes
}: InquiryStatusUpdaterProps) {
    const router = useRouter();
    const [status, setStatus] = useState<InquiryStatus>(initialStatus);
    const [adminNotes, setAdminNotes] = useState(initialAdminNotes || '');
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);

        try {
            const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status,
                    adminNotes,
                    requestId: crypto.randomUUID()
                })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Failed to update');
            }

            setMessage({ type: 'success', text: '更新を保存しました' });
            router.refresh();
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message || '更新エラーが発生しました' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 mt-4">
            <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                運用ステータス管理
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">対応ステータス</label>
                    <div className="flex bg-white rounded-md border border-gray-300 overflow-hidden w-full max-w-sm">
                        {[
                            { id: 'new', label: '新着' },
                            { id: 'contacted', label: '対応中' },
                            { id: 'pending', label: '保留' },
                            { id: 'done', label: '完了' },
                            { id: 'spam', label: 'スパム' }
                        ].map(s => (
                            <button
                                key={s.id}
                                onClick={() => setStatus(s.id as InquiryStatus)}
                                className={`flex-1 py-2 text-xs font-bold transition-colors ${status === s.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">担当者メモ (非公開)</label>
                    <textarea
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="対応の経緯やメモを記入してください..."
                        className="w-full text-sm p-3 rounded-md border border-gray-300 min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-gray-800 text-white px-4 py-2 rounded-md font-bold text-sm flex items-center gap-2 hover:bg-gray-700 disabled:opacity-50 transition-colors"
                    >
                        <Save className="w-4 h-4" />
                        {isSaving ? '保存中...' : '状態を保存する'}
                    </button>

                    {message && (
                        <span className={`text-sm font-bold flex items-center gap-1 ${message.type === 'success' ? 'text-green-600' : 'text-red-500'
                            }`}>
                            {message.type === 'error' && <AlertCircle className="w-4 h-4" />}
                            {message.text}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
