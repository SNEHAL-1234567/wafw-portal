import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

export function AdminPageHeader({
  title,
  description,
  back,
  actions,
}: {
  title: ReactNode;
  description?: ReactNode;
  back?: { href: string; label: string };
  actions?: ReactNode;
}) {
  return (
    <div className="border-b border-brand-line pb-6">
      {back && (
        <Link
          href={back.href}
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink/60 hover:text-brand-red"
        >
          <ArrowLeft size={16} /> {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-[-0.01em] text-brand-ink sm:text-3xl">{title}</h1>
          {description && <p className="mt-1.5 text-brand-ink/60">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export const adminButton = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-md bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:opacity-60",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-md border border-brand-line bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-ink/30 disabled:opacity-60",
  danger:
    "inline-flex items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-red-dark transition-colors hover:bg-red-50",
};

export const adminInput =
  "mt-1.5 w-full rounded-md border border-brand-line bg-white px-3.5 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/35 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";
