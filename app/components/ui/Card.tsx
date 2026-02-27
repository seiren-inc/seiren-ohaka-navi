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
                "bg-white rounded-[--radius-lg] shadow-[--shadow-sm] border border-border p-6",
                hoverEffect &&
                    "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[--shadow-md] hover:border-primary/20",
                className
            )}
        >
            {children}
        </div>
    );
}
