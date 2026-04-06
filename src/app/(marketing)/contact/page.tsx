"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/section";
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
  "Retail / E-commerce",
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
      // Still show success for now — form data will be captured when backend is connected
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <Section>
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold">Message received</h2>
          <p className="mt-3 text-muted-foreground">
            Thanks for reaching out. We&apos;ll review your message and get back
            to you within one business day. In the meantime, feel free to explore
            our features and pricing.
          </p>
          <Button className="mt-8" variant="outline" asChild>
            <a href="/pricing">
              Explore Pricing
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <div className="mx-auto max-w-2xl">
          <SectionHeader
            badge="Contact"
            title="Let's talk about your business"
            description="Tell us a bit about what you need. We'll follow up with the best path forward — no pressure, no hard sell."
          />

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border bg-card p-8"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@business.com"
                  required
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select name="businessType">
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interest">Interested In</Label>
                <Select name="interest">
                  <SelectTrigger id="interest">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map((interest) => (
                      <SelectItem key={interest} value={interest}>
                        {interest}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Tell us about your needs</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="What are you looking to achieve? Any specific challenges or goals..."
                rows={5}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </Section>
    </>
  );
}
