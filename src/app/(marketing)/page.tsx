import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { PainPoints } from "@/components/home/pain-points";
import { TierPreview } from "@/components/home/tier-preview";
import { FeatureHighlights } from "@/components/home/feature-highlights";
import { ProofSection } from "@/components/home/proof-section";
import { Portfolio } from "@/components/home/portfolio";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Convertaflow — The Growth System Your Business Is Missing",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PainPoints />
      <TierPreview />
      <FeatureHighlights />
      <ProofSection />
      <Portfolio />
      <HowItWorksPreview />
      <FinalCTA />
    </>
  );
}
