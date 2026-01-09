"use client";

import { useJobStatus } from "@/lib/hooks";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
    FileText,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    Sparkles,
    Zap,
    Activity,
    Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface AnalysisProgressProps {
    jobId: string;
}

export function AnalysisProgress({ jobId }: AnalysisProgressProps) {
    const { data: job, isLoading } = useJobStatus(jobId);

    if (isLoading || !job) {
        return (
            <div className="flex flex-col items-center justify-center p-20 space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-emerald-500/20 rounded-full" />
                    <div className="absolute inset-0 w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                </div>
                <p className="text-zinc-500 font-bold animate-pulse uppercase tracking-widest text-sm">Initializing Agents...</p>
            </div>
        );
    }

    const steps = [
        { id: "extraction", label: "Requirement Extraction", icon: FileText },
        { id: "compliance", label: "Compliance Assessment", icon: Search },
        { id: "strategy", label: "Proposal Generation", icon: Zap },
        { id: "review", label: "Quality Review", icon: Activity },
    ];

    const getStepStatus = (stepId: string) => {
        // This is a simplification, ideally based on job.workflow_steps
        const step = job.logs?.find(log => log.step?.toLowerCase().includes(stepId.toLowerCase()));
        if (job.status === "completed") return "completed";
        if (job.status === "failed") return "failed";
        if (step) return "in-progress";
        return "pending";
    };

    return (
        <div className="space-y-8 animate-fadeInUp">
            {/* Overall Progress */}
            <Card className="border-none shadow-2xl bg-zinc-900 text-white overflow-hidden relative">
                <CardContent className="p-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-2xl font-black tracking-tight ">AI Agent Swarm Active</h3>
                            </div>
                            <p className="text-zinc-400 font-medium">Processing document with 8 specialized agents</p>
                        </div>
                        <div className="text-right">
                            <span className="text-5xl font-black text-emerald-400 tracking-tighter">
                                {job.progress_percent}%
                            </span>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Overall Progress</p>
                        </div>
                    </div>

                    <div className="h-4 bg-white/10 rounded-full overflow-hidden p-0.5">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${job.progress_percent}%` }}
                        />
                    </div>
                </CardContent>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Workflow Steps */}
                <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 p-8">
                    <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-500" />
                        Workflow Lifecycle
                    </h4>
                    <div className="space-y-6">
                        {steps.map((step, index) => {
                            const status = getStepStatus(step.id);
                            return (
                                <div key={step.id} className="relative flex items-center gap-5 group">
                                    {index < steps.length - 1 && (
                                        <div className={cn(
                                            "absolute left-6 top-12 bottom-[-24px] w-0.5 transition-colors duration-500",
                                            status === "completed" ? "bg-emerald-500" : "bg-zinc-100 dark:bg-zinc-800"
                                        )} />
                                    )}
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 z-10",
                                        status === "completed"
                                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                                            : status === "in-progress"
                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 ring-2 ring-emerald-500 ring-offset-4 ring-offset-white dark:ring-offset-zinc-900 animate-pulse"
                                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                                    )}>
                                        {status === "completed" ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : status === "in-progress" ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <step.icon className="w-6 h-6" />
                                        )}
                                    </div>
                                    <div>
                                        <p className={cn(
                                            "text-base font-bold transition-colors",
                                            status === "pending" ? "text-zinc-400" : "text-zinc-900 dark:text-white"
                                        )}>
                                            {step.label}
                                        </p>
                                        <p className="text-sm font-medium text-zinc-500 truncate">
                                            {status === "completed" ? "Validated & Verified" : status === "in-progress" ? "Active Processing..." : "Awaiting agent availability"}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

                {/* Activity Logs */}
                <Card className="border-none shadow-xl bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <h4 className="text-lg font-black text-zinc-900 dark:text-white flex items-center gap-2">
                            <Terminal className="w-5 h-5 text-emerald-500" />
                            Agent Console
                        </h4>
                    </div>
                    <div className="flex-1 p-6 font-mono text-sm overflow-y-auto max-h-[400px] scrollbar-thin">
                        {job.logs?.map((log, i) => (
                            <div key={i} className="py-2.5 flex gap-4 group">
                                <span className="text-emerald-500/50 dark:text-emerald-500/30 font-bold shrink-0">
                                    {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                                <div className="space-y-1">
                                    <span className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 mr-2">
                                        {log.step || "AGENT"}
                                    </span>
                                    <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors">
                                        {log.message}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {!job.logs?.length && (
                            <p className="text-zinc-500 ">Waiting for console stream...</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
