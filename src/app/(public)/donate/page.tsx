import type { Metadata } from "next";
import { BookOpen, Heart, Mail, Network, Sprout } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Button, Card, Container, Heading, IconBadge, SectionHeader } from "@/components/ui";
import { contact, donate, mailto, photos } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Donate",
  description: donate.intro,
};

const ICONS = [BookOpen, Network, Sprout];

export default function DonatePage() {
  return (
    <>
      <PageHero name="Donate" title={donate.title} description={donate.intro} image={photos.group}>
        <Button href={contact.donateUrl} size="lg">
          <Heart size={18} /> Donate through PayPal
        </Button>
        <p className="mt-3 text-sm text-white/70">You’ll continue to PayPal to complete your donation.</p>
      </PageHero>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeader eyebrow={donate.tagline} title={donate.workTitle} intro={donate.workBody} />
          </Reveal>
          <Reveal delay={0.05}>
            <PhotoFrame photo={photos.classroomSession} sizes="(max-width: 1024px) 100vw, 600px" className="[&>div]:aspect-[3/2]" />
          </Reveal>
        </Container>
        <Container className="mt-14">
          <div className="grid gap-5 md:grid-cols-3">
            {donate.pillars.map((p, i) => {
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

      <section className="border-t border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <Card className="border-t-4 border-t-brand-red">
              <Heading size="md">Make a contribution</Heading>
              <p className="mt-3 text-brand-ink/70">{donate.contribute}</p>
              <Button href={contact.donateUrl} className="mt-6">
                <Heart size={16} /> Donate through PayPal
              </Button>
              <p className="mt-3 text-sm text-brand-ink/55">You’ll continue to PayPal to complete your donation.</p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card>
              <Heading size="md">Explore other ways to help</Heading>
              <p className="mt-3 text-brand-ink/70">{donate.other}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={mailto("Supporting WAFW")} variant="secondary">
                  <Mail size={16} /> Discuss giving with WAFW
                </Button>
                <Button href="/get-involved" variant="outline">
                  Volunteer your time
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
