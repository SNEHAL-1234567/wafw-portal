import Link from "next/link";
import { ArrowRight, Camera, Eye, EyeOff, Plus, Users } from "lucide-react";
import { adminListFacilitators, getStatusLookup } from "@/lib/data/facilitators";
import { AdminPageHeader, adminButton } from "@/components/admin/page-header";
import { FacilitatorAvatar } from "@/components/facilitator-avatar";

export const metadata = { title: "Dashboard", robots: { index: false } };

export default async function AdminDashboardPage() {
  const [facilitators, statuses] = await Promise.all([
    adminListFacilitators(),
    getStatusLookup(),
  ]);
  const visible = facilitators.filter((f) => f.is_public);
  const withPhoto = facilitators.filter((f) => f.photo_path).length;
  const visibleNoPhoto = visible.filter((f) => !f.photo_path).length;

  const cards = [
    { label: "Total facilitators", value: facilitators.length, icon: Users, href: "/admin/facilitators" },
    { label: "Visible on public site", value: visible.length, icon: Eye, href: "/admin/facilitators?visibility=visible" },
    { label: "Hidden from public site", value: facilitators.length - visible.length, icon: EyeOff, href: "/admin/facilitators?visibility=hidden" },
    { label: "With a photo", value: withPhoto, icon: Camera, href: "/admin/facilitators" },
  ];

  const statusCounts = statuses
    .map((s) => ({ ...s, count: facilitators.filter((f) => (f.status_code ?? "").trim() === s.code).length }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  const recent = [...facilitators]
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 6);

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="Manage the facilitator records shown on the WAFW website."
        actions={
          <Link href="/admin/facilitators/new" className={adminButton.primary}>
            <Plus size={16} /> Add facilitator
          </Link>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-lg border border-brand-line bg-white p-5 transition-colors hover:border-brand-red/40"
          >
            <card.icon size={18} className="text-brand-red" />
            <p className="mt-3 text-3xl font-bold text-brand-ink">{card.value}</p>
            <p className="mt-1 text-sm text-brand-ink/60">{card.label}</p>
          </Link>
        ))}
      </div>

      {visibleNoPhoto > 0 && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
          <p>
            <strong>{visibleNoPhoto}</strong> of the {visible.length} visible facilitators have no photo yet. Their
            initials are shown instead.
          </p>
          <Link href="/admin/facilitators?visibility=visible&photo=missing" className="shrink-0 font-semibold underline">
            Show them
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-lg border border-brand-line bg-white">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <h2 className="font-bold text-brand-ink">Recently updated</h2>
            <Link href="/admin/facilitators" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
              All facilitators <ArrowRight size={15} />
            </Link>
          </div>
          <ul className="divide-y divide-brand-line">
            {recent.map((f) => (
              <li key={f.id}>
                <Link href={`/admin/facilitators/${f.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-brand-sand">
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-line">
                    <FacilitatorAvatar name={f.full_name} photoPath={f.photo_path} sizes="36px" textClassName="text-xs" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-brand-ink">{f.full_name}</span>
                    <span className="block text-xs text-brand-ink/50">
                      Updated {new Date(f.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </span>
                  <span className={`text-xs font-semibold ${f.is_public ? "text-green-700" : "text-brand-ink/45"}`}>
                    {f.is_public ? "Visible" : "Hidden"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-brand-line bg-white">
          <h2 className="border-b border-brand-line px-5 py-4 font-bold text-brand-ink">By status</h2>
          <ul className="divide-y divide-brand-line">
            {statusCounts.map((s) => (
              <li key={s.code}>
                <Link
                  href={`/admin/facilitators?status=${encodeURIComponent(s.code)}`}
                  className="flex items-center justify-between gap-3 px-5 py-3 text-sm hover:bg-brand-sand"
                >
                  <span>
                    <span className="mr-2 inline-flex min-w-9 justify-center rounded bg-brand-paper px-1.5 py-0.5 text-xs font-bold text-brand-ink/70">
                      {s.code}
                    </span>
                    <span className="text-brand-ink">{s.label}</span>
                  </span>
                  <span className="font-semibold text-brand-ink/70">{s.count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="border-t border-brand-line px-5 py-4 text-xs leading-relaxed text-brand-ink/55">
            Only records marked <strong>Visible</strong> appear on the public Facilitators page. Contact details,
            address and notes are never shown publicly.
          </p>
        </section>
      </div>
    </div>
  );
}
