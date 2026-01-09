"use client";

import { Sparkles, BrainCircuit, Zap, CheckCircle2, ShieldCheck, Activity, Terminal, Code, Cpu, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const agents = [
    {
        id: "extraction",
        name: "Extraction Engine",
        role: "Linguistics & Parsing",
        description: "Multi-modal OCR and semantic requirement identification agent.",
        status: "online",
        stats: "14.2k tokens/sec",
        icon: BrainCircuit,
        color: "emerald",
    },
    {
        id: "compliance",
        name: "Governance Guard",
        role: "Legal & Compliance",
        description: "Evaluates requirements against internal knowledge base and standards.",
        status: "online",
        stats: "99.4% accuracy",
        icon: ShieldCheck,
        color: "teal",
    },
    {
        id: "strategy",
        name: "Strategic Drafter",
        role: "Content Generation",
        description: "Architects winning proposal narratives and executive highlights.",
        status: "online",
        stats: "LLM-4.0 Premium",
        icon: Zap,
        color: "orange",
    },
    {
        id: "reviewer",
        name: "Audit Specialist",
        role: "Quality Assurance",
        description: "Identifies risks, gaps, and performance bottlenecks in generated content.",
        status: "online",
        stats: "Real-time feed",
        icon: Activity,
        color: "rose",
    },
];

export default function AgentsPage() {
    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                        Intelligence <span className="gradient-text">Agents</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-500 mt-3 text-lg font-medium">
                        Monitor and manage your fleet of specialized proposal intelligence agents.
                    </p>
                </div>
                <Button size="lg" className="gap-2 shadow-2xl">
                    <Terminal className="w-5 h-5" />
                    Command Center
                </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-none shadow-2xl bg-zinc-900 text-white overflow-hidden relative group p-8">
                    <div className="relative z-10 flex flex-col items-center text-center py-6">
                        <Cpu className="w-12 h-12 text-emerald-400 mb-4" />
                        <p className="text-4xl font-black  tracking-tighter mb-2">99.8%</p>
                        <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Cluster Availability</p>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                </Card>
                <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 text-white overflow-hidden relative group p-8">
                    <div className="relative z-10 flex flex-col items-center text-center py-6 text-zinc-900 dark:text-white">
                        <Globe className="w-12 h-12 text-emerald-500 mb-4" />
                        <p className="text-4xl font-black  tracking-tighter mb-2">Global</p>
                        <p className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Multi-Region Swarm</p>
                    </div>
                </Card>
                <Card className="border-none shadow-2xl bg-zinc-900 text-white overflow-hidden relative group p-8">
                    <div className="relative z-10 flex flex-col items-center text-center py-6">
                        <Zap className="w-12 h-12 text-orange-400 mb-4" />
                        <p className="text-4xl font-black  tracking-tighter mb-2">8ms</p>
                        <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Inference Latency</p>
                    </div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
                </Card>
            </div>

            {/* Agents Roster */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {agents.map((agent) => (
                    <Card key={agent.id} className="border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden card-hover group">
                        <CardContent className="p-8 flex items-start gap-8 relative">
                            <div className={cn(
                                "w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110 duration-500",
                                agent.color === 'emerald' ? "bg-emerald-500 text-white" :
                                    agent.color === 'teal' ? "bg-teal-500 text-white" :
                                        agent.color === 'orange' ? "bg-orange-500 text-white" :
                                            "bg-rose-500 text-white"
                            )}>
                                <agent.icon className="w-10 h-10" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black  tracking-tight text-zinc-900 dark:text-white leading-none mb-1 group-hover:text-emerald-500 transition-colors">
                                            {agent.name}
                                        </h3>
                                        <p className="text-sm font-bold text-zinc-500">{agent.role}</p>
                                    </div>
                                    <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 border-0 flex items-center gap-1.5 font-black uppercase text-[10px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                    </Badge>
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                                    {agent.description}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-zinc-400" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{agent.stats}</span>
                                    </div>
                                    <Button variant="ghost" className="rounded-xl font-black  h-10 text-emerald-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20">
                                        Configure Engine
                                    </Button>
                                </div>
                            </div>
                            {/* Subtle abstract background */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Terminal Footer */}
            <Card className="border-none shadow-2xl bg-zinc-950 text-emerald-500 p-6 font-mono text-xs relative overflow-hidden group">
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            <div className="w-3 h-3 rounded-full bg-zinc-800" />
                        </div>
                        <span className="opacity-50"># system_status: cluster_operational</span>
                    </div>
                    <div className="flex items-center gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
                        <span className="animate-pulse">_</span>
                        <span>v4.2.1-stable</span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-full h-full bg-emerald-500/5 translate-x-3/4 -rotate-45 pointer-events-none" />
            </Card>
        </div>
    );
}
