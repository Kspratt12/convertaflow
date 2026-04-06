"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const projects = [
  {
    name: "ListingFlare",
    url: "https://www.listingflare.com",
    image: "/listing-flare.png",
    category: "Real Estate SaaS",
    description:
      "AI-powered property websites for listing agents with 24/7 chatbot, automated lead capture, and follow-up emails.",
    stats: ["AI chatbot", "Lead capture", "Analytics"],
    accent: "#3b82f6",
  },
  {
    name: "SupplementSnap",
    url: "https://www.supplementsnap.io",
    image: "/supplement-flow.png",
    category: "Roofing Software",
    description:
      "Roofing supplement software recovering $2,400+ per supplement with AI-generated reports from mobile damage photos.",
    stats: ["AI reports", "Mobile capture", "Xactimate"],
    accent: "#8b5cf6",
  },
];

export function Portfolio() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16 border-t border-white/[0.04]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[30%] right-[20%] h-[350px] w-[350px] rounded-full bg-[#7c3aed]/[0.05] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
          <span className="mb-5 inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            Our Work
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Products we&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              built and launched
            </span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/50 sm:text-[16px]">
            Real platforms. Live users. Measurable results.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] transition-all duration-300 hover:border-white/[0.15] hover:shadow-2xl hover:shadow-purple-500/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Screenshot area */}
              <div className="relative overflow-hidden bg-white">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  width={700}
                  height={400}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
                {/* Bottom gradient fade into card */}
                <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-10 bg-gradient-to-t from-[#0a0a1f] to-transparent" />
              </div>

              {/* Info section */}
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                      style={{ backgroundColor: `${project.accent}20`, color: project.accent }}
                    >
                      {project.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-white sm:text-xl">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-white/45 sm:text-[14px]">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stats.map((stat) => (
                    <span
                      key={stat}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/50"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" className="gap-1.5 border-white/[0.1] bg-white/[0.04] text-white hover:bg-white/[0.08] hover:text-white" asChild>
            <Link href="/contact">
              Want something like this?
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
