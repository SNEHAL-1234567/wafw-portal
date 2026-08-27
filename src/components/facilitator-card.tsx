import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { facilitatorPhotoUrl } from "@/lib/photo-url";
import type { PublicFacilitator } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  F: "Active Facilitator",
  C: "Certified",
  W: "Facilitator Alum",
};

export function FacilitatorCard({
  facilitator,
}: {
  facilitator: PublicFacilitator;
}) {
  const photoUrl = facilitatorPhotoUrl(facilitator.photo_path);
  const statusLabel = facilitator.status_code
    ? STATUS_LABELS[facilitator.status_code]
    : null;

  return (
    <Link
      href={`/facilitators/${facilitator.slug}`}
      className="group block overflow-hidden rounded-2xl border border-brand-ink/10 bg-white/70 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-gold/10"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-paper">
        {photoUrl ? (
          <Image
            src={photoUrl}
            alt={facilitator.full_name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-brand-ink/25">
            <Users size={40} />
          </div>
        )}
        {statusLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-charcoal/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-amber backdrop-blur-sm">
            {statusLabel}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-medium text-brand-ink">
          {facilitator.full_name}
        </h3>
        {facilitator.location && (
          <p className="mt-0.5 text-sm text-brand-ink/55">
            {facilitator.location}
          </p>
        )}
        {facilitator.short_bio && (
          <p className="mt-2 line-clamp-2 text-sm text-brand-ink/70">
            {facilitator.short_bio.trim()}
          </p>
        )}
      </div>
    </Link>
  );
}
