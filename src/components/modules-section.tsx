import { Reveal } from "@/components/reveal";
import { modules } from "@/lib/content/site-content";

export function ModulesSection() {
  return (
    <section className="bg-brand-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
            The Curriculum
          </p>
          <h2 className="mt-4 text-balance text-center font-serif text-3xl font-medium text-brand-ink sm:text-4xl">
            Eight modules, one transformation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-brand-ink/65">
            Delivered over four-week cycles by trained facilitators, each
            module builds on the last — from self-discovery to the legacy
            graduates leave for the next cohort.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((mod, i) => (
            <Reveal key={mod.number} delay={(i % 4) * 0.06}>
              <div className="group h-full rounded-2xl border border-brand-ink/10 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-brand-gold/10">
                <span className="font-serif text-3xl font-medium text-brand-gold">
                  {String(mod.number).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-base font-medium leading-snug text-brand-ink">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/60">
                  {mod.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
