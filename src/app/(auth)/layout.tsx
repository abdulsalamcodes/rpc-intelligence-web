"use client";

import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col relative overflow-hidden">
            {/* Background Blobs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] blob-emerald opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] blob-coral opacity-20 translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 grid-pattern opacity-30" />

            {/* Header */}
            <header className="relative z-10 w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                        <FileText className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        RFP Intel
                    </span>
                </Link>
                <Link href="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </header>

            {/* Content */}
            <main className="relative z-10 flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-lg animate-scaleIn">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    © {new Date().getFullYear()} RFP Intelligence. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
