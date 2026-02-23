"use client";

import { useState, useEffect, useMemo } from "react";
import { X, Phone, Mail, CheckCircle2, Loader2, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { format, addMinutes, isBefore, isAfter, set, startOfDay, addDays } from "date-fns";
import { Button } from "../../../components/ui/Button";
import { Temple, CalendarSettings } from "../../../../lib/store";

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    temple: Temple;
    defaultDate: Date | null;
}

type Tab = 'tel' | 'form';
type Step = 1 | 2 | 3;

export function InquiryModal({ isOpen, onClose, temple, defaultDate }: InquiryModalProps) {
    const cal = temple.calendar;

    const [activeTab, setActiveTab] = useState<Tab>('form');
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [receiptNumber, setReceiptNumber] = useState<string>("");

    // Initialize Tab based on channels
    useEffect(() => {
        if (isOpen && cal) {
            if (cal.bookingChannels.includes('form')) setActiveTab('form');
            else if (cal.bookingChannels.includes('phone')) setActiveTab('tel');
        }
    }, [isOpen, cal]);

    // Form Data
    const [formData, setFormData] = useState({
        preferredDate: "",
        preferredTime: "",
        preferredDate2: "",
        preferredTime2: "",
        name: "", phone: "", email: "", message: "",
        privacyCheck: false, honeypot: "",
    });

    useEffect(() => {
        if (defaultDate) {
            setFormData(prev => ({ ...prev, preferredDate: format(defaultDate, 'yyyy-MM-dd') }));
        }
    }, [defaultDate, isOpen]);

    useEffect(() => { if (!isOpen) { setCurrentStep(1); setReceiptNumber(""); setFormData(p => ({ ...p, preferredTime: "" })); } }, [isOpen]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const requestId = crypto.randomUUID();

            // Construct payload based on formData
            // Note: formData has preferredDate/Time, name, phone, email, message
            // We need to map this to Inquiry object expected by API
            const payload = {
                kind: 'general', // Default for general inquiry
                requestId,
                // Context
                context: {
                    source: 'inquiry_modal',
                    templeId: temple.id,
                    templeName: temple.name,
                    pagePath: typeof window !== 'undefined' ? window.location.pathname : '',
                },
                // User Info
                user: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                },
                // Inquiry details
                message: formData.message,
                preferredDateTime: `${formData.preferredDate} ${formData.preferredTime}`,
                preferredDateTime2: formData.preferredDate2 ? `${formData.preferredDate2} ${formData.preferredTime2}` : undefined,

                // Honeypot check (if implemented on server, but for now just send empty hidden field if exists)
                honeypot: formData.honeypot
            };

            const response = await fetch('/api/inquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.error || '送信に失敗しました');
            }

            if (!resData.success || !resData.saved?.receiptNumber) {
                throw new Error('完了を確認できませんでした');
            }

            // Success
            console.log(`[INQUIRY_SENT_MODAL] id=${resData.saved.id} receipt=${resData.saved.receiptNumber}`);
            setReceiptNumber(resData.saved.receiptNumber);
        } catch (e: any) {
            console.error(e);
            alert(`送信に失敗しました: ${e.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;
    if (receiptNumber) return <SuccessView onClose={onClose} receiptNumber={receiptNumber} message={cal.requestMessage} />;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in" onClick={onClose}>
            <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative flex flex-col animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <div className="bg-seiren-navy text-white p-4 flex justify-between items-center sticky top-0 z-10">
                    <h2 className="font-bold text-lg">お問い合わせ・見学予約</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                </div>

                {/* Tabs */}
                {cal.bookingChannels.length > 1 && (
                    <div className="flex border-b border-gray-200">
                        {cal.bookingChannels.includes('form') && (
                            <button onClick={() => setActiveTab('form')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'form' ? 'border-secondary text-secondary bg-secondary/5' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>
                                <Mail className="w-4 h-4" /> 予約フォーム
                            </button>
                        )}
                        {cal.bookingChannels.includes('phone') && (
                            <button onClick={() => setActiveTab('tel')} className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${activeTab === 'tel' ? 'border-secondary text-secondary bg-secondary/5' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>
                                <Phone className="w-4 h-4" /> 電話で相談
                            </button>
                        )}
                    </div>
                )}

                <div className="p-6">
                    {activeTab === 'tel' && <TelTab temple={temple} />}
                    {activeTab === 'form' && (
                        <div>
                            <div className="flex items-center justify-center mb-8 gap-4 text-xs font-bold text-gray-400">
                                <StepIndicator step={1} current={currentStep} label="日時" />
                                <div className={`h-px w-8 ${currentStep >= 2 ? 'bg-seiren-navy' : 'bg-gray-200'}`} />
                                <StepIndicator step={2} current={currentStep} label="情報" />
                                <div className={`h-px w-8 ${currentStep >= 3 ? 'bg-seiren-navy' : 'bg-gray-200'}`} />
                                <StepIndicator step={3} current={currentStep} label="確認" />
                            </div>

                            {currentStep === 1 && <Step1 formData={formData} setFormData={setFormData} onNext={() => setCurrentStep(2)} temple={temple} />}
                            {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />}
                            {currentStep === 3 && <Step3 formData={formData} onBack={() => setCurrentStep(2)} onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const StepIndicator = ({ step, current, label }: { step: number, current: number, label: string }) => (
    <div className={`flex items-center gap-2 ${current >= step ? 'text-seiren-navy' : ''}`}>
        <span className={`w-6 h-6 rounded-full flex items-center justify-center ${current >= step ? 'bg-seiren-navy text-white' : 'bg-gray-200 text-gray-500'}`}>{step}</span>
        {label}
    </div>
);

function Step1({ formData, setFormData, onNext, temple }: { formData: any, setFormData: any, onNext: () => void, temple: Temple }) {
    const cal = temple.calendar;

    // Generate Time Slots based on selected date
    const timeSlots = useMemo(() => {
        if (!formData.preferredDate || !cal) return [];
        const date = new Date(formData.preferredDate);
        if (isNaN(date.getTime())) return [];

        const slots: string[] = [];
        const [startH, startM] = cal.startTime.split(':').map(Number);
        const [endH, endM] = cal.endTime.split(':').map(Number);

        let slotTime = set(date, { hours: startH, minutes: startM, seconds: 0 });
        const endTimeDate = set(date, { hours: endH, minutes: endM, seconds: 0 });

        // Simple generation (ignoring complex cutoff logic here for simplicity in manual Date picking, or replicate logic)
        // Replicating basic logic:
        while (isBefore(slotTime, endTimeDate)) {
            // Basic Start Time validity
            slots.push(format(slotTime, 'HH:mm'));
            slotTime = addMinutes(slotTime, cal.slotIntervalMinutes);
        }
        return slots;
    }, [formData.preferredDate, cal]);

    return (
        <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4">
                <p className="text-xs font-bold text-gray-500 mb-1">見学対象</p>
                <p className="font-bold text-seiren-navy">{temple.name}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">第1希望日時 <span className="text-red-500">*</span></label>
                    <div className="space-y-3">
                        <input type="date" className="w-full border border-gray-300 rounded p-3 font-mono" value={formData.preferredDate} onChange={e => setFormData({ ...formData, preferredDate: e.target.value, preferredTime: "" })} />

                        {formData.preferredDate && (
                            <div className="grid grid-cols-4 gap-2">
                                {timeSlots.length > 0 ? timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setFormData({ ...formData, preferredTime: time })}
                                        className={`py-2 px-1 text-sm rounded border transition-colors ${formData.preferredTime === time ? 'bg-seiren-navy text-white border-seiren-navy' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {time}
                                    </button>
                                )) : <div className="col-span-4 text-center text-xs text-gray-400 py-2">この日の予約枠はありません</div>}
                            </div>
                        )}
                        {!formData.preferredDate && <div className="text-xs text-gray-400">日付を選択すると時間が表示されます</div>}
                    </div>
                </div>
            </div>

            <Button onClick={onNext} className="w-full h-12 font-bold bg-seiren-navy text-white mt-4" disabled={!formData.preferredDate || !formData.preferredTime}>
                次へ進む <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    );
}

