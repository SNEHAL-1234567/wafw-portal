import Image from "next/image";
import { facilitatorPhotoUrl } from "@/lib/photo-url";
import { cn } from "@/lib/utils";

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/**
 * Facilitator photo, or plain initials on a neutral background when there is
 * no photo. Fills its (relatively positioned) parent.
 */
export function FacilitatorAvatar({
  name,
  photoPath,
  sizes,
  className,
  textClassName,
  preload,
}: {
  name: string;
  photoPath: string | null;
  sizes: string;
  className?: string;
  textClassName?: string;
  preload?: boolean;
}) {
  const url = facilitatorPhotoUrl(photoPath);
  if (url) {
    // Stored photos are small thumbnails (a few KB), so they are served as-is
    // rather than through the optimizer. This also avoids Next 16 rejecting
    // the Supabase host on networks that resolve it to NAT64 addresses.
    return (
      <Image
        src={url}
        alt={name}
        fill
        unoptimized
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-brand-paper text-brand-ink/55",
        className,
      )}
    >
      <span className={cn("font-semibold", textClassName ?? "text-sm")}>
        {initials(name)}
      </span>
    </div>
  );
}
