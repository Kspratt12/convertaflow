"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Clock,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const sourceIcons: Record<string, typeof Globe> = {
  Website: Globe,
  Google: Search,
  Referral: Phone,
  Facebook: Mail,
};

export default function LeadsPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? leads : leads.filter((l) => l.status.toLowerCase() === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage all your incoming leads.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total Leads", value: leads.length },
          { label: "New", value: leads.filter((l) => l.status === "New").length },
          { label: "Contacted", value: leads.filter((l) => l.status === "Contacted").length },
          { label: "Converted", value: leads.filter((l) => l.status === "Converted").length },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search leads..." className="pl-9" />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v ?? "all")}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="mr-2 h-4 w-4" />
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

      {/* Leads Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Source</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground">Message</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => {
                  const SourceIcon = sourceIcons[lead.source] || Globe;
                  return (
                    <tr
                      key={lead.id}
                      className="border-b transition-colors hover:bg-muted/50 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium">{lead.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {lead.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <SourceIcon className="h-3.5 w-3.5" />
                          {lead.source}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            lead.status === "Converted"
                              ? "default"
                              : lead.status === "Contacted"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {lead.date}
                        </span>
                      </td>
                      <td className="max-w-xs px-6 py-4">
                        <p className="truncate text-xs text-muted-foreground">
                          {lead.message}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
