import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/photo-frame";
import { Button, Container } from "@/components/ui";
import { home, org, photos, programCountries } from "@/lib/content/site-content";

export function Hero({ facilitatorCount }: { facilitatorCount: number }) {
  const facts = [
    { value: String(org.founded), label: "Founded at Sias University" },
    { value: String(programCountries.length), label: "Countries" },
    { value: String(facilitatorCount), label: "Facilitators" },
  ];

  return (
    <section className="border-b border-brand-line bg-brand-sand">
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-red">
              {org.name}
            </p>
            <h1 className="mt-4 text-balance text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] text-brand-ink">
              {home.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-ink/70 sm:text-xl">
              {home.subhead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/our-program" size="lg">
                Explore our program <ArrowRight size={18} />
              </Button>
              <Button href="/get-involved" variant="outline" size="lg">
                Get involved
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 grid max-w-md grid-cols-3 border-t border-brand-line pt-6">
              {facts.map((f) => (
                <div key={f.label}>
                  <dd className="text-3xl font-bold text-brand-ink">{f.value}</dd>
                  <dt className="mt-1 text-sm leading-snug text-brand-ink/60">{f.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="grid h-[380px] grid-cols-3 grid-rows-2 gap-3 sm:h-[500px]">
            <PhotoFrame
              photo={photos.group}
              sizes="(max-width: 1024px) 66vw, 440px"
              preload
              caption={false}
              className="col-span-2 row-span-1"
            />
            <PhotoFrame
              photo={photos.classroomSession}
              sizes="(max-width: 1024px) 33vw, 220px"
              caption={false}
              className="row-span-1"
            />
            <PhotoFrame
              photo={photos.whiteboard}
              sizes="(max-width: 1024px) 33vw, 220px"
              caption={false}
              position="center 35%"
            />
            <PhotoFrame
              photo={photos.karatina}
              sizes="(max-width: 1024px) 66vw, 440px"
              caption={false}
              className="col-span-2"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
