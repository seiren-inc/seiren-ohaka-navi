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
        primary: "bg-primary text-white shadow-sm",
        secondary: "bg-bg-muted text-text-muted border border-border",
        accent: "bg-lotus-pink text-primary shadow-sm",
        ghost: "bg-transparent text-text-muted hover:bg-bg-muted hover:text-text",
        // Doc-31 供養タイプタグ指定: Soft Teal 10%透過背景 + 文字 Soft Teal
        cemeteryType: "bg-soft-teal/10 text-soft-teal border border-soft-teal/20",
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
