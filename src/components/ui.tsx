import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Shared, deliberately plain building blocks for the public site.

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-xs font-bold uppercase tracking-[0.14em]",
        tone === "light" ? "text-brand-red" : "text-brand-amber",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
  tone = "light",
  size = "lg",
  className,
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "text-balance font-bold tracking-[-0.02em]",
        size === "xl" && "text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1.08]",
        size === "lg" && "text-[clamp(1.75rem,3.6vw,2.625rem)] leading-[1.15]",
        size === "md" && "text-xl leading-snug sm:text-2xl",
        tone === "light" ? "text-brand-ink" : "text-white",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow + heading + optional intro paragraph. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone} className="mb-4">{eyebrow}</Eyebrow>}
      <Heading tone={tone}>{title}</Heading>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            tone === "light" ? "text-brand-ink/70" : "text-white/75",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline" | "outline-light" | "light";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-brand-red text-white hover:bg-brand-red-dark",
  secondary: "bg-brand-ink text-white hover:bg-brand-charcoal",
  outline: "border border-brand-ink/25 text-brand-ink hover:border-brand-ink hover:bg-brand-ink hover:text-white",
  "outline-light": "border border-white/40 text-white hover:bg-white hover:text-brand-ink",
  light: "bg-white text-brand-ink hover:bg-brand-sand",
};

/** Link styled as a button. External / mailto links render a plain <a>. */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-3 text-sm",
    size === "lg" && "px-6 py-3.5 text-base",
    BUTTON_STYLES[variant],
    className,
  );
  const external = /^(https?:|mailto:)/.test(href);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/** Plain bordered card. */
export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-lg border border-brand-line bg-white p-7 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small square icon badge in solid brand red. */
export function IconBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-red/10 text-brand-red">
      {children}
    </span>
  );
}
