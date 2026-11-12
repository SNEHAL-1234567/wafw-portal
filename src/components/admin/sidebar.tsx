"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExternalLink, LayoutDashboard, LogOut, Menu, Plus, Users, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/facilitators", label: "Facilitators", icon: Users },
  { href: "/admin/facilitators/new", label: "Add facilitator", icon: Plus, exact: true },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {LINKS.map((link) => {
        const active = link.exact
          ? pathname === link.href
          : pathname.startsWith(link.href) && pathname !== "/admin/facilitators/new";
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
            )}
          >
            <Icon size={17} className={active ? "text-brand-amber" : ""} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Footer({ email }: { email: string }) {
  return (
    <div className="space-y-1 border-t border-white/10 pt-4 text-sm">
      <Link
        href="/"
        target="_blank"
        className="flex items-center gap-3 rounded-md px-3 py-2 text-white/65 hover:bg-white/5 hover:text-white"
      >
        <ExternalLink size={16} /> View public site
      </Link>
      <form action={logoutAction}>
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-white/65 hover:bg-white/5 hover:text-white"
        >
          <LogOut size={16} /> Sign out
        </button>
      </form>
      <p className="truncate px-3 pt-2 text-xs text-white/40" title={email}>
        Signed in as {email}
      </p>
    </div>
  );
}

function Logo() {
  return (
    <div className="inline-flex rounded-md bg-white px-2.5 py-1.5">
      <Image
        src="/brand/wafw-logo.png"
        unoptimized
        alt="WAFW"
        width={900}
        height={193}
        className="h-7 w-auto"
      />
    </div>
  );
}

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-brand-night px-3 py-5 text-white lg:flex">
        <div className="px-2">
          <Logo />
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
            Admin portal
          </p>
        </div>
        <div className="mt-8 flex-1">
          <NavLinks pathname={pathname} />
        </div>
        <Footer email={email} />
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-brand-night px-4 text-white lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="rounded-md p-2 hover:bg-white/10"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-30 flex flex-col gap-6 bg-brand-night px-4 py-5 text-white lg:hidden">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
          <Footer email={email} />
        </div>
      )}
    </>
  );
}
