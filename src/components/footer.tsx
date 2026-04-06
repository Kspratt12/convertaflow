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
    <footer className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-[220px]">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt={SITE.name}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-[14px] font-bold tracking-tight">{SITE.name}</span>
            </Link>
            <p className="mt-3 text-[12px] leading-relaxed text-muted-foreground/70">
              Premium websites and growth systems for businesses.
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-wrap gap-12 sm:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {category}
                </h3>
                <ul className="mt-2.5 space-y-1.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-muted-foreground/70 transition-colors hover:text-foreground"
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

        <div className="mt-8 flex items-center justify-between border-t border-border/30 pt-5">
          <p className="text-[11px] text-muted-foreground/50">
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="text-[11px] text-muted-foreground/50">
            Built for growth.
          </p>
        </div>
      </div>
    </footer>
  );
}
