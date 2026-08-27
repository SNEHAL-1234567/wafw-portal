import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { modules, programCountries } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "The Program",
  description:
    "An eight-module leadership curriculum delivered over four-week cycles by trained volunteer facilitators.",
};

export default function ProgramPage() {
  return (
    <div className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            The Program
          </p>
          <h1 className="mt-4 text-balance font-serif text-4xl font-medium text-brand-ink sm:text-5xl">
            Eight modules, one transformation
          </h1>
          <p className="mt-6 text-balance leading-relaxed text-brand-ink/70">
            Each cohort moves through the curriculum in sequence over
            four-week cycles, guided throughout by a trained volunteer
            facilitator. The program has been delivered in{" "}
            {programCountries.join(", ")}.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-16 max-w-4xl space-y-4">
        {modules.map((mod, i) => (
          <Reveal key={mod.number} delay={i * 0.05}>
            <div className="flex gap-6 rounded-2xl border border-brand-ink/10 bg-white p-6 sm:p-8">
              <span className="shrink-0 font-serif text-4xl font-medium text-brand-gold sm:text-5xl">
                {String(mod.number).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-serif text-xl font-medium text-brand-ink">
                  {mod.title}
                </h2>
                <p className="mt-2 leading-relaxed text-brand-ink/65">
                  {mod.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
