import { Reveal } from "@/components/reveal";
import { mission, pillars } from "@/lib/content/site-content";

export function MissionSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          Our Mission
        </p>
        <p className="mt-6 text-balance text-center font-serif text-2xl leading-snug text-brand-ink sm:text-3xl md:text-4xl">
          {mission}
        </p>
      </Reveal>

      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-brand-ink/10 bg-white/60 p-6">
              <span className="mb-3 block h-9 w-9 rounded-full brand-gradient" />
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
    </section>
  );
}
