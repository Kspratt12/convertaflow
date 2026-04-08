import {
  Share2,
  ExternalLink,
  TrendingUp,
  Eye,
  MousePointerClick,
} from "lucide-react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TierGate } from "@/components/dashboard/tier-gate";
import { getSession } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { canAccessFeature } from "@/lib/tier";
import type { TierId } from "@/lib/types";

interface SocialLinkRow {
  id: string;
  platform: string;
  url: string;
  clicks: number;
  impressions: number;
  is_connected: boolean;
}

async function loadSocialLinks(businessId: string): Promise<SocialLinkRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("social_links")
    .select("id, platform, url, clicks, impressions, is_connected")
    .eq("business_id", businessId)
    .order("platform", { ascending: true });
  return (data ?? []) as SocialLinkRow[];
}

export default async function SocialPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const tier = session.profile.plan_tier as TierId;
  if (!canAccessFeature(tier, "social") && session.profile.role !== "admin") {
    return (
      <TierGate
        requiredTier="scale"
        featureName="Social Integration"
        featureDescription="Connect your social profiles, track clicks and engagement, and understand how social media drives business growth. Included with Scale and above."
      />
    );
  }

  const socialProfiles = await loadSocialLinks(session.profile.id);
  const totalClicks = socialProfiles.reduce((sum, p) => sum + p.clicks, 0);
  const totalImpressions = socialProfiles.reduce((sum, p) => sum + p.impressions, 0);
  const connectedCount = socialProfiles.filter((p) => p.is_connected).length;

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
            <p className="mt-2 text-2xl font-bold">{totalClicks.toLocaleString()}</p>
            <p className="text-[12px] text-muted-foreground">Total Clicks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <p className="mt-2 text-2xl font-bold">{totalImpressions.toLocaleString()}</p>
            <p className="text-[12px] text-muted-foreground">Impressions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <p className="mt-2 text-2xl font-bold">{connectedCount}</p>
            <p className="text-[12px] text-muted-foreground">Connected Profiles</p>
          </CardContent>
        </Card>
      </div>

      {/* Profiles list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-[14px] font-semibold">Connected Profiles</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {socialProfiles.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Share2 className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-[14px] font-medium">No profiles connected yet</p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Connect your social profiles to start tracking performance.
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                <Share2 className="mr-2 h-3.5 w-3.5" />
                Connect a profile
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Platform
                    </th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Status
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Clicks
                    </th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                      Impressions
                    </th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {socialProfiles.map((profile) => (
                    <tr key={profile.id} className="border-b last:border-0">
                      <td className="px-5 py-3.5">
                        <p className="text-[13px] font-medium">{profile.platform}</p>
                        {profile.url && (
                          <p className="text-[11px] text-muted-foreground truncate max-w-[240px]">
                            {profile.url}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={profile.is_connected ? "default" : "outline"}
                          className="text-[11px]"
                        >
                          {profile.is_connected ? "Connected" : "Not connected"}
                        </Badge>
                      </td>
                      <td className="px-5 py-3.5 text-right text-[13px] font-medium">
                        {profile.clicks.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 text-right text-[13px] text-muted-foreground">
                        {profile.impressions.toLocaleString()}
                      </td>
                      <td className="px-3 py-3.5">
                        {profile.url && (
                          <a
                            href={profile.url.startsWith("http") ? profile.url : `https://${profile.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
