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
    q: "Do I need all features right away?",
    a: "No. Start with the Premium Website for a strong foundation. Add Reviews + Dashboard when you're ready to build trust and track results. Upgrade to Full Growth Bundle when you need the complete system.",
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
      <Section>
        <SectionHeader
          badge="Pricing"
          title="Invest in growth, not guesswork"
          description="Every plan delivers real value. Choose the level of growth your business is ready for."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-7",
                tier.highlighted
                  ? "border-primary/40 shadow-xl shadow-primary/[0.06] ring-1 ring-primary/20 lg:scale-[1.03]"
                  : "border-border/60"
              )}
            >
              {tier.highlighted && (
                <Badge className="absolute -top-2.5 left-6 gap-1 text-[11px] font-semibold tracking-wide">
                  <Star className="h-3 w-3" />
                  Most Popular
                </Badge>
              )}

              <div>
                <h3 className="text-lg font-bold">{tier.name}</h3>
                <p className="mt-0.5 text-[13px] font-medium text-primary">
                  {tier.audience}
                </p>
              </div>

              <div className="mt-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                </div>
                <p className="mt-0.5 text-[13px] text-muted-foreground">{tier.priceNote}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-lg font-bold">{tier.monthly}</span>
                  <span className="text-[13px] text-muted-foreground">{tier.monthlyNote}</span>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tier.description}
              </p>

              <ul className="mt-5 space-y-2 border-t pt-5">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13px]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className="mt-7 gap-1.5"
                size="lg"
                variant={tier.highlighted ? "default" : "outline"}
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
      </Section>

      {/* FAQ */}
      <Section className="bg-muted/20">
        <SectionHeader
          badge="FAQ"
          title="Questions before you start"
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-border/60 bg-card p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary/50" />
                <div>
                  <h3 className="text-[14px] font-semibold">{faq.q}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
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
            Talk to our team. We&apos;ll help you find the best fit based on
            your goals and budget.
          </p>
          <Button size="lg" className="mt-7 gap-1.5" asChild>
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