// ... Step2, Step3, TelTab, SuccessView (Reused with small updates) ...
// For brevity, I will include abbreviated versions if acceptable, but I must return full file content in write_to_file usually.
// I will just paste the previous Step2/3/TelTab/SuccessView as they were mostly fine, just ensuring types match.

function Step2({ formData, setFormData, onNext, onBack }: any) {
    return (
        <div className="space-y-4">
            <div className="space-y-1"><label className="text-sm font-bold text-gray-700 block">お名前 <span className="text-red-500">*</span></label><input className="w-full border border-gray-300 rounded p-3" placeholder="例：山田 太郎" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
            <div className="space-y-1"><label className="text-sm font-bold text-gray-700 block">電話番号 <span className="text-red-500">*</span></label><input type="tel" className="w-full border border-gray-300 rounded p-3" placeholder="例：090-0000-0000" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} /></div>
            <div className="space-y-1"><label className="text-sm font-bold text-gray-700 block">メールアドレス</label><input type="email" className="w-full border border-gray-300 rounded p-3" placeholder="sample@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} /></div>
            <div className="space-y-1"><label className="text-sm font-bold text-gray-700 block">ご相談内容</label><textarea className="w-full border border-gray-300 rounded p-3 h-20 resize-none" placeholder="駐車場について知りたいなど" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} /></div>
            <div className="space-y-2 pt-2"><label className="flex items-start gap-2 cursor-pointer p-2 hover:bg-gray-50 rounded"><input type="checkbox" className="mt-1" checked={formData.privacyCheck} onChange={e => setFormData({ ...formData, privacyCheck: e.target.checked })} /><span className="text-xs text-gray-600"><a href="/privacy" target="_blank" className="text-seiren-navy underline">プライバシーポリシー</a>に同意の上、送信します。</span></label></div>
            <div className="flex gap-3 pt-4"><Button variant="outline" onClick={onBack} className="flex-1 h-12">戻る</Button><Button onClick={onNext} className="flex-[2] h-12 font-bold bg-seiren-navy text-white disabled:opacity-50" disabled={!formData.name || !formData.phone || !formData.privacyCheck}>確認画面へ <ArrowRight className="ml-2 w-4 h-4" /></Button></div>
        </div>
    );
}

