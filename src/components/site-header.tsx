"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { contact, org } from "@/lib/content/site-content";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const NAV_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  {
    href: "/our-program",
    label: "Our Program",
    children: [
      { href: "/our-program", label: "Our Program" },
      { href: "/where-we-work", label: "Where We Work" },
      { href: "/annual-womens-symposium", label: "Annual Women’s Symposium" },
    ],
  },
  { href: "/facilitators", label: "Facilitators" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/news-stories", label: "News & Stories" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, link: NavLink) {
  if (link.children) return link.children.some((c) => pathname.startsWith(c.href));
  return pathname.startsWith(link.href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Utility bar */}
      <div className="hidden bg-brand-night text-[13px] text-white/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-2 sm:px-8">
          <p className="truncate">An initiative of {org.parent}</p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex shrink-0 items-center gap-1.5 hover:text-white"
          >
            <Mail size={13} /> {contact.email}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-white transition-shadow",
          scrolled ? "border-brand-line shadow-[0_2px_12px_rgba(31,26,23,0.08)]" : "border-brand-line",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" className="flex shrink-0 items-center" aria-label={`${org.name} — home`}>
            <Image
              src="/brand/wafw-logo.png"
              unoptimized
              alt={org.name}
              width={900}
              height={193}
              preload
              className="h-8 w-auto sm:h-10"
            />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link);
              return (
                <div key={link.label} className="group relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-6 text-[15px] font-medium transition-colors",
                      active ? "text-brand-red" : "text-brand-ink/80 hover:text-brand-red",
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown size={14} className="mt-px" />}
                  </Link>
                  {active && (
                    <span className="absolute inset-x-3 bottom-0 h-[3px] bg-brand-red" />
                  )}
                  {link.children && (
                    <div className="invisible absolute left-0 top-full z-10 min-w-64 border border-brand-line bg-white py-2 opacity-0 shadow-lg transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm transition-colors hover:bg-brand-sand hover:text-brand-red",
                            pathname.startsWith(child.href)
                              ? "font-semibold text-brand-red"
                              : "text-brand-ink/80",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="hidden rounded-md bg-brand-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark sm:inline-flex"
            >
              Donate
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-brand-line text-brand-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-brand-line bg-white lg:hidden">
            <nav aria-label="Mobile" className="px-5 py-4 sm:px-8">
              <Link href="/" className="block border-b border-brand-line py-3.5 text-lg font-semibold text-brand-ink">
                Home
              </Link>
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label} className="border-b border-brand-line py-3.5">
                    <p className="text-lg font-semibold text-brand-ink">{link.label}</p>
                    <div className="mt-1 flex flex-col">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "py-2 pl-4 text-base",
                            pathname.startsWith(child.href) ? "font-semibold text-brand-red" : "text-brand-ink/70",
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "block border-b border-brand-line py-3.5 text-lg font-semibold",
                      pathname.startsWith(link.href) ? "text-brand-red" : "text-brand-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Link
                href="/donate"
                className="mt-6 flex w-full items-center justify-center rounded-md bg-brand-red px-5 py-3.5 font-semibold text-white"
              >
                Donate
              </Link>
              <a href={`mailto:${contact.email}`} className="mt-5 flex items-center justify-center gap-2 text-sm text-brand-ink/60">
                <Mail size={14} /> {contact.email}
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
