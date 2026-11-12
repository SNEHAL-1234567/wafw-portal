import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Button, Container, Heading, SectionHeader } from "@/components/ui";
import { mailto, photos, programCountries, whereWeWork } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Where We Work",
  description: whereWeWork.intro,
};

export default function WhereWeWorkPage() {
  return (
    <>
      <PageHero
        name="Where We Work"
        title={whereWeWork.tagline}
        description={whereWeWork.intro}
        image={photos.karatina}
        imagePosition="center 60%"
      />

      {/* Local learning / Academies across borders */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow={whereWeWork.title}
              title={whereWeWork.networkTitle}
              intro={whereWeWork.networkBody}
            />
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="mt-10 grid grid-cols-2 overflow-hidden rounded-lg border border-brand-line sm:grid-cols-4 lg:grid-cols-7">
              {programCountries.map((c) => (
                <li
                  key={c}
                  className="border-b border-r border-brand-line bg-white px-5 py-5 text-center font-semibold text-brand-ink"
                >
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Campus connections */}
      <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <Heading>Campus connections</Heading>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <PhotoFrame photo={photos.karatina} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[4/3]" />
            </Reveal>
            <Reveal delay={0.05}>
              <PhotoFrame photo={photos.whiteboard} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[4/3]" />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Our roots and partnerships */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="Our roots and partnerships" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whereWeWork.roots.map((r, i) => (
              <Reveal key={r.country} delay={i * 0.06}>
                <div className="h-full rounded-lg border border-brand-line border-l-4 border-l-brand-red bg-white p-6">
                  <h3 className="text-xl font-bold text-brand-ink">{r.country}</h3>
                  <p className="mt-2 leading-relaxed text-brand-ink/70">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 max-w-3xl text-lg text-brand-ink/70">{whereWeWork.rootsOutro}</p>
          </Reveal>
        </Container>
      </section>

      {/* Connect with an Academy */}
      <section className="bg-brand-charcoal py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Heading tone="dark">Connect with an Academy</Heading>
            <p className="mt-4 text-lg text-white/80">{whereWeWork.connect}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={mailto("WAFW Academy location inquiry")} variant="light" size="lg">
              <Mail size={18} /> Ask about a location
            </Button>
            <Button href="/our-program" variant="outline-light" size="lg">
              Explore our program
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
