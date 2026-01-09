"use client";

import { useResults } from "@/lib/hooks";
import {
    CheckCircle2,
    AlertTriangle,
    FileText,
    Search,
    Filter,
    ArrowRight,
    ShieldCheck,
    AlertCircle,
    ChevronDown,
    Sparkles,
    Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ComplianceMatrixProps {
    rfpId: string;
}

export function ComplianceMatrix({ rfpId }: ComplianceMatrixProps) {
    const { data: results, isLoading } = useResults(rfpId);
    const [filter, setFilter] = useState<"all" | "high-risk" | "mandatory">("all");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const complianceResult = (results as any[])?.find((r) => r.agent_id === "ComplianceManager");
    const requirements = complianceResult?.result?.requirements || [];

    const filteredRequirements = requirements.filter((req: any) => {
        if (filter === "high-risk") return req.risk_level === "High";
        if (filter === "mandatory") return req.mandatory;
        return true;
    });

    const stats = [
        { label: "Overall Score", value: "92%", icon: ShieldCheck, color: "text-emerald-500" },
        { label: "Requirements", value: requirements.length, icon: FileText, color: "text-zinc-500" },
        { label: "High Risk", value: requirements.filter((r: any) => r.risk_level === "High").length, icon: AlertTriangle, color: "text-orange-500" },
        { label: "Mandatory", value: requirements.filter((r: any) => r.mandatory).length, icon: Zap, color: "text-emerald-500" },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-32 rounded-3xl bg-zinc-100 dark:bg-zinc-900" />
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeInUp">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                        <div className="flex items-center justify-between mb-3">
                            <div className={cn("p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                        </div>
                        <p className="text-3xl font-black text-zinc-900 dark:text-white tracking-tighter">
                            {stat.value}
                        </p>
                        <p className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-full sm:w-auto">
                    <Button
                        variant={filter === "all" ? "premium" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("all")}
                        className="rounded-xl flex-1 sm:flex-none font-bold"
                    >
                        All Items
                    </Button>
                    <Button
                        variant={filter === "mandatory" ? "premium" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("mandatory")}
                        className="rounded-xl flex-1 sm:flex-none font-bold"
                    >
                        Mandatory
                    </Button>
                    <Button
                        variant={filter === "high-risk" ? "destructive" : "ghost"}
                        size="sm"
                        onClick={() => setFilter("high-risk")}
                        className={cn(
                            "rounded-xl flex-1 sm:flex-none font-bold",
                            filter === "high-risk" ? "bg-red-500 text-white" : ""
                        )}
                    >
                        Critical Risk
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-zinc-500">{filteredRequirements.length} requirements found</p>
                </div>
            </div>

            {/* Requirements List */}
            <div className="space-y-4">
                {filteredRequirements.map((req: any) => (
                    <div
                        key={req.id}
                        className={cn(
                            "group relative bg-white dark:bg-zinc-900 rounded-2xl border transition-all duration-300 overflow-hidden",
                            expandedId === req.id
                                ? "border-emerald-500/50 shadow-2xl shadow-emerald-500/10"
                                : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-lg shadow-zinc-200/50 dark:shadow-none"
                        )}
                    >
                        <div
                            className="px-6 py-5 cursor-pointer flex items-center justify-between gap-6"
                            onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-black text-xs",
                                    req.mandatory
                                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                                )}>
                                    {req.id.includes('.') ? req.id : `R${req.id}`}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 transition-colors">
                                        {req.text}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        {req.mandatory && (
                                            <Badge variant="premium" className="px-1.5 py-0 rounded text-[10px] font-black uppercase tracking-wider">
                                                Mandatory
                                            </Badge>
                                        )}
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                            Category: {req.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge
                                    variant={req.risk_level === "High" ? "destructive" : req.risk_level === "Medium" ? "warning" : "success"}
                                    className="font-bold min-w-[80px] justify-center"
                                >
                                    {req.risk_level} Risk
                                </Badge>
                                <ChevronDown className={cn(
                                    "w-5 h-5 text-zinc-400 transition-transform duration-300",
                                    expandedId === req.id ? "rotate-180 text-emerald-500" : ""
                                )} />
                            </div>
                        </div>

                        {expandedId === req.id && (
                            <div className="px-6 pb-6 pt-2 grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <FileText className="w-3 h-3" />
                                            Requirement Context
                                        </h5>
                                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                            {req.text}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <h5 className="text-xs font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                                            <Sparkles className="w-3 h-3" />
                                            AI Evidence Notes
                                        </h5>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 ">
                                            Found in section 4.2.1 of the original document. Matches standard technical specifications for high-availability clusters.
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                                        <h5 className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            Mitigation Strategy
                                        </h5>
                                        <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed font-medium">
                                            Leverage our existing AWS Direct Connect infrastructure. Evidence can be found in the &apos;Infrastructure 2023&apos; case study portfolio.
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-end gap-3">
                                        <Button variant="ghost" size="sm" className="rounded-xl font-bold">Assign to Expert</Button>
                                        <Button size="sm" className="rounded-xl font-bold">Add Evidence</Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
