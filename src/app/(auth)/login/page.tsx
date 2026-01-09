"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLogin } from "@/lib/hooks";

export default function LoginPage() {
    const router = useRouter();
    const login = useLogin();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setError(null);

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await login.mutateAsync(formData);
            router.push("/dashboard");
        } catch (err) {
            const error = err as { response?: { data?: { detail?: string } } };
            setError(error.response?.data?.detail || "Invalid email or password");
        }
    };

    return (
        <Card className=" border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 shadow-2xl">
            <CardHeader className="space-y-2 text-center">
                <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
                <CardDescription className="text-zinc-500 dark:text-zinc-400">
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm font-medium animate-shake">
                            {error}
                        </div>
                    )}
                    <div className="space-y-2.5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="name@company.com"
                            icon={Mail}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                    <div className="space-y-2.5">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                Password
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            icon={Lock}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="rounded-xl"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 rounded-xl text-md"
                        loading={login.isPending}
                    >
                        Sign In
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-zinc-950 px-3 text-zinc-500 dark:text-zinc-500 font-medium">
                            Or continue with
                        </span>
                    </div>
                </div>

                <Button variant="outline" className="w-full h-12 rounded-xl text-zinc-700 dark:text-zinc-300 gap-3">
                    <Github className="w-5 h-5" />
                    GitHub
                </Button>
            </CardContent>
            <CardFooter className="justify-center border-t border-zinc-100 dark:border-zinc-800/50 py-6">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors"
                    >
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
