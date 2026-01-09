"use client";

import { useState } from "react";
import {
    FileText,
    Search,
    Filter,
    Plus,
    MoreVertical,
    Download,
    Trash2,
    Calendar,
    Building2,
    ChevronRight,
    TrendingUp,
    AlertCircle,
    Clock,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRFPs, useDeleteRFP, useStartAnalysis } from "@/lib/hooks";
import { UploadModal } from "@/components/rfp/UploadModal";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function RFPsPage() {
    const [search, setSearch] = useState("");
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const { data: rfps, isLoading } = useRFPs();
    const deleteRFP = useDeleteRFP();
    const startAnalysis = useStartAnalysis();

    const filteredRFPs = rfps?.filter((rfp) =>
        rfp.title.toLowerCase().includes(search.toLowerCase()) ||
        rfp.client_name.toLowerCase().includes(search.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "analyzed":
                return <Badge variant="success" className="gap-1.5 font-bold"><CheckCircle2 className="w-3 h-3" /> Analyzed</Badge>;
            case "analyzing":
                return <Badge variant="warning" className="gap-1.5 animate-pulse font-bold"><Clock className="w-3 h-3" /> Analyzing</Badge>;
            case "failed":
                return <Badge variant="destructive" className="gap-1.5 font-bold"><AlertCircle className="w-3 h-3" /> Failed</Badge>;
            default:
                return <Badge variant="secondary" className="gap-1.5 font-bold"><Clock className="w-3 h-3" /> Uploaded</Badge>;
        }
    };

    return (
        <div className="space-y-8 animate-fadeInUp">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                        RFP <span className="gradient-text">Library</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-500 mt-3 text-lg font-medium">
                        Manage your response documents and intelligence workflows.
                    </p>
                </div>
                <Button onClick={() => setIsUploadModalOpen(true)} size="lg" className="gap-2 shadow-2xl">
                    <Plus className="w-5 h-5" />
                    Ingest Document
                </Button>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search by title, client, or industry..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-transparent border-none text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 outline-none"
                    />
                </div>
                <div className="w-[1px] h-8 bg-zinc-100 dark:bg-zinc-800 hidden sm:block" />
                <Button variant="ghost" className="gap-2 font-bold text-zinc-600 dark:text-zinc-400">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </div>

            {/* RFP Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="h-[280px] rounded-3xl bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
                    ))
                ) : filteredRFPs?.length === 0 ? (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-900">
                            <FileText className="w-10 h-10 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">No documents found</h3>
                        <p className="text-zinc-500">Try adjusting your search or upload a new RFP.</p>
                    </div>
                ) : (
                    filteredRFPs?.map((rfp) => (
                        <div
                            key={rfp.id}
                            className="group relative bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl shadow-zinc-200/40 dark:shadow-none border border-zinc-100 dark:border-zinc-800 card-hover overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="space-y-1.5">
                                    <Link href={`/rfps/${rfp.id}`}>
                                        <h3 className="text-xl font-black text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-1 leading-none">
                                            {rfp.title}
                                        </h3>
                                    </Link>
                                    <p className="flex items-center gap-1.5 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                                        <Building2 className="w-3.5 h-3.5" />
                                        {rfp.client_name}
                                    </p>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl">
                                        <DropdownMenuItem asChild className="rounded-xl px-3 py-2.5 font-medium cursor-pointer">
                                            <Link href={`/rfps/${rfp.id}`}>
                                                <FileText className="w-4 h-4 mr-3 text-zinc-400" />
                                                View Workspace
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-medium cursor-pointer">
                                            <Download className="w-4 h-4 mr-3 text-zinc-400" />
                                            Export Assets
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => deleteRFP.mutate(rfp.id)}
                                            className="rounded-xl px-3 py-2.5 font-bold text-red-500 hover:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4 mr-3" />
                                            Delete Entry
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Status</p>
                                    {getStatusBadge(rfp.status)}
                                </div>
                                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1 text-zinc-400">Deadline</p>
                                    <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                                        {rfp.submission_deadline ? new Date(rfp.submission_deadline).toLocaleDateString() : "No date"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-zinc-50 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Confidence</p>
                                    <div className="flex items-center gap-1">
                                        <Sparkles className="w-3 h-3 text-emerald-500" />
                                        <span className="text-sm font-black text-zinc-900 dark:text-white">94%</span>
                                    </div>
                                </div>
                                {rfp.status === "uploaded" || rfp.status === "failed" ? (
                                    <Button
                                        size="sm"
                                        className="rounded-xl font-bold gap-2"
                                        onClick={() => startAnalysis.mutate(rfp.id)}
                                        loading={startAnalysis.isPending && startAnalysis.variables === rfp.id}
                                    >
                                        Analyze
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Link href={`/rfps/${rfp.id}`}>
                                        <Button variant="outline" size="sm" className="rounded-xl font-bold bg-transparent">
                                            Results
                                        </Button>
                                    </Link>
                                )}
                            </div>
                            {/* Subtle abstract touch */}
                            <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
                        </div>
                    ))
                )}
            </div>

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
            />
        </div>
    );
}
