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
                "bg-white rounded-[12px] shadow-card border border-border p-6",
                hoverEffect && "transition-all duration-300 hover:-translate-y-[2px] hover:shadow-card-hover",
                className
            )}
        >
            {children}
        </div>
    );
}
