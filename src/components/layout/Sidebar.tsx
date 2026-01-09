"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Settings,
    Users,
    CreditCard,
    HelpCircle,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "RFPs", href: "/rfps", icon: FileText },
    { name: "AI Agents", href: "/agents", icon: Sparkles },
    { name: "Team", href: "/settings/team", icon: Users },
    { name: "Billing", href: "/settings/billing", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-900 transition-all duration-300 ease-in-out",
                collapsed ? "w-20" : "w-72"
            )}
        >
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-between h-20 px-6">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                            <FileText className="w-5 h-5 text-white" />
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-white dark:bg-zinc-950 rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </div>
                        </div>
                        {!collapsed && (
                            <span className="font-bold text-zinc-900 dark:text-white tracking-tight text-lg">
                                RFP Intel
                            </span>
                        )}
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg"
                    >
                        {collapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                </div>

                {/* Search/Command Shortcut */}
                {!collapsed && (
                    <div className="px-6 mb-6">
                        <button className="w-full flex items-center justify-between px-3 h-10 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500 text-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                            <div className="flex items-center gap-2">
                                <Command className="w-3.5 h-3.5" />
                                <span>Search...</span>
                            </div>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">⌘K</span>
                        </button>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg shadow-zinc-900/10"
                                        : "text-zinc-500 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100"
                                )}
                            >
                                <item.icon className={cn(
                                    "w-5 h-5 flex-shrink-0 transition-colors",
                                    isActive ? "text-white dark:text-zinc-900" : "group-hover:text-emerald-500"
                                )} />
                                {!collapsed && <span>{item.name}</span>}
                                {isActive && !collapsed && (
                                    <div className="absolute right-3 w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Pro Badge */}
                {!collapsed && (
                    <div className="px-6 py-6">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 text-white dark:text-zinc-900 relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-70">New Feature</p>
                                <p className="font-bold text-sm mb-3">AI Multi-Agent Review</p>
                                <Link href="/agents">
                                    <Button size="sm" variant="default" className="w-full text-xs font-bold h-8">
                                        Upgrade Now
                                    </Button>
                                </Link>
                            </div>
                            <Sparkles className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 group-hover:scale-125 transition-transform" />
                        </div>
                    </div>
                )}

                {/* Help & Support */}
                <div className="px-4 py-4 border-t border-zinc-100 dark:border-zinc-900">
                    <Link
                        href="/help"
                        className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-zinc-500 dark:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all group"
                    >
                        <HelpCircle className="w-5 h-5 flex-shrink-0 group-hover:text-emerald-500" />
                        {!collapsed && <span>Help & Support</span>}
                    </Link>
                </div>
            </div>
        </aside>
    );
}
