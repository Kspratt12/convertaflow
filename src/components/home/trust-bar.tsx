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
  { icon: Star, label: "Review Systems" },
  { icon: BarChart3, label: "Real-Time Dashboards" },
  { icon: TrendingUp, label: "Growth Analytics" },
  { icon: Zap, label: "Smart Automation" },
  { icon: Shield, label: "Enterprise Security" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border/40 py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:flex lg:items-center lg:justify-between lg:gap-0">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-center gap-2 text-muted-foreground/70 lg:justify-start"
            >
              <item.icon className="h-3.5 w-3.5 shrink-0" />
              <span className="text-[13px] font-medium tracking-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
