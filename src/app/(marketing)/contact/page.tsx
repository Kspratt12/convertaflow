"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail, Phone, MapPin } from "lucide-react";
import { Section } from "@/components/section";
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
  "Home Services",
  "Healthcare / Dental",
  "Real Estate",
  "Legal Services",
  "Restaurant / Hospitality",
  "Fitness / Wellness",
  "Professional Services",
  "Construction / Trades",
  "Other",
];

const interests = [
  "Premium Website (Tier 1)",
  "Reviews + Dashboard (Tier 2)",
  "Full Growth Bundle (Tier 3)",
  "Not sure yet — help me decide",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      businessType: formData.get("businessType"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Section>
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="h-7 w-7 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold">Message received</h2>
          <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
            Thanks for reaching out. We review every message and respond within
            one business day. In the meantime, explore what we offer.
          </p>
          <Button className="mt-7 gap-1.5" variant="outline" asChild>
            <a href="/pricing">
              Explore Pricing
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left — info */}
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-5">
              Contact
            </span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Let&apos;s talk about your business
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              Tell us what you need. We&apos;ll follow up with the best path
              forward — no pressure, no hard sell.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "hello@convertaflow.com" },
                { icon: Phone, label: "(555) 000-0000" },
                { icon: MapPin, label: "Remote — serving clients everywhere" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <item.icon className="h-3.5 w-3.5" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-border/60 bg-card p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-[13px]">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-[13px]">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@business.com" required />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="businessType" className="text-[13px]">Business Type</Label>
                  <Select name="businessType">
                    <SelectTrigger id="businessType">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="interest" className="text-[13px]">Interested In</Label>
                  <Select name="interest">
                    <SelectTrigger id="interest">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {interests.map((interest) => (
                        <SelectItem key={interest} value={interest}>{interest}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-[13px]">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="What are you looking to achieve?"
                  rows={4}
                />
              </div>

              <Button type="submit" size="lg" className="w-full gap-1.5" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}
