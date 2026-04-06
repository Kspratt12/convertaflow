import { Card, CardContent } from "@/components/ui/card";
import { Users, DollarSign, Clock, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Customers", value: "24", icon: Users },
  { label: "Monthly Revenue", value: "$4,728", icon: DollarSign },
  { label: "Active Projects", value: "7", icon: Clock },
  { label: "This Month", value: "+3", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-white/[0.06] bg-white/[0.03]">
            <CardContent className="p-4">
              <s.icon className="h-4 w-4 text-white/40" />
              <p className="mt-2 text-2xl font-bold text-white/90">{s.value}</p>
              <p className="text-[12px] text-white/40">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
