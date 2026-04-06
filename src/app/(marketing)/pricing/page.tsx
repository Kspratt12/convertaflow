import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Star } from "lucide-react";
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
    q: "What exactly is included in the one-time setup fee?",
    a: "The setup fee covers the complete design and build of your Convertaflow system — your premium website, dashboard configuration, email integration, review workflow setup, and everything needed to launch. You own the design. The monthly fee covers hosting, platform access, support, and ongoing system maintenance.",
  },
  {
    q: "Can this work for my type of business?",
    a: "Convertaflow is built for service-based businesses, local businesses, professional practices, agencies, and any business that needs a strong online presence and wants to capture more leads. If your business relies on new customers finding you online and trusting you enough to reach out — this is built for you.",
  },
  {
    q: "Do I need all features right now?",
    a: "No. That's why we have three tiers. Start with the Premium Website if you just need a strong foundation. Add Reviews + Dashboard when you're ready to build trust and track results. Upgrade to the Full Growth Bundle when you want a complete business growth system.",
  },
  {
    q: "Can I start with one tier and upgrade later?",
    a: "Absolutely. Many businesses start with the Premium Website and upgrade to Reviews + Dashboard once they see the value of having a professional online presence. Upgrading is seamless — we add the new features on top of what you already have.",
  },
  {
    q: "How does the dashboard work?",
    a: "Your dashboard is a clean, web-based interface where you can see all your leads, review requests, email activity, and business analytics in one place. It's designed to be simple and useful — not overwhelming. You log in, see what matters, and take action.",
  },
  {
    q: "How are emails handled?",
    a: "All transactional emails (lead notifications, review requests, follow-ups) are sent through Resend — a modern, reliable email delivery platform. Emails are branded with your business details and optimized for deliverability.",
  },
  {
    q: "Can Convertaflow handle review collection and follow-up?",
    a: "Yes — that's one of the core features in Tier 2 and above. You can send automated review requests to customers, track who has been asked and who has completed a review, and see your review analytics in the dashboard.",
  },
  {
    q: "Is there a contract or commitment?",
    a: "No long-term contracts. The setup fee is one-time, and the monthly platform fee is billed monthly. You can cancel the monthly service anytime, though you'll lose access to the dashboard and automation features.",
  },
];

export default function PricingPage() {
  const tiers = Object.values(TIERS);

  return (
    <>
      <Section>
        <SectionHeader
          badge="Pricing"
          title="Invest in growth, not guesswork"
          description="Every tier is designed to deliver real value. Choose the level of growth your business is ready for."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8",
                tier.highlighted &&
                  "border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20 scale-[1.02]"
              )}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1">
                  <Star className="h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              <div>
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-1 text-sm text-primary font-medium">
                  {tier.audience}
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {tier.priceNote}
                </p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-lg font-semibold">{tier.monthly}</span>
                  <span className="text-sm text-muted-foreground">
                    {tier.monthlyNote}
                  </span>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-6 space-y-2.5 border-t pt-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8"
                size="lg"
                variant={tier.highlighted ? "default" : "outline"}
                asChild
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-muted/30">
        <SectionHeader
          badge="FAQ"
          title="Common questions about Convertaflow"
          description="Everything you need to know before getting started."
        />

        <div className="mx-auto max-w-3xl space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold">{faq.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Not sure which tier is right?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Talk to our team. We&apos;ll help you figure out the best fit based
            on your business goals and budget.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">
              Talk to Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
