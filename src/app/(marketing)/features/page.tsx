import { Metadata } from "next";
import {
  Palette,
  Target,
  Star,
  Mail,
  LayoutDashboard,
  TrendingUp,
  Share2,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore everything Convertaflow offers — premium websites, lead capture, review collection, email automation, dashboards, and growth tools.",
};

const features = [
  {
    icon: Palette,
    title: "Premium Website Design",
    description:
      "Custom-built websites designed around your brand and optimized to convert. Not a template drop — a strategic build that makes your business look as good as the work you deliver.",
    benefits: ["Custom brand-aligned design", "Conversion-optimized layouts", "Mobile-first responsive", "Fast load times", "SEO-ready from day one"],
  },
  {
    icon: Target,
    title: "Lead Capture Forms",
    description:
      "Strategic forms placed where they matter most. Multi-step options, spam protection, and instant notifications mean every visitor has a clear path to becoming a lead.",
    benefits: ["Smart multi-step forms", "Instant email notifications", "Lead data in your dashboard", "Spam protection built in", "Strategic placement"],
  },
  {
    icon: Mail,
    title: "Email Notifications & Follow-Up",
    description:
      "Get notified the moment a lead comes in so you can respond while they're still interested. Set up automated follow-ups that nurture leads without manual work.",
    benefits: ["Instant lead alerts via Resend", "Automated follow-up sequences", "Branded email templates", "Delivery tracking", "Contact confirmations"],
  },
  {
    icon: Star,
    title: "Review Request Workflows",
    description:
      "Send automated review requests after a job is done. Build the Google reviews that convince new customers to choose you over competitors with fewer social proof signals.",
    benefits: ["Automated request emails", "Direct Google review links", "Timing controls", "Completion tracking", "Review analytics"],
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboard",
    description:
      "One clean interface showing every lead, review request, email sent, and conversion. See what's working at a glance. No more guessing, no more spreadsheets.",
    benefits: ["Real-time lead tracking", "Review analytics", "Email delivery stats", "Lead source attribution", "Activity timeline"],
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description:
      "Track lead volume, conversion rates, review growth, and response times over time. Identify what drives new business so you can invest smarter.",
    benefits: ["Conversion funnel views", "Lead source breakdown", "Performance trends", "Response time tracking", "Weekly reporting"],
  },
  {
    icon: Share2,
    title: "Social Media Integration",
    description:
      "Connect profiles, track link clicks, and see how social channels contribute to lead generation. Full Growth Bundle feature for businesses scaling their presence.",
    benefits: ["Profile link management", "Click tracking", "Social-to-lead attribution", "Post scheduling", "Cross-platform analytics"],
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description:
      "Set triggers that fire automatically — follow-up emails when leads come in, review requests after service completion. Save hours every week with systems that run on their own.",
    benefits: ["Event-driven triggers", "Multi-step sequences", "Conditional logic", "Timing controls", "Full activity logging"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Section>
        <SectionHeader
          badge="Features"
          title="Everything your business needs to grow online"
          description="Convertaflow isn't just a website. It's a complete platform — from first impression to repeat customer."
        />
      </Section>

      {features.map((feature, i) => (
        <Section key={feature.title} className={i % 2 === 0 ? "!pt-0" : "bg-muted/20 !pt-0"}>
          <div className={`grid items-start gap-10 lg:grid-cols-2 ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.07]">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{feature.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <div className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  Key Benefits
                </h3>
                <ul className="space-y-2.5">
                  {feature.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[13px]">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to see these features in action?
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            Find the right combination for your business stage.
          </p>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-1.5" asChild>
              <Link href="/pricing">
                View Plans & Pricing
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/preview">See Live Preview</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
