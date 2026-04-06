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
  { icon: Star, label: "Reviews" },
  { icon: BarChart3, label: "Dashboards" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Zap, label: "Automation" },
  { icon: Shield, label: "Security" },
];

export function TrustBar() {
  return (
    <section className="bg-[#060613] py-5 sm:py-6 border-y border-white/[0.04] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 text-white/30 min-w-0"
            >
              <item.icon className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
              <span className="text-[10px] font-medium tracking-tight truncate sm:text-[13px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
