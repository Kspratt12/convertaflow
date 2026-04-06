import { Metadata } from "next";
import Link from "next/link";
import {
  Rocket, BarChart3, TrendingUp, CheckCircle2, ArrowRight,
  Globe, Target, Star, Mail, LayoutDashboard, Share2, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Learn how Convertaflow takes your business from an outdated website to a complete growth system in three clear steps.",
};

const steps = [
  {
    number: "01", icon: Rocket, color: "from-[#7c3aed] to-[#6c3aed]",
    title: "Launch Your Premium Online Presence",
    description: "We start by building a high-end website that makes your business look established and trustworthy. Custom design built around your brand, your services, and your customers.",
    details: [
      { icon: Globe, label: "Custom premium website design that reflects your brand" },
      { icon: Target, label: "Strategic lead capture forms and conversion points" },
      { icon: Mail, label: "Contact form with instant email notifications" },
      { icon: CheckCircle2, label: "Mobile-optimized, fast, and SEO-ready from day one" },
    ],
    outcome: "You launch with a website that looks as professional as the service you deliver and starts capturing leads immediately.",
  },
  {
    number: "02", icon: BarChart3, color: "from-[#3b82f6] to-[#2563eb]",
    title: "Capture Leads and Build Trust",
    description: "Once your site is live, we activate the systems that turn visitors into customers. Automated review requests, email follow-up, and a dashboard that shows you exactly what's happening.",
    details: [
      { icon: Star, label: "Automated review request workflows for Google reviews" },
      { icon: LayoutDashboard, label: "Dashboard to track leads, reviews, and email activity" },
      { icon: Mail, label: "Automated email follow-up sequences via Resend" },
      { icon: CheckCircle2, label: "Lead source tracking so you know what's working" },
    ],
    outcome: "You build the trust signals that win new customers and see exactly how your business is performing online.",
  },
  {
    number: "03", icon: TrendingUp, color: "from-[#06b6d4] to-[#0891b2]",
    title: "Scale Your Growth with Systems",
    description: "With your foundation and tracking in place, scale with confidence. Advanced analytics, social media integration, and automation workflows give you a complete growth command center.",
    details: [
      { icon: Share2, label: "Social media integration and engagement tracking" },
      { icon: Zap, label: "Automation workflows that save hours every week" },
      { icon: BarChart3, label: "Advanced conversion analytics and reporting" },
      { icon: CheckCircle2, label: "Dedicated strategy support and quarterly reviews" },
    ],
    outcome: "You stop running your business blind and start making confident, data-driven decisions that drive consistent growth.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              How It Works
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              From outdated website to{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                business growth system
              </span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50 sm:text-[16px]">
              Three steps that take you from looking unprofessional online to running a fully tracked, trust-building, growth-ready business.
            </p>
          </div>
        </div>
      </section>

      {steps.map((step, i) => (
        <section key={step.title} className={`relative overflow-hidden py-10 sm:py-14 text-white ${i % 2 === 0 ? "bg-[#060613]" : "bg-[#0a0a20]"} ${i > 0 ? "border-t border-white/[0.04]" : ""}`}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-8 lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-3">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-[48px] font-extrabold leading-none bg-gradient-to-b from-white/15 to-white/[0.03] bg-clip-text text-transparent">{step.number}</span>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">{step.title}</h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">{step.description}</p>
                <div className="mt-6 space-y-3">
                  {step.details.map((detail) => (
                    <div key={detail.label} className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                        <detail.icon className="h-4 w-4 text-white/50" />
                      </div>
                      <span className="pt-1 text-[13px] text-white/60 sm:text-[14px]">{detail.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-[#06b6d4]/20 bg-[#06b6d4]/[0.04] p-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-widest text-[#06b6d4]">The Outcome</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/60">{step.outcome}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#060613] py-12 text-white sm:py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-xl text-center px-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to launch your growth system?</h2>
          <p className="mt-3 text-[15px] text-white/50">Choose the tier that matches your business stage.</p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button size="lg" className="gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90 h-11 sm:h-12 w-full sm:w-auto" asChild>
              <Link href="/pricing">View Plans & Pricing <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.06] h-11 sm:h-12 w-full sm:w-auto" asChild>
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
