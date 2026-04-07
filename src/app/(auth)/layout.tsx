export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-start justify-center bg-[#060613] px-4 py-10 sm:py-16">
      {children}
    </div>
  );
}
