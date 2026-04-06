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
  { icon: BarChart3, label: "Dashboards" },
  { icon: TrendingUp, label: "Analytics" },
  { icon: Zap, label: "Automation" },
  { icon: Shield, label: "Enterprise Security" },
];

export function TrustBar() {
  return (
    <section className="bg-[#0a0a1f] py-4 sm:py-5 border-y border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide sm:gap-6">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 text-white/30 shrink-0"
            >
              <item.icon className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
              <span className="text-[11px] font-medium tracking-tight whitespace-nowrap sm:text-[13px]">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
