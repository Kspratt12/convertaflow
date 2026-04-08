"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const cases = [
  {
    name: "Mike R.",
    business: "Mike's Plumbing",
    location: "Apex, NC",
    initials: "MR",
    result: "14 new jobs in the first month",
    quote:
      "My old website just sat there. Convertaflow set up a real one and now my phone actually rings. Got 14 jobs in the first month and I haven't had to chase a single review.",
  },
  {
    name: "Dr. Lauren K.",
    business: "Cary Family Dental",
    location: "Cary, NC",
    initials: "LK",
    result: "32 new patients booked online",
    quote:
      "We were losing patients to bigger practices because our site looked outdated. Six weeks in and we've booked 32 new patients straight from the new website.",
  },
  {
    name: "Tasha B.",
    business: "Studio Eight Salon",
    location: "Raleigh, NC",
    initials: "TB",
    result: "Google reviews went 19 → 84",
    quote:
      "The auto-text after appointments is the best part. I went from 19 Google reviews to 84 in two months without lifting a finger. New clients tell me they found us from the reviews.",
  },
];

export function CaseStudies() {
  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[10%] h-[300px] w-[300px] rounded-full bg-[#7c3aed]/[0.08] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] h-[300px] w-[300px] rounded-full bg-[#06b6d4]/[0.06] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
            Real Results
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Local owners.{" "}
            <span className="bg-gradient-to-r from-[#8b5cf6] via-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              Real new customers.
            </span>
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-white/50 sm:text-[15px]">
            Here&apos;s what happened when these businesses switched to a website built to actually bring in work.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.business}
              className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 hover:border-white/[0.12] transition-colors"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "20px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Quote className="h-6 w-6 text-[#7c3aed]/50" />
              <p className="mt-3 text-[14px] leading-relaxed text-white/75">
                &ldquo;{c.quote}&rdquo;
              </p>

              <div className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-3 py-1 text-[12px] font-semibold text-emerald-300">
                {c.result}
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7c3aed] to-[#3b82f6] text-[13px] font-bold text-white">
                  {c.initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold text-white/90">{c.name}</p>
                  <p className="truncate text-[11px] text-white/50">{c.business} · {c.location}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
