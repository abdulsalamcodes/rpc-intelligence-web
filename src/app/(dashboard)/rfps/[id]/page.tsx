"use client";

import { useRFP, useRFPStatus, useStartAnalysis, useRerunAnalysis } from "@/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import {
    FileText,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Zap,
    Activity,
    ArrowLeft,
    Settings,
    Download,
    Share2,
    History,
    Target,
    Sparkles,
    BarChart3,
    BrainCircuit,
    ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnalysisProgress } from "@/components/rfp/AnalysisProgress";
import { ComplianceMatrix } from "@/components/rfp/ComplianceMatrix";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RFPDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { data: rfp, isLoading } = useRFP(id);
    const { data: status } = useRFPStatus(id);
    const startAnalysis = useStartAnalysis();
    const rerunAnalysis = useRerunAnalysis();

    if (isLoading || !rfp) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Loading Workspace...</p>
                </div>
            </div>
        );
    }

    const getStatusDisplay = (status: string) => {
        switch (status) {
            case "analyzed":
                return <Badge variant="success" className="gap-1.5 py-1 px-3 font-bold"><CheckCircle2 className="w-3.5 h-3.5" /> Workspace Ready</Badge>;
            case "analyzing":
                return <Badge variant="warning" className="gap-1.5 py-1 px-3 animate-pulse font-bold"><Clock className="w-3.5 h-3.5" /> Processing...</Badge>;
            case "failed":
                return <Badge variant="destructive" className="gap-1.5 py-1 px-3 font-bold"><AlertTriangle className="w-3.5 h-3.5" /> Analysis Failed</Badge>;
            default:
                return <Badge variant="secondary" className="gap-1.5 py-1 px-3 font-bold"><FileText className="w-3.5 h-3.5" /> Idle</Badge>;
        }
    };

    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* Detail Header */}
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-6">
                        <Link href="/rfps">
                            <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-all">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                                    {rfp.title}
                                </h1>
                                {getStatusDisplay(rfp.status)}
                            </div>
                            <div className="flex items-center gap-6 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
                                <span className="flex items-center gap-1.5">
                                    <Target className="w-3.5 h-3.5 text-emerald-500" />
                                    {rfp.client_name}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Activity className="w-3.5 h-3.5 text-orange-500" />
                                    {rfp.sector}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    Due {rfp.submission_deadline ? new Date(rfp.submission_deadline).toLocaleDateString() : "TBD"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="lg" className="rounded-xl font-bold h-12 gap-2 bg-transparent">
                            <Download className="w-4 h-4" />
                            Export
                        </Button>
                        <Button size="lg" className="rounded-xl font-bold h-12 shadow-2xl">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Workspace
                        </Button>
                    </div>
                </div>

                {/* Dynamic Analysis Controls */}
                {(rfp.status === "uploaded" || rfp.status === "failed") && (
                    <Card className="border-none shadow-2xl bg-gradient-to-br from-zinc-900 to-zinc-800 text-white overflow-hidden relative group">
                        <CardContent className="p-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-emerald-500">
                                        <BrainCircuit className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-black  tracking-tight">Initialize AI Intelligence Swarm</h3>
                                </div>
                                <p className="text-zinc-400 text-lg font-medium">Ready to extract requirements, identify risks, and draft your compliance strategy.</p>
                            </div>
                            <Button
                                size="xl"
                                variant="default"
                                className="rounded-2xl h-16 px-10 shadow-2xl hover:scale-[1.05] transition-transform"
                                onClick={() => startAnalysis.mutate(id)}
                                loading={startAnalysis.isPending}
                            >
                                <Zap className="w-5 h-5 mr-3 fill-white" />
                                Initialize Now
                            </Button>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
                    </Card>
                )}
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="h-16 w-full justify-start gap-8 bg-transparent border-b border-zinc-100 dark:border-zinc-800 rounded-none px-0 mb-8 overflow-x-auto overflow-y-hidden scrollbar-none">
                    <TabsTrigger
                        value="overview"
                        className="text-lg font-black data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-4 data-[state=active]:border-emerald-500 rounded-none px-0 py-4 transition-all"
                    >
                        Overview
                    </TabsTrigger>
                    <TabsTrigger
                        value="requirements"
                        className="text-lg font-black data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-4 data-[state=active]:border-emerald-500 rounded-none px-0 py-4 transition-all"
                    >
                        Requirements
                    </TabsTrigger>
                    <TabsTrigger
                        value="compliance"
                        className="text-lg font-black data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-4 data-[state=active]:border-emerald-500 rounded-none px-0 py-4 transition-all"
                    >
                        Compliance Strategy
                    </TabsTrigger>
                    <TabsTrigger
                        value="proposal"
                        className="text-lg font-black data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-4 data-[state=active]:border-emerald-500 rounded-none px-0 py-4 transition-all"
                    >
                        Executive Draft
                    </TabsTrigger>
                    <TabsTrigger
                        value="review"
                        className="text-lg font-black data-[state=active]:bg-transparent data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:border-b-4 data-[state=active]:border-emerald-500 rounded-none px-0 py-4 transition-all"
                    >
                        Quality Review
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-10 focus:outline-none animate-fadeIn">
                    {rfp.status === "analyzing" ? (
                        <AnalysisProgress jobId={status?.job_id || ""} />
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-10">
                                <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
                                    <CardHeader className="border-b border-zinc-50 dark:border-zinc-800 flex flex-row items-center justify-between pb-6">
                                        <div>
                                            <CardTitle className="text-2xl font-black  tracking-tight">Intelligence Executive Summary</CardTitle>
                                            <CardDescription className="text-zinc-500 font-medium mt-1">AI-generated overview of the opportunity landscape</CardDescription>
                                        </div>
                                        <Sparkles className="w-6 h-6 text-emerald-500" />
                                    </CardHeader>
                                    <CardContent className="pt-8 prose dark:prose-invert max-w-none">
                                        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg font-medium">
                                            {rfp.summary ? (
                                                rfp.summary.split('\n\n').map((para: string, i: number) => (
                                                    <p key={i}>{para}</p>
                                                ))
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-12 text-center text-zinc-400 space-y-4">
                                                    <BrainCircuit className="w-12 h-12 opacity-30" />
                                                    <p>Initialize analysis to generate an executive summary.</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 border-l-4 border-emerald-500">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                                <ShieldCheck className="w-5 h-5" />
                                                Key Strengths
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-4">
                                                {["Existing relationship with stakeholder", "Matches 90% of technical requirements", "Previous success in similar sector"].map((s, i) => (
                                                    <li key={i} className="flex gap-3 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 border-l-4 border-orange-500">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                                                <AlertTriangle className="w-5 h-5" />
                                                Critical Gaps
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-4">
                                                {["ISO 27001 Certification required", "24/7 on-site support requirement", "Tight timeline for implementation"].map((s, i) => (
                                                    <li key={i} className="flex gap-3 text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                                        <AlertCircle className="w-4 h-4 text-orange-500 shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <Card className="border-none shadow-xl bg-zinc-950 text-white overflow-hidden group">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-xl font-black  tracking-tight text-emerald-400">Workspace Stats</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6 pt-4">
                                        {[
                                            { label: "Document Size", value: "24.5 MB", icon: FileText },
                                            { label: "Requirements", value: "142 Found", icon: Target },
                                            { label: "Compliance Score", value: "92%", icon: ShieldCheck },
                                            { label: "AI Tokens Used", value: "450k", icon: BrainCircuit },
                                        ].map((s) => (
                                            <div key={s.label} className="flex items-center justify-between group-hover:translate-x-1 transition-transform">
                                                <div className="flex items-center gap-3">
                                                    <s.icon className="w-4 h-4 text-zinc-500" />
                                                    <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-none">{s.label}</span>
                                                </div>
                                                <span className="text-base font-black text-white">{s.value}</span>
                                            </div>
                                        ))}
                                    </CardContent>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                                </Card>

                                <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between text-xl font-black  tracking-tight">
                                            Activity History
                                            <History className="w-5 h-5 text-zinc-400" />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-5">
                                        {[
                                            { action: "Doc Ingested", time: "2h ago", status: "success" },
                                            { action: "AI Extraction", time: "1h ago", status: "success" },
                                            { action: "Risk Review", time: "30m ago", status: "pending" },
                                        ].map((h, i) => (
                                            <div key={i} className="flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        h.status === "success" ? "bg-emerald-500 shadow-sm shadow-emerald-500/50" : "bg-zinc-300 dark:bg-zinc-700"
                                                    )} />
                                                    <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{h.action}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{h.time}</span>
                                            </div>
                                        ))}
                                        <Button variant="ghost" className="w-full mt-4 font-bold rounded-xl text-emerald-600">Full Audit Log</Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="requirements" className="focus:outline-none animate-fadeIn">
                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-50 dark:border-zinc-800 pb-8">
                            <div>
                                <CardTitle className="text-2xl font-black  tracking-tight">Extracted Requirements</CardTitle>
                                <CardDescription className="text-zinc-500 font-medium">Detailed inventory of all RFP conditions and mandates</CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" size="sm" className="rounded-xl font-bold gap-2 bg-transparent">
                                    <Filter className="w-4 h-4" />
                                    Filter
                                </Button>
                                <Button size="sm" className="rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700">Export CSV</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800">
                                        <tr>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Requirement Text</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Mandatory</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Confidence</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                        {rfp.requirements?.length ? (
                                            rfp.requirements.map((req: any) => (
                                                <tr key={req.id} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                    <td className="px-8 py-6">
                                                        <span className="text-sm font-black text-zinc-900 dark:text-white">#{req.id}</span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed">
                                                            {req.text}
                                                        </p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        {req.mandatory ? (
                                                            <Badge variant="premium">REQUIRED</Badge>
                                                        ) : (
                                                            <Badge variant="secondary">OPTIONAL</Badge>
                                                        )}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-24 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-emerald-500 rounded-full"
                                                                    style={{ width: `${(req.confidence_score || 0.95) * 100}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-xs font-black text-zinc-900 dark:text-white">
                                                                {Math.round((req.confidence_score || 0.95) * 100)}%
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="px-8 py-20 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <Target className="w-12 h-12 text-zinc-200" />
                                                        <p className="text-zinc-500 font-bold ">No requirements extracted yet.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="compliance" className="focus:outline-none animate-fadeIn">
                    <ComplianceMatrix rfpId={id} />
                </TabsContent>

                <TabsContent value="proposal" className="focus:outline-none animate-fadeIn">
                    <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-zinc-50 dark:border-zinc-800 pb-6">
                            <div>
                                <CardTitle className="text-2xl font-black  tracking-tight truncate max-w-md">Generated Response Strategy</CardTitle>
                                <CardDescription className="text-zinc-500 font-medium">Technical draft based on intelligence requirements</CardDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="rounded-xl font-bold h-10 gap-2 bg-transparent">
                                    <Download className="w-4 h-4" />
                                    DOCX
                                </Button>
                                <Button className="rounded-xl font-bold h-10 gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Revise with AI
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
                                <div className="lg:col-span-1 border-r border-zinc-50 dark:border-zinc-800 p-6 bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <h5 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">Document Structure</h5>
                                    <div className="space-y-2">
                                        {rfp.proposal_sections?.map((section: any, i: number) => (
                                            <button key={i} className={cn(
                                                "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                                i === 0 ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-sm border border-zinc-100 dark:border-zinc-700" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                                            )}>
                                                {section.title}
                                            </button>
                                        ))}
                                        {!rfp.proposal_sections?.length && <p className="text-xs text-zinc-500 ">No sections generated.</p>}
                                    </div>
                                </div>
                                <div className="lg:col-span-3 p-10 bg-white dark:bg-zinc-950 overflow-y-auto max-h-[800px] scrollbar-thin">
                                    <div className="max-w-3xl mx-auto space-y-10 prose dark:prose-invert">
                                        {rfp.proposal_sections?.map((section: any, i: number) => (
                                            <div key={i} className="space-y-6">
                                                <h2 className="text-3xl font-black  tracking-tight text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-4">
                                                    {section.title}
                                                </h2>
                                                <div className="text-zinc-700 dark:text-zinc-300 leading-loose text-lg font-medium whitespace-pre-wrap">
                                                    {section.content}
                                                </div>
                                            </div>
                                        ))}
                                        {!rfp.proposal_sections?.length && (
                                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30 py-20">
                                                <BrainCircuit className="w-20 h-20" />
                                                <h3 className="text-2xl font-black ">Intelligence Agents Standby</h3>
                                                <p className="max-w-md font-medium">Awaiting analysis completion to generate the executive proposal draft.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="review" className="focus:outline-none animate-fadeIn">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10">
                            <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                                <CardHeader className="border-b border-zinc-50 dark:border-zinc-800 pb-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-2xl font-black  tracking-tight">Technical Review Audit</CardTitle>
                                            <CardDescription className="text-zinc-500 font-medium">Critical issues and strategy recommendations</CardDescription>
                                        </div>
                                        <Badge variant="destructive" className="px-3 py-1 font-black leading-none">
                                            {rfp.review_results?.issues?.filter((i: any) => i.severity === "Critical").length || 0} Critical
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                        {rfp.review_results?.issues?.map((issue: any, i: number) => (
                                            <div key={i} className="p-8 group hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <div className="flex items-start gap-5">
                                                    <div className={cn(
                                                        "p-3 rounded-2xl shrink-0 shadow-sm",
                                                        issue.severity === "Critical" ? "bg-red-50 dark:bg-red-900/20 text-red-500" : "bg-orange-50 dark:bg-orange-900/20 text-orange-500"
                                                    )}>
                                                        <AlertCircle className="w-6 h-6" />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-3">
                                                            <h4 className="text-lg font-black text-zinc-900 dark:text-white leading-none">{issue.title || "Review Flag"}</h4>
                                                            <Badge variant={issue.severity === "Critical" ? "destructive" : "warning"} className="text-[10px] font-black">{issue.severity}</Badge>
                                                        </div>
                                                        <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed ">&ldquo;{issue.description}&rdquo;</p>
                                                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                                                            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                <Sparkles className="w-3.5 h-3.5" />
                                                                AI Recommended Fix
                                                            </p>
                                                            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200">
                                                                {issue.recommendation}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {!rfp.review_results?.issues?.length && (
                                            <div className="p-20 text-center text-zinc-400">
                                                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-30 text-emerald-500" />
                                                <p className="font-bold ">No critical issues identified by the review swarm.</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-8">
                            <Card className="border-none shadow-2xl bg-zinc-900 text-white overflow-hidden relative">
                                <CardHeader>
                                    <CardTitle className="text-xl font-black  tracking-tight text-emerald-400">Quality Pulse</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-4 flex flex-col items-center text-center">
                                    <div className="relative w-40 h-40 mb-8">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="80" cy="80" r="70" className="stroke-zinc-800 stroke-[10] fill-none" />
                                            <circle cx="80" cy="80" r="70" className="stroke-emerald-500 stroke-[10] fill-none transition-all duration-1000 ease-out" style={{ strokeDasharray: 440, strokeDashoffset: 440 - (440 * (rfp.review_results?.overall_score || 85)) / 100 }} />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-5xl font-black ">{rfp.review_results?.overall_score || 85}</span>
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Score</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700">
                                            <p className="text-2xl font-black text-white">4</p>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Experts</p>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-zinc-800 border border-zinc-700">
                                            <p className="text-2xl font-black text-white">9</p>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Checks</p>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-10 rounded-xl font-black  gap-2 h-12 shadow-emerald-500/20">
                                        <Sparkles className="w-4 h-4" />
                                        Rerun Governance Swarm
                                    </Button>
                                </CardContent>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                            </Card>

                            <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <CardTitle className="text-xl font-black  tracking-tight">Gov Checklist</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {[
                                        { label: "Technical Compliance", ok: true },
                                        { label: "Legal Terms Review", ok: true },
                                        { label: "Pricing Sustainability", ok: false },
                                        { label: "Security/Privacy", ok: true },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{item.label}</span>
                                            {item.ok ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertTriangle className="w-5 h-5 text-orange-500 animate-pulse" />}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function Loader2(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    );
}
