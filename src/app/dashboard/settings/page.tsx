"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Save, Loader2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useBusiness } from "@/components/dashboard/business-provider";
import { TIERS } from "@/lib/constants";
import type { TierId } from "@/lib/types";

interface FormState {
  business_name: string;
  business_email: string;
  phone: string;
  website_url: string;
}

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SettingsPage() {
  const { session, tier } = useBusiness();
  const tierInfo = TIERS[tier as TierId];

  const [form, setForm] = useState<FormState>({
    business_name: session.profile.business_name || "",
    business_email: session.profile.business_email || "",
    phone: session.profile.phone || "",
    website_url: session.profile.website_url || "",
  });
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // If session updates from elsewhere, sync the form
  useEffect(() => {
    setForm({
      business_name: session.profile.business_name || "",
      business_email: session.profile.business_email || "",
      phone: session.profile.phone || "",
      website_url: session.profile.website_url || "",
    });
  }, [session.profile]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (saveState === "saved" || saveState === "error") setSaveState("idle");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaveState("saving");
    setErrorMessage("");

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Couldn't save changes. Please try again.");
        setSaveState("error");
        return;
      }
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2500);
    } catch {
      setErrorMessage("Connection issue. Please try again.");
      setSaveState("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Settings</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Manage your business profile and plan.
        </p>
      </div>

      {/* Business Profile */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Business Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[13px]">Business Name</Label>
                <Input
                  value={form.business_name}
                  onChange={(e) => update("business_name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[13px]">Business Email</Label>
                <Input
                  type="email"
                  value={form.business_email}
                  onChange={(e) => update("business_email", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[13px]">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[13px]">Website URL</Label>
                <Input
                  value={form.website_url}
                  onChange={(e) => update("website_url", e.target.value)}
                  placeholder="https://yourbusiness.com"
                />
              </div>
            </div>

            {saveState === "error" && errorMessage && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-3 py-2 text-[13px] text-destructive">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              size="sm"
              className="gap-1.5"
              disabled={saveState === "saving"}
            >
              {saveState === "saving" && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {saveState === "saved" && <Check className="h-3.5 w-3.5" />}
              {(saveState === "idle" || saveState === "error") && (
                <Save className="h-3.5 w-3.5" />
              )}
              {saveState === "saving"
                ? "Saving..."
                : saveState === "saved"
                ? "Saved"
                : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Current Plan */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold">
                  {tierInfo?.name || tier}
                </span>
                <Badge
                  className={`text-[11px] capitalize ${
                    session.profile.plan_status === "active"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : session.profile.plan_status === "trial"
                      ? "bg-amber-500/10 text-amber-600"
                      : "bg-slate-500/10 text-slate-600"
                  }`}
                >
                  {session.profile.plan_status || "trial"}
                </Badge>
              </div>
              {tierInfo?.microcopy && (
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {tierInfo.microcopy}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/pricing">Upgrade</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account / Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold text-destructive">
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium">Delete Account</p>
            <p className="text-[12px] text-muted-foreground">
              To permanently delete your account and data, contact our team.
              We&apos;ll confirm with you and process the request within one
              business day.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-destructive/30 hover:bg-destructive/5 shrink-0"
            asChild
          >
            <a href="mailto:hello@convertaflow.co?subject=Account%20deletion%20request">
              Contact Us
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
