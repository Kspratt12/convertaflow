"use client";

import { createContext, useContext } from "react";
import type { DashboardSession, TierId } from "@/lib/types";
import { hasAccess, canAccessFeature, type DashboardFeature } from "@/lib/tier";

interface BusinessContextValue {
  session: DashboardSession;
  tier: TierId;
  businessId: string;
  businessName: string;
  userEmail: string;
  userInitials: string;
  /** Check if user's tier allows a specific dashboard feature */
  can: (feature: DashboardFeature) => boolean;
  /** Check if user's tier meets a minimum tier level */
  hasMinTier: (minTier: TierId) => boolean;
  /** Whether the plan is active (not canceled/past_due) */
  isActive: boolean;
  /** Whether user is platform admin */
  isAdmin: boolean;
}

const BusinessContext = createContext<BusinessContextValue | null>(null);

interface BusinessProviderProps {
  session: DashboardSession;
  children: React.ReactNode;
}

export function BusinessProvider({ session, children }: BusinessProviderProps) {
  const tier = session.profile.plan_tier;
  const name = session.profile.business_name;

  // Generate initials from business name or email
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : session.user.email.slice(0, 2).toUpperCase();

  const value: BusinessContextValue = {
    session,
    tier,
    businessId: session.profile.id,
    businessName: name,
    userEmail: session.user.email,
    userInitials: initials,
    can: (feature: DashboardFeature) => canAccessFeature(tier, feature),
    hasMinTier: (minTier: TierId) => hasAccess(tier, minTier),
    isActive:
      session.profile.plan_status === "active" ||
      session.profile.plan_status === "trial",
    isAdmin: session.profile.role === "admin",
  };

  return (
    <BusinessContext.Provider value={value}>{children}</BusinessContext.Provider>
  );
}

export function useBusiness(): BusinessContextValue {
  const ctx = useContext(BusinessContext);
  if (!ctx) {
    throw new Error("useBusiness must be used within a BusinessProvider");
  }
  return ctx;
}