function Step3({ formData, onBack, onSubmit, isSubmitting }: any) {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-center text-gray-800">入力内容をご確認ください</h3>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 space-y-4 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500 font-bold">希望日時</span><div className="text-right"><p className="font-bold">{formData.preferredDate} {formData.preferredTime}</p></div></div>
                <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500 font-bold">お名前</span><span className="font-bold">{formData.name}</span></div>
                <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500 font-bold">電話番号</span><span className="font-bold">{formData.phone}</span></div>
                <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-gray-500 font-bold">メール</span><span className="font-bold">{formData.email || '-'}</span></div>
                <div><span className="text-gray-500 font-bold block mb-1">相談内容</span><p className="bg-white p-2 rounded border border-gray-100 text-gray-600 whitespace-pre-wrap">{formData.message || '特になし'}</p></div>
            </div>
            <div className="flex gap-3 pt-2"><Button variant="outline" onClick={onBack} className="flex-1 h-12" disabled={isSubmitting}>戻る</Button><Button onClick={onSubmit} className="flex-[2] h-12 font-bold bg-warm-gold hover:bg-warm-gold/90 text-white shadow-md" disabled={isSubmitting}>{isSubmitting ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : "この内容で送信する"}</Button></div>
        </div>
    );
}

function SuccessView({ onClose, receiptNumber, message }: { onClose: () => void, receiptNumber: string, message: string }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in">
            <div className="bg-white w-full max-w-md rounded-xl p-8 text-center shadow-2xl animate-in zoom-in-95">
                <div className="w-16 h-16 bg-safe-green/10 text-safe-green rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-10 h-10" /></div>
                <h2 className="text-xl font-bold text-seiren-navy mb-4">受付番号: {receiptNumber}</h2>
                <div className="bg-gray-50 p-6 rounded-lg text-left mb-8 space-y-4"><p className="text-sm text-gray-600 leading-loose whitespace-pre-wrap">{message}</p></div>
                <Button onClick={onClose} className="w-full bg-seiren-navy text-white font-bold h-12">詳細ページに戻る</Button>
            </div>
        </div>
    );
}

function TelTab({ temple }: { temple: Temple }) {
    return (
        <div className="text-center py-4">
            <p className="text-sm text-gray-600 mb-6">お電話でのご予約・ご相談も承っております。<br />「清蓮（せいれん）を見た」とお伝えください。</p>
            <a href={`tel:${temple.phone}`} className="block bg-green-500 text-white p-6 rounded-xl shadow-lg hover:bg-green-600 transition-colors mb-4 group"><div className="flex items-center justify-center gap-2 mb-1"><Phone className="w-6 h-6 fill-current" /><span className="font-bold text-2xl font-serif">{temple.phone}</span></div><span className="text-xs opacity-90 group-hover:underline">タップして発信する</span></a>
            <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-lg inline-block w-full"><span className="font-bold block mb-1">受付時間</span>{temple.officeHours}</div>
        </div>
    );
}
