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

const mainFeatures = [
  {
    icon: Palette,
    title: "Premium Website Design",
    description:
      "Your website is the first thing potential customers see. We design and build custom, high-end websites that make your business look as good as the service you deliver. No templates, no generic layouts — every site is crafted to match your brand and convert visitors into leads.",
    benefits: [
      "Custom design tailored to your brand",
      "Conversion-optimized layouts and CTAs",
      "Mobile-first responsive design",
      "Fast load times on modern infrastructure",
      "SEO-ready page structure from day one",
    ],
  },
  {
    icon: Target,
    title: "Lead Capture Forms",
    description:
      "Strategic lead capture forms placed exactly where they matter most. Whether it's a contact form, quote request, or consultation booking — every form is designed to reduce friction and increase submissions. You'll never miss an opportunity because a visitor couldn't figure out how to reach you.",
    benefits: [
      "Multi-step and single-step form options",
      "Smart placement based on user behavior",
      "Instant email notifications on submission",
      "Lead data stored in your dashboard",
      "Spam protection built in",
    ],
  },
  {
    icon: Mail,
    title: "Email Notifications & Follow-Up",
    description:
      "Speed wins business. When a lead submits a form, you get an instant email notification so you can respond while they're still interested. Set up automated follow-up sequences that nurture leads without manual effort.",
    benefits: [
      "Instant lead notifications via Resend",
      "Automated follow-up email sequences",
      "Professional branded email templates",
      "Contact confirmation emails to leads",
      "Email delivery tracking and analytics",
    ],
  },
  {
    icon: Star,
    title: "Review Request Workflows",
    description:
      "Happy customers rarely leave reviews on their own. Convertaflow makes it easy to send automated review requests after a job is done. Build the Google reviews that convince new customers to choose you over competitors who have fewer or no reviews.",
    benefits: [
      "Automated review request emails",
      "Direct links to your Google review page",
      "Track review requests sent and completed",
      "Timing controls for optimal response",
      "Review analytics in your dashboard",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Business Dashboard",
    description:
      "Stop guessing and start knowing. Your Convertaflow dashboard gives you a clear view of every lead, review request, email sent, and conversion action — all in one clean interface. See what's working and what needs attention at a glance.",
    benefits: [
      "Real-time lead tracking and activity",
      "Review collection analytics",
      "Email activity and delivery stats",
      "Lead source attribution",
      "Clean, professional interface",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growth Analytics",
    description:
      "Data-driven decisions lead to better results. Track your lead volume, conversion rates, review growth, and response times over time. Identify what's driving new business and double down on what works.",
    benefits: [
      "Conversion funnel visualization",
      "Lead source breakdown",
      "Performance trends over time",
      "Response time tracking",
      "Monthly and weekly reporting",
    ],
  },
  {
    icon: Share2,
    title: "Social Media Integration",
    description:
      "Your social media presence is part of your business growth engine. Connect your profiles, track link clicks, and understand how social channels drive leads and awareness. Available in the Full Growth Bundle.",
    benefits: [
      "Social profile link management",
      "Click and engagement tracking",
      "Social-to-lead attribution",
      "Post scheduling tools",
      "Cross-platform presence management",
    ],
  },
  {
    icon: Zap,
    title: "Automation Workflows",
    description:
      "Set it and let it run. Build automated workflows that trigger actions based on events — from sending a follow-up email when a lead comes in, to requesting a review after a service is complete. Save hours every week with systems that work for you.",
    benefits: [
      "Event-driven automation triggers",
      "Custom workflow builder",
      "Multi-step sequence support",
      "Conditional logic and timing controls",
      "Activity logging for every automation",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Section>
        <SectionHeader
          badge="Features"
          title="Everything your business needs to grow online"
          description="Convertaflow isn't just a website. It's a complete business growth platform — from first impression to repeat customer."
        />
      </Section>

      {mainFeatures.map((feature, i) => (
        <Section
          key={feature.title}
          className={i % 2 === 0 ? "" : "bg-muted/30"}
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {feature.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
            <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
              <div className="rounded-xl border bg-card p-6">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      {/* CTA */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to see these features in action?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our plans to find the right combination of features for your
            business stage.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/pricing">
                See Plans & Pricing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/preview">See a Live Preview</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
