import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Button, Card, Container, Heading, IconBadge, SectionHeader } from "@/components/ui";
import { modules, pathway, photos, pillars, program } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Our Program",
  description: program.intro,
};

const PILLAR_ICONS = [Compass, Users, MapPin];

export default function ProgramPage() {
  return (
    <>
      <PageHero
        name="Our Program"
        title={program.tagline}
        description={program.intro}
        image={photos.classroomActivity}
      />

      {/* Discover / Learning that becomes action */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow={program.title} title={program.actionTitle} intro={program.actionBody} />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pillars.map((p, i) => {
              const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <Card>
                    <IconBadge>
                      <Icon size={22} />
                    </IconBadge>
                    <Heading as="h3" size="md" className="mt-6">
                      {p.title}
                    </Heading>
                    <p className="mt-2 leading-relaxed text-brand-ink/70">{p.description}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Learning together */}
      <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Heading>Learning together</Heading>
            <Link
              href="/news-stories#historical-projects"
              className="inline-flex items-center gap-1.5 font-semibold text-brand-red hover:underline"
            >
              Explore earlier Academy projects <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <PhotoFrame photo={photos.classroomActivity} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[4/3]" />
            </Reveal>
            <Reveal delay={0.05}>
              <PhotoFrame photo={photos.classroomSession} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[4/3]" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* A pathway for growth */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="A pathway for growth" intro={program.pathwayIntro} />
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pathway.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <li className="h-full rounded-lg border border-brand-line border-t-4 border-t-brand-red bg-white p-6">
                  <p className="text-sm font-bold text-brand-red">
                    {p.step} · {p.verb}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-brand-ink">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-brand-ink/70">{p.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <p className="mt-8 max-w-3xl text-brand-ink/70">{program.mensAcademy}</p>
          </Reveal>
        </Container>
      </section>

      {/* Modules */}
      <section className="border-t border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="Facilitated modules" />
          </Reveal>
          <Reveal delay={0.05}>
            <ol className="mt-10 grid overflow-hidden rounded-lg border border-brand-line bg-white md:grid-cols-2 md:gap-x-px md:bg-brand-line">
              {modules.map((title, i) => (
                <li key={title} className="flex items-center gap-4 border-b border-brand-line bg-white px-5 py-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-red/10 text-sm font-bold text-brand-red">
                    {i + 1}
                  </span>
                  <span className="font-semibold text-brand-ink">{title}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>

      {/* Find your next step */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Heading>Find your next step</Heading>
            <p className="mt-5 text-lg leading-relaxed text-brand-ink/70">{program.nextStep}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/get-involved" size="lg">
                Get involved
              </Button>
              <Button href="/where-we-work" variant="outline" size="lg">
                Where we work
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
