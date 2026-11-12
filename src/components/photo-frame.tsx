import Image from "next/image";
import type { Photo } from "@/lib/content/site-content";
import { cn } from "@/lib/utils";

/** Photo that fills its box, with an optional caption below. */
export function PhotoFrame({
  photo,
  sizes,
  className,
  position,
  preload,
  caption = true,
  captionClassName,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  position?: string;
  preload?: boolean;
  caption?: boolean;
  captionClassName?: string;
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-brand-paper">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder="blur"
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
      {caption && photo.caption && (
        <figcaption
          className={cn("mt-2.5 text-xs leading-relaxed text-brand-ink/55", captionClassName)}
        >
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
}
