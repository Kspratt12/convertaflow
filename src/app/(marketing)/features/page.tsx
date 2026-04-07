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
    icon: Palette, title: "Custom Website Design",
    description: "We design your site from scratch around your brand — not a template, not a drag-and-drop tool. Built to make your business look like the leader in your space.",
    benefits: ["Custom design built for your brand", "Looks great on phones, tablets, and desktops", "Loads fast on every device", "Easy for Google to find", "Built to make people trust you"],
  },
  {
    icon: Target, title: "Catch Every New Inquiry",
    description: "Every visitor who wants to reach you gets a clear, easy way to do it. Forms placed where they actually work, with instant alerts to your email so nothing slips through.",
    benefits: ["Clear contact forms on every page", "Instant email when someone reaches out", "No more checking 'did anyone fill this out?'", "Spam blocked automatically", "Phone-tap and email-tap on mobile"],
  },
  {
    icon: Mail, title: "Email Alerts & Follow-Up",
    description: "Get an email the moment someone reaches out — so you can call them back while they're still interested. Plus optional automatic follow-up emails that work for you 24/7.",
    benefits: ["Instant alerts the moment someone inquires", "Automatic follow-up emails (Growth+)", "Beautifully branded email templates", "See what got opened", "Confirmation emails to your customers"],
  },
  {
    icon: Star, title: "Get More 5-Star Reviews",
    description: "After every job, we automatically ask your happy customers to leave a Google review. The reviews that win you new business — without you having to ask in person.",
    benefits: ["Auto-send after every job (Growth+)", "Direct link straight to Google", "We control the timing for the best response", "See who left a review", "Track your rating over time"],
  },
  {
    icon: LayoutDashboard, title: "Your Business at a Glance",
    description: "One clean dashboard showing every new inquiry, every review, and every email — all in one place. Check it once a week to see how your business is doing online.",
    benefits: ["Every inquiry in one place", "Every review in one place", "Email tracking", "See where your customers come from", "Activity timeline"],
  },
  {
    icon: TrendingUp, title: "Know What's Working",
    description: "See how many people are visiting your site, how many are reaching out, and which pages they're looking at. No more guessing — actual answers about what's working.",
    benefits: ["Visitor tracking", "Inquiry trends over time", "Which pages perform best", "Response time tracking", "Weekly summaries"],
  },
  {
    icon: Share2, title: "Social Media On Autopilot",
    description: "We post for you, respond to Instagram and Facebook DMs automatically, and connect every social touchpoint back to your website. Available in Everything Done For You.",
    benefits: ["Automatic social posting", "Instagram and Facebook DM responses", "Track which social posts brought customers", "All in one dashboard", "Hands-off — we run it"],
  },
  {
    icon: Zap, title: "Run On Autopilot",
    description: "We set up the systems that work in the background while you focus on the actual work. Follow-up emails, review requests, social posts — all happening automatically.",
    benefits: ["Set it once, runs forever", "Follow-ups that fire automatically", "Reviews requested without you asking", "All actions logged so you can see what happened", "Pause anytime"],
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
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/20 to-[#06b6d4]/15 border border-[#7c3aed]/20 shadow-lg shadow-[#7c3aed]/10">
                  <feature.icon className="h-5 w-5 text-[#06b6d4]" />
                </div>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
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
