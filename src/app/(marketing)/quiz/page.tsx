"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const businessTypes = [
  { value: "cleaning", label: "Cleaning Service", emoji: "🧹" },
  { value: "bakery", label: "Bakery / Custom Cakes", emoji: "🎂" },
  { value: "detailing", label: "Auto Detailing", emoji: "🚗" },
  { value: "pressure-washing", label: "Pressure Washing", emoji: "💦" },
  { value: "beauty", label: "Beauty / Lashes / Hair", emoji: "💇" },
  { value: "fitness", label: "Fitness / Personal Training", emoji: "💪" },
  { value: "home-services", label: "Home Services / Handyman", emoji: "🔧" },
  { value: "restaurant", label: "Restaurant / Food Service", emoji: "🍽️" },
  { value: "real-estate", label: "Real Estate", emoji: "🏠" },
  { value: "other", label: "Something else", emoji: "✨" },
];

const challenges = [
  {
    value: "no-website",
    label: "I don't have a website yet",
    description: "I need a professional site to get started",
  },
  {
    value: "outdated-website",
    label: "My website looks outdated",
    description: "It doesn't reflect how good my work really is",
  },
  {
    value: "no-customers",
    label: "I'm not getting customers online",
    description: "People can't find me on Google or social media",
  },
  {
    value: "no-reviews",
    label: "I need more reviews",
    description: "Happy customers just don't leave them on their own",
  },
  {
    value: "too-busy",
    label: "I'm too busy to follow up with people",
    description: "I lose customers because I can't reply fast enough",
  },
  {
    value: "all-of-it",
    label: "Honestly, all of the above",
    description: "I need the full package",
  },
];

type Recommendation = {
  plan: string;
  slug: string;
  title: string;
  reason: string;
};

function getRecommendation(
  challenge: string
): Recommendation {
  if (challenge === "no-website" || challenge === "outdated-website") {
    return {
      plan: "Starter",
      slug: "tier1",
      title: "A premium website built for your business",
      reason:
        "You need a professional site that makes customers trust you on sight. Our Starter plan gets you a custom-designed website delivered in days.",
    };
  }
  if (challenge === "no-customers" || challenge === "no-reviews") {
    return {
      plan: "Growth",
      slug: "tier2",
      title: "A website plus tools to bring in customers",
      reason:
        "You need more than just a site \u2014 you need to show up on Google and stack up 5-star reviews. Our Growth plan includes your website plus a review system and a dashboard to track where customers come from.",
    };
  }
  // too-busy or all-of-it
  return {
    plan: "Scale",
    slug: "tier3",
    title: "The full system that runs while you work",
    reason:
      "You need everything working together: a website, automatic follow-ups, review requests, and missed-call text-back. Our Scale plan handles it all so nothing falls through the cracks.",
  };
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [business, setBusiness] = useState("");
  const [challenge, setChallenge] = useState("");

  const recommendation = challenge ? getRecommendation(challenge) : null;

  return (
    <section className="relative overflow-hidden bg-[#060613] py-16 text-white sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[130px]" />
        <div className="absolute bottom-[20%] right-[20%] h-[350px] w-[350px] rounded-full bg-[#3b82f6]/[0.05] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        {/* Progress bar */}
        <div className="mb-10 flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i <= step
                    ? "linear-gradient(90deg, #7c3aed, #3b82f6)"
                    : "rgba(255,255,255,0.06)",
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Business type */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                What kind of business do you run?
              </h1>
              <p className="mt-2 text-[15px] text-white/50">
                This helps us show you exactly how we can help.
              </p>

              <div className="mt-8 grid gap-2 sm:grid-cols-2">
                {businessTypes.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => {
                      setBusiness(b.value);
                      setStep(1);
                    }}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[14px] font-medium transition-all ${
                      business === b.value
                        ? "border-[#7c3aed]/40 bg-[#7c3aed]/10 text-white"
                        : "border-white/[0.06] bg-white/[0.03] text-white/70 hover:border-white/[0.12] hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="text-lg">{b.emoji}</span>
                    {b.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Biggest challenge */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setStep(0)}
                className="mb-4 flex items-center gap-1 text-[13px] text-white/40 hover:text-white/70 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                What&apos;s your biggest challenge right now?
              </h1>
              <p className="mt-2 text-[15px] text-white/50">
                Pick the one that hits hardest. We&apos;ll recommend the right plan.
              </p>

              <div className="mt-8 grid gap-2">
                {challenges.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => {
                      setChallenge(c.value);
                      setStep(2);
                    }}
                    className={`flex flex-col rounded-xl border px-4 py-3.5 text-left transition-all ${
                      challenge === c.value
                        ? "border-[#7c3aed]/40 bg-[#7c3aed]/10"
                        : "border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.06]"
                    }`}
                  >
                    <span className="text-[14px] font-medium text-white/90">
                      {c.label}
                    </span>
                    <span className="mt-0.5 text-[13px] text-white/40">
                      {c.description}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Recommendation */}
          {step === 2 && recommendation && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mb-4 flex items-center gap-1 text-[13px] text-white/40 hover:text-white/70 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#3b82f6]">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8b5cf6]">
                  Our recommendation
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {recommendation.title}
              </h1>

              <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                <span className="inline-block rounded-full bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-3 py-1 text-[11px] font-semibold text-white">
                  {recommendation.plan} Plan
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                  {recommendation.reason}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 sm:h-12 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-7 text-[15px] font-semibold text-white hover:opacity-90 border-0 shadow-lg shadow-[#7c3aed]/20 w-full sm:w-auto"
                  asChild
                >
                  <Link href={`/signup?plan=${recommendation.slug}`}>
                    Get Started with {recommendation.plan}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 sm:h-12 border-white/[0.08] bg-white/[0.03] px-7 text-[15px] text-white/80 hover:bg-white/[0.06] hover:text-white w-full sm:w-auto"
                  asChild
                >
                  <Link href="/pricing">Compare All Plans</Link>
                </Button>
              </div>

              <p className="mt-4 text-[13px] text-white/35">
                Not sure yet?{" "}
                <Link
                  href="/contact"
                  className="font-medium text-[#8b5cf6] hover:underline"
                >
                  Book a free consultation
                </Link>{" "}
                and we&apos;ll walk you through it.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
