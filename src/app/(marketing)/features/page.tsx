import { Metadata } from "next";
import {
  Palette, Target, Star, Mail, LayoutDashboard,
  TrendingUp, Share2, Zap, CheckCircle2, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features",
  description: "Explore everything Convertaflow offers — premium websites, lead capture, review collection, email automation, dashboards, and growth tools.",
};

const features = [
  {
    icon: Palette, title: "Premium Website Design",
    description: "Custom-built websites designed around your brand and optimized to convert. Not a template drop. A strategic build that makes your business look as good as the work you deliver.",
    benefits: ["Custom brand-aligned design", "Conversion-optimized layouts", "Mobile-first responsive", "Fast load times", "SEO-ready from day one"],
  },
  {
    icon: Target, title: "Lead Capture Forms",
    description: "Strategic forms placed where they matter most. Multi-step options, spam protection, and instant notifications mean every visitor has a clear path to becoming a lead.",
    benefits: ["Smart multi-step forms", "Instant email notifications", "Lead data in your dashboard", "Spam protection built in", "Strategic placement"],
  },
  {
    icon: Mail, title: "Email Notifications & Follow-Up",
    description: "Get notified the moment a lead comes in so you can respond while they're still interested. Set up automated follow-ups that nurture leads without manual work.",
    benefits: ["Instant lead alerts via Resend", "Automated follow-up sequences", "Branded email templates", "Delivery tracking", "Contact confirmations"],
  },
  {
    icon: Star, title: "Review Request Workflows",
    description: "Send automated review requests after a job is done. Build the Google reviews that convince new customers to choose you over competitors.",
    benefits: ["Automated request emails", "Direct Google review links", "Timing controls", "Completion tracking", "Review analytics"],
  },
  {
    icon: LayoutDashboard, title: "Business Dashboard",
    description: "One clean interface showing every lead, review request, email sent, and conversion. See what's working at a glance. No more guessing, no more spreadsheets.",
    benefits: ["Real-time lead tracking", "Review analytics", "Email delivery stats", "Lead source attribution", "Activity timeline"],
  },
  {
    icon: TrendingUp, title: "Growth Analytics",
    description: "Track lead volume, conversion rates, review growth, and response times over time. Identify what drives new business so you can invest smarter.",
    benefits: ["Conversion funnel views", "Lead source breakdown", "Performance trends", "Response time tracking", "Weekly reporting"],
  },
  {
    icon: Share2, title: "Social Media Integration",
    description: "Connect profiles, track link clicks, and see how social channels contribute to lead generation. Available in the Full Growth Bundle.",
    benefits: ["Profile link management", "Click tracking", "Social-to-lead attribution", "Post scheduling", "Cross-platform analytics"],
  },
  {
    icon: Zap, title: "Automation Workflows",
    description: "Set triggers that fire automatically. Follow-up emails when leads come in, review requests after service completion. Save hours every week.",
    benefits: ["Event-driven triggers", "Multi-step sequences", "Conditional logic", "Timing controls", "Full activity logging"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              Features
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Everything your business needs{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                to grow online
              </span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50 sm:text-[16px]">
              Convertaflow isn&apos;t just a website. It&apos;s a complete platform from first impression to repeat customer.
            </p>
          </div>
        </div>
      </section>

      {features.map((feature, i) => (
        <section
          key={feature.title}
          className={`relative overflow-hidden py-10 sm:py-14 ${
            i % 2 === 0
              ? "bg-[#060613] text-white"
              : "bg-[#0a0a20] text-white"
          } ${i > 0 ? "border-t border-white/[0.04]" : ""}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid items-start gap-8 lg:grid-cols-2 lg:gap-12 ${i % 2 !== 0 ? "" : ""}`}>
              <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">
                  <feature.icon className="h-5 w-5 text-white/70" />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
                  {feature.title}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                  {feature.description}
                </p>
              </div>
              <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                  <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-white/30">
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {feature.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13px] text-white/60 sm:text-[14px]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#06b6d4]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-[#060613] py-12 text-white sm:py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-xl text-center px-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to see these features in action?
          </h2>
          <p className="mt-3 text-[15px] text-white/50">
            Find the right combination for your business stage.
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
            <Button size="lg" className="gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90 h-11 sm:h-12 w-full sm:w-auto" asChild>
              <Link href="/pricing">View Plans & Pricing <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.06] h-11 sm:h-12 w-full sm:w-auto" asChild>
              <Link href="/preview">See Live Preview</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
