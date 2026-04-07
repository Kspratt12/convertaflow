import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Star, HelpCircle, Clock, RotateCcw } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TIERS, PLAN_SLUGS } from "@/lib/constants";
import { MAIN_TIER_IDS } from "@/lib/tier";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the Convertaflow tier that fits your business — from luxury website design to a complete growth system.",
};

const faqs = [
  {
    q: "What exactly do I get?",
    a: "You get a fully custom-designed website plus the systems included in your tier — built by our team, not a template. We handle the design, development, and setup. You approve, we launch.",
  },
  {
    q: "How fast will my site be live?",
    a: "Foundation tier launches in 5–7 business days. Growth in 7–10. Scale in 10–14. We move fast without cutting corners.",
  },
  {
    q: "What if I need changes?",
    a: "Every tier includes revisions — 3, 5, or 10 depending on your plan. Additional revisions are available as add-ons if needed.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. Many clients start with Foundation and upgrade once they see the impact. We add the new systems on top of what you already have — no rebuilding.",
  },
  {
    q: "Is this a subscription?",
    a: "The design and build is a one-time investment. The monthly fee covers hosting, support, system access, and ongoing maintenance. Cancel anytime.",
  },
  {
    q: "Do you work with my industry?",
    a: "We work with service businesses, professional practices, local businesses, and growing companies. If you need to look established and capture more leads online — we can help.",
  },
];

export default function PricingPage() {
  const tiers = MAIN_TIER_IDS.map((id) => TIERS[id]);

  return (
    <>
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[60px] sm:blur-[120px]" />
          <div className="absolute bottom-[10%] right-[20%] h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full bg-[#3b82f6]/[0.05] blur-[60px] sm:blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <span className="mb-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 sm:mb-5">
              Pricing
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Premium service,{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h1>
            <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[16px]">
              Every tier is designed, built, and delivered by our team. No templates. No DIY. Choose the level your business is ready for.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-5 sm:p-6",
                  tier.highlighted
                    ? "border-[#7c3aed]/40 bg-white/[0.06] shadow-xl shadow-purple-500/[0.08] ring-1 ring-[#7c3aed]/20 lg:scale-[1.02]"
                    : "border-white/[0.06] bg-white/[0.03]"
                )}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-2.5 left-5 gap-1 text-[11px] font-semibold tracking-wide bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                )}

                <h3 className="text-base sm:text-lg font-bold text-white">{tier.name}</h3>
                <p className="mt-0.5 text-[12px] sm:text-[13px] font-medium text-[#8b5cf6]">{tier.audience}</p>

                <div className="mt-4 sm:mt-5">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{tier.price}</span>
                  <p className="mt-0.5 text-[12px] sm:text-[13px] text-white/40">{tier.priceNote}</p>
                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="text-base sm:text-lg font-bold text-white/80">{tier.monthly}</span>
                    <span className="text-[12px] sm:text-[13px] text-white/35">{tier.monthlyNote}</span>
                  </div>
                </div>

                {/* Delivery + Revisions */}
                <div className="mt-3 sm:mt-4 flex gap-3 rounded-xl bg-white/[0.03] border border-white/[0.04] px-3 py-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/60">
                    <Clock className="h-3.5 w-3.5 text-[#06b6d4]" />
                    {tier.deliveryDays}
                  </div>
                  <div className="h-4 w-px bg-white/[0.08]" />
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-[12px] text-white/60">
                    <RotateCcw className="h-3.5 w-3.5 text-[#06b6d4]" />
                    {tier.revisions} revisions
                  </div>
                </div>

                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-white/45">{tier.description}</p>

                <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/70">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="mt-3 text-center text-[10px] text-white/25">{tier.microcopy}</p>

                <Button
                  className={cn(
                    "mt-3 gap-1.5",
                    tier.highlighted
                      ? "bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90"
                      : "bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]"
                  )}
                  size="lg"
                  asChild
                >
                  <Link href={`/signup?plan=${PLAN_SLUGS[tier.id]}`}>
                    {tier.highlighted ? "Start My Build" : tier.id === "scale" ? "Get My Growth Engine" : "Start My Website"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Upgrade — for users who already have a website */}
      <Section>
        <div className="mx-auto max-w-2xl text-center mb-6 sm:mb-8">
          <p className="text-[13px] font-semibold uppercase tracking-widest text-white/30">Already have a website?</p>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white/90">
            You don&apos;t need to start over
          </h2>
          <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed text-white/45 max-w-lg mx-auto">
            We can plug our system into your current site and turn it into a lead and automation engine.
          </p>
        </div>

        <div className="mx-auto max-w-2xl grid gap-4 sm:grid-cols-2">
          <div className="relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white">System Upgrade</h3>
            <p className="mt-0.5 text-[12px] sm:text-[13px] font-medium text-[#8b5cf6]">Plug into your existing website</p>

            <div className="mt-4 sm:mt-5">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">$1,997</span>
              <p className="mt-0.5 text-[12px] sm:text-[13px] text-white/40">One-time setup &amp; integration</p>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-white/80">$199/mo</span>
                <span className="text-[12px] sm:text-[13px] text-white/35">system access &amp; support</span>
              </div>
            </div>

            <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4 flex-1">
              {[
                "Lead capture integration",
                "Booking & calendar connection",
                "Automated email responses",
                "Review request system",
                "Dashboard access",
                "Basic analytics",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/70">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="mt-4 gap-1.5 bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]"
              size="lg"
              asChild
            >
              <Link href="/signup?plan=system-upgrade">
                Upgrade My System
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="relative flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white">Full Growth Engine</h3>
            <p className="mt-0.5 text-[12px] sm:text-[13px] font-medium text-[#8b5cf6]">All systems, no website rebuild</p>

            <div className="mt-4 sm:mt-5">
              <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">$3,497</span>
              <p className="mt-0.5 text-[12px] sm:text-[13px] text-white/40">One-time setup &amp; integration</p>
              <div className="mt-1.5 flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-bold text-white/80">$399/mo</span>
                <span className="text-[12px] sm:text-[13px] text-white/35">full system access</span>
              </div>
            </div>

            <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4 flex-1">
              {[
                "Everything in System Upgrade",
                "Social media automation",
                "Instagram & ManyChat workflows",
                "Advanced conversion analytics",
                "Multi-channel lead attribution",
                "Dedicated strategy support",
              ].map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-[12px] sm:text-[13px] text-white/70">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#06b6d4]" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="mt-4 gap-1.5 bg-white/[0.06] border border-white/[0.1] text-white hover:bg-white/[0.1]"
              size="lg"
              asChild
            >
              <Link href="/signup?plan=tier3-single">
                Get the Full Engine
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-white/25">
          Most clients choose a full rebuild for better performance.
        </p>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader badge="FAQ" title="Questions before you start" />
        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#06b6d4]/60" />
                <div>
                  <h3 className="text-[13px] sm:text-[14px] font-semibold text-white/90">{faq.q}</h3>
                  <p className="mt-1.5 text-[12px] sm:text-[13px] leading-relaxed text-white/50">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white/90">Not sure which tier is right?</h2>
          <p className="mt-2 text-[14px] sm:text-[15px] text-white/50">We&apos;ll help you pick the best fit. No pressure.</p>
          <Button size="lg" className="mt-5 gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90 h-11 sm:h-12 w-full sm:w-auto" asChild>
            <Link href="/contact">Talk to Our Team <ArrowRight className="h-3.5 w-3.5" /></Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
