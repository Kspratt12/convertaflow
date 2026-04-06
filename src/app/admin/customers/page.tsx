"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const customers = [
  { name: "Prestige Home Services", email: "sarah@prestigehome.com", tier: "growth", status: "Active", project: "Live", date: "Mar 15, 2026" },
  { name: "Mitchell Dental Group", email: "dr.mitchell@mdg.com", tier: "scale", status: "Active", project: "Live", date: "Mar 8, 2026" },
  { name: "Atlas Property Management", email: "james@atlaspm.com", tier: "starter", status: "Active", project: "In Progress", date: "Apr 1, 2026" },
  { name: "Foster Family Dental", email: "amanda@fosterdental.com", tier: "growth", status: "Active", project: "Review", date: "Apr 3, 2026" },
  { name: "Kim Realty Group", email: "robert@kimrealty.com", tier: "starter", status: "Trial", project: "Onboarding", date: "Apr 5, 2026" },
  { name: "Nguyen Law Firm", email: "patricia@nguyenlaw.com", tier: "scale", status: "Active", project: "Live", date: "Feb 20, 2026" },
];

const tierColors: Record<string, string> = {
  starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  growth: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  scale: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const tierLabels: Record<string, string> = {
  starter: "Foundation",
  growth: "Growth",
  scale: "Scale",
};

export default function CustomersPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Customers</h1>
        <span className="text-[13px] text-white/40">{customers.length} total</span>
      </div>

      <Card className="border-white/[0.06] bg-white/[0.03]">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Business</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Tier</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Status</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Project</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-white/30">Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.email} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="px-5 py-3.5">
                      <p className="text-[13px] font-medium text-white/90">{c.name}</p>
                      <p className="text-[11px] text-white/35">{c.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={`text-[11px] ${tierColors[c.tier]}`}>
                        {tierLabels[c.tier]}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant="outline" className={`text-[11px] ${c.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                        {c.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] text-white/50">{c.project}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-[11px] text-white/35">
                        <Clock className="h-3 w-3" />{c.date}
                      </span>
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
