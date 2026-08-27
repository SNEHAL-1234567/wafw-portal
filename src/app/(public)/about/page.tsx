import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { mission, org, pillars, facilitatorRole } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "WAFW is an initiative of Global Interactions, Inc. — learn about our mission, our founder, and how the Academy works.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          About Us
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl font-medium text-brand-ink sm:text-5xl">
          {org.name}
        </h1>
        <p className="mt-6 text-balance text-lg leading-relaxed text-brand-ink/75">
          {mission}
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <h2 className="font-serif text-2xl font-medium text-brand-ink">
          An initiative of {org.parent}
        </h2>
        <p className="mt-4 leading-relaxed text-brand-ink/70">
          {org.name} was founded by {org.founder}, {org.founderTitle},
          as a program of {org.parent}, a {org.taxStatus} headquartered in{" "}
          {org.location}. What began as a single cohort has grown into a
          worldwide community of trained volunteer facilitators delivering
          the Academy&apos;s eight-module leadership curriculum to women
          across multiple countries.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-16">
        <h2 className="font-serif text-2xl font-medium text-brand-ink">
          How the Academy works
        </h2>
        <p className="mt-4 leading-relaxed text-brand-ink/70">
          Each cohort moves through eight sequential, four-week modules —
          from self-discovery to building a personal plan, resolving
          conflict, presenting with confidence, and ultimately recruiting
          and mentoring the next generation of members. {facilitatorRole}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-brand-ink/10 bg-brand-paper/60 p-6">
              <h3 className="font-serif text-lg font-medium text-brand-ink">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/65">
                {pillar.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
