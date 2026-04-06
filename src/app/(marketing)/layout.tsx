import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#060613] overflow-x-hidden max-w-[100vw]">
      <Navbar />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </div>
  );
}
