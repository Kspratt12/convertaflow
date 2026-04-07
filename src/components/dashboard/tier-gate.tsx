"use client";

import Link from "next/link";
import { Lock, ArrowRight, Star, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TierId } from "@/lib/types";
import { tierLabel } from "@/lib/tier";

interface TierGateProps {
  requiredTier: TierId;
  featureName: string;
  featureDescription: string;
}

const tierIcons: Record<TierId, typeof Star> = {
  starter: Lock,
  system_upgrade: Star,
  growth: Star,
  scale: Rocket,
};

export function TierGate({
  requiredTier,
  featureName,
  featureDescription,
}: TierGateProps) {
  const Icon = tierIcons[requiredTier];

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="relative mb-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15">
          <Lock className="h-7 w-7 text-primary/60" />
        </div>
        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 border border-primary/15">
          <Icon className="h-3 w-3 text-primary" />
        </div>
      </div>

      <h2 className="text-xl font-bold tracking-tight">{featureName}</h2>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
        {featureDescription}
      </p>

      <div className="mt-6 rounded-xl border border-primary/15 bg-primary/[0.03] px-5 py-3">
        <p className="text-[13px] text-muted-foreground">
          Available on{" "}
          <span className="font-semibold text-primary">
            {tierLabel(requiredTier)}
          </span>{" "}
          and above
        </p>
      </div>

      <Button className="mt-6 gap-1.5" asChild>
        <Link href="/pricing">
          View Upgrade Options
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Button>
    </div>
  );
}
