"use client";

import { Building, Map, MessageCircle } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Simple counter hook for numbers
function useCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // easeOutQuart
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isVisible]);

    return { count, ref };
}

export function TrustMetrics() {
    const { count: templesCount, ref: templesRef } = useCounter(1200);
    const { count: consultsCount, ref: consultsRef } = useCounter(5000);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
            {/* Metric 1 */}
            <div ref={templesRef} className="flex flex-col items-center text-center p-6 bg-white rounded-[12px] border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <Building className="w-6 h-6" />
                </div>
                <h3 className="text-gray-500 font-bold mb-2">提携・掲載霊園数</h3>
                <div className="text-4xl font-serif font-bold text-primary">
                    {templesCount.toLocaleString()} <span className="text-xl text-gray-400 font-sans">件以上</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">全国の優良霊園を厳選</p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-[12px] border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <Map className="w-6 h-6" />
                </div>
                <h3 className="text-gray-500 font-bold mb-2">対応エリア</h3>
                <div className="text-4xl font-serif font-bold text-primary">
                    全国 <span className="text-xl text-gray-400 font-sans">対応</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">北海道から沖縄まで</p>
            </div>

            {/* Metric 3 */}
            <div ref={consultsRef} className="flex flex-col items-center text-center p-6 bg-white rounded-[12px] border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-gray-500 font-bold mb-2">累計お墓相談件数</h3>
                <div className="text-4xl font-serif font-bold text-primary">
                    {consultsCount.toLocaleString()} <span className="text-xl text-gray-400 font-sans">件突破</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">専門カウンセラーが対応</p>
            </div>
        </div>
    );
}
