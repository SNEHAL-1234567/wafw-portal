"use client";

import { useMemo, useOptimistic, useState, useTransition } from "react";
import Link from "next/link";
import { Eye, EyeOff, Pencil, Search, X } from "lucide-react";
import { setVisibilityAction } from "@/app/admin/actions";
import { FacilitatorAvatar } from "@/components/facilitator-avatar";
import { tidyLocation } from "@/lib/location";
import type { Facilitator, StatusLookup } from "@/lib/types";
import { cn } from "@/lib/utils";

const selectClass =
  "rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm text-brand-ink focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";

export function FacilitatorsTable({
  facilitators,
  statuses,
  initialVisibility,
  initialStatus,
  initialPhoto,
}: {
  facilitators: Facilitator[];
  statuses: StatusLookup[];
  initialVisibility?: string;
  initialStatus?: string;
  initialPhoto?: string;
}) {
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState(initialVisibility ?? "all");
  const [status, setStatus] = useState(initialStatus ?? "all");
  const [photo, setPhoto] = useState(initialPhoto ?? "all");
  const [, startTransition] = useTransition();

  // Instant feedback for the visibility toggle while the server saves.
  const [rows, setOptimistic] = useOptimistic(
    facilitators,
    (state, change: { id: string; isPublic: boolean }) =>
      state.map((f) => (f.id === change.id ? { ...f, is_public: change.isPublic } : f)),
  );

  const statusLabel = useMemo(
    () => new Map(statuses.map((s) => [s.code, s.label])),
    [statuses],
  );
  const statusOptions = useMemo(() => {
    const used = new Set(facilitators.map((f) => (f.status_code ?? "").trim()).filter(Boolean));
    return Array.from(used).sort();
  }, [facilitators]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((f) => {
      if (visibility === "visible" && !f.is_public) return false;
      if (visibility === "hidden" && f.is_public) return false;
      if (status !== "all" && (f.status_code ?? "").trim() !== status) return false;
      if (photo === "missing" && f.photo_path) return false;
      if (photo === "has" && !f.photo_path) return false;
      if (!q) return true;
      return (
        f.full_name.toLowerCase().includes(q) ||
        f.email?.toLowerCase().includes(q) ||
        f.location?.toLowerCase().includes(q)
      );
    });
  }, [rows, query, visibility, status, photo]);

  const filtersActive = query || visibility !== "all" || status !== "all" || photo !== "all";

  function toggle(f: Facilitator) {
    startTransition(async () => {
      setOptimistic({ id: f.id, isPublic: !f.is_public });
      await setVisibilityAction(f.id, !f.is_public);
    });
  }

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search</span>
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or location"
            className="w-full rounded-md border border-brand-line bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex">
          <select aria-label="Visibility" value={visibility} onChange={(e) => setVisibility(e.target.value)} className={selectClass}>
            <option value="all">All visibility</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
          <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="all">All statuses</option>
            {statusOptions.map((code) => (
              <option key={code} value={code}>
                {code} — {statusLabel.get(code) ?? "Other"}
              </option>
            ))}
          </select>
          <select aria-label="Photo" value={photo} onChange={(e) => setPhoto(e.target.value)} className={selectClass}>
            <option value="all">Any photo</option>
            <option value="has">Has photo</option>
            <option value="missing">No photo</option>
          </select>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-brand-ink/60">
        <p>
          Showing <strong className="text-brand-ink">{filtered.length}</strong> of {facilitators.length}
        </p>
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setVisibility("all");
              setStatus("all");
              setPhoto("all");
            }}
            className="inline-flex items-center gap-1 font-semibold text-brand-red hover:underline"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      <div className="mt-3 overflow-x-auto rounded-lg border border-brand-line bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-brand-line bg-brand-sand text-xs font-semibold uppercase tracking-wide text-brand-ink/55">
            <tr>
              <th className="px-4 py-3">Facilitator</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Public site</th>
              <th className="px-4 py-3 text-right">Edit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-line">
            {filtered.map((f) => {
              const code = (f.status_code ?? "").trim();
              return (
                <tr key={f.id} className="hover:bg-brand-sand/60">
                  <td className="px-4 py-3">
                    <Link href={`/admin/facilitators/${f.id}`} className="flex items-center gap-3">
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-brand-line">
                        <FacilitatorAvatar name={f.full_name} photoPath={f.photo_path} sizes="36px" textClassName="text-xs" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-brand-ink hover:text-brand-red">{f.full_name}</span>
                        {f.email && <span className="block truncate text-xs text-brand-ink/50">{f.email}</span>}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-brand-ink/70">{tidyLocation(f.location) ?? "—"}</td>
                  <td className="px-4 py-3">
                    {code ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="inline-flex min-w-9 justify-center rounded bg-brand-paper px-1.5 py-0.5 text-xs font-bold text-brand-ink/70">
                          {code}
                        </span>
                        <span className="text-brand-ink/70">{statusLabel.get(code) ?? ""}</span>
                      </span>
                    ) : (
                      <span className="text-brand-ink/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggle(f)}
                      title={f.is_public ? "Click to hide from the public site" : "Click to show on the public site"}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold transition-colors",
                        f.is_public
                          ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                          : "border-brand-line bg-white text-brand-ink/55 hover:border-brand-ink/30",
                      )}
                    >
                      {f.is_public ? <Eye size={13} /> : <EyeOff size={13} />}
                      {f.is_public ? "Visible" : "Hidden"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/facilitators/${f.id}`}
                      className="inline-flex rounded-md p-2 text-brand-ink/55 hover:bg-brand-sand hover:text-brand-red"
                      aria-label={`Edit ${f.full_name}`}
                    >
                      <Pencil size={16} />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-brand-ink/55">No facilitators match these filters.</p>
        )}
      </div>
    </div>
  );
}
