import { ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface TagProps {
    className?: string;
    children: ReactNode;
    variant?: "primary" | "secondary" | "accent" | "ghost" | "cemeteryType";
    size?: "sm" | "md";
}

export function Tag({ className, children, variant = "primary", size = "md" }: TagProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors";

    // Doc-31, Doc-32: Variants colors
    const variants = {
        primary: "bg-primary text-white",
        secondary: "bg-border text-text-muted",
        accent: "bg-lotus-pink text-white",
        ghost: "bg-gray-100 text-gray-700 border border-gray-200",
        // Doc-31 供養タイプタグ指定: Soft Teal 20%透過背景 + 文字 Soft Teal
        cemeteryType: "bg-soft-teal/20 text-soft-teal",
    };

    const sizes = {
        sm: "px-2.5 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
            {children}
        </span>
    );
}
