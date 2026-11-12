import { Button, Container } from "@/components/ui";
import { home } from "@/lib/content/site-content";

/** "Be part of the change" closing call to action (wafw.org home). */
export function CtaSection() {
  return (
    <section className="bg-brand-red text-white">
      <Container className="flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-bold leading-tight tracking-[-0.02em]">
            {home.cta.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/85">{home.cta.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href="/get-involved" variant="light" size="lg">
            Get involved
          </Button>
          <Button href="/donate" variant="outline-light" size="lg">
            Support our mission
          </Button>
        </div>
      </Container>
    </section>
  );
}
