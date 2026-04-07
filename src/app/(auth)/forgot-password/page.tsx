"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");

    if (!email) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        setLoading(false);
        return;
      }

      setSent(true);
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
          <Image
            src="/convertaflow-c.png"
            alt={SITE.name}
            width={32}
            height={32}
            className="h-8 w-auto object-contain -mr-[4px]"
          />
          <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
        </Link>
        <h1 className="mt-8 text-2xl font-bold tracking-tight">Reset your password</h1>
        <p className="mt-1.5 text-[14px] text-white/50">
          Enter your email and we&apos;ll send you a secure reset link.
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7">
        {sent ? (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Mail className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="mt-4 text-[16px] font-semibold text-white/95">
              Check your inbox
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
              If an account exists for that email, we&apos;ve sent a password reset link. The link expires in 1 hour.
            </p>
            <Link
              href="/login"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#8b5cf6] hover:text-[#06b6d4]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[13px] text-white/60">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@business.com"
                  required
                  autoComplete="email"
                  className="h-11 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-white/25"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={loading}
                className="h-11 w-full gap-1.5 border-0 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-5 text-center text-[12.5px] text-white/40">
              Remembered it?{" "}
              <Link href="/login" className="font-medium text-[#8b5cf6] hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
