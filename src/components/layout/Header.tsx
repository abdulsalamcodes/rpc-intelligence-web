"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Bell,
    Search,
    Sun,
    Moon,
    ChevronDown,
    LogOut,
    Settings,
    User,
    Building2,
    Check,
    Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/authStore";
import { useLogout, useSwitchOrg } from "@/lib/hooks";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Header() {
    const router = useRouter();
    const { user, currentOrg, setCurrentOrg } = useAuthStore();
    const logout = useLogout();
    const switchOrg = useSwitchOrg();
    const [isDark, setIsDark] = useState(false);

    const handleLogout = async () => {
        await logout.mutateAsync();
        router.push("/login");
    };

    const handleSwitchOrg = async (orgId: string) => {
        const org = user?.organizations.find((o) => o.id === orgId);
        if (org) {
            setCurrentOrg(org);
            await switchOrg.mutateAsync(orgId);
        }
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle("dark");
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <header className="sticky top-0 z-30 h-20 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900">
            <div className="flex items-center justify-between h-full px-8">
                {/* Search */}
                <div className="flex-1 max-w-lg">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search documents, agents, or requirements..."
                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-zinc-100/50 dark:bg-zinc-900/50 border-2 border-transparent focus:bg-white dark:focus:bg-zinc-950 focus:border-emerald-500/50 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 transition-all outline-none"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-5">
                    {/* Create Button */}
                    <Button variant="default" size="sm" className="hidden lg:flex gap-2 h-10 px-4 rounded-lg">
                        <Plus className="w-4 h-4" />
                        <span>New Content</span>
                    </Button>

                    {/* Organization Switcher */}
                    {user && user.organizations.length > 1 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 group h-10 px-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800">
                                    <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <span className="max-w-[120px] truncate text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                        {currentOrg?.name}
                                    </span>
                                    <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl">
                                <DropdownMenuLabel className="px-3 pb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                                    Workspaces
                                </DropdownMenuLabel>
                                <div className="space-y-1">
                                    {user.organizations.map((org) => (
                                        <DropdownMenuItem
                                            key={org.id}
                                            onClick={() => handleSwitchOrg(org.id)}
                                            className="rounded-xl px-3 py-2.5 flex items-center justify-between cursor-pointer focus:bg-emerald-50 dark:focus:bg-emerald-900/20"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold",
                                                    currentOrg?.id === org.id
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                                                )}>
                                                    {org.name[0]}
                                                </div>
                                                <span className={cn(
                                                    "font-medium",
                                                    currentOrg?.id === org.id ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-300"
                                                )}>{org.name}</span>
                                            </div>
                                            {currentOrg?.id === org.id && (
                                                <Check className="w-4 h-4 text-emerald-600" />
                                            )}
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                                <DropdownMenuSeparator className="my-2" />
                                <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-medium text-emerald-600 dark:text-emerald-400 gap-2 cursor-pointer">
                                    <Plus className="w-4 h-4" />
                                    Create New Teams
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    {/* Theme & Notifications */}
                    <div className="flex items-center gap-1.5 p-1 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-xl">
                        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9 rounded-lg hover:bg-white dark:hover:bg-zinc-800 shadow-sm transition-all">
                            {isDark ? (
                                <Sun className="w-4 h-4" />
                            ) : (
                                <Moon className="w-4 h-4" />
                            )}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white dark:hover:bg-zinc-800 shadow-sm relative group">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full" />
                        </Button>
                    </div>

                    <div className="w-[1px] h-8 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center gap-3 hover:opacity-80 transition-opacity outline-none">
                                <Avatar className="h-10 w-10 border-2 border-white dark:border-zinc-900 shadow-lg shadow-zinc-200 dark:shadow-none">
                                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm">
                                        {user ? getInitials(user.full_name) : "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white leading-none mb-1">
                                        {user?.full_name || "User"}
                                    </p>
                                    <Badge variant="premium" className="px-1.5 py-0 rounded text-[10px]">
                                        {currentOrg?.role || "Member"}
                                    </Badge>
                                </div>
                                <ChevronDown className="w-4 h-4 text-zinc-400" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl mt-2">
                            <DropdownMenuLabel className="p-3">
                                <div className="space-y-1">
                                    <p className="font-bold text-zinc-900 dark:text-white">{user?.full_name}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                            <div className="p-1 space-y-1">
                                <DropdownMenuItem onClick={() => router.push("/settings")} className="rounded-xl px-3 py-2.5 font-medium cursor-pointer">
                                    <User className="w-4 h-4 mr-3 text-zinc-400" />
                                    View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/settings")} className="rounded-xl px-3 py-2.5 font-medium cursor-pointer">
                                    <Settings className="w-4 h-4 mr-3 text-zinc-400" />
                                    Preferences
                                </DropdownMenuItem>
                            </div>
                            <DropdownMenuSeparator className="bg-zinc-100 dark:bg-zinc-800" />
                            <div className="p-1">
                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="rounded-xl px-3 py-2.5 font-bold text-red-500 hover:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Sign Out
                                </DropdownMenuItem>
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
