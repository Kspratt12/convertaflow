"use client";

import { Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Settings</h1>
        <p className="mt-0.5 text-[13px] text-muted-foreground">
          Manage your business profile and preferences.
        </p>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Business Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-[13px]">Business Name</Label>
              <Input defaultValue="Prestige Home Services" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[13px]">Business Email</Label>
              <Input type="email" defaultValue="contact@prestigehome.com" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-[13px]">Phone</Label>
              <Input defaultValue="(555) 123-4567" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[13px]">Website URL</Label>
              <Input defaultValue="https://prestigehome.convertaflow.com" />
            </div>
          </div>
          <Button size="sm" className="gap-1.5">
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold">Reviews + Dashboard</span>
                <Badge className="text-[11px]">Active</Badge>
              </div>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Premium website, review system, lead tracking, and email notifications.
              </p>
            </div>
            <Button variant="outline" size="sm">Upgrade</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "New lead notifications", description: "Email when a lead submits a form", on: true },
            { label: "Review completion alerts", description: "Email when a customer completes a review", on: true },
            { label: "Weekly summary", description: "Weekly email summary of business activity", on: false },
            { label: "Product updates", description: "New features and best practices", on: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[13px] font-medium">{pref.label}</p>
                <p className="text-[12px] text-muted-foreground">{pref.description}</p>
              </div>
              <Switch defaultChecked={pref.on} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      <Card className="border-destructive/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold text-destructive">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium">Delete Account</p>
            <p className="text-[12px] text-muted-foreground">Permanently delete your account and all data.</p>
          </div>
          <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/5">
            Delete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
