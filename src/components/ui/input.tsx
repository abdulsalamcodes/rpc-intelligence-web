"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    label?: string;
    icon?: React.ElementType;
    iconClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, label, icon: Icon, iconClassName, id, ...props }, ref) => {
        const inputId = id || React.useId();

        return (
            <div className="space-y-2 group w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className="text-sm text-zinc-700 dark:text-zinc-300"
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {Icon && (
                        <div className={cn(
                            "absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 transition-colors duration-300 group-focus-within:text-emerald-500",
                            iconClassName
                        )}>
                            <Icon className="w-4.5 h-4.5" />
                        </div>
                    )}
                    <input
                        type={type}
                        id={inputId}
                        className={cn(
                            "flex h-12 w-full rounded-xl border bg-white dark:bg-zinc-950 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 transition-all duration-300",
                            "border-zinc-200 dark:border-zinc-800",
                            "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                            "focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10",
                            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-50 dark:disabled:bg-zinc-900/50",
                            Icon && "pl-11",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/10",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="text-xs font-bold text-red-500 flex items-center gap-1.5 animate-fadeIn">
                        <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
