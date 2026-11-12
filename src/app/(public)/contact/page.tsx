import type { Metadata } from "next";
import { Check, GraduationCap, HandHeart, Mail, Mic } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button, Card, Container, Heading, IconBadge, SectionHeader } from "@/components/ui";
import { contact, contactPage, mailto, photos } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.intro,
};

const START_ICONS = [GraduationCap, Mic, HandHeart];

export default function ContactPage() {
  return (
    <>
      <PageHero
        name="Contact"
        title={contactPage.tagline}
        description={contactPage.intro}
        image={photos.whiteboard}
        imagePosition="center 40%"
      />

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title={contactPage.title} />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <Card className="border-t-4 border-t-brand-red">
                <Heading as="h3" size="md">Contact WAFW</Heading>
                <a href={mailto()} className="mt-4 block break-all text-2xl font-bold text-brand-red hover:underline">
                  {contact.email}
                </a>
                <p className="mt-3 text-brand-ink/70">Tell us what brings you to WAFW and how we can help.</p>
                <Button href={mailto()} className="mt-6">
                  <Mail size={16} /> Send an email
                </Button>
              </Card>
            </Reveal>
            <Reveal delay={0.05}>
              <Card>
                <Heading as="h3" size="md">What to include</Heading>
                <ul className="mt-5 space-y-3">
                  {contactPage.include.map((item) => (
                    <li key={item} className="flex gap-3 text-brand-ink/75">
                      <Check size={18} className="mt-0.5 shrink-0 text-brand-red" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-brand-line pt-4 text-sm text-brand-ink/65">{contactPage.includeNote}</p>
              </Card>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="Find the right starting point" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {contactPage.starting.map((s, i) => {
              const Icon = START_ICONS[i % START_ICONS.length];
              return (
                <Reveal key={s.title} delay={i * 0.06}>
                  <Card>
                    <IconBadge>
                      <Icon size={22} />
                    </IconBadge>
                    <Heading as="h3" size="md" className="mt-6">
                      {s.title}
                    </Heading>
                    <p className="mt-2 leading-relaxed text-brand-ink/70">{s.body}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Reveal>
            <Heading>Follow the WAFW community</Heading>
            <p className="mt-3 text-lg text-brand-ink/70">
              Discover more from the Academy through our established social channels.
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            {contact.social.map((s) => (
              <Button key={s.label} href={s.href} variant="outline">
                {s.label}
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
