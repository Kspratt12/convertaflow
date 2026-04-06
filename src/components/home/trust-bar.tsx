import {
  Target,
  Star,
  BarChart3,
  TrendingUp,
  Zap,
  Shield,
} from "lucide-react";

const trustItems = [
  { icon: Target, label: "Lead Capture" },
  { icon: Star, label: "Review Collection" },
  { icon: BarChart3, label: "Conversion Tracking" },
  { icon: TrendingUp, label: "Business Growth" },
  { icon: Zap, label: "Automation" },
  { icon: Shield, label: "Trusted Design" },
];

export function TrustBar() {
  return (
    <section className="border-y bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
