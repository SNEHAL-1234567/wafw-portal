import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { FacilitatorsGrid } from "@/components/facilitators-grid";
import { getPublicFacilitators } from "@/lib/data/facilitators";

export const metadata: Metadata = {
  title: "Facilitators",
  description:
    "Meet the volunteer facilitators who deliver the WAFW leadership curriculum around the world.",
};

export const revalidate = 300;

export default async function FacilitatorsPage() {
  const facilitators = await getPublicFacilitators();

  return (
    <div className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            The Network
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-medium text-brand-ink sm:text-5xl">
            Meet the Facilitators
          </h1>
          <p className="mt-6 text-balance leading-relaxed text-brand-ink/70">
            Volunteers who&apos;ve completed their own facilitator training
            and now lead cohorts of women through the Academy&apos;s
            curriculum around the world.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-14 max-w-6xl">
        <FacilitatorsGrid facilitators={facilitators} />
      </div>
    </div>
  );
}
