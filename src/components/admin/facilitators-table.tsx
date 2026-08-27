"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Pencil, Trash2, Users } from "lucide-react";
import { facilitatorPhotoUrl } from "@/lib/photo-url";
import { deleteFacilitatorAction } from "@/app/admin/actions";
import type { Facilitator } from "@/lib/types";

export function FacilitatorsTable({
  facilitators,
}: {
  facilitators: Facilitator[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return facilitators;
    return facilitators.filter(
      (f) =>
        f.full_name.toLowerCase().includes(q) ||
        f.email?.toLowerCase().includes(q) ||
        f.location?.toLowerCase().includes(q),
    );
  }, [facilitators, query]);

  return (
    <div>
      <div className="relative max-w-sm">
        <Search
          size={17}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search facilitators..."
          className="w-full rounded-full border border-brand-ink/15 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-brand-ink/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-paper text-xs uppercase tracking-wide text-brand-ink/50">
            <tr>
              <th className="px-4 py-3 font-medium">Facilitator</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Public</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-ink/8">
            {filtered.map((f) => {
              const photoUrl = facilitatorPhotoUrl(f.photo_path);
              return (
                <tr key={f.id} className="hover:bg-brand-paper/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-brand-paper">
                        {photoUrl ? (
                          <Image
                            src={photoUrl}
                            alt=""
                            fill
                            sizes="36px"
                            className="object-cover"
                          />
                        ) : (
                          <Users
                            size={16}
                            className="absolute inset-0 m-auto text-brand-ink/30"
                          />
                        )}
                      </div>
                      <span className="font-medium text-brand-ink">
                        {f.full_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-brand-ink/65">
                    {f.location ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-brand-ink/65">
                    {f.status_code ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        f.is_public
                          ? "bg-green-100 text-green-700"
                          : "bg-brand-ink/10 text-brand-ink/50"
                      }`}
                    >
                      {f.is_public ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/facilitators/${f.id}`}
                        className="rounded-lg p-2 text-brand-ink/60 hover:bg-brand-paper hover:text-brand-red"
                        aria-label={`Edit ${f.full_name}`}
                      >
                        <Pencil size={16} />
                      </Link>
                      <form
                        action={deleteFacilitatorAction.bind(null, f.id)}
                        onSubmit={(e) => {
                          if (
                            !confirm(
                              `Delete ${f.full_name}? This can't be undone.`,
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <button
                          type="submit"
                          className="rounded-lg p-2 text-brand-ink/60 hover:bg-red-50 hover:text-brand-red"
                          aria-label={`Delete ${f.full_name}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-brand-ink/50">
            No facilitators match your search.
          </p>
        )}
      </div>
    </div>
  );
}
