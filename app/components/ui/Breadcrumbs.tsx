import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={`text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-2 ${className}`}>
            <ol className="flex items-center space-x-2 min-w-max">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            {index === 0 ? (
                                item.href ? (
                                    <Link href={item.href} className="text-gray-400 hover:text-primary transition-colors flex items-center">
                                        <Home className="w-4 h-4" aria-label="ホーム" />
                                        <span className="sr-only">ホーム</span>
                                    </Link>
                                ) : (
                                    <span className="text-gray-400 flex items-center">
                                        <Home className="w-4 h-4" aria-label="ホーム" />
                                    </span>
                                )
                            ) : (
                                <>
                                    <ChevronRight className="w-4 h-4 mx-1 text-gray-300 flex-shrink-0" />
                                    {item.href && !isLast ? (
                                        <Link href={item.href} className="hover:text-primary hover:underline transition-colors">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span className={isLast ? "text-gray-800 font-medium" : ""}>
                                            {item.label}
                                        </span>
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
