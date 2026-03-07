import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
}

export function Button({
    className,
    variant = "primary",
    size = "md",
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all active:scale-[0.98] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-primary/50",
        secondary: "bg-white border-2 border-primary text-primary hover:bg-primary/5 focus-visible:ring-primary/50",
        accent: "bg-lotus-pink text-primary hover:bg-lotus-pink/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-lotus-pink/50",
        ghost: "bg-transparent text-text-muted hover:bg-bg-muted hover:text-text focus-visible:ring-gray-200",
        outline: "bg-transparent border-2 border-border text-text hover:border-primary hover:text-primary focus-visible:ring-primary/50",
    };

    const sizes = {
        sm: "px-4 font-normal text-sm h-[36px]",
        md: "px-6 py-2 text-base h-[44px]",
        lg: "px-8 py-3 text-lg h-[48px]",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}
