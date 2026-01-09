import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                success:
                    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                warning:
                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                destructive:
                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                secondary:
                    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400",
                outline:
                    "border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-transparent",
                premium:
                    "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
