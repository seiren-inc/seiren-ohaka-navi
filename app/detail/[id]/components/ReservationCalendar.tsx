"use client";

import { useState, useMemo } from "react";
import { format, addDays, startOfDay, getDay, isAfter, isBefore, addMinutes, parse, set } from "date-fns";
import { ja } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Info, Phone } from "lucide-react";
import { Temple, CalendarSettings } from "@/lib/store";

interface ReservationCalendarProps {
    temple: Temple;
    onSelectDate?: (date: Date) => void;
}

export function ReservationCalendar({ temple, onSelectDate }: ReservationCalendarProps) {
    const cal = temple.calendar;
    // Default to today
    const [baseDate, setBaseDate] = useState(new Date());

    // 1. Availability Logic
    const slots = useMemo(() => {
        if (!cal || cal.bookingStatus !== 'open') return [];

        const generatedSlots: { date: Date; slots: string[] }[] = [];
        const daysToGenerate = 14; // View 2 weeks at a time

        const now = new Date();
        const cutoffHours = cal.cutoffRule === 'dayBefore' ? 0 :
            cal.cutoffRule === 'hours24' ? 24 :
                cal.cutoffRule === 'hours48' ? 48 :
                    cal.cutoffRule === 'hours72' ? 72 : 168; // week1

        // If dayBefore, cutoff is start of today + 1 day. Else it is now + hours.
        const cutoffTime = cal.cutoffRule === 'dayBefore'
            ? startOfDay(addDays(now, 1))
            : addMinutes(now, cutoffHours * 60);

        for (let i = 0; i < daysToGenerate; i++) {
            const currentDate = addDays(baseDate, i);
            const dateStr = format(currentDate, 'yyyy-MM-dd');
            const dayOfWeek = getDay(currentDate);

            // Checks
            const isWindowOpen = isBefore(currentDate, addDays(now, cal.bookingWindowDays || 60));
            const isWeekdayOk = cal.availableWeekdays.includes(dayOfWeek);
            const isBlackout = cal.blackoutDates.some((b: { date: string }) => b.date === dateStr);

            if (!isWindowOpen || !isWeekdayOk || isBlackout) {
                generatedSlots.push({ date: currentDate, slots: [] });
                continue;
            }

            // Generate Time Slots
            const daySlots: string[] = [];
            // Parse start/end (e.g. "10:00")
            const [startH, startM] = cal.startTime.split(':').map(Number);
            const [endH, endM] = cal.endTime.split(':').map(Number);

            let slotTime = set(currentDate, { hours: startH, minutes: startM, seconds: 0 });
            const endTimeDate = set(currentDate, { hours: endH, minutes: endM, seconds: 0 });

            while (isBefore(slotTime, endTimeDate)) {
                // Check if this specific slot is after cutoff
                if (isAfter(slotTime, cutoffTime)) {
                    // Also check if visit duration fits (optional logic, usually start time is enough)
                    const slotEnd = addMinutes(slotTime, cal.visitDurationMinutes + cal.bufferMinutes);
                    if (!isAfter(slotEnd, endTimeDate)) {
                        daySlots.push(format(slotTime, 'HH:mm'));
                    }
                }
                slotTime = addMinutes(slotTime, cal.slotIntervalMinutes);
            }

            generatedSlots.push({ date: currentDate, slots: daySlots });
        }

        return generatedSlots;
    }, [baseDate, cal]);

    // Handlers
    const handlePrev = () => setBaseDate(d => addDays(d, -14));
    const handleNext = () => setBaseDate(d => addDays(d, 14));
    const today = new Date();
    const isPrevDisabled = isBefore(addDays(baseDate, -1), today);

    // Render Logic helpers
    const getStatus = (daySlots: string[], date: Date) => {
        // If date is in past or blackout or closed day -> '－' or '×'
        if (daySlots.length === 0) return '－';
        const count = daySlots.length;
        if (count > 5) return '◎';
        if (count > 0) return '▲';
        return '×';
    };

    if (cal?.bookingStatus !== 'open') {
        return (
            <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                <p className="font-bold mb-2">現在Webからの予約受付を停止しています</p>
                <p className="text-sm">お電話にてお問い合わせください。</p>
            </div>
        );
    }

    if (cal.bookingChannels.every((c: string) => c !== 'form') && cal.bookingChannels.includes('phone')) {
        return (
            <div className="text-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-bold text-gray-700 mb-4">この寺院は見学予約を「お電話のみ」で受け付けています</p>
                <div className="text-2xl font-bold text-seiren-navy mb-2">{temple.phone}</div>
                <p className="text-xs text-gray-400">受付時間: {temple.officeHours}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-2">
                <button onClick={handlePrev} disabled={isPrevDisabled} className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:hover:bg-transparent"><ChevronLeft className="w-5 h-5" /></button>
                <span className="font-bold">{format(baseDate, 'yyyy年M月')} 〜</span>
                <button onClick={handleNext} className="p-2 hover:bg-gray-100 rounded-full"><ChevronRight className="w-5 h-5" /></button>
            </div>

            {/* Calendar Grid (Simple 1 week or 2 weeks horizontal scroll) */}
            <div className="overflow-x-auto border rounded-xl">
                <table className="w-full text-center border-collapse text-sm">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            {slots.map((s, i) => (
                                <th key={i} className={`p-2 border-r min-w-[50px] ${['日', '土'].includes(format(s.date, 'E', { locale: ja })) ? 'text-red-500' : ''}`}>
                                    <div className="text-xs">{format(s.date, 'E', { locale: ja })}</div>
                                    <div className="text-lg font-bold">{format(s.date, 'd')}</div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {slots.map((s, i) => {
                                const status = getStatus(s.slots, s.date);
                                const isClickable = status === '◎' || status === '▲';
                                return (
                                    <td key={i} className="p-0 border-r border-t bg-white">
                                        {isClickable ? (
                                            <button
                                                onClick={() => onSelectDate && onSelectDate(s.date)}
                                                className="w-full h-16 flex items-center justify-center text-seiren-navy hover:bg-blue-50 transition-colors font-bold text-lg"
                                            >
                                                {status}
                                            </button>
                                        ) : (
                                            <div className="w-full h-16 flex items-center justify-center text-gray-300 font-bold">
                                                {status}
                                            </div>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="font-bold text-seiren-navy">◎</span> 余裕あり</span>
                <span className="flex items-center gap-1"><span className="font-bold text-seiren-navy">▲</span> 残りわずか</span>
                <span className="flex items-center gap-1"><span className="font-bold text-gray-300">×</span> 受付終了</span>
                <span className="flex items-center gap-1"><span className="font-bold text-gray-300">－</span> 休園日</span>
            </div>

            {onSelectDate && (
                <div className="text-center text-xs text-blue-600 mt-2 bg-blue-50 p-2 rounded">
                    <Info className="w-3 h-3 inline mr-1" />
                    日付をクリックして時間を選択してください
                </div>
            )}
        </div>
    );
}
