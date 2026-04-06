import { Metadata } from "next";
import Link from "next/link";
import {
  Rocket,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Globe,
  Target,
  Star,
  Mail,
  LayoutDashboard,
  Share2,
  Zap,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Convertaflow takes your business from an outdated website to a complete growth system in three clear steps.",
};

const steps = [
  {
    number: "01",
    icon: Rocket,
    title: "Launch Your Premium Online Presence",
    description:
      "We start by building a high-end website that makes your business look established and trustworthy. This isn't a template drop — it's a custom design built around your brand, your services, and your customers.",
    details: [
      {
        icon: Globe,
        label: "Custom premium website design that reflects your brand",
      },
      {
        icon: Target,
        label: "Strategic lead capture forms and conversion points",
      },
      {
        icon: Mail,
        label: "Contact form with instant email notifications",
      },
      {
        icon: CheckCircle2,
        label: "Mobile-optimized, fast, and SEO-ready from day one",
      },
    ],
    outcome:
      "You launch with a website that looks as professional as the service you deliver — and starts capturing leads immediately.",
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Capture Leads and Build Trust",
    description:
      "Once your site is live, we activate the systems that turn visitors into customers. Automated review requests, email follow-up, and a dashboard that shows you exactly what's happening with every lead.",
    details: [
      {
        icon: Star,
        label: "Automated review request workflows for Google reviews",
      },
      {
        icon: LayoutDashboard,
        label: "Dashboard to track leads, reviews, and email activity",
      },
      {
        icon: Mail,
        label: "Automated email follow-up sequences via Resend",
      },
      {
        icon: CheckCircle2,
        label: "Lead source tracking so you know what's working",
      },
    ],
    outcome:
      "You build the trust signals that win new customers and see exactly how your business is performing online — no guesswork.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Scale Your Growth with Systems",
    description:
      "With your foundation and tracking in place, it's time to scale. Advanced analytics, social media integration, and automation workflows give you a complete growth command center for your business.",
    details: [
      {
        icon: Share2,
        label: "Social media integration and engagement tracking",
      },
      {
        icon: Zap,
        label: "Automation workflows that save hours every week",
      },
      {
        icon: BarChart3,
        label: "Advanced conversion analytics and reporting",
      },
      {
        icon: CheckCircle2,
        label: "Dedicated strategy support and quarterly reviews",
      },
    ],
    outcome:
      "You stop running your business blind and start making confident, data-driven decisions that drive consistent growth.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Section>
        <SectionHeader
          badge="How It Works"
          title="From outdated website to business growth system"
          description="Convertaflow is a three-step process that takes you from looking unprofessional online to running a fully tracked, trust-building, growth-ready business."
        />
      </Section>

      {steps.map((step, i) => (
        <Section key={step.title} className={i % 2 !== 0 ? "bg-muted/30" : ""}>
          <div className="grid items-start gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center gap-4">
                <span className="text-5xl font-bold text-primary/15">
                  {step.number}
                </span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {step.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              <div className="mt-8 space-y-3">
                {step.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start gap-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <detail.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="pt-1 text-sm">{detail.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                  The Outcome
                </h3>
                <p className="mt-3 text-sm leading-relaxed">
                  {step.outcome}
                </p>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to launch your growth system?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the tier that matches your business stage and start building a
            stronger online presence today.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">
                See Plans & Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
