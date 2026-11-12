import Link from "next/link";
import { ArrowRight, Globe2, HeartHandshake, Sprout } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/photo-frame";
import { FacilitatorRow } from "@/components/facilitator-card";
import { Button, Card, Container, Heading, IconBadge, SectionHeader } from "@/components/ui";
import { facilitatorRole, home, photos, programCountries } from "@/lib/content/site-content";
import type { PublicFacilitator } from "@/lib/types";

const INTRO_ICONS = [Sprout, Globe2, HeartHandshake];

/** "Building leaders. Transforming communities." */
export function IntroSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeader title={home.intro.title} intro={home.intro.body} />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {home.intro.items.map((item, i) => {
            const Icon = INTRO_ICONS[i % INTRO_ICONS.length];
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <Card>
                  <IconBadge>
                    <Icon size={22} />
                  </IconBadge>
                  <Heading as="h3" size="md" className="mt-6">
                    {item.title}
                  </Heading>
                  <p className="mt-2 leading-relaxed text-brand-ink/70">{item.body}</p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/** "Leadership through action" */
export function ActionSection() {
  return (
    <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <PhotoFrame
            photo={photos.facilitatorSession}
            sizes="(max-width: 1024px) 100vw, 600px"
            className="[&>div]:aspect-[4/3]"
          />
        </Reveal>
        <Reveal delay={0.05}>
          <SectionHeader title={home.action.title} intro={home.action.body} />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/our-program">How the program works</Button>
            <Button href="/about#leadership" variant="outline">
              Meet our leadership team
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/** "From local leadership to global connection" */
export function GlobalSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeader title={home.global.title} intro={home.global.body} />
          <ul className="mt-8 flex flex-wrap gap-2">
            {programCountries.map((c) => (
              <li
                key={c}
                className="rounded-md border border-brand-line bg-white px-3.5 py-1.5 text-sm font-medium text-brand-ink"
              >
                {c}
              </li>
            ))}
          </ul>
          <Button href="/where-we-work" variant="secondary" className="mt-8">
            Discover where we work <ArrowRight size={16} />
          </Button>
        </Reveal>
        <Reveal delay={0.05}>
          <PhotoFrame
            photo={photos.karatina}
            sizes="(max-width: 1024px) 100vw, 600px"
            className="[&>div]:aspect-[4/3]"
          />
        </Reveal>
      </Container>
    </section>
  );
}

/** Short facilitator directory preview (from the database). */
export function FacilitatorsPreview({ facilitators }: { facilitators: PublicFacilitator[] }) {
  const preview = [
    ...facilitators.filter((f) => f.photo_path),
    ...facilitators.filter((f) => !f.photo_path),
  ].slice(0, 8);

  return (
    <section className="border-t border-brand-line bg-brand-sand py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader title="Our facilitators" intro={facilitatorRole} />
          <Link
            href="/facilitators"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-red hover:underline"
          >
            View all {facilitators.length} facilitators <ArrowRight size={16} />
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <ul className="mt-10 grid overflow-hidden rounded-lg border border-brand-line bg-white md:grid-cols-2 md:gap-x-px md:bg-brand-line">
            {preview.map((f) => (
              <li key={f.id} className="border-b border-brand-line bg-white">
                <FacilitatorRow facilitator={f} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
