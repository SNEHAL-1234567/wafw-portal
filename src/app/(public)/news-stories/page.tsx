import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Button, Card, Container, Heading, SectionHeader } from "@/components/ui";
import { contact, leadership, mailto, news, photos } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "News & Stories",
  description: news.intro,
};

// Each leadership journey on wafw.org is about one of these team members.
const JOURNEY_PEOPLE = ["Jessie Huang", "Ruth Anne Wood", "Karen Nair"];

function ExternalLink({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm font-semibold hover:underline ${dark ? "text-brand-amber" : "text-brand-red"}`}
    >
      {children} <ArrowUpRight size={15} />
    </a>
  );
}

export default function NewsPage() {
  const linkedin = contact.social.find((s) => s.label === "LinkedIn")!;
  return (
    <>
      <PageHero
        name="News & Stories"
        title={news.title}
        description={news.intro}
        image={photos.jerrieSpeaking}
        imagePosition="center 30%"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <Heading>Connecting with the next generation</Heading>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Reveal>
              <PhotoFrame photo={photos.jerrieSpeaking} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[3/2]" />
            </Reveal>
            <Reveal delay={0.05}>
              <PhotoFrame photo={photos.jerrieSiteVisit} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[3/2]" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <Heading>Leadership journeys</Heading>
            <Link href="/about#leadership" className="inline-flex items-center gap-1.5 font-semibold text-brand-red hover:underline">
              Meet our leadership team <ArrowRight size={16} />
            </Link>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.journeys.map((j, i) => {
              const person = leadership.find((l) => l.name === JOURNEY_PEOPLE[i]);
              return (
                <Reveal key={j.title} delay={i * 0.06}>
                  <Card>
                    {person && (
                      <div className="flex items-center gap-3">
                        <span className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image src={person.photo} alt={person.name} fill sizes="48px" placeholder="blur" className="object-cover object-top" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-brand-ink">{person.name}</span>
                          <span className="block text-xs text-brand-ink/60">{person.role}</span>
                        </span>
                      </div>
                    )}
                    <Heading as="h3" size="md" className="mt-6">
                      {j.title}
                    </Heading>
                    <p className="mt-2 leading-relaxed text-brand-ink/70">{j.body}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="historical-projects" className="scroll-mt-24 py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="From our project history" intro={news.projectsIntro} />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {news.projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Card className="flex flex-col">
                  {"kicker" in p && (
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-red">{p.kicker}</p>
                  )}
                  <Heading as="h3" size="md" className="mt-2">
                    {p.title}
                  </Heading>
                  <p className="mt-2 flex-1 leading-relaxed text-brand-ink/70">{p.body}</p>
                  <div className="mt-6 space-y-1.5 border-t border-brand-line pt-4">
                    <p className="text-xs text-brand-ink/55">{p.meta}</p>
                    <ExternalLink href={p.link.href}>{p.link.label}</ExternalLink>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="awards-recognition" className="scroll-mt-24 bg-brand-charcoal py-20 text-white sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader tone="dark" title="Recognition through the years" intro={news.awardsIntro} />
          </Reveal>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {news.awards.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.06}>
                <li className="flex h-full flex-col rounded-lg border border-white/15 p-7">
                  <p className="text-sm font-bold text-brand-amber">
                    {a.year} · {a.org}
                  </p>
                  <h3 className="mt-3 text-xl font-bold">{a.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-white/75">{a.body}</p>
                  <div className="mt-5">
                    <ExternalLink href={a.link.href} dark>
                      {a.link.label}
                    </ExternalLink>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card>
              <Heading size="md">Explore the Academy</Heading>
              <div className="mt-5 space-y-4 text-brand-ink/70">
                <p>
                  <strong className="text-brand-ink">Leadership in practice.</strong> Learn how facilitated
                  modules, mentoring, and community projects help participants turn purpose into action.
                </p>
                <p>
                  <strong className="text-brand-ink">An international community.</strong> Discover the
                  Academy’s university partnerships and connections across seven countries.
                </p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/our-program">Explore our program</Button>
                <Button href="/where-we-work" variant="outline">
                  Where we work
                </Button>
              </div>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card>
              <Heading size="md">Share your WAFW story</Heading>
              <p className="mt-5 text-brand-ink/70">{news.share}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={mailto("A story for the WAFW community")} variant="secondary">
                  <Mail size={16} /> Connect with the team
                </Button>
                <Button href={linkedin.href} variant="outline">
                  Follow WAFW on LinkedIn
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
