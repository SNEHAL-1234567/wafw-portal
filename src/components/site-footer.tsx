import Image from "next/image";
import Link from "next/link";
import { org } from "@/lib/content/site-content";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-ink/10 bg-brand-charcoal text-brand-cream/80">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/brand/wafw-logo.png"
              unoptimized
              alt={org.name}
              width={220}
              height={88}
              className="h-11 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-cream/60">
              An initiative of {org.parent}, a {org.taxStatus} based in{" "}
              {org.location}.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-amber">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white">
                  About WAFW
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-white">
                  The Program
                </Link>
              </li>
              <li>
                <Link href="/facilitators" className="hover:text-white">
                  Facilitators
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Get Involved
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-amber">
              Global Interactions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-brand-cream/60">
              <li>{org.founder}</li>
              <li>{org.founderTitle}</li>
              <li>{org.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-cream/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {org.name}. All rights
            reserved.
          </p>
          <p>{org.shortName} · a program of {org.parent}</p>
        </div>
      </div>
    </footer>
  );
}
