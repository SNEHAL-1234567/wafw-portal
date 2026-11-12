import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui";
import type { Photo } from "@/lib/content/site-content";

/**
 * Inner-page banner: breadcrumb, page name, page heading and intro on a
 * photo with a flat dark overlay (or on plain charcoal when no photo).
 */
export function PageHero({
  name,
  title,
  description,
  image,
  imagePosition = "center",
  children,
}: {
  name: string;
  title: ReactNode;
  description?: ReactNode;
  image?: Photo;
  imagePosition?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-charcoal text-white">
      {image && (
        <>
          <Image
            src={image.src}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="-z-20 object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-brand-night/60" />
        </>
      )}
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-white/65">
          <Link href="/" className="hover:text-white hover:underline">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="text-white">{name}</span>
        </nav>
        <h1 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-brand-amber">
          {name}
        </h1>
        <p className="mt-3 max-w-3xl text-balance text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          {title}
        </p>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
