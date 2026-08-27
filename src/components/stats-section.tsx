import { Reveal } from "@/components/reveal";
import { CountUp } from "@/components/count-up";
import { modules, programCountries } from "@/lib/content/site-content";

export function StatsSection({
  facilitatorCount,
  countryCount,
}: {
  facilitatorCount: number;
  countryCount: number;
}) {
  const stats = [
    { value: facilitatorCount, suffix: "+", label: "Trained facilitators" },
    { value: programCountries.length, label: "Program countries" },
    { value: countryCount, suffix: "+", label: "Facilitator home countries" },
    { value: modules.length, label: "Curriculum modules" },
  ];

  return (
    <section className="relative overflow-hidden bg-brand-charcoal py-20 text-brand-cream">
      <div className="absolute inset-0 brand-gradient opacity-[0.08]" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 sm:px-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="text-center">
            <div className="font-serif text-4xl font-medium text-brand-amber sm:text-5xl">
              <CountUp value={stat.value} suffix={stat.suffix ?? ""} />
            </div>
            <p className="mt-2 text-sm text-brand-cream/65">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
