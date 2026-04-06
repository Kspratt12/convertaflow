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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your business profile and account preferences.
        </p>
      </div>

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                defaultValue="Prestige Home Services"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessEmail">Business Email</Label>
              <Input
                id="businessEmail"
                type="email"
                defaultValue="contact@prestigehome.com"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="(555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                defaultValue="https://prestigehome.convertaflow.com"
              />
            </div>
          </div>
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Reviews + Dashboard</h3>
                <Badge>Active</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Premium website, review system, lead tracking, and email
                notifications.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              label: "New lead notifications",
              description: "Get emailed when a new lead submits a form",
              defaultChecked: true,
            },
            {
              label: "Review completion alerts",
              description:
                "Get notified when a customer completes a review",
              defaultChecked: true,
            },
            {
              label: "Weekly summary reports",
              description:
                "Receive a weekly email summary of your business activity",
              defaultChecked: false,
            },
            {
              label: "Marketing and product updates",
              description: "Learn about new features and best practices",
              defaultChecked: false,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium">{pref.label}</p>
                <p className="text-xs text-muted-foreground">
                  {pref.description}
                </p>
              </div>
              <Switch defaultChecked={pref.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Separator />

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-base text-destructive">
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Delete Account</p>
            <p className="text-xs text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>
          </div>
          <Button variant="outline" size="sm" className="text-destructive">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
