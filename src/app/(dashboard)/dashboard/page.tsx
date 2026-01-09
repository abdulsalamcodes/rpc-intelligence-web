"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Upload,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    Plus,
    BarChart3,
    Activity,
    Sparkles,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/authStore";
import { useRFPs, useUsage } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const recentActivity = [
    {
        id: 1,
        action: "Analysis completed",
        rfp: "Government IT Services RFP",
        time: "2 hours ago",
        type: "success",
    },
    {
        id: 2,
        action: "Proposal drafted",
        rfp: "Healthcare System Upgrade",
        time: "5 hours ago",
        type: "info",
    },
    {
        id: 3,
        action: "Review pending",
        rfp: "Financial Services RFP",
        time: "1 day ago",
        type: "warning",
    },
];

export default function DashboardPage() {
    const { user, currentOrg } = useAuthStore();
    const { data: rfps, isLoading: rfpsLoading } = useRFPs();
    const { data: usage, isLoading: usageLoading } = useUsage();

    const stats = [
        {
            name: "Total RFPs",
            value: rfps?.length || 0,
            icon: FileText,
            change: "+12%",
            changeType: "positive",
        },
        {
            name: "In Progress",
            value: rfps?.filter((r) => r.status === "analyzing").length || 0,
            icon: Clock,
            change: "3 active",
            changeType: "neutral",
        },
        {
            name: "Completed",
            value: rfps?.filter((r) => r.status === "analyzed").length || 0,
            icon: CheckCircle2,
            change: "+8%",
            changeType: "positive",
        },
        {
            name: "AI Agents",
            value: 8,
            icon: Sparkles,
            change: "Active",
            changeType: "positive",
        },
    ];

    const usagePercent = usage ? (usage.rfps_used / usage.rfps_limit) * 100 : 25;

    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <Badge variant="premium" className="mb-3 px-3 py-1">
                        <Zap className="w-3 h-3 mr-1.5 fill-emerald-500 text-emerald-500" />
                        AI Workspace Active
                    </Badge>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                        Welcome back, <span className="gradient-text">{user?.full_name?.split(" ")[0] || "User"}</span>!
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-500 mt-3 text-lg font-medium">
                        Your intelligence agents have analyzed 3 new requirements since yesterday.
                    </p>
                </div>
                <Link href="/rfps">
                    <Button size="lg" className="gap-2 shadow-2xl">
                        <Plus className="w-5 h-5" />
                        Upload New RFP
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={stat.name} className="border-none shadow-xl shadow-zinc-200/50 dark:shadow-none bg-white dark:bg-zinc-900 overflow-hidden card-hover">
                        <CardContent className="p-6 relative">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <Badge
                                    variant={
                                        stat.changeType === "positive"
                                            ? "success"
                                            : "secondary"
                                    }
                                    className="font-bold"
                                >
                                    {stat.change}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                    {stat.value}
                                </p>
                                <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                                    {stat.name}
                                </p>
                            </div>
                            {/* Subtle accent background */}
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-emerald-500/5 rounded-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Usage Card */}
                <Card className="lg:col-span-1 border-none shadow-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-950 text-white relative overflow-hidden">
                    <CardHeader className="relative z-10">
                        <CardTitle className="flex items-center gap-2 text-white">
                            <BarChart3 className="w-6 h-6 text-emerald-400" />
                            Intelligence Usage
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Monthly analysis quota
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-4xl font-black text-white leading-none">
                                        {usage?.rfps_used || 12}
                                    </p>
                                    <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider mt-1">
                                        RFPs analyzed
                                    </p>
                                </div>
                                <span className="text-zinc-400 font-medium">/ {usage?.rfps_limit || 50} limit</span>
                            </div>
                            <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${usagePercent}%` }}
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-black text-emerald-400">
                                        PROFESSIONAL PLAN
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        Billed {usage?.billing_cycle || "monthly"}
                                    </p>
                                </div>
                                <Link href="/settings/billing">
                                    <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-zinc-900">
                                        Update Plan
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                    {/* Abstract background shapes */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl" />
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-2 border-none shadow-xl bg-white dark:bg-zinc-900">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-50 dark:border-zinc-800 pb-6">
                        <div className="space-y-1">
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-6 h-6 text-emerald-500" />
                                Live Agent Activity
                            </CardTitle>
                            <CardDescription>
                                Real-time updates from your proposal agents
                            </CardDescription>
                        </div>
                        <Link href="/rfps">
                            <Button variant="ghost" size="sm" className="gap-2 font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                                View History
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {recentActivity.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all duration-300"
                                >
                                    <div className={cn(
                                        "p-3 rounded-xl transition-transform group-hover:scale-110 duration-300 shadow-sm",
                                        activity.type === "success"
                                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                                            : activity.type === "warning"
                                                ? "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400"
                                                : "bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                                    )}>
                                        {activity.type === "success" ? (
                                            <CheckCircle2 className="w-5 h-5" />
                                        ) : activity.type === "warning" ? (
                                            <AlertTriangle className="w-5 h-5" />
                                        ) : (
                                            <FileText className="w-5 h-5" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-base font-bold text-zinc-900 dark:text-white leading-none mb-1">
                                            {activity.action}
                                        </p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium truncate">
                                            {activity.rfp}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600 whitespace-nowrap uppercase tracking-wider">
                                            {activity.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Launchpad */}
            <div className="space-y-6">
                <div className="flex items-center gap-3 px-1">
                    <Zap className="w-6 h-6 text-emerald-500" />
                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Intelligence Launchpad</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/rfps" className="group">
                        <div className="h-full flex items-center gap-6 p-6 rounded-3xl bg-zinc-900 text-white shadow-2xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
                            <div className="relative z-10 p-4 rounded-2xl bg-white/10 group-hover:bg-emerald-500 transition-colors duration-500">
                                <Upload className="w-8 h-8 text-white" />
                            </div>
                            <div className="relative z-10">
                                <p className="font-black text-xl mb-1 ">Process RFP</p>
                                <p className="text-sm text-zinc-400 font-medium">
                                    Initialize AI analysis workflow
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        </div>
                    </Link>

                    <Link href="/rfps" className="group">
                        <div className="h-full flex items-center gap-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors duration-500">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <div>
                                <p className="font-black text-xl mb-1 text-zinc-900 dark:text-white ">Review Results</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
                                    Examine compliance matrices
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link href="/settings/team" className="group">
                        <div className="h-full flex items-center gap-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 shadow-xl hover:border-emerald-500/30 transition-all duration-300">
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors duration-500">
                                <TrendingUp className="w-8 h-8 text-emerald-500" />
                            </div>
                            <div>
                                <p className="font-black text-xl mb-1 text-zinc-900 dark:text-white ">Elite Team</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
                                    Invite strategy collaborators
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
