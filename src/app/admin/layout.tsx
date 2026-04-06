import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import { LayoutDashboard, Users, CreditCard, Settings } from "lucide-react";

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Billing", href: "/admin/billing", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.profile.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#060613] text-white">
      {/* Admin sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-white/[0.06] bg-white/[0.02] lg:flex lg:flex-col">
        <div className="flex h-14 items-center gap-2.5 border-b border-white/[0.06] px-5">
          <Image src="/convertaflow-logo.png" alt={SITE.name} width={24} height={24} className="h-6 w-6 object-contain" />
          <span className="text-[13px] font-bold tracking-tight">Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-white/50 hover:bg-white/[0.04] hover:text-white/80"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Admin content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-white/[0.06] bg-white/[0.01] px-6">
          <h2 className="text-[13px] font-semibold text-white/60">Convertaflow Admin</h2>
          <Link href="/dashboard" className="text-[12px] text-white/40 hover:text-white/60">Back to Dashboard</Link>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
