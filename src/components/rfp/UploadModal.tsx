"use client";

import { useState, useCallback } from "react";
import { useUploadRFP } from "@/lib/hooks";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, FileText, CheckCircle2, AlertCircle, Loader2, Sparkles, Building2, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function UploadModal({ isOpen, onClose }: UploadModalProps) {
    const [file, setFile] = useState<File | null>(null);
    const [metadata, setMetadata] = useState({
        client_name: "",
        sector: "",
        submission_deadline: "",
    });
    const [dragActive, setDragActive] = useState(false);
    const uploadRFP = useUploadRFP();

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleUpload = async () => {
        if (!file) return;

        try {
            await uploadRFP.mutateAsync({
                file,
                ...metadata,
            });
            onClose();
            setFile(null);
            setMetadata({ client_name: "", sector: "", submission_deadline: "" });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-2xl">
                <div className="relative p-8 lg:p-10 space-y-8">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                                <Upload className="w-5 h-5" />
                            </div>
                            <DialogTitle className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                                Ingest <span className="gradient-text">RFP Document</span>
                            </DialogTitle>
                        </div>
                        <DialogDescription className="text-zinc-500 text-lg font-medium">
                            Initialize our AI agents to analyze your document and extract requirements.
                        </DialogDescription>
                    </DialogHeader>

                    {!file ? (
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={cn(
                                "group relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300",
                                dragActive
                                    ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10 scale-[0.99]"
                                    : "border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                            )}
                        >
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-20 h-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30">
                                    <FileText className="w-10 h-10 text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xl font-bold text-zinc-900 dark:text-white">
                                        Drop your RFP here
                                    </p>
                                    <p className="text-zinc-500 font-medium">
                                        Support for PDF, DOCX (Max 250MB)
                                    </p>
                                </div>
                                <div className="mt-4">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        className="hidden"
                                        onChange={(e) => e.target.files && setFile(e.target.files[0])}
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <Button asChild size="lg" className="rounded-xl shadow-lg">
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            Select File
                                        </label>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-between group animate-scaleIn">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <FileText className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-black text-zinc-900 dark:text-white truncate max-w-[200px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setFile(null)}
                                className="h-10 w-10 bg-white dark:bg-zinc-950 rounded-xl hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Client Name"
                            placeholder="e.g. Acme Corporation"
                            icon={Building2}
                            value={metadata.client_name}
                            onChange={(e) => setMetadata({ ...metadata, client_name: e.target.value })}
                            className="rounded-xl h-12"
                        />
                        <Input
                            label="Industry / Sector"
                            placeholder="e.g. Telecommunications"
                            icon={Target}
                            value={metadata.sector}
                            onChange={(e) => setMetadata({ ...metadata, sector: e.target.value })}
                            className="rounded-xl h-12"
                        />
                        <div className="md:col-span-2">
                            <Input
                                label="Submission Deadline"
                                type="date"
                                icon={Loader2}
                                value={metadata.submission_deadline}
                                onChange={(e) => setMetadata({ ...metadata, submission_deadline: e.target.value })}
                                className="rounded-xl h-12"
                            />
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <Button variant="ghost" size="lg" onClick={onClose} className="flex-1 rounded-xl font-bold">
                                Discard
                            </Button>
                            <Button
                                size="lg"
                                className="flex-[2] rounded-xl font-bold text-md shadow-2xl"
                                disabled={!file || !metadata.client_name}
                                onClick={handleUpload}
                                loading={uploadRFP.isPending}
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                Initialize AI Workspace
                            </Button>
                        </div>
                    </DialogFooter>
                </div>

                {/* Abstract background shape */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
            </DialogContent>
        </Dialog>
    );
}
