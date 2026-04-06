"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const businessTypes = [
  "Home Services", "Healthcare / Dental", "Real Estate", "Legal Services",
  "Restaurant / Hospitality", "Fitness / Wellness", "Professional Services",
  "Construction / Trades", "Other",
];

const interests = [
  "Premium Website (Tier 1)", "Reviews + Dashboard (Tier 2)",
  "Full Growth Bundle (Tier 3)", "Not sure yet",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"), email: formData.get("email"),
      businessType: formData.get("businessType"), interest: formData.get("interest"),
      message: formData.get("message"),
    };
    try {
      await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setSubmitted(true);
    } catch { setSubmitted(true); } finally { setLoading(false); }
  }

  if (submitted) {
    return (
      <section className="relative overflow-hidden bg-[#060613] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-md text-center px-4">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle2 className="h-7 w-7 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold">Message received</h2>
          <p className="mt-3 text-[15px] text-white/50 leading-relaxed">
            Thanks for reaching out. We review every message and respond within
            one business day.
          </p>
          <Button className="mt-7 gap-1.5 border-white/[0.1] bg-white/[0.06] text-white hover:bg-white/[0.1]" variant="outline" asChild>
            <a href="/pricing">Explore Pricing <ArrowRight className="h-3.5 w-3.5" /></a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#060613] py-12 text-white sm:py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[20%] left-[20%] h-[400px] w-[400px] rounded-full bg-[#7c3aed]/[0.07] blur-[130px]" />
        <div className="absolute bottom-[20%] right-[20%] h-[350px] w-[350px] rounded-full bg-[#3b82f6]/[0.05] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50 mb-5">
              Contact
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s talk about your business
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/50">
              Tell us what you need. We&apos;ll follow up with the best path
              forward. No pressure, no hard sell.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "hello@convertaflow.com" },
                { icon: Phone, label: "(555) 000-0000" },
                { icon: MapPin, label: "Remote — serving clients everywhere" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-[14px] text-white/40">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06]">
                    <item.icon className="h-4 w-4 text-white/50" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[13px] text-white/60">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[13px] text-white/60">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@business.com" required className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="businessType" className="text-[13px] text-white/60">Business Type</Label>
                  <Select name="businessType">
                    <SelectTrigger id="businessType" className="bg-white/[0.04] border-white/[0.08] text-white/70">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="interest" className="text-[13px] text-white/60">Interested In</Label>
                  <Select name="interest">
                    <SelectTrigger id="interest" className="bg-white/[0.04] border-white/[0.08] text-white/70">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {interests.map((interest) => (<SelectItem key={interest} value={interest}>{interest}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-[13px] text-white/60">Message</Label>
                <Textarea id="message" name="message" placeholder="What are you looking to achieve?" rows={4} className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/25" />
              </div>

              <Button type="submit" size="lg" className="w-full sm:w-auto gap-1.5 bg-gradient-to-r from-[#7c3aed] to-[#3b82f6] text-white border-0 hover:opacity-90 h-11 sm:h-12 px-8" disabled={loading}>
                {loading ? (
                  <><Loader2 className="h-4 w-4 animate-spin" />Sending...</>
                ) : (
                  <>Send Message<ArrowRight className="h-4 w-4" /></>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
