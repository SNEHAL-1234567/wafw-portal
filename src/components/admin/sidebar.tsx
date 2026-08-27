"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/facilitators", label: "Facilitators", icon: Users },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-brand-ink/10 bg-brand-charcoal text-brand-cream">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        <Image
          src="/brand/wafw-logo.png"
          unoptimized
          alt="WAFW"
          width={160}
          height={64}
          className="h-8 w-auto brightness-0 invert"
        />
      </div>

      <nav className="flex-1 space-y-1 px-3 py-5">
        {LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-red text-white"
                  : "text-brand-cream/70 hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon size={17} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4 text-xs text-brand-cream/50">
        <Link
          href="/"
          target="_blank"
          className="mb-3 flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/5 hover:text-white"
        >
          <ExternalLink size={15} /> View public site
        </Link>
        <p className="truncate px-3">{email}</p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-brand-cream/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={15} /> Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
