"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE } from "@/lib/constants";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
        return;
      }
      window.location.href = "/dashboard";
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm text-white">
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image src="/convertaflow-logo.png" alt={SITE.name} width={44} height={44} className="h-11 w-11 object-contain" />
          <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
        </Link>
        <h1 className="mt-8 text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1.5 text-[14px] text-white/50">Sign in to access your dashboard</p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-[13px] text-white/60">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@business.com" required className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[13px] text-white/60">Password</Label>
              <Link href="/forgot-password" className="text-[12px] text-[#8b5cf6] hover:underline">Forgot password?</Link>
            </div>
            <Input id="password" name="password" type="password" placeholder="Enter your password" required className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-[13px] text-red-400">{error}</div>
          )}

          <Button type="submit" className="w-full gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90 h-11" size="lg" disabled={loading}>
            {loading ? (<><Loader2 className="h-4 w-4 animate-spin" />Signing in...</>) : (<>Sign In<ArrowRight className="h-4 w-4" /></>)}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/[0.06]" /></div>
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
            <span className="bg-[#060613] px-3 text-white/30">Or</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" type="button" className="text-[13px] border-white/[0.08] bg-white/[0.03] text-white/60 hover:bg-white/[0.06]" disabled>Google</Button>
          <Button variant="outline" type="button" className="text-[13px] border-white/[0.08] bg-white/[0.03] text-white/60 hover:bg-white/[0.06]" disabled>Microsoft</Button>
        </div>
      </div>

      <p className="mt-6 text-center text-[13px] text-white/40">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-[#8b5cf6] hover:underline">Get started</Link>
      </p>
    </div>
  );
}
