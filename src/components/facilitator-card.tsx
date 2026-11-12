import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FacilitatorAvatar } from "@/components/facilitator-avatar";
import { statusLabel } from "@/lib/status";
import { tidyLocation } from "@/lib/location";
import type { PublicFacilitator } from "@/lib/types";

/** Slim one-line directory row: avatar · name · location · status · chevron. */
export function FacilitatorRow({ facilitator }: { facilitator: PublicFacilitator }) {
  const label = statusLabel(facilitator.status_code);
  const location = tidyLocation(facilitator.location);

  return (
    <Link
      href={`/facilitators/${facilitator.slug}`}
      className="group flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-brand-sand sm:px-5"
    >
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-line">
        <FacilitatorAvatar
          name={facilitator.full_name}
          photoPath={facilitator.photo_path}
          sizes="44px"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-brand-ink group-hover:text-brand-red">
          {facilitator.full_name}
        </span>
        {location && (
          <span className="block truncate text-sm text-brand-ink/55">{location}</span>
        )}
      </span>
      {label && (
        <span className="hidden shrink-0 rounded-full border border-brand-line px-2.5 py-0.5 text-xs font-medium text-brand-ink/65 sm:inline-block">
          {label}
        </span>
      )}
      <ChevronRight
        size={18}
        className="shrink-0 text-brand-ink/30 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red"
      />
    </Link>
  );
}
