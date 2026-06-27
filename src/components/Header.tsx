"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { ButtonLink } from "./Button";
import { MenuIcon, CloseIcon } from "./icons";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
  { href: "/sermons", label: "Sermons" },
  { href: "/events", label: "Events" },
  { href: "/connect", label: "Connect" },
  { href: "/give", label: "Give" },
];

export function Header({
  logoUrl,
  title = "Team Zion Lipa",
}: {
  logoUrl?: string | null;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add a shadow/stronger background once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-200 ${
        scrolled
          ? "border-slate-200 bg-white/90 shadow-sm backdrop-blur"
          : "border-transparent bg-white/80 backdrop-blur"
      }`}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label={title}
          className="flex items-center gap-2 font-display text-xl font-bold text-brand-900"
        >
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={title} className="h-9 w-auto" />
          ) : (
            <>
              Team Zion <span className="text-gold-600">Lipa</span>
            </>
          )}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-brand-700"
                  : "text-slate-600 hover:text-brand-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/visit" size="sm" className="ml-2">
            Plan a Visit
          </ButtonLink>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="rounded-md p-1 text-brand-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
        </button>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height] duration-300 ease-in-out md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-transparent"
        }`}
      >
        <Container className="flex flex-col py-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-lg px-2 py-2.5 text-base font-medium ${
                isActive(link.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/visit" size="md" className="mt-2">
            Plan a Visit
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
