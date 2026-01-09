"use client";

import { useState } from "react";
import { User, Building2, Shield, Bell, Trash2, CheckCircle2, AlertCircle, Save, Globe, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/authStore";

export default function SettingsPage() {
    const { user, currentOrg } = useAuthStore();
    const [profileData, setProfileData] = useState({
        full_name: user?.full_name || "",
        email: user?.email || "",
    });

    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                        Workspace <span className="gradient-text">Settings</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-500 mt-3 text-lg font-medium">
                        Manage your personal profile and organization preferences.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Navigation / Profile Summary */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 overflow-hidden">
                        <CardContent className="p-8 text-center pt-12 relative">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-emerald-500/30">
                                    {user?.full_name?.split(" ").map(n => n[0]).join("") || "U"}
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white dark:bg-zinc-950 border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center shadow-lg">
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white truncate">{user?.full_name}</h3>
                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1 mb-6">{currentOrg?.name} • {currentOrg?.role}</p>
                            <div className="flex items-center justify-center gap-2">
                                <Badge variant="premium">Verified Identity</Badge>
                                <Badge variant="secondary">Admin Access</Badge>
                            </div>
                            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl" />
                        </CardContent>
                    </Card>

                    <div className="space-y-2">
                        {[
                            { label: "Profile", icon: User, active: true },
                            { label: "Organization", icon: Building2 },
                            { label: "Security", icon: Shield },
                            { label: "Connectivity", icon: Globe },
                        ].map((item) => (
                            <button
                                key={item.label}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-md font-bold transition-all duration-300",
                                    item.active
                                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl"
                                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Section */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Profile Settings */}
                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                        <CardHeader className="border-b border-zinc-50 dark:border-zinc-800 pb-8">
                            <CardTitle className="text-2xl font-black  tracking-tight">Identity Profile</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium mt-1">Updates to your legal name and contact vector</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input
                                    label="Full Name"
                                    icon={User}
                                    value={profileData.full_name}
                                    onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                                    className="rounded-xl h-12"
                                />
                                <Input
                                    label="Email Vector"
                                    type="email"
                                    icon={Mail}
                                    value={profileData.email}
                                    disabled
                                    className="rounded-xl h-12 opacity-70 bg-zinc-50/50"
                                    iconClassName="text-emerald-500"
                                />
                            </div>
                            <div className="flex justify-end p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                <Button className="rounded-xl font-black  h-12 px-8 gap-2">
                                    <Save className="w-4 h-4" />
                                    Synchronize Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Org Settings */}
                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                        <CardHeader className="border-b border-zinc-50 dark:border-zinc-800 pb-8">
                            <CardTitle className="text-2xl font-black  tracking-tight">Organization Cluster</CardTitle>
                            <CardDescription className="text-zinc-500 font-medium mt-1">Hierarchy and workspace branding configuration</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8 space-y-8">
                            <Input
                                label="Workspace Label"
                                icon={Building2}
                                value={currentOrg?.name}
                                className="rounded-xl h-12"
                            />
                            <div className="p-6 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-900/20 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-950 flex items-center justify-center shadow-sm">
                                        <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-zinc-900 dark:text-white leading-none mb-1">Privileged Access Level</p>
                                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{currentOrg?.role}</p>
                                    </div>
                                </div>
                                <Badge variant="premium">Global Admin</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 border-t-4 border-red-500">
                        <CardHeader>
                            <CardTitle className="text-xl font-black text-red-500 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5" />
                                Termination Zone
                            </CardTitle>
                            <CardDescription className="text-zinc-500 font-medium">Irreversible workspace decommissioning and identity purge</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4 flex items-center justify-between gap-6">
                            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
                                This will immediately terminate all active AI agents, purge document repositories, and void current service level agreements.
                            </p>
                            <Button variant="destructive" className="rounded-xl font-black  h-12 px-8 min-w-[180px]">
                                Terminate Workspace
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function ShieldCheck(props: any) {
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

function Mail(props: any) {
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
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
