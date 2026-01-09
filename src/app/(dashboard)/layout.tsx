"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useAuthStore } from "@/lib/authStore";
import { useMe } from "@/lib/hooks";
import { getAccessToken } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isAuthenticated, isLoading, setLoading } = useAuthStore();
    const { data: user, isLoading: isLoadingUser, isError } = useMe();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    useEffect(() => {
        const token = getAccessToken();
        if (!token) {
            router.push("/login");
            return;
        }
    }, [router]);

    useEffect(() => {
        if (isError) {
            router.push("/login");
        }
    }, [isError, router]);

    useEffect(() => {
        if (!isLoadingUser) {
            setLoading(false);
        }
    }, [isLoadingUser, setLoading]);

    if (isLoading || isLoadingUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-6">
                <div className="flex flex-col items-center gap-6 max-w-sm text-center">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-emerald-500/20 rounded-full" />
                        <div className="absolute inset-0 w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Setting up your workspace</h3>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm">Validating your credentials and preparing your AI agents...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex">
            <Sidebar />
            <div className={cn(
                "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out pl-72",
                // Ideally we'd sync this with Sidebar's state in a shared store or context
                // For now, let's keep it simple as it defaults to 72 (w-72)
            )}>
                <Header />
                <main className="flex-1 relative">
                    {/* Background Blobs for Dashboard */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] blob-emerald opacity-[0.03] -translate-y-1/2" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blob-coral opacity-[0.02] translate-y-1/2" />
                    <div className="relative z-10 p-8 lg:p-10 max-w-7xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
