import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
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
    const baseStyles =
        "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary:
            "bg-primary text-white hover:bg-primary-dark shadow-[--shadow-sm] hover:shadow-[--shadow-md] rounded-[--radius-md]",
        secondary:
            "bg-surface text-primary border border-border hover:border-primary/30 hover:bg-bg rounded-[--radius-md]",
        outline:
            "border border-primary/30 text-primary hover:bg-primary hover:text-white rounded-[--radius-md]",
        ghost:
            "bg-transparent text-text-secondary hover:bg-bg hover:text-text-primary rounded-[--radius-md]",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm tracking-wide",
        md: "px-6 py-3 text-sm tracking-wide",
        lg: "px-8 py-4 text-base tracking-wide",
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
