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
      "A beautiful website means nothing if it doesn't convert. Every decision we make is grounded in what actually drives business results — more leads, more trust, more growth.",
  },
  {
    icon: Heart,
    title: "Built for real businesses",
    description:
      "We don't build for tech startups or enterprise companies. We build for the service businesses, local practices, and growing companies that need a strong online presence without the complexity.",
  },
  {
    icon: Lightbulb,
    title: "Simple systems, powerful outcomes",
    description:
      "Business owners don't need another complicated tool. They need systems that work quietly in the background — capturing leads, building trust, and surfacing the data that matters.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section>
        <SectionHeader
          badge="About"
          title="We build growth systems for businesses that are ready to scale"
          description="Convertaflow exists because too many good businesses lose customers to a bad online presence. We fix that."
        />

        <div className="mx-auto max-w-3xl">
          <div className="prose prose-lg text-muted-foreground">
            <p className="text-base leading-relaxed">
              Most businesses don&apos;t have a marketing team. They don&apos;t have a
              full-time designer or a CRM specialist or someone watching their
              Google reviews every day. What they have is great work, happy
              customers, and a website that doesn&apos;t reflect any of it.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              Convertaflow was built to close that gap. We combine premium web
              design with automated lead capture, review collection, email
              follow-up, and simple business dashboards — all in one platform.
              Not a collection of disconnected tools. One system, designed to
              work together.
            </p>
            <p className="mt-4 text-base leading-relaxed">
              We believe every business deserves to look professional online, to
              never miss a lead, and to know exactly what&apos;s driving their growth.
              That&apos;s what we build.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeader
          title="What we believe"
          description="The principles behind everything we build."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border bg-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <value.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to work with a team that gets it?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re selective about who we work with because we want every client
            to get real results. Let&apos;s see if we&apos;re a good fit.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
