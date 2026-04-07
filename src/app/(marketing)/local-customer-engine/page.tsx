import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  CheckCircle2,
  Zap,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ENGINE_TIERS, ENGINE_PILLARS, ENGINE_PROOF } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Local Customer Engine · Convertaflow",
  description:
    "We get local businesses more customers every month. Google Business Profile, local SEO, missed-call rescue, and reviews on autopilot. For plumbers, dentists, yoga studios, real estate agents, and any local business that depends on showing up first.",
};

const PILLAR_ICONS = [MapPin, Phone, Star, TrendingUp];

export default function LocalCustomerEnginePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[10%] left-[15%] h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-[#06b6d4]/[0.08] blur-[60px] sm:blur-[120px]" />
          <div className="absolute bottom-[10%] right-[15%] h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#7c3aed]/[0.08] blur-[60px] sm:blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.08] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#67e8f9]">
              <Zap className="h-3 w-3" />
              For local businesses
            </span>
            <h1 className="text-[2rem] font-extrabold leading-[1.05] tracking-tight sm:text-[3.25rem] lg:text-[3.75rem]">
              We get you{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4, #8b5cf6)",
                  backgroundSize: "200% 100%",
                  animation: "text-wave 6s ease-in-out infinite",
                }}
              >
                more local customers.
              </span>
              <br />
              Every month.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-[1.7] text-white/55 sm:text-[17px]">
              Whether you&apos;re a plumber, dentist, yoga instructor, or any
              local business that lives and dies by showing up first when
              someone searches for your service nearby. We handle the Google
              stuff, the missed calls, the reviews, and everything in between.
              You focus on the actual work.
            </p>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button
                size="lg"
                className="h-12 gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-7 text-[15px] font-semibold text-white shadow-lg shadow-[#7c3aed]/20 hover:opacity-90 sm:w-auto"
                asChild
              >
                <Link href="/contact">
                  Talk to Us About Your Business
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/[0.08] bg-white/[0.03] px-7 text-[15px] text-white/80 hover:bg-white/[0.06] sm:w-auto"
                asChild
              >
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>

            <p className="mt-5 text-[12px] text-white/30">
              No contracts · Cancel anytime · We do the work
            </p>
          </div>
        </div>
      </section>

      {/* The proof bar */}
      <section className="bg-[#060613] py-8 text-white border-y border-white/[0.04] sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {ENGINE_PROOF.map((p) => (
              <div key={p.label} className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#06b6d4]">
                  {p.metric}
                </p>
                <p className="mt-2 text-[15px] font-bold text-white sm:text-[17px]">
                  {p.label}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/45">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The four pillars — the actual offer */}
      <section
        id="how-it-works"
        className="bg-[#060613] py-12 text-white sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              What we actually do
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Four things working for you{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                every single day
              </span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            {ENGINE_PILLARS.map((pillar, i) => {
              const Icon = PILLAR_ICONS[i] ?? CheckCircle2;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-7"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/15 border border-[#7c3aed]/20">
                    <Icon className="h-5 w-5 text-[#06b6d4]" />
                  </div>
                  <h3 className="mt-4 text-[16px] font-bold text-white sm:text-[18px]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/55 sm:text-[14px]">
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The "wait, but I already have a website" section */}
      <section className="bg-[#0a0a20] py-12 text-white border-y border-white/[0.04] sm:py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/15 border border-[#7c3aed]/20">
                <MessageSquare className="h-5 w-5 text-[#06b6d4]" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-white sm:text-[19px]">
                  Already have a website?
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
                  Perfect. The Local Customer Engine works on top of any
                  website. Keep yours, we&apos;ll plug everything else into it.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60 sm:text-[15px]">
                  No website yet? We can build you one too. Check out our{" "}
                  <Link
                    href="/pricing"
                    className="font-semibold text-[#06b6d4] hover:underline"
                  >
                    website plans
                  </Link>{" "}
                  and bundle them with the Engine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-[#060613] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              Simple Pricing
            </span>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Pick the level that{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                fits your business
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[14px] text-white/45 sm:text-[15px]">
              One-time setup, then optional monthly management. Start with
              what you need today, upgrade anytime.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-3">
            {ENGINE_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 sm:p-7",
                  tier.highlighted
                    ? "border-[#7c3aed]/40 bg-white/[0.06] shadow-xl shadow-purple-500/[0.08] ring-1 ring-[#7c3aed]/20 lg:scale-[1.02]"
                    : "border-white/[0.06] bg-white/[0.03]"
                )}
              >
                {tier.highlighted && (
                  <span className="absolute -top-2.5 left-6 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
                    Most Popular
                  </span>
                )}

                <h3 className="text-[17px] font-bold text-white sm:text-[18px]">
                  {tier.name}
                </h3>
                <p className="mt-1 text-[12px] font-medium text-[#8b5cf6]">
                  {tier.audience}
                </p>

                <div className="mt-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                      {tier.headlinePrice}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-white/55">
                    {tier.headlinePriceNote}
                  </p>
                  {tier.secondaryPrice && (
                    <p className="mt-2 inline-block rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-white/55">
                      {tier.secondaryPrice}
                    </p>
                  )}
                </div>

                <p className="mt-4 flex-1 text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
                  {tier.description}
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-white/[0.06] pt-5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[13px] text-white/70"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-6 gap-1.5",
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90"
                      : "border border-[#7c3aed]/40 bg-[#7c3aed]/10 text-white hover:bg-[#7c3aed]/20"
                  )}
                  size="lg"
                  asChild
                >
                  <Link href="/contact">
                    {tier.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white border-t border-white/[0.04] sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[700px] rounded-full bg-[#7c3aed]/[0.08] blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to stop losing customers to your competitors?
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/55">
            Tell us about your business. We&apos;ll show you exactly what we
            can do for you, no pressure, no hard sell. If we&apos;re not the
            right fit, we&apos;ll tell you that too.
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button
              size="lg"
              className="h-12 gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-7 text-[15px] font-semibold text-white shadow-lg shadow-[#7c3aed]/20 hover:opacity-90"
              asChild
            >
              <Link href="/contact">
                Talk to Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
