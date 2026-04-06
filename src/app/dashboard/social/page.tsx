"use client";

import {
  Share2,
  ExternalLink,
  TrendingUp,
  Eye,
  MousePointerClick,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TierGate } from "@/components/dashboard/tier-gate";

export default function SocialPage() {
  // TODO: Replace with real tier from session context
  const isLocked = true;

  if (isLocked) {
    return (
      <TierGate
        requiredTier="scale"
        featureName="Social Integration"
        featureDescription="Connect your social profiles, track clicks and engagement, and understand how social media drives business growth."
      />
    );
  }

  const socialProfiles = [
    { platform: "Google Business", url: "google.com/business", clicks: 234, impressions: 1890, status: "Connected" },
    { platform: "Facebook", url: "facebook.com/yourbusiness", clicks: 189, impressions: 1456, status: "Connected" },
    { platform: "Instagram", url: "instagram.com/yourbusiness", clicks: 156, impressions: 2100, status: "Connected" },
    { platform: "LinkedIn", url: "linkedin.com/company/yourbusiness", clicks: 98, impressions: 890, status: "Connected" },
    { platform: "TikTok", url: "", clicks: 0, impressions: 0, status: "Not Connected" },
  ];

  const totalClicks = socialProfiles.reduce((sum, p) => sum + p.clicks, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Social</h1>
          <p className="text-sm text-muted-foreground">
            Track social media performance and manage your presence.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Manage Profiles
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            <p className="mt-2 text-3xl font-bold">{totalClicks}</p>
            <p className="text-xs text-muted-foreground">Total Clicks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <p className="mt-2 text-3xl font-bold">
              {socialProfiles.reduce((sum, p) => sum + p.impressions, 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Impressions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <p className="mt-2 text-3xl font-bold">
              {((totalClicks / socialProfiles.reduce((sum, p) => sum + p.impressions, 0)) * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Click-through Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance bars */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialProfiles
              .filter((p) => p.status === "Connected")
              .map((profile) => (
                <div key={profile.platform}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{profile.platform}</span>
                    <span className="text-muted-foreground">
                      {profile.clicks} clicks
                    </span>
                  </div>
                  <div className="mt-1.5 h-3 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                      style={{
                        width: `${(profile.clicks / 234) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Profiles */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Connected Profiles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Platform</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Clicks</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Impressions</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {socialProfiles.map((profile) => (
                  <tr key={profile.platform} className="border-b hover:bg-muted/50 last:border-0">
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">{profile.platform}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={profile.status === "Connected" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {profile.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">{profile.clicks}</td>
                    <td className="px-6 py-4 text-sm">{profile.impressions.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {profile.url && (
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
