"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/Button";
import { Upload, X, Loader2, Trash2, ArrowLeft, ArrowRight, Plus } from "lucide-react";

interface GalleryUploaderProps {
    images: string[];
    onChange: (urls: string[]) => void;
    folder?: string;
    label?: string;
}

export const GalleryUploader = ({ images = [], onChange, folder = "gallery", label = "ギャラリー画像" }: GalleryUploaderProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        // Validation Batch
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.startsWith("image/")) {
                setError("画像ファイルのみアップロード可能です");
                return;
            }
            if (files[i].size > 5 * 1024 * 1024) {
                setError("1ファイルあたり5MB以下にしてください");
                return;
            }
        }

        setError(null);
        setIsUploading(true);

        // Upload Sequentially (to preserve order roughly, or Parallel)
        // Parallel usually fine.
        const newUrls: string[] = [];
        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", folder);

                const res = await fetch("/api/upload/image", { method: "POST", body: formData });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                return data.url as string;
            });

            const uploaded = await Promise.all(uploadPromises);
            onChange([...images, ...uploaded]);
        } catch (err) {
            console.error(err);
            setError("一部の画像のアップロードに失敗しました");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    const confirmRemove = (index: number) => {
        setDeleteIndex(index);
    };

    const executeRemove = () => {
        if (deleteIndex === null) return;
        const next = [...images];
        next.splice(deleteIndex, 1);
        onChange(next);
        setDeleteIndex(null);
    };

    const moveImage = (index: number, direction: 'prev' | 'next') => {
        const next = [...images];
        const targetIndex = direction === 'prev' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= next.length) return;

        const temp = next[index];
        next[index] = next[targetIndex];
        next[targetIndex] = temp;
        onChange(next);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                {label && <label className="block text-sm font-bold text-gray-700">{label} ({images.length}枚)</label>}
                <Button size="sm" variant="outline" onClick={() => inputRef.current?.click()} disabled={isUploading}>
                    <Plus className="w-4 h-4 mr-2" /> 追加アップロード
                </Button>
            </div>

            <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFiles}
            />

            {error && <p className="text-xs text-red-500 font-bold mb-2 flex items-center gap-1"><X className="w-3 h-3" /> {error}</p>}

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((url, i) => (
                    <div key={`${url}-${i}`} className="group relative aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                        <img src={url} className="w-full h-full object-cover" />

                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                            <div className="flex justify-end">
                                <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmRemove(i); }} className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex justify-between items-center">
                                <button type="button"
                                    onClick={() => moveImage(i, 'prev')}
                                    className={`p-1 bg-white/20 text-white rounded hover:bg-white/40 transition-colors ${i === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    disabled={i === 0}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <span className="text-xs text-white font-mono">{i + 1}</span>
                                <button type="button"
                                    onClick={() => moveImage(i, 'next')}
                                    className={`p-1 bg-white/20 text-white rounded hover:bg-white/40 transition-colors ${i === images.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                                    disabled={i === images.length - 1}
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Adding Placeholder (Always visible at end or if empty) */}
                <div
                    className="aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-primary transition-all text-gray-400 hover:text-primary"
                    onClick={() => inputRef.current?.click()}
                >
                    {isUploading ? (
                        <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                        <>
                            <Plus className="w-8 h-8 mb-2" />
                            <span className="text-xs font-bold">画像を追加</span>
                        </>
                    )}
                </div>
            </div>

            {/* Custom Confirm Modal */}
            {deleteIndex !== null && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50" onClick={(e) => { e.stopPropagation(); }}>
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
                        <h3 className="font-bold text-lg mb-4">画像を削除しますか？</h3>
                        <p className="text-gray-600 mb-6 text-sm">この操作は取り消せません。</p>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setDeleteIndex(null)}>キャンセル</Button>
                            <Button className="bg-red-500 hover:bg-red-600 border-red-500 text-white" onClick={executeRemove}>削除する</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
