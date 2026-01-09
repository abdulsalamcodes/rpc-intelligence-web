"use client";

import { useState } from "react";
import {
    Users,
    UserPlus,
    Mail,
    Shield,
    MoreVertical,
    Trash2,
    ShieldCheck,
    Building2,
    Check,
    ChevronDown,
    Sparkles,
    Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrgMembers, useInviteMember, useRemoveMember } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/authStore";

export default function TeamPage() {
    const currentOrg = useAuthStore((state) => state.currentOrg);
    const { data: members, isLoading } = useOrgMembers(currentOrg?.id);
    const inviteMember = useInviteMember();
    const removeMember = useRemoveMember();
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState("member");

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail || !currentOrg?.id) return;
        try {
            await inviteMember.mutateAsync({ orgId: currentOrg.id, email: inviteEmail, role: inviteRole });
            setInviteEmail("");
        } catch (err) {
            console.error(err);
        }
    };

    const membersList = members || [
        { id: "1", full_name: "Sarah Chen", email: "sarah@techcorp.com", role: "admin", status: "active" },
        { id: "2", full_name: "Michael Torres", email: "m.torres@techcorp.com", role: "member", status: "active" },
        { id: "3", full_name: "Emily Watson", email: "emily.w@techcorp.com", role: "member", status: "pending" },
    ];

    const activeCount = membersList.filter((m: any) => m.status === 'active').length;

    return (
        <div className="space-y-10 animate-fadeInUp">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight leading-none">
                        Strategy <span className="gradient-text">Collaborators</span>
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-500 mt-3 text-lg font-medium">
                        Assemble your elite team of proposal managers and AI operators.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Left: Stats & Quick Actions */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="border-none shadow-2xl bg-zinc-900 text-white overflow-hidden relative group">
                        <CardContent className="p-8 relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Users className="w-5 h-5 text-emerald-400" />
                                <h3 className="text-lg font-black  tracking-tight">Active Seats</h3>
                            </div>
                            <div className="flex items-end gap-3 mb-4">
                                <span className="text-5xl font-black leading-none">{membersList.filter(m => m.status === 'active').length}</span>
                                <span className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-1">/ 25 Capacity</span>
                            </div>
                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '32%' }} />
                            </div>
                        </CardContent>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                    </Card>

                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900 p-6">
                        <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Permissions Overview</h4>
                        <div className="space-y-4">
                            {[
                                { role: 'Admin', description: 'Full access + Billing' },
                                { role: 'Member', description: 'Upload & Analysis' },
                                { role: 'Viewer', description: 'Read-only access' }
                            ].map(r => (
                                <div key={r.role} className="flex flex-col gap-0.5">
                                    <p className="text-sm font-black text-zinc-900 dark:text-white">{r.role}</p>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{r.description}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right: Member List & Invite */}
                <div className="lg:col-span-3 space-y-10">
                    {/* Invite Form */}
                    <Card className="border-none shadow-2xl bg-white dark:bg-zinc-900 overflow-hidden">
                        <CardHeader className="bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 pb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/30">
                                    <UserPlus className="w-5 h-5 text-white" />
                                </div>
                                <CardTitle className="text-2xl font-black  tracking-tight">Expand Workspace</CardTitle>
                            </div>
                            <CardDescription className="text-zinc-500 font-medium ">Broadcast access keys to your colleagues</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        placeholder="colleague@techcorp.com"
                                        icon={Mail}
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        className="rounded-xl h-12"
                                    />
                                </div>
                                <div className="w-full md:w-48">
                                    <select
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value)}
                                        className="w-full h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent focus:border-emerald-500 px-4 text-sm font-bold outline-none appearance-none"
                                    >
                                        <option value="member">Strategy Lead</option>
                                        <option value="admin">Admin Operator</option>
                                        <option value="viewer">Analyst</option>
                                    </select>
                                </div>
                                <Button type="submit" size="xl" className="rounded-xl font-black  h-12 shadow-2xl px-10" loading={inviteMember.isPending}>
                                    Invite
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Team List */}
                    <Card className="border-none shadow-xl bg-white dark:bg-zinc-900">
                        <CardHeader className="border-b border-zinc-50 dark:border-zinc-800 pb-6">
                            <CardTitle className="text-xl font-black  tracking-tight flex items-center gap-2">
                                <Users className="w-5 h-5 text-zinc-400" />
                                Personnel Roster
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-zinc-50 dark:divide-zinc-800">
                                {membersList.map((member: any) => (
                                    <div key={member.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors group">
                                        <div className="flex items-center gap-5">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-black text-xl group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 group-hover:text-emerald-600 transition-all">
                                                    {member.full_name?.split(" ").map((n: string) => n[0]).join("") || "U"}
                                                </div>
                                                {member.status === 'active' && (
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 shadow-sm" />
                                                )}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-base font-black text-zinc-900 dark:text-white leading-none">{member.full_name}</p>
                                                <p className="text-sm font-medium text-zinc-500">{member.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-right hidden sm:block">
                                                <Badge variant={member.role === 'admin' ? 'premium' : 'secondary'} className="px-2 py-0.5 rounded-lg font-black uppercase tracking-widest text-[10px]">
                                                    {member.role}
                                                </Badge>
                                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                                                    {member.status === 'active' ? 'Operational' : 'Access Pending'}
                                                </p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 p-2 rounded-2xl bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-2xl">
                                                    <DropdownMenuItem className="rounded-xl px-3 py-2.5 font-medium cursor-pointer">
                                                        <Shield className="w-4 h-4 mr-3 text-zinc-400" />
                                                        Elevate Permissions
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            if (currentOrg?.id) {
                                                                removeMember.mutate({ orgId: currentOrg.id, userId: member.id });
                                                            }
                                                        }}
                                                        className="rounded-xl px-3 py-2.5 font-bold text-red-500 hover:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-3" />
                                                        Revoke Authorization
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
