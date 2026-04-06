"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Clock,
  Globe,
  Users,
  CheckCircle2,
  UserPlus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const leads = [
  { id: 1, name: "David Park", email: "david@parkservices.com", phone: "(555) 123-4567", source: "Website", status: "New", date: "Apr 6, 2026", message: "Interested in commercial cleaning services" },
  { id: 2, name: "Lisa Chen", email: "lisa@chengroup.com", phone: "(555) 234-5678", source: "Google", status: "New", date: "Apr 6, 2026", message: "Looking for a quote on office renovation" },
  { id: 3, name: "Mike Torres", email: "mike@torresconstruction.com", phone: "(555) 345-6789", source: "Referral", status: "Contacted", date: "Apr 5, 2026", message: "Need help with a residential project" },
  { id: 4, name: "Rachel Adams", email: "rachel@adamslaw.com", phone: "(555) 456-7890", source: "Website", status: "Contacted", date: "Apr 5, 2026", message: "Want to discuss website redesign" },
  { id: 5, name: "James Wilson", email: "james@wilsonplumbing.com", phone: "(555) 567-8901", source: "Google", status: "Converted", date: "Apr 4, 2026", message: "Ready to start with Premium Website tier" },
  { id: 6, name: "Amanda Foster", email: "amanda@fosterdental.com", phone: "(555) 678-9012", source: "Website", status: "Converted", date: "Apr 3, 2026", message: "Interested in Reviews + Dashboard plan" },
  { id: 7, name: "Robert Kim", email: "robert@kimrealty.com", phone: "(555) 789-0123", source: "Facebook", status: "New", date: "Apr 3, 2026", message: "Want to generate more real estate leads" },
  { id: 8, name: "Patricia Nguyen", email: "patricia@nguyenlaw.com", phone: "(555) 890-1234", source: "Google", status: "Contacted", date: "Apr 2, 2026", message: "Looking for full growth bundle info" },
];

export default function LeadsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? leads : leads.filter((l) => l.status.toLowerCase() === filter);

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "New").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    converted: leads.filter((l) => l.status === "Converted").length,
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Leads</h1>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            Track and manage all incoming leads.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-3.5 w-3.5" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {[
          { label: "Total", value: counts.total, icon: Users },
          { label: "New", value: counts.new, icon: UserPlus },
          { label: "Contacted", value: counts.contacted, icon: Clock },
          { label: "Converted", value: counts.converted, icon: CheckCircle2 },
        ].map((s) => (
          <Card key={s.label} className="border-border/50">
            <CardContent className="p-4">
              <s.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
              <p className="mt-2 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-[12px] text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9" />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-36">
            <Filter className="mr-1.5 h-3.5 w-3.5" />
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Leads</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Name</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Source</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Status</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Date</th>
                  <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/30 transition-colors hover:bg-muted/30 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="text-[13px] font-medium">{lead.name}</p>
                      <p className="text-[12px] text-muted-foreground">{lead.email}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        {lead.source}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        variant={lead.status === "Converted" ? "default" : lead.status === "Contacted" ? "secondary" : "outline"}
                        className="text-[11px] px-2 py-0.5"
                      >
                        {lead.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-[12px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {lead.date}
                      </span>
                    </td>
                    <td className="max-w-[200px] px-5 py-3.5">
                      <p className="truncate text-[12px] text-muted-foreground">{lead.message}</p>
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
