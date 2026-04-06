import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { BusinessProvider } from "@/components/dashboard/business-provider";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardTopbar } from "@/components/dashboard/topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <BusinessProvider session={session}>
      <div className="flex h-screen overflow-hidden bg-surface">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardTopbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </BusinessProvider>
  );
}
