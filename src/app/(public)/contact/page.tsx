import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { facilitatorRole, org } from "@/lib/content/site-content";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Interested in facilitating, hosting a cohort, or partnering with WAFW? Here's how to reach us.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-red">
          Get Involved
        </p>
        <h1 className="mt-4 text-balance font-serif text-4xl font-medium text-brand-ink sm:text-5xl">
          Join the Academy
        </h1>
        <p className="mt-6 text-balance leading-relaxed text-brand-ink/70">
          {facilitatorRole} Whether you want to facilitate a cohort, host a
          program in your community, or support the Academy&apos;s work,
          we&apos;d love to hear from you.
        </p>
      </Reveal>

      <Reveal
        delay={0.1}
        className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-brand-ink/10 bg-brand-paper/60 p-8"
      >
        <div className="flex items-center gap-2 text-brand-ink/80">
          <Mail size={18} className="text-brand-red" />
          <span>Reach the {org.parent} team to get started</span>
        </div>
        <div className="flex items-center gap-2 text-brand-ink/60">
          <MapPin size={18} className="text-brand-red" />
          <span>{org.location}</span>
        </div>
      </Reveal>
    </div>
  );
}
