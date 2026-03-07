'use client';
import { useState } from 'react';
import { Copy, Trash2, CheckCircle2, ImageIcon, AlertTriangle } from 'lucide-react';

type ImageItem = { name: string; url: string; size: number; path: string; bucket: string };

function formatBytes(bytes: number) {
    if (!bytes) return '—';
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function ImageCard({
    item,
    onDelete,
}: {
    item: ImageItem;
    onDelete: (item: ImageItem) => void;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(item.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
            <div className="aspect-video bg-gray-100 overflow-hidden">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
            </div>
            {/* Hover overlay */}
            <button
                onClick={() => onDelete(item)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"
                title="削除"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
            <div className="p-3">
                <p className="text-xs font-bold text-gray-700 truncate" title={item.name}>{item.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{formatBytes(item.size)}</p>
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleCopy}
                        className="flex-1 flex items-center justify-center gap-1 text-xs py-1.5 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        {copied ? <CheckCircle2 className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'コピー済み' : 'URLコピー'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function ImageManagerClient({
    mainItems: initialMain,
    galleryItems: initialGallery,
}: {
    mainItems: ImageItem[];
    galleryItems: ImageItem[];
}) {
    const [tab, setTab] = useState<'main' | 'gallery'>('main');
    const [mainItems, setMainItems] = useState(initialMain);
    const [galleryItems, setGalleryItems] = useState(initialGallery);
    const [confirmTarget, setConfirmTarget] = useState<ImageItem | null>(null);
    const [deleting, setDeleting] = useState(false);

    const items = tab === 'main' ? mainItems : galleryItems;

    const handleDelete = async () => {
        if (!confirmTarget) return;
        setDeleting(true);
        try {
            const res = await fetch('/api/images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path: confirmTarget.path, bucket: confirmTarget.bucket }),
            });
            if (res.ok) {
                if (tab === 'main') setMainItems(prev => prev.filter(i => i.path !== confirmTarget.path));
                else setGalleryItems(prev => prev.filter(i => i.path !== confirmTarget.path));
            } else {
                alert('削除に失敗しました');
            }
        } catch {
            alert('削除に失敗しました');
        } finally {
            setDeleting(false);
            setConfirmTarget(null);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2 border-b">
                {([
                    { key: 'main', label: `メイン画像 (${mainItems.length})` },
                    { key: 'gallery', label: `ギャラリー (${galleryItems.length})` },
                ] as const).map(t => (
                    <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${tab === t.key ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {items.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
                    <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="font-bold">画像がありません</p>
                    <p className="text-xs mt-1">寺院の編集画面から画像をアップロードしてください</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {items.map(item => (
                        <ImageCard key={item.name} item={item} onDelete={setConfirmTarget} />
                    ))}
                </div>
            )}

            {/* 削除確認モーダル */}
            {confirmTarget && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">画像を削除しますか？</p>
                                <p className="text-xs text-gray-500 mt-0.5">この操作は取り消せません</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <img src={confirmTarget.url} alt="" className="w-full aspect-video object-cover rounded mb-2" />
                            <p className="text-xs text-gray-600 truncate font-mono">{confirmTarget.name}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setConfirmTarget(null)}
                                className="flex-1 py-2.5 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors disabled:opacity-60"
                            >
                                {deleting ? '削除中...' : '削除する'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
