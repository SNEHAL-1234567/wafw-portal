import type { Metadata } from "next";
import { Building2, GraduationCap, Heart, Mail, Mic, UserRoundCheck } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { PhotoFrame } from "@/components/photo-frame";
import { Reveal } from "@/components/reveal";
import { Button, Card, Container, Heading, IconBadge, SectionHeader } from "@/components/ui";
import { getInvolved, mailto, photos } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Get Involved",
  description: getInvolved.intro,
};

const ROLE_ICONS = [UserRoundCheck, Mic, Building2];
const MORE_ICONS = [GraduationCap, Heart];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        name="Get Involved"
        title={getInvolved.tagline}
        description={getInvolved.intro}
        image={photos.facilitatorSession}
      />

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title={getInvolved.title} intro={getInvolved.intro} />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {getInvolved.roles.map((r, i) => {
              const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
              return (
                <Reveal key={r.title} delay={i * 0.06}>
                  <Card>
                    <IconBadge>
                      <Icon size={22} />
                    </IconBadge>
                    <Heading as="h3" size="md" className="mt-6">
                      {r.title}
                    </Heading>
                    <p className="mt-2 leading-relaxed text-brand-ink/70">{r.body}</p>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-y border-brand-line bg-brand-sand py-20 sm:py-28">
        <Container>
          <Reveal>
            <Heading>Contribute through connection</Heading>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal>
              <PhotoFrame photo={photos.openForum} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[4/3]" />
            </Reveal>
            <Reveal delay={0.05}>
              <PhotoFrame photo={photos.facilitatorSession} sizes="(max-width: 768px) 100vw, 640px" className="[&>div]:aspect-[4/3]" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <SectionHeader title="Choose how you can contribute" />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {getInvolved.more.map((m, i) => {
              const Icon = MORE_ICONS[i % MORE_ICONS.length];
              return (
                <Reveal key={m.title} delay={i * 0.06}>
                  <Card className="flex gap-5">
                    <IconBadge>
                      <Icon size={22} />
                    </IconBadge>
                    <div>
                      <Heading as="h3" size="md">
                        {m.title}
                      </Heading>
                      <p className="mt-2 leading-relaxed text-brand-ink/70">{m.body}</p>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-brand-charcoal py-16 text-white sm:py-20">
        <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Heading tone="dark">Start a conversation</Heading>
            <p className="mt-4 text-lg text-white/80">{getInvolved.start}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={mailto("WAFW volunteer or partnership inquiry")} variant="light" size="lg">
              <Mail size={18} /> Email WAFW
            </Button>
            <Button href="/donate" size="lg">
              Support WAFW
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
