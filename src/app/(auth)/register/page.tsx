"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Building2, UserPlus, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegister } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const router = useRouter();
    const register = useRegister();
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
        org_name: "",
    });
    const [error, setError] = useState<string | null>(null);

    const passwordRequirements = [
        { label: "At least 8 characters", met: formData.password.length >= 8 },
        { label: "At least one uppercase letter", met: /[A-Z]/.test(formData.password) },
        { label: "At least one number", met: /[0-9]/.test(formData.password) },
        { label: "Passwords match", met: formData.password === formData.confirm_password && formData.password !== "" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!formData.full_name || !formData.email || !formData.password || !formData.org_name) {
            setError("Please fill in all required fields");
            return;
        }

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }

        if (!passwordRequirements.every(r => r.met)) {
            setError("Password does not meet all requirements");
            return;
        }

        try {
            await register.mutateAsync({
                email: formData.email,
                password: formData.password,
                full_name: formData.full_name,
                organization_name: formData.org_name,
            });
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.detail || "Registration failed. Please try again.");
        }
    };

    return (
        <Card className=" border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 shadow-2xl w-full ">
            <CardHeader className="space-y-2 text-center pt-10 pb-8">
                <CardTitle className="text-4xl font-black text-zinc-900 dark:text-white tracking-tighter ">
                    Create <span className="text-emerald-500">Account</span>
                </CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
                    Get started with your free trial today
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 lg:px-10 pb-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-200/50 dark:border-red-900/20 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-2 animate-shake">
                            <X className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            icon={User}
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        />
                        <Input
                            label="Organization"
                            placeholder="Acme Corp"
                            icon={Building2}
                            value={formData.org_name}
                            onChange={(e) => setFormData({ ...formData, org_name: e.target.value })}
                        />
                    </div>

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="name@company.com"
                        icon={Mail}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.confirm_password}
                            onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                        />
                    </div>

                    <div className="p-6 rounded-[1.5rem] bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-100/50 dark:border-white/5 space-y-4">
                        <p className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">
                            Security Requirements
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {passwordRequirements.map((req) => (
                                <div key={req.label} className="flex items-center gap-2.5">
                                    <div className={cn(
                                        "w-5 h-5 rounded-lg flex items-center justify-center transition-all duration-300",
                                        req.met
                                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-300 dark:text-zinc-700"
                                    )}>
                                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold transition-colors",
                                        req.met ? "text-zinc-900 dark:text-emerald-500" : "text-zinc-500 dark:text-zinc-500"
                                    )}>
                                        {req.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="xl"
                        className="w-full h-14 rounded-2xl text-lg font-black  shadow-2xl shadow-emerald-500/20 mt-2"
                        loading={register.isPending}
                    >
                        Create Account
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="justify-center border-t border-zinc-100 dark:border-white/5 py-8 bg-zinc-50/50 dark:bg-black/20">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Already part of a swarm?{" "}
                    <Link
                        href="/login"
                        className="font-black  text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                    >
                        Sign in here
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
