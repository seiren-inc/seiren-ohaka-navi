import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    className?: string;
    children: ReactNode;
    hoverEffect?: boolean;
}

export function Card({ className, children, hoverEffect = false }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 p-6",
                hoverEffect && "transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
                className
            )}
        >
            {children}
        </div>
    );
}
