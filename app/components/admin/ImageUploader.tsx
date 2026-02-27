"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/Button";
import { Upload, X, Loader2, Image as ImageIcon, Trash2 } from "lucide-react";

interface ImageUploaderProps {
    value: string | null;
    onChange: (url: string | null) => void;
    folder?: string;
    label?: string;
}

export const ImageUploader = ({ value, onChange, folder = "misc", label = "画像" }: ImageUploaderProps) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Frontend Validation
        if (!file.type.startsWith("image/")) {
            setError("画像ファイルを選択してください");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("5MB以下のファイルを選択してください");
            return;
        }

        setError(null);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        try {
            const res = await fetch("/api/upload/image", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Upload failed");

            onChange(data.url);
        } catch (err) {
            console.error(err);
            setError("アップロードに失敗しました");
        } finally {
            setIsUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-bold text-text-primary">{label}</label>}

            <div className="border-2 border-dashed border-border rounded-xl p-4 bg-bg hover:bg-white transition-colors">
                <input
                    type="file"
                    ref={inputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {isUploading ? (
                    <div className="flex flex-col items-center justify-center h-48 gap-3 text-text-muted">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-sm font-bold">アップロード中...</span>
                    </div>
                ) : value ? (
                    <div className="relative group rounded-lg overflow-hidden border border-border bg-white">
                        <img src={value} alt="Preview" className="w-full h-64 object-cover" />

                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="bg-white hover:bg-bg text-primary-dark border-none shadow-lg"
                                onClick={() => inputRef.current?.click()}
                            >
                                <Upload className="w-4 h-4 mr-2" /> 差し替え
                            </Button>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-lg font-medium transition-transform active:scale-95 duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-3 text-base bg-red-500 hover:bg-red-600 text-white border-none shadow-lg"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setShowDeleteConfirm(true);
                                }}
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> 削除
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className="flex flex-col items-center justify-center h-48 gap-3 text-text-muted cursor-pointer hover:text-primary transition-colors"
                        onClick={() => inputRef.current?.click()}
                    >
                        <div className="bg-white p-4 rounded-full shadow-sm border">
                            <Upload className="w-8 h-8" />
                        </div>
                        <div className="text-center">
                            <p className="font-bold">クリックして画像を選択</p>
                            <p className="text-xs mt-1 opacity-70">またはドラッグ&ドロップ (最大5MB)</p>
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="text-xs text-red-500 font-bold flex items-center gap-1"><X className="w-3 h-3" /> {error}</p>}

            {/* Custom Confirm Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50" onClick={(e) => { e.stopPropagation(); }}>
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full m-4">
                        <h3 className="font-bold text-lg mb-4">画像を削除しますか？</h3>
                        <p className="text-text-secondary mb-6 text-sm">この操作は取り消せません。</p>
                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>キャンセル</Button>
                            <Button className="bg-red-500 hover:bg-red-600 border-red-500 text-white" onClick={() => { onChange(null); setShowDeleteConfirm(false); }}>削除する</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
