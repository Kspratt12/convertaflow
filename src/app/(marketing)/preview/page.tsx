import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  LayoutDashboard,
  Star,
  Mail,
  Share2,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Preview",
  description:
    "See what Convertaflow looks like in action — from premium websites to business dashboards and growth tools.",
};

export default function PreviewPage() {
  return (
    <>
      <Section>
        <SectionHeader
          badge="Preview"
          title="See Convertaflow in action"
          description="Explore what your business could look like with a premium website, growth dashboard, and automated systems working for you."
        />
      </Section>

      {/* Website Preview */}
      <Section className="bg-muted/30">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">
              <Globe className="mr-1 h-3 w-3" />
              Website Preview
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Premium websites that convert
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every Convertaflow website is custom-designed to make your business
              look established, professional, and trustworthy. Mobile-optimized,
              fast-loading, and built with strategic conversion points.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                "Custom brand-aligned design",
                "Conversion-optimized hero sections",
                "Strategic lead capture placement",
                "Professional service showcases",
                "Trust-building proof sections",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-xl border bg-card shadow-xl">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2.5">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
              </div>
              <div className="ml-3 flex-1 rounded bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                yourbusiness.com
              </div>
            </div>
            <div className="p-6">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center">
                <p className="text-xs font-medium uppercase tracking-wider text-primary">
                  Your Business Name
                </p>
                <h3 className="mt-2 text-xl font-bold">
                  Premium Services You Can Trust
                </h3>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                  Professional, reliable, and dedicated to delivering results for
                  every client.
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <div className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                    Get a Quote
                  </div>
                  <div className="rounded-md border px-4 py-2 text-xs font-medium">
                    Learn More
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["Fast Response", "5-Star Rated", "Licensed & Insured"].map(
                  (label) => (
                    <div
                      key={label}
                      className="rounded-lg border p-3 text-center"
                    >
                      <p className="text-xs font-medium">{label}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Dashboard Preview */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-2">
            <Badge variant="outline" className="mb-4">
              <LayoutDashboard className="mr-1 h-3 w-3" />
              Dashboard Preview
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Your business at a glance
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The Convertaflow dashboard gives you real-time visibility into
              leads, reviews, email activity, and business performance. Clean,
              fast, and designed to help you take action.
            </p>
          </div>
          <div className="lg:order-1 overflow-hidden rounded-xl border bg-card shadow-xl">
            <div className="border-b bg-muted/30 px-4 py-3">
              <p className="text-sm font-semibold">Business Dashboard</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    icon: Users,
                    label: "New Leads",
                    value: "47",
                    trend: "+12%",
                  },
                  {
                    icon: Star,
                    label: "Reviews",
                    value: "23",
                    trend: "+8%",
                  },
                  {
                    icon: Mail,
                    label: "Emails Sent",
                    value: "156",
                    trend: "+24%",
                  },
                  {
                    icon: TrendingUp,
                    label: "Conversion",
                    value: "4.2%",
                    trend: "+0.6%",
                  },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-lg border p-3">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    <p className="mt-1 text-lg font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-xs font-medium text-green-600">
                      {stat.trend}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg border p-4">
                <p className="mb-2 text-xs font-semibold">Recent Leads</p>
                {[
                  {
                    name: "David Park",
                    email: "david@email.com",
                    time: "2 min ago",
                  },
                  {
                    name: "Lisa Chen",
                    email: "lisa@email.com",
                    time: "18 min ago",
                  },
                  {
                    name: "Mike Torres",
                    email: "mike@email.com",
                    time: "1 hour ago",
                  },
                ].map((lead) => (
                  <div
                    key={lead.name}
                    className="flex items-center justify-between border-b py-2 last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {lead.email}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {lead.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews & Email Preview */}
      <Section className="bg-muted/30">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="mb-4">
              <Star className="mr-1 h-3 w-3" />
              Reviews & Email
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Automated trust building
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Send review requests automatically, get notified instantly when
              leads come in, and follow up before your competitors even check
              their inbox.
            </p>
          </div>
          <div className="space-y-4">
            {/* Review request mockup */}
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    Review Request Sent
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Automated review request sent to Jennifer Adams after
                    service completion.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Delivered
                    </span>
                    <span className="text-xs text-muted-foreground">
                      3 minutes ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Email notification mockup */}
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    New Lead Notification
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Robert Kim submitted a quote request from your website
                    contact form.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                      New Lead
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Just now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Social Growth Preview */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="lg:order-2">
            <Badge variant="outline" className="mb-4">
              <Share2 className="mr-1 h-3 w-3" />
              Social Growth
            </Badge>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Social media that drives results
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Connect your social profiles, track clicks and engagement, and
              understand exactly how social media contributes to your business
              growth.
            </p>
          </div>
          <div className="lg:order-1 rounded-xl border bg-card p-5">
            <p className="mb-4 text-sm font-semibold">Social Performance</p>
            <div className="space-y-3">
              {[
                {
                  platform: "Google Business",
                  clicks: 234,
                  color: "bg-blue-500",
                },
                {
                  platform: "Facebook",
                  clicks: 189,
                  color: "bg-indigo-500",
                },
                {
                  platform: "Instagram",
                  clicks: 156,
                  color: "bg-purple-500",
                },
                { platform: "LinkedIn", clicks: 98, color: "bg-cyan-500" },
              ].map((item) => (
                <div key={item.platform}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.platform}</span>
                    <span className="text-muted-foreground">
                      {item.clicks} clicks
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-muted">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${(item.clicks / 234) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">
                Total social clicks this month:{" "}
                <strong className="text-foreground">677</strong>
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-muted/30">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to see this working for your business?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose a plan and let us build you something that actually drives
            growth.
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
