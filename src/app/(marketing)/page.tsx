import { Metadata } from "next";
import { HeroSection } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { PainPoints } from "@/components/home/pain-points";
import { IntegrationMarquee } from "@/components/home/integration-marquee";
import { TierPreview } from "@/components/home/tier-preview";
import { FeatureHighlights } from "@/components/home/feature-highlights";
import { ProofSection } from "@/components/home/proof-section";
import { CaseStudies } from "@/components/home/case-studies";
import { Portfolio } from "@/components/home/portfolio";
import { HowItWorksPreview } from "@/components/home/how-it-works-preview";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Convertaflow · A website that actually brings you customers",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <PainPoints />
      <IntegrationMarquee />
      <TierPreview />
      <FeatureHighlights />
      <ProofSection />
      <CaseStudies />
      <Portfolio />
      <HowItWorksPreview />
      <FinalCTA />
    </>
  );
}
