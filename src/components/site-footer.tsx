import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { about, contact, org, programCountries } from "@/lib/content/site-content";

const COLUMNS = [
  {
    title: "About",
    links: [
      { href: "/about", label: "About WAFW" },
      { href: "/about#leadership", label: "Our Leadership" },
      { href: "/news-stories", label: "News & Stories" },
      { href: "/facilitators", label: "Facilitators" },
    ],
  },
  {
    title: "Our Program",
    links: [
      { href: "/our-program", label: "Our Program" },
      { href: "/where-we-work", label: "Where We Work" },
      { href: "/annual-womens-symposium", label: "Annual Women’s Symposium" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { href: "/get-involved", label: "Get Involved" },
      { href: "/donate", label: "Donate" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-night text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <div className="inline-flex rounded-md bg-white px-3 py-2">
              <Image
                src="/brand/wafw-logo.png"
                unoptimized
                alt={org.name}
                width={900}
                height={193}
                className="h-9 w-auto"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{about.intro}</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-brand-amber"
            >
              <Mail size={15} /> {contact.email}
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/15 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-white/55">Academies in {programCountries.join(", ")}</p>
          <ul className="flex gap-5">
            {contact.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} {org.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
