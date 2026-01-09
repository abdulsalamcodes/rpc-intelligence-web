"use client";

import { CreditCard, Zap, CheckCircle2, TrendingUp, BarChart3, Clock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUsage } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/ mo",
        description: "Personal pilot phase",
        features: ["3 RFP analysis / mo", "Basic compliance matrices", "1 specialized agent", "Community access"],
        active: false,
    },
    {
        name: "Professional",
        price: "$99",
        period: "/ mo",
        description: "High-velocity proposal teams",
        features: ["50 RFP analysis / mo", "Executive proposal drafting", "8 specialized AI agents", "Priority processing swarm", "SSO & Security suite"],
        active: true,
    },
    {
        name: "Elite",
        price: "$299",
        period: "/ mo",
        description: "Multi-national scale",
        features: ["Unlimited analysis", "Custom model fine-tuning", "Dedicated agent architect", "Global SLA support"],
        active: false,
    },
];

export default function BillingPage() {
    const { data: usage, isLoading } = useUsage();
    const usagePercent = usage ? (usage.rfps_used / usage.rfps_limit) * 100 : 25;

    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                        Commercial <span className="gradient-text">Subscription</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-500 mt-3 text-lg font-medium">
                        Scale your intelligence throughput and manage your service layer.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Usage Overview */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="border-none shadow-2xl bg-zinc-900 text-white overflow-hidden relative group">
                        <CardContent className="p-8 relative z-10 space-y-8">
                            <div className="flex items-center gap-3">
                                <BarChart3 className="w-5 h-5 text-emerald-400" />
                                <h3 className="text-lg font-black  tracking-tight">Resource Quota</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-4xl font-black leading-none">{usage?.rfps_used || 12}</span>
                                    <span className="text-zinc-400 font-bold uppercase tracking-widest text-xs mb-1">/ {usage?.rfps_limit || 50} RFPs</span>
                                </div>
                                <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                                        style={{ width: `${usagePercent}%` }}
                                    />
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-none">Status</span>
                                    <Badge variant="success" className="bg-emerald-500/10 text-emerald-400 border-0 font-black">Active Swarm</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-none">Renewal</span>
                                    <span className="text-sm font-black text-white">Oct 24, 2023</span>
                                </div>
                            </div>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                    </Card>

                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 p-8">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-zinc-900 dark:text-white leading-none mb-1">Secure Vector •••• 4242</p>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Expires 12/26</p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full rounded-xl font-black  h-12 bg-transparent">Update Strategy Vector</Button>
                        </div>
                    </Card>
                </div>

                {/* Plan Selection */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <Card
                                key={plan.name}
                                className={cn(
                                    "relative border-none shadow-xl transition-all duration-500 flex flex-col group card-hover",
                                    plan.active
                                        ? "bg-zinc-900 text-white ring-2 ring-emerald-500 scale-105 z-10"
                                        : "bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
                                )}
                            >
                                {plan.active && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                        <Badge variant="premium" className="px-4 py-1.5 shadow-xl">Current Tier</Badge>
                                    </div>
                                )}
                                <CardHeader className="pb-8">
                                    <CardTitle className={cn(
                                        "text-xl font-black  tracking-tight",
                                        plan.active ? "text-emerald-400" : "text-zinc-900 dark:text-white"
                                    )}>{plan.name}</CardTitle>
                                    <div className="pt-4 flex items-end gap-1">
                                        <span className="text-5xl font-black leading-none">{plan.price}</span>
                                        <span className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mb-1">{plan.period}</span>
                                    </div>
                                    <CardDescription className={plan.active ? "text-zinc-400 font-medium pt-2" : "text-zinc-500 font-medium pt-2"}>
                                        {plan.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-4 pb-10">
                                    {plan.features.map((feature) => (
                                        <div key={feature} className="flex gap-3 text-sm font-semibold leading-snug">
                                            <CheckCircle2 className={cn("w-4 h-4 shrink-0 transition-colors", plan.active ? "text-emerald-400" : "text-emerald-500")} />
                                            <span className={plan.active ? "text-zinc-300" : "text-zinc-700 dark:text-zinc-300"}>{feature}</span>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className="pt-0 pb-8">
                                    <Button
                                        variant={plan.active ? "default" : "outline"}
                                        className={cn(
                                            "w-full h-12 rounded-xl font-black  transition-all",
                                            plan.active ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-transparent border-zinc-200 dark:border-zinc-800"
                                        )}
                                        disabled={plan.active}
                                    >
                                        {plan.active ? "Propelling" : "Scale Workspace"}
                                    </Button>
                                </CardFooter>
                                {plan.active && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />
                                )}
                            </Card>
                        ))}
                    </div>

                    {/* Billing History Placeholder */}
                    <Card className="mt-10 border-none shadow-xl bg-white dark:bg-zinc-900">
                        <CardHeader>
                            <CardTitle className="text-xl font-black  tracking-tight flex items-center justify-between">
                                Transaction Invoices
                                <TrendingUp className="w-5 h-5 text-zinc-400" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Invoice Code</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Vector</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Receipt</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800 font-medium">
                                        {[
                                            { date: 'Oct 24, 2023', id: 'INV-42512', amount: '$99.00', card: 'CARD •••• 4242' },
                                            { date: 'Sep 24, 2023', id: 'INV-42398', amount: '$99.00', card: 'CARD •••• 4242' },
                                        ].map((inv) => (
                                            <tr key={inv.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <td className="px-8 py-6 text-zinc-900 dark:text-white font-bold text-sm tracking-tight">{inv.date}</td>
                                                <td className="px-8 py-6 text-zinc-500 text-sm font-bold uppercase tracking-wider">{inv.id}</td>
                                                <td className="px-8 py-6 text-zinc-900 dark:text-white font-black text-sm">{inv.amount}</td>
                                                <td className="px-8 py-6 text-zinc-500 text-xs font-bold uppercase tracking-widest">{inv.card}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <Button variant="ghost" size="sm" className="font-black  text-emerald-600 dark:text-emerald-400 h-8 rounded-lg">DOCX</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
