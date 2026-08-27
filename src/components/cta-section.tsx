import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { facilitatorRole } from "@/lib/content/site-content";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            Get Involved
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-medium text-brand-ink sm:text-4xl">
            Become a facilitator
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-balance leading-relaxed text-brand-ink/70">
            {facilitatorRole}
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-brand-red px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-red/25 transition-transform hover:scale-105"
            >
              Reach Out to Us
            </Link>
            <Link
              href="/program"
              className="rounded-full border border-brand-ink/20 px-8 py-3.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-paper"
            >
              Learn About the Program
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
