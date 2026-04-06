import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Star, HelpCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Choose the Convertaflow plan that fits your business — from a premium website to a complete growth system.",
};

const faqs = [
  {
    q: "What's included in the setup fee?",
    a: "The setup fee covers the complete design and build of your system — custom website, dashboard configuration, email integration, and review workflows. You own the design. The monthly fee covers hosting, platform access, support, and maintenance.",
  },
  {
    q: "Will this work for my type of business?",
    a: "Convertaflow is built for service businesses, local businesses, professional practices, and any company that needs a strong online presence. If you rely on new customers finding you online — this is built for you.",
  },
  {
    q: "Can I upgrade later?",
    a: "Absolutely. Many clients start with Tier 1 and upgrade once they see the impact of a professional online presence. Upgrading is seamless — we add features on top of what you already have.",
  },
  {
    q: "How does the dashboard work?",
    a: "It's a clean web-based interface showing leads, review requests, email activity, and analytics in one place. Log in, see what matters, take action. Designed to be useful — not overwhelming.",
  },
  {
    q: "How is email handled?",
    a: "All emails — lead notifications, review requests, follow-ups — are sent through Resend, a modern email delivery platform. Branded with your business details and optimized for deliverability.",
  },
  {
    q: "Is there a contract?",
    a: "No long-term contracts. The setup fee is one-time, monthly platform fee is billed monthly. Cancel anytime — though you'll lose access to the dashboard and automation features.",
  },
];

export default function PricingPage() {
  const tiers = Object.values(TIERS);

  return (
    <>
      {/* Dark premium pricing hero */}
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.08] blur-[130px]" />
          <div className="absolute bottom-[10%] right-[20%] h-[350px] w-[350px] rounded-full bg-[#3b82f6]/[0.06] blur-[130px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              Pricing
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Invest in growth,{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                not guesswork
              </span>
            </h1>
            <p className="mt-4 text-[16px] leading-relaxed text-white/50">
              Every plan delivers real value. Choose the level your business is ready for.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6",
                  tier.highlighted
                    ? "border-[#7c3aed]/40 bg-white/[0.06] shadow-xl shadow-purple-500/[0.08] ring-1 ring-[#7c3aed]/20 lg:scale-[1.02]"
                    : "border-white/[0.06] bg-white/[0.03]"
                )}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-2.5 left-6 gap-1 text-[11px] font-semibold tracking-wide bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <p className="mt-0.5 text-[13px] font-medium text-[#8b5cf6]">
                    {tier.audience}
                  </p>
                </div>

                <div className="mt-5">
                  <span className="text-4xl font-extrabold tracking-tight text-white">{tier.price}</span>
                  <p className="mt-0.5 text-[13px] text-white/40">{tier.priceNote}</p>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-white/80">{tier.monthly}</span>
                    <span className="text-[13px] text-white/35">{tier.monthlyNote}</span>
                  </div>
                </div>

                <p className="mt-4 flex-1 text-[13px] leading-relaxed text-white/45">
                  {tier.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/[0.06] pt-5">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-white/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  className={cn(
                    "mt-6 gap-1.5",
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90"
                      : "bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]"
                  )}
                  size="lg"
                  asChild
                >
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <Section>
        <SectionHeader badge="FAQ" title="Questions before you start" />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border/60 bg-card p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary/50" />
                <div>
                  <h3 className="text-[14px] font-semibold">{faq.q}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Not sure which plan is right?
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Talk to our team. We&apos;ll help you find the best fit.
          </p>
          <Button size="lg" className="mt-6 gap-1.5" asChild>
            <Link href="/contact">
              Talk to Our Team
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
