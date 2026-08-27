import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { FacilitatorCard } from "@/components/facilitator-card";
import type { PublicFacilitator } from "@/lib/types";

export function FacilitatorsPreview({
  facilitators,
}: {
  facilitators: PublicFacilitator[];
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            The Network
          </p>
          <h2 className="mt-4 text-balance font-serif text-3xl font-medium text-brand-ink sm:text-4xl">
            Led by women who&apos;ve lived it
          </h2>
        </div>
        <Link
          href="/facilitators"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red hover:underline"
        >
          View all facilitators <ArrowRight size={16} />
        </Link>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {facilitators.map((f, i) => (
          <Reveal key={f.id} delay={(i % 4) * 0.06}>
            <FacilitatorCard facilitator={f} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
