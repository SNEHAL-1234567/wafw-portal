"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { tagline } from "@/lib/content/site-content";

export function HeroScroll({ photoUrls }: { photoUrls: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const width = useTransform(scrollYProgress, [0, 0.6], ["78%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.6], ["58vh", "100vh"]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [32, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], [0, -40]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const tiles = photoUrls.slice(0, 24);

  return (
    <section ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-brand-charcoal">
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="relative overflow-hidden shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute inset-0 grid grid-cols-4 gap-1 sm:grid-cols-6 md:grid-cols-8">
            {(tiles.length ? tiles : Array.from({ length: 16 })).map(
              (url, i) => (
                <div key={i} className="relative bg-brand-ink/40">
                  {typeof url === "string" && (
                    <Image
                      src={url}
                      alt=""
                      fill
                      sizes="12vw"
                      className="object-cover grayscale-[35%]"
                      priority={i < 8}
                    />
                  )}
                </div>
              ),
            )}
          </div>

          <div className="absolute inset-0 brand-gradient mix-blend-multiply opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/25 to-brand-charcoal/50" />

          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-amber">
              World Academy for the Future of Women
            </p>
            <h1 className="max-w-4xl text-balance font-serif text-4xl font-medium leading-[1.1] text-white sm:text-6xl md:text-7xl">
              {tagline}
            </h1>
            <p className="mt-6 max-w-xl text-balance text-base text-white/80 sm:text-lg">
              A global leadership program for women, delivered by volunteer
              facilitators who&apos;ve lived the journey themselves.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/program"
                className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-red/30 transition-transform hover:scale-105"
              >
                Explore the Program
              </Link>
              <Link
                href="/facilitators"
                className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Meet the Facilitators
              </Link>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: cueOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          >
            <span className="mb-1 block text-center text-[10px] font-medium uppercase tracking-[0.3em]">
              Scroll
            </span>
            <ChevronDown className="mx-auto animate-bounce" size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
