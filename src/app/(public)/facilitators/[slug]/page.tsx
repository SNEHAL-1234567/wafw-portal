import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { FacilitatorAvatar } from "@/components/facilitator-avatar";
import { Button, Container } from "@/components/ui";
import { getPublicFacilitatorBySlug } from "@/lib/data/facilitators";
import { tidyLocation } from "@/lib/location";
import { statusLabel } from "@/lib/status";

export const revalidate = 300;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const facilitator = await getPublicFacilitatorBySlug(slug);
  if (!facilitator) return {};
  return {
    title: facilitator.full_name,
    description:
      facilitator.short_bio?.trim() ||
      `${facilitator.full_name}, WAFW facilitator${
        facilitator.location ? `, ${tidyLocation(facilitator.location)}` : ""
      }.`,
  };
}

export default async function FacilitatorDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const facilitator = await getPublicFacilitatorBySlug(slug);
  if (!facilitator) notFound();

  const label = statusLabel(facilitator.status_code);
  const location = tidyLocation(facilitator.location);
  const details = [
    { title: "Facilitation locations", value: facilitator.facilitation_locations },
    { title: "Facilitation dates", value: facilitator.facilitation_dates },
    { title: "Modules facilitated", value: facilitator.modules_facilitated },
  ].filter((d) => d.value?.trim());

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        <Link
          href="/facilitators"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink/70 hover:text-brand-red"
        >
          <ArrowLeft size={16} /> All facilitators
        </Link>

        <div className="mt-8 flex flex-col gap-6 border-b border-brand-line pb-8 sm:flex-row sm:items-center">
          <span className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-line">
            <FacilitatorAvatar
              name={facilitator.full_name}
              photoPath={facilitator.photo_path}
              sizes="112px"
              preload
              textClassName="text-3xl"
            />
          </span>
          <div>
            {label && (
              <span className="inline-block rounded-full border border-brand-line px-2.5 py-0.5 text-xs font-medium text-brand-ink/70">
                {label}
              </span>
            )}
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-brand-ink sm:text-4xl">
              {facilitator.full_name}
            </h1>
            {location && (
              <p className="mt-2 flex items-center gap-1.5 text-brand-ink/65">
                <MapPin size={16} /> {location}
              </p>
            )}
          </div>
        </div>

        {facilitator.short_bio?.trim() && (
          <p className="mt-8 text-lg leading-relaxed text-brand-ink/80">{facilitator.short_bio.trim()}</p>
        )}

        {details.length > 0 && (
          <dl className="mt-8 divide-y divide-brand-line rounded-lg border border-brand-line">
            {details.map((d) => (
              <div key={d.title} className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-brand-ink/60">{d.title}</dt>
                <dd className="text-brand-ink">{d.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-12 rounded-lg bg-brand-sand p-6 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <p className="font-semibold text-brand-ink">Interested in becoming a facilitator?</p>
          <Button href="/get-involved" className="mt-4 sm:mt-0">
            Get involved
          </Button>
        </div>
      </Container>
    </section>
  );
}
