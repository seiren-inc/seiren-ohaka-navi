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
                "bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8",
                hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/20",
                className
            )}
        >
            {children}
        </div>
    );
}
