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
    const baseStyles = "inline-flex items-center justify-center rounded-[10px] font-medium transition-all active:scale-[0.98] duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-card",
        secondary: "border border-primary text-primary hover:bg-primary/5",
        accent: "bg-lotus-pink text-white hover:bg-opacity-90 shadow-card",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
        outline: "border border-primary text-primary hover:bg-primary/5 bg-transparent",
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
