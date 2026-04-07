import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { BusinessProvider } from "@/components/dashboard/business-provider";
import { PortalSidebar } from "@/components/portal/portal-sidebar";
import { PortalTopbar } from "@/components/portal/portal-topbar";

export default async function PortalLayout({
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
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <PortalSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <PortalTopbar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 pb-8 pt-6 sm:px-6 sm:pt-8">{children}</main>
        </div>
      </div>
    </BusinessProvider>
  );
}
