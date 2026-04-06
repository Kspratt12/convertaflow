import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Lightbulb } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Convertaflow — the platform built to help real businesses look professional, capture leads, and grow with systems.",
};

const values = [
  {
    icon: Target,
    title: "Results over aesthetics",
    description:
      "A beautiful website means nothing if it doesn't convert. Every decision we make is grounded in what actually drives business results.",
  },
  {
    icon: Heart,
    title: "Built for real businesses",
    description:
      "We don't build for tech startups or enterprise. We build for service businesses and growing companies that need a strong online presence.",
  },
  {
    icon: Lightbulb,
    title: "Simple systems, powerful outcomes",
    description:
      "Business owners don't need another complicated tool. They need systems that work quietly in the background, capturing leads and building trust.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 text-center sm:mb-10">
              <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
                About
              </span>
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                We build growth systems for businesses{" "}
                <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
                  ready to scale
                </span>
              </h1>
            </div>

            <div className="space-y-4 text-[15px] leading-[1.8] text-white/50 sm:text-[16px]">
              <p>
                Most businesses don&apos;t have a marketing team. They don&apos;t have a
                full-time designer or a CRM specialist. What they have is great work, happy
                customers, and a website that doesn&apos;t reflect any of it.
              </p>
              <p>
                Convertaflow was built to close that gap. We combine premium web
                design with automated lead capture, review collection, email
                follow-up, and simple business dashboards. Not a collection of
                disconnected tools. One system, designed to work together.
              </p>
              <p>
                We believe every business deserves to look professional online, to
                never miss a lead, and to know exactly what&apos;s driving growth.
                That&apos;s what we build.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What we believe</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06]">
                  <value.icon className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="text-[15px] font-semibold text-white/90">{value.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/45">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to work with a team that gets it?
          </h2>
          <p className="mt-3 text-[15px] text-muted-foreground">
            We&apos;re selective about who we work with because we want every client
            to get real results.
          </p>
          <Button size="lg" className="mt-6 gap-1.5" asChild>
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
