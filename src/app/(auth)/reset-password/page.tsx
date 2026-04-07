"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const password = String(formData.get("password") || "");
    const confirm = String(formData.get("confirm") || "");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        setLoading(false);
        return;
      }

      setDone(true);
      // Let the user see the success state, then send them to portal
      setTimeout(() => router.push("/portal"), 1500);
    } catch {
      setError("Something went wrong. Please try again.");
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
        <h1 className="mt-8 text-2xl font-bold tracking-tight">Set a new password</h1>
        <p className="mt-1.5 text-[14px] text-white/50">
          Choose something secure. At least 8 characters.
        </p>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7">
        {done ? (
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Check className="h-6 w-6 text-emerald-400" />
            </div>
            <h2 className="mt-4 text-[16px] font-semibold text-white/95">
              Password updated
            </h2>
            <p className="mt-1.5 text-[13px] text-white/55">
              Redirecting you to your portal…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[13px] text-white/60">
                New password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                required
                autoComplete="new-password"
                className="h-11 border-white/[0.08] bg-white/[0.04] text-white placeholder:text-white/25"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirm" className="text-[13px] text-white/60">
                Confirm new password
              </Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="Re-enter password"
                required
                autoComplete="new-password"
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
                  Updating…
                </>
              ) : (
                <>
                  Update Password
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
