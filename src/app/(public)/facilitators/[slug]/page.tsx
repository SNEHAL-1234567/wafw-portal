import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getPublicFacilitatorBySlug } from "@/lib/data/facilitators";
import { facilitatorPhotoUrl } from "@/lib/photo-url";

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
      facilitator.short_bio ??
      `${facilitator.full_name}, WAFW facilitator${
        facilitator.location ? ` based in ${facilitator.location}` : ""
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

  const photoUrl = facilitatorPhotoUrl(facilitator.photo_path);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/facilitators"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink/60 hover:text-brand-red"
      >
        <ArrowLeft size={16} /> All facilitators
      </Link>

      <Reveal className="mt-8 grid gap-10 sm:grid-cols-[280px_1fr]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-brand-paper shadow-sm">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={facilitator.full_name}
              fill
              sizes="280px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-brand-ink/25">
              <Users size={48} />
            </div>
          )}
        </div>

        <div>
          <h1 className="text-balance font-serif text-3xl font-medium text-brand-ink sm:text-4xl">
            {facilitator.full_name}
          </h1>

          {facilitator.location && (
            <p className="mt-2 flex items-center gap-1.5 text-brand-ink/60">
              <MapPin size={16} /> {facilitator.location}
            </p>
          )}

          {facilitator.short_bio && (
            <p className="mt-6 text-balance leading-relaxed text-brand-ink/75">
              {facilitator.short_bio.trim()}
            </p>
          )}

          <dl className="mt-8 space-y-4 border-t border-brand-ink/10 pt-6">
            {facilitator.facilitation_locations && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-ink/45">
                  Facilitation Locations
                </dt>
                <dd className="mt-1 text-brand-ink/75">
                  {facilitator.facilitation_locations}
                </dd>
              </div>
            )}
            {facilitator.modules_facilitated && (
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-ink/45">
                  Modules Facilitated
                </dt>
                <dd className="mt-1 text-brand-ink/75">
                  {facilitator.modules_facilitated}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </Reveal>
    </div>
  );
}
