import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Container, Eyebrow, Heading, SectionHeader } from "@/components/ui";
import { CtaSection } from "@/components/cta-section";
import { about, leadership, mission, org, photos } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

const HISTORY_LINKS = [
  { href: "/news-stories#historical-projects", label: "Projects from our history" },
  { href: "/news-stories#awards-recognition", label: "Recognition through the years" },
  { href: "/annual-womens-symposium#symposium-history", label: "From the symposium archive" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        name="About"
        title={about.title}
        description={about.intro}
        image={photos.jerrieSiteVisit}
      />

      {/* Our Story */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader title="Our Story" />
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-brand-ink/70">
              {about.story.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <PhotoFrame photo={photos.sias} sizes="(max-width: 1024px) 100vw, 600px" className="[&>div]:aspect-[3/2]" />
          </Reveal>
        </Container>
      </section>

      {/* Our Mission */}
      <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl border-l-4 border-brand-red pl-6 sm:pl-10">
            <Heading>Our Mission</Heading>
            <p className="mt-5 text-xl leading-relaxed text-brand-ink/80 sm:text-2xl">{mission}</p>
          </Reveal>
        </Container>
      </section>

      {/* Our Global Impact */}
      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="grid h-[360px] grid-cols-2 gap-3 sm:h-[440px]">
              <PhotoFrame photo={photos.whiteboard} sizes="(max-width: 1024px) 50vw, 300px" caption={false} />
              <div className="grid grid-rows-2 gap-3">
                <PhotoFrame photo={photos.classroomSession} sizes="(max-width: 1024px) 50vw, 300px" caption={false} />
                <PhotoFrame photo={photos.group} sizes="(max-width: 1024px) 50vw, 300px" caption={false} />
              </div>
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <SectionHeader title="Our Global Impact" intro={about.impact} />
          </Reveal>
        </Container>
      </section>

      {/* Our Founder */}
      <section className="bg-brand-charcoal py-20 text-white sm:py-28">
        <Container className="grid items-center gap-10 md:grid-cols-[300px_1fr] md:gap-14">
          <Reveal>
            <div className="relative aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-lg">
              <Image
                src={about.founderPhoto.src}
                alt={about.founderPhoto.alt}
                fill
                placeholder="blur"
                sizes="300px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <Eyebrow tone="dark">Our Founder</Eyebrow>
            <Heading tone="dark" className="mt-3">
              {org.founder}
            </Heading>
            <p className="mt-2 font-medium text-brand-amber">{org.founderTitle}</p>
            <p className="mt-6 text-lg leading-relaxed text-white/80">{about.founderBio}</p>
          </Reveal>
        </Container>
      </section>

      {/* Leadership */}
      <section id="leadership" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Our Leadership" title="Meet Our Leadership Team" intro={about.leadershipIntro} />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((person, i) => (
              <Reveal key={person.name} delay={(i % 3) * 0.05}>
                <article className="h-full overflow-hidden rounded-lg border border-brand-line bg-white">
                  <div className="relative aspect-[4/3] bg-brand-paper">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      placeholder="blur"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-brand-ink">{person.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-brand-red">{person.role}</p>
                    <p className="mt-3 text-[15px] leading-relaxed text-brand-ink/70">{person.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Explore our history */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <Reveal className="rounded-lg border border-brand-line bg-brand-sand p-8 sm:p-10">
            <Heading size="md">Explore our history</Heading>
            <p className="mt-2 text-brand-ink/70">
              Discover earlier Academy projects, recognition through the years, and a milestone from the
              symposium archive.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {HISTORY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center justify-between rounded-md border border-brand-line bg-white px-4 py-3.5 text-sm font-semibold text-brand-ink hover:border-brand-red hover:text-brand-red"
                  >
                    {l.label} <ArrowRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
