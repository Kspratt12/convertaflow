import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Preview", href: "/preview" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-[#060613] text-white">
      {/* Subtle gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt={SITE.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-[13px] font-bold tracking-tight text-white/90">{SITE.name}</span>
          </Link>

          <div className="flex flex-wrap gap-10 sm:gap-14">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-white/30">
                  {category}
                </h3>
                <ul className="mt-2 space-y-1">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[12px] text-white/40 transition-colors hover:text-white/80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <p className="text-[11px] text-white/25">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="text-[11px] text-white/25">
            Built for growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
