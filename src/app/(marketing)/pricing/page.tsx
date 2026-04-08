import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { MAIN_TIER_IDS } from "@/lib/tier";
import { PricingTierCards } from "./tier-cards";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose the Convertaflow plan that fits your business. From a custom website to a fully managed online presence.",
};

const faqs = [
  {
    q: "What exactly do I get?",
    a: "You get a fully custom-designed website plus the tools included in your plan, built by our team, not a template. We handle the design, development, and setup. You approve, we launch.",
  },
  {
    q: "How fast will my site be live?",
    a: "Just the Website launches in 5–7 business days. Website + Growth Tools in 7–10. Everything Done For You in 10–14. We move fast without cutting corners.",
  },
  {
    q: "What if I need changes?",
    a: "Every plan includes rounds of edits before launch (3, 5, or 10 depending on your plan). After launch, you can request changes anytime through your portal.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. You can start with Just the Website and upgrade once you're ready for more. We add the new tools on top of what you already have. No rebuilding.",
  },
  {
    q: "Is this a subscription?",
    a: "The design and build is a one-time investment. The monthly fee covers hosting, support, system access, and ongoing maintenance. Cancel anytime.",
  },
  {
    q: "How does payment work?",
    a: "You only pay 50% upfront to get started. We build your project, deliver it for review, and you pay the remaining 50% once you've seen it and approved it. No paying in full for something that doesn't exist yet. Same way every legitimate done-for-you service works.",
  },
  {
    q: "What if I change my mind after paying the deposit?",
    a: "Your 50% deposit is fully refundable within 48 hours of payment, before any work begins. After that, once we've started building, the deposit becomes non-refundable so we can protect the time we've already invested. But our 7-day satisfaction guarantee still applies after delivery: if you're not happy with what we built, you get 100% of your deposit back. We just want you to win.",
  },
  {
    q: "What if I'm not happy with the build?",
    a: "Every plan comes with a 7-day satisfaction guarantee. After we deliver your build, you have 7 days to tell us if something isn't right. If we can't make it right, you get 100% of your deposit back. No questions, no awkward conversations. We just want you to love what we built.",
  },
  {
    q: "Do you work with my industry?",
    a: "We work with service businesses, professional practices, local businesses, and growing companies. Plumbers, dentists, yoga instructors, real estate agents, lawyers, hair stylists, and many more. If you need to look established and bring in more customers online, we can help.",
  },
];

export default function PricingPage() {
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

          <PricingTierCards tierIds={[...MAIN_TIER_IDS]} />
        </div>
      </section>

      {/* Real builds — examples of what we can build for you (Tier 3 grounding) */}
      <Section>
        <div className="mx-auto max-w-3xl text-center mb-6 sm:mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#06b6d4]/80">
            Everything Done For You · Examples
          </p>
          <h2 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white/90">
            We meet you where you are
          </h2>
          <p className="mt-2 text-[13px] sm:text-[14px] leading-relaxed text-white/45 max-w-xl mx-auto">
            Tier 3 includes a custom build catered to your business. Here&apos;s a few examples of what we&apos;ve built (or can build) for different industries.
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              industry: "Plumber",
              build: "Emergency call routing form that pages whoever's on call, plus a service-area map so customers know if you cover them.",
            },
            {
              industry: "Real Estate Agent",
              build: "Listing showcase with a separate lead capture per property, auto-following up the moment someone asks.",
            },
            {
              industry: "Dentist",
              build: "New patient intake with insurance verification fields and appointment booking that syncs to your calendar.",
            },
            {
              industry: "Yoga / Pilates Studio",
              build: "Class schedule with recurring booking, member portal, and SMS reminders the day before each class.",
            },
            {
              industry: "Lawyer",
              build: "Case intake form with conditional logic, plus secure document upload so clients can send you sensitive paperwork safely.",
            },
            {
              industry: "Hair Stylist",
              build: "Stylist-specific booking page so clients can pick by name, with portfolio gallery and Instagram embed.",
            },
          ].map((ex) => (
            <div
              key={ex.industry}
              className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#06b6d4]">
                {ex.industry}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/65 sm:text-[14px]">
                {ex.build}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[12px] text-white/35 max-w-2xl mx-auto">
          These are examples, not a fixed menu. After you sign up, you fill out a form in your portal describing exactly what you need. We build it.
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
