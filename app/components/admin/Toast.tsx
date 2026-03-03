'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle2, XCircle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
type Toast = { id: string; type: ToastType; message: string };

const ToastContext = createContext<{
    toast: (message: string, type?: ToastType) => void;
}>({ toast: () => {} });

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback((message: string, type: ToastType = 'success') => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, type, message }]);
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
    }, []);

    const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
                {toasts.map(t => (
                    <div
                        key={t.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl border backdrop-blur-sm pointer-events-auto animate-in slide-in-from-right-8 fade-in duration-300 min-w-64 max-w-sm ${
                            t.type === 'success'
                                ? 'bg-white/95 border-green-200 text-gray-800'
                                : t.type === 'error'
                                ? 'bg-white/95 border-red-200 text-gray-800'
                                : 'bg-white/95 border-blue-200 text-gray-800'
                        }`}
                    >
                        {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
                        {t.type === 'error' && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                        {t.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                        <p className="text-sm font-bold flex-1">{t.message}</p>
                        <button onClick={() => remove(t.id)} className="text-gray-400 hover:text-gray-600 shrink-0">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
