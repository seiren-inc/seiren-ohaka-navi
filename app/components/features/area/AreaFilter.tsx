"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "../../ui/Button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

// Filter Options (Synced with Store)
const MEMORIAL_TYPES = ['一般墓', '永代供養墓', '樹木葬', '納骨堂'];
const TAGS = ['駅近', 'ペット可', 'バリアフリー', '駐車場', '宗教不問'];

export function AreaFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Current State
    const currentTypes = searchParams.getAll('type');
    const currentTags = searchParams.getAll('tag');
    const minPrice = searchParams.get('minPrice');

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll('type');
        if (current.includes(type)) {
            params.delete('type');
            current.filter(t => t !== type).forEach(t => params.append('type', t));
        } else {
            params.append('type', type);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleTagChange = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll('tag');
        if (current.includes(tag)) {
            params.delete('tag');
            current.filter(t => t !== tag).forEach(t => params.append('tag', t));
        } else {
            params.append('tag', tag);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Mobile Modal Toggle
    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <>
            {/* Mobile Trigger */}
            <div className="md:hidden mb-4">
                <Button onClick={toggleModal} variant="outline" className="w-full border-primary text-primary">
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> 条件を絞り込む
                </Button>
            </div>

            {/* Sidebar / Modal Content */}
            <div className={`
                fixed inset-0 bg-black/50 z-50 transition-opacity md:static md:bg-transparent md:z-auto md:block
                ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible md:opacity-100 md:visible'}
            `}>
                <div className={`
                    fixed inset-y-0 right-0 w-80 bg-white p-6 shadow-2xl transition-transform duration-300 transform 
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:static md:transform-none md:w-full md:shadow-none md:bg-transparent md:border md:border-gray-200 md:rounded-lg md:p-4
                `}>
                    <div className="flex justify-between items-center mb-6 md:hidden">
                        <h3 className="font-bold text-lg">条件絞り込み</h3>
                        <button onClick={toggleModal}><X className="w-6 h-6" /></button>
                    </div>

                    <div className="space-y-8">
                        {/* Grave Type */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-700 mb-3">お墓の種類</h4>
                            <div className="space-y-2">
                                {MEMORIAL_TYPES.map(type => (
                                    <label key={type} className="flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={currentTypes.includes(type)}
                                            onChange={() => handleTypeChange(type)}
                                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-700 mb-3">こだわり条件</h4>
                            <div className="flex flex-wrap gap-2">
                                {TAGS.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagChange(tag)}
                                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${currentTags.includes(tag)
                                                ? 'bg-primary text-white border-primary'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Close Button (Mobile) */}
                        <div className="md:hidden pt-4 mt-auto">
                            <Button onClick={toggleModal} className="w-full bg-primary text-white">
                                この条件で検索
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
