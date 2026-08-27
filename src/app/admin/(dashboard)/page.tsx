import Link from "next/link";
import { Users, Eye, EyeOff, Plus } from "lucide-react";
import { adminListFacilitators } from "@/lib/data/facilitators";

export const metadata = { title: "Dashboard", robots: { index: false } };

export default async function AdminDashboardPage() {
  const facilitators = await adminListFacilitators();
  const publicCount = facilitators.filter((f) => f.is_public).length;
  const withPhoto = facilitators.filter((f) => f.photo_path).length;

  const cards = [
    { label: "Total facilitators", value: facilitators.length, icon: Users },
    { label: "Visible on public site", value: publicCount, icon: Eye },
    {
      label: "Hidden from public site",
      value: facilitators.length - publicCount,
      icon: EyeOff,
    },
    { label: "With a photo", value: withPhoto, icon: Users },
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-medium text-brand-ink">
          Dashboard
        </h1>
        <Link
          href="/admin/facilitators/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Facilitator
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-brand-ink/10 bg-white p-5"
          >
            <card.icon size={18} className="text-brand-red" />
            <p className="mt-3 text-3xl font-semibold text-brand-ink">
              {card.value}
            </p>
            <p className="mt-1 text-sm text-brand-ink/55">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-brand-ink/10 bg-white p-6">
        <h2 className="font-serif text-lg font-medium text-brand-ink">
          Manage records
        </h2>
        <p className="mt-1 text-sm text-brand-ink/60">
          Add, edit, or remove facilitator records — and control
          what&apos;s visible on the public site.
        </p>
        <Link
          href="/admin/facilitators"
          className="mt-4 inline-block text-sm font-semibold text-brand-red hover:underline"
        >
          Go to Facilitators &rarr;
        </Link>
      </div>
    </div>
  );
}
