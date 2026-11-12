import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, FileText, HandHeart, Mail, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Button, Card, Container, Heading, IconBadge, SectionHeader } from "@/components/ui";
import { contact, mailto, photos, symposium } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Annual Women’s Symposium",
  description: symposium.intro,
};

const ICONS = [Sparkles, Users, HandHeart];

export default function SymposiumPage() {
  const linkedin = contact.social.find((s) => s.label === "LinkedIn")!;
  return (
    <>
      <PageHero
        name="Annual Women’s Symposium"
        title={symposium.tagline}
        description={symposium.intro}
        image={photos.openForum}
      />

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader title={symposium.commitmentTitle} intro={symposium.commitmentBody} />
          </Reveal>
          <Reveal delay={0.05}>
            <PhotoFrame photo={photos.openForum} sizes="(max-width: 1024px) 100vw, 600px" className="[&>div]:aspect-[4/3]" />
          </Reveal>
        </Container>
        <Container className="mt-14">
          <div className="grid gap-5 md:grid-cols-3">
            {symposium.pillars.map((p, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Reveal key={p.title} delay={i * 0.06}>
                  <Card>
                    <IconBadge>
                      <Icon size={22} />
                    </IconBadge>
                    <Heading as="h3" size="md" className="mt-6">
                      {p.title}
                    </Heading>
                    <p className="mt-2 leading-relaxed text-brand-ink/70">{p.body}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Archive */}
      <section id="symposium-history" className="scroll-mt-24 border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="From the symposium archive" />
          </Reveal>
          <Reveal delay={0.05}>
            <article className="mt-10 rounded-lg border border-brand-line bg-white p-8 sm:p-10">
              <p className="flex items-center gap-2 text-sm font-semibold text-brand-red">
                <CalendarDays size={16} /> {symposium.archive.date}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-brand-ink sm:text-3xl">{symposium.archive.title}</h3>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-brand-ink/70">{symposium.archive.body}</p>
              <Button href={symposium.archive.pdf} variant="secondary" className="mt-6">
                <FileText size={16} /> View the historical 2016 program (PDF)
              </Button>
            </article>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-brand-ink/70">
              Explore more of the Academy’s earlier initiatives and recognition in our community history.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/news-stories#historical-projects" className="inline-flex items-center gap-1.5 font-semibold text-brand-red hover:underline">
                Projects from our history <ArrowRight size={16} />
              </Link>
              <Link href="/news-stories#awards-recognition" className="inline-flex items-center gap-1.5 font-semibold text-brand-red hover:underline">
                Recognition through the years <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card>
              <Heading size="md">Ask about symposium opportunities</Heading>
              <p className="mt-3 text-brand-ink/70">{symposium.ask}</p>
              <Button href={mailto("Annual Women’s Symposium inquiry")} className="mt-6">
                <Mail size={16} /> Contact WAFW
              </Button>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card>
              <Heading size="md">Stay connected</Heading>
              <p className="mt-3 text-brand-ink/70">
                Follow WAFW’s established channels for community updates and announcements.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={linkedin.href} variant="secondary">
                  WAFW on LinkedIn
                </Button>
                <Button href="/news-stories" variant="outline">
                  Explore our community
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
