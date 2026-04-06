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
    <footer className="relative border-t border-border/30 bg-[#fafafa]">
      {/* Subtle gradient accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt={SITE.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-[13px] font-bold tracking-tight">{SITE.name}</span>
          </Link>

          <div className="flex flex-wrap gap-10 sm:gap-14">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {category}
                </h3>
                <ul className="mt-2 space-y-1">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[12px] text-muted-foreground/60 transition-colors hover:text-foreground"
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

        <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
          <p className="text-[11px] text-muted-foreground/40">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="text-[11px] text-muted-foreground/40">
            Built for growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
