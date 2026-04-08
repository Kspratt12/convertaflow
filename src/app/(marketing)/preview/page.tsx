import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Globe, LayoutDashboard, Star, Mail, Share2,
  TrendingUp, Users, BarChart3, Clock, CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Preview",
  description: "See what Convertaflow looks like in action.",
};

export default function PreviewPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">Preview</span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              See Convertaflow{" "}
              <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">in action</span>
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50 sm:text-[16px]">
              Explore what your business could look like with a premium website, growth dashboard, and automated systems working for you.
            </p>
          </div>
        </div>
      </section>

      {/* Website Preview */}
      <section className="bg-[#0a0a20] py-10 text-white sm:py-14 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Badge className="mb-4 bg-white/[0.06] border-white/[0.08] text-white/60"><Globe className="mr-1 h-3 w-3" />Website Preview</Badge>
              <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">Premium websites that convert</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                Every Convertaflow website is custom-designed to make your business look established, professional, and trustworthy. Mobile-optimized, fast-loading, and built with strategic conversion points.
              </p>
              <ul className="mt-5 space-y-2">
                {["Custom design built around your brand", "Hero section that grabs attention", "Clear contact forms placed where they work", "Professional service showcases", "Real proof of why people should trust you"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-white/60 sm:text-[14px]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#06b6d4]" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-xl">
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
                <div className="flex gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-white/15" /><div className="h-2.5 w-2.5 rounded-full bg-white/15" /><div className="h-2.5 w-2.5 rounded-full bg-white/15" /></div>
                <div className="ml-3 flex-1 rounded bg-white/[0.03] px-3 py-1 text-xs text-white/30">yourbusiness.com</div>
              </div>
              <div className="p-6">
                <div className="rounded-xl bg-gradient-to-br from-[#7c3aed]/15 to-[#3b82f6]/10 p-8 text-center">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-[#8b5cf6]">Your Business Name</p>
                  <h3 className="mt-2 text-lg font-bold text-white/90">Premium Services You Can Trust</h3>
                  <p className="mx-auto mt-2 max-w-sm text-[13px] text-white/45">Professional, reliable, and dedicated to delivering results for every client.</p>
                  <div className="mt-4 flex justify-center gap-3">
                    <div className="rounded-lg bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] px-4 py-2 text-xs font-medium text-white">Get a Quote</div>
                    <div className="rounded-lg border border-white/[0.1] px-4 py-2 text-xs font-medium text-white/70">Learn More</div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {["Fast Response", "5-Star Rated", "Licensed & Insured"].map((label) => (
                    <div key={label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                      <p className="text-[11px] font-medium text-white/60">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-[#060613] py-10 text-white sm:py-14 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="lg:order-2">
              <Badge className="mb-4 bg-white/[0.06] border-white/[0.08] text-white/60"><LayoutDashboard className="mr-1 h-3 w-3" />Dashboard Preview</Badge>
              <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">Your business at a glance</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                The Convertaflow dashboard gives you real-time visibility into leads, reviews, email activity, and business performance.
              </p>
            </div>
            <div className="lg:order-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] shadow-xl">
              <div className="border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <p className="text-sm font-semibold text-white/80">Business Dashboard</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { icon: Users, label: "New Leads", value: "47", trend: "+12%" },
                    { icon: Star, label: "Reviews", value: "23", trend: "+8%" },
                    { icon: Mail, label: "Emails", value: "156", trend: "+24%" },
                    { icon: TrendingUp, label: "Conversion", value: "4.2%", trend: "+0.6%" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                      <stat.icon className="h-4 w-4 text-white/35" />
                      <p className="mt-1 text-lg font-bold text-white/90">{stat.value}</p>
                      <p className="text-[11px] text-white/40">{stat.label}</p>
                      <p className="text-[11px] font-medium text-emerald-400">{stat.trend}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="mb-2 text-[11px] font-semibold text-white/50">Recent Leads</p>
                  {[
                    { name: "David Park", email: "david@email.com", time: "2 min ago" },
                    { name: "Lisa Chen", email: "lisa@email.com", time: "18 min ago" },
                    { name: "Mike Torres", email: "mike@email.com", time: "1 hour ago" },
                  ].map((lead) => (
                    <div key={lead.name} className="flex items-center justify-between border-b border-white/[0.04] py-2 last:border-0">
                      <div><p className="text-[13px] font-medium text-white/80">{lead.name}</p><p className="text-[11px] text-white/35">{lead.email}</p></div>
                      <span className="flex items-center gap-1 text-[11px] text-white/30"><Clock className="h-3 w-3" />{lead.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Email */}
      <section className="bg-[#0a0a20] py-10 text-white sm:py-14 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <Badge className="mb-4 bg-white/[0.06] border-white/[0.08] text-white/60"><Star className="mr-1 h-3 w-3" />Reviews & Email</Badge>
              <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">Automated trust building</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                Send review requests automatically, get notified instantly when leads come in, and follow up before your competitors even check their inbox.
              </p>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8b5cf6]/10"><Star className="h-4 w-4 text-[#8b5cf6]" /></div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white/80">Review Request Sent</p>
                    <p className="text-[12px] text-white/40">Automated review request sent to Jennifer Adams after service completion.</p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-medium text-emerald-400">Delivered</span>
                      <span className="text-[11px] text-white/30">3 minutes ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3b82f6]/10"><Mail className="h-4 w-4 text-[#3b82f6]" /></div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-white/80">New Lead Notification</p>
                    <p className="text-[12px] text-white/40">Robert Kim submitted a quote request from your website contact form.</p>
                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-2 py-0.5 text-[11px] font-medium text-[#3b82f6]">New Lead</span>
                      <span className="text-[11px] text-white/30">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Growth */}
      <section className="bg-[#060613] py-10 text-white sm:py-14 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="lg:order-2">
              <Badge className="mb-4 bg-white/[0.06] border-white/[0.08] text-white/60"><Share2 className="mr-1 h-3 w-3" />Social Growth</Badge>
              <h2 className="text-xl font-bold tracking-tight text-white/90 sm:text-2xl">Social media that drives results</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
                Connect your social profiles, track clicks and engagement, and understand exactly how social media contributes to your business growth.
              </p>
            </div>
            <div className="lg:order-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
              <p className="mb-4 text-[13px] font-semibold text-white/70">Social Performance</p>
              <div className="space-y-3">
                {[
                  { platform: "Google Business", clicks: 234, color: "bg-[#3b82f6]" },
                  { platform: "Facebook", clicks: 189, color: "bg-[#6c3aed]" },
                  { platform: "Instagram", clicks: 156, color: "bg-[#8b5cf6]" },
                  { platform: "LinkedIn", clicks: 98, color: "bg-[#06b6d4]" },
                ].map((item) => (
                  <div key={item.platform}>
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-medium text-white/70">{item.platform}</span>
                      <span className="text-white/40">{item.clicks} clicks</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-white/[0.04]">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.clicks / 234) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.06] p-3">
                <BarChart3 className="h-4 w-4 text-[#06b6d4]" />
                <span className="text-[12px] text-white/40">Total social clicks this month: <strong className="text-white/70">677</strong></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#060613] py-12 text-white sm:py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-xl text-center px-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to see this working for your business?</h2>
          <p className="mt-3 text-[15px] text-white/50">Choose a plan and let us build you something that actually drives growth.</p>
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
