"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { ArrowRight, Loader2, Check, Clock, RotateCcw, ShieldCheck, Info, FileText, MessageSquare, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE, TIERS, PLAN_FROM_SLUG, PLAN_SLUGS } from "@/lib/constants";
import { requiresMonthly } from "@/lib/tier";
import type { TierId } from "@/lib/types";

const inputClass =
  "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25";

function SignupInner() {
  const router = useRouter();
  const params = useSearchParams();
  const rawPlan = params.get("plan");
  const planSlug = rawPlan || "tier2";
  const planFound = !!rawPlan && !!PLAN_FROM_SLUG[planSlug];
  const tierId: TierId = PLAN_FROM_SLUG[planSlug] || "growth";
  const tier = TIERS[tierId];
  const planMissing = !rawPlan;
  const planInvalid = !!rawPlan && !planFound;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const intakeFields = useMemo(
    () => [
      { name: "businessName", label: "Business Name", placeholder: "Acme Co.", type: "text", required: true },
      { name: "contactName", label: "Your Name", placeholder: "Jane Smith", type: "text", required: true },
      { name: "email", label: "Email", placeholder: "you@business.com", type: "email", required: true },
      { name: "phone", label: "Phone", placeholder: "(555) 000-0000", type: "tel", required: false },
    ],
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);

    const payload = {
      plan: tierId,
      businessName: String(fd.get("businessName") || ""),
      contactName: String(fd.get("contactName") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      password: String(fd.get("password") || ""),
      description: String(fd.get("description") || ""),
      goal: String(fd.get("goal") || ""),
      turnstileToken,
    };

    if (!payload.email || !payload.password || !payload.businessName || !payload.contactName) {
      setError("Please fill in the required fields.");
      setLoading(false);
      return;
    }

    if (payload.password.length < 8) {
      setError("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/portal?welcome=1");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    } finally {
      turnstileRef.current?.reset();
    }
  }

  return (
    <div className="w-full max-w-5xl text-white">
      {/* Brand header */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <Image
            src="/convertaflow-c.png"
            alt={SITE.name}
            width={28}
            height={28}
            className="h-7 w-auto object-contain -mr-[4px]"
          />
          <span className="text-lg font-bold tracking-tight">{SITE.name}</span>
        </Link>
      </div>

      {(planMissing || planInvalid) && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-[#06b6d4]/20 bg-[#06b6d4]/[0.06] px-4 py-3 text-[12.5px] text-[#a5e8f3]">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
          <div>
            {planInvalid
              ? "We couldn't find that plan, so we picked our most popular one for you. Use the switcher below to change it."
              : "We picked our most popular plan to start. Use the switcher below to change it before you sign up."}
          </div>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT — Plan summary */}
        <aside className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-7">
          <span className="inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
            Selected Plan
          </span>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {tier.name}
          </h1>
          <p className="mt-1 text-[13px] font-medium text-[#8b5cf6]">{tier.audience}</p>

          {/* Pricing */}
          <div className="mt-5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {tier.price}
              </span>
              <span className="text-[12px] text-white/40">{tier.priceNote}</span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white/80">{tier.monthly}</span>
              <span className="text-[12px] text-white/40">
                {requiresMonthly(tierId) ? "(required)" : "(optional)"} · {tier.monthlyNote}
              </span>
            </div>
          </div>

          {/* Delivery + Revisions */}
          <div className="mt-4 flex gap-3 rounded-xl border border-white/[0.04] bg-white/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[12px] text-white/60">
              <Clock className="h-3.5 w-3.5 text-[#06b6d4]" />
              {tier.deliveryDays}
            </div>
            <div className="h-4 w-px bg-white/[0.08]" />
            <div className="flex items-center gap-1.5 text-[12px] text-white/60">
              <RotateCcw className="h-3.5 w-3.5 text-[#06b6d4]" />
              {tier.revisions} revisions
            </div>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-white/50">{tier.description}</p>

          <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-4">
            {tier.features.slice(0, 6).map((f) => (
              <li key={f} className="flex items-start gap-2 text-[12.5px] text-white/70">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                {f}
              </li>
            ))}
          </ul>

          {/* Plan switcher */}
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-white/30">
              Switch plan
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(Object.keys(PLAN_SLUGS) as TierId[]).map((id) => {
                const active = id === tierId;
                return (
                  <Link
                    key={id}
                    href={`/signup?plan=${PLAN_SLUGS[id]}`}
                    className={
                      active
                        ? "rounded-full border border-[#7c3aed]/40 bg-[#7c3aed]/15 px-3 py-1 text-[11px] font-semibold text-white"
                        : "rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/60 transition-colors hover:border-white/[0.15] hover:text-white"
                    }
                  >
                    {TIERS[id].shortName}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT — Intake form */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-7">
          <h2 className="text-xl font-bold tracking-tight text-white/95">Create your account</h2>
          <p className="mt-1 text-[13px] text-white/50">
            Takes about a minute. The full project questionnaire happens inside your portal — not here.
          </p>

          {/* What happens next — quick visual reassurance */}
          <ol className="mt-4 space-y-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3.5">
            {[
              { icon: FileText, text: "Quick intake (right now)" },
              { icon: MessageSquare, text: "Full onboarding inside your portal" },
              { icon: Rocket, text: "We confirm your plan and start your build" },
            ].map((step, i) => (
              <li key={i} className="flex items-center gap-2.5 text-[12.5px] text-white/65">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7c3aed]/15 text-[10px] font-bold text-[#a78bfa]">
                  {i + 1}
                </span>
                <step.icon className="h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                {step.text}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4 sm:space-y-4">
            {intakeFields.map((f) => (
              <div key={f.name} className="space-y-1.5">
                <Label htmlFor={f.name} className="text-[12px] text-white/60">
                  {f.label}
                  {f.required && <span className="text-red-400/70"> *</span>}
                </Label>
                <Input
                  id={f.name}
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  required={f.required}
                  autoComplete={
                    f.name === "email"
                      ? "email"
                      : f.name === "businessName"
                      ? "organization"
                      : f.name === "contactName"
                      ? "name"
                      : f.name === "phone"
                      ? "tel"
                      : "off"
                  }
                  className={`h-11 ${inputClass}`}
                />
              </div>
            ))}

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-[12px] text-white/60">
                Password <span className="text-red-400/70">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                required
                autoComplete="new-password"
                className={`h-11 ${inputClass}`}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-[12px] text-white/60">
                Briefly, what does your business do?
              </Label>
              <textarea
                id="description"
                name="description"
                rows={2}
                placeholder="e.g. Family dental practice in Austin, focused on cosmetic work."
                className="w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[14px] text-white placeholder:text-white/25 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="goal" className="text-[12px] text-white/60">
                Top goal for this project?
              </Label>
              <textarea
                id="goal"
                name="goal"
                rows={2}
                placeholder="e.g. Capture more inquiries from Google and look more established."
                className="w-full rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[14px] text-white placeholder:text-white/25 focus:border-[#7c3aed]/40 focus:outline-none focus:ring-1 focus:ring-[#7c3aed]/20"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-400">
                {error}
              </div>
            )}

            {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
              <Turnstile
                ref={turnstileRef}
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                onSuccess={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "dark", size: "normal" }}
              />
            )}

            <Button
              type="submit"
              size="lg"
              disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken)}
              className="h-11 w-full gap-1.5 border-0 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account & Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="flex items-start gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2.5 text-[11.5px] text-white/45">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
              You won&apos;t be charged yet. We&apos;ll review your intake, confirm your plan, and send a secure payment link before any work begins.
            </div>
          </form>

          <p className="mt-4 text-center text-[12.5px] text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#8b5cf6] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-white/40">Loading…</div>}>
      <SignupInner />
    </Suspense>
  );
}
