"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { FacilitatorRow } from "@/components/facilitator-card";
import { countryOf } from "@/lib/location";
import { statusLabel } from "@/lib/status";
import type { PublicFacilitator } from "@/lib/types";

/** Searchable facilitator directory shown as slim rows. */
export function FacilitatorsGrid({
  facilitators,
}: {
  facilitators: PublicFacilitator[];
}) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");

  const countries = useMemo(() => {
    const counts = new Map<string, number>();
    for (const f of facilitators) {
      const c = countryOf(f.location);
      if (c) counts.set(c, (counts.get(c) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [facilitators]);

  const statuses = useMemo(() => {
    const set = new Set(
      facilitators.map((f) => statusLabel(f.status_code)).filter((v): v is string => !!v),
    );
    return Array.from(set).sort();
  }, [facilitators]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilitators.filter((f) => {
      const matchesQuery =
        !q ||
        f.full_name.toLowerCase().includes(q) ||
        f.location?.toLowerCase().includes(q) ||
        countryOf(f.location)?.toLowerCase().includes(q);
      const matchesCountry = country === "all" || countryOf(f.location) === country;
      const matchesStatus = status === "all" || statusLabel(f.status_code) === status;
      return matchesQuery && matchesCountry && matchesStatus;
    });
  }, [facilitators, query, country, status]);

  const selectClass =
    "rounded-md border border-brand-line bg-white px-3 py-2.5 text-sm text-brand-ink focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search facilitators</span>
          <Search
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-ink/40"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or location"
            className="w-full rounded-md border border-brand-line bg-white py-2.5 pl-10 pr-10 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-brand-ink/40 hover:text-brand-ink"
            >
              <X size={16} />
            </button>
          )}
        </label>
        <label>
          <span className="sr-only">Country</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={`${selectClass} w-full sm:w-48`}>
            <option value="all">All countries</option>
            {countries.map(([c, n]) => (
              <option key={c} value={c}>
                {c} ({n})
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${selectClass} w-full sm:w-48`}>
            <option value="all">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-5 text-sm text-brand-ink/55">
        Showing {filtered.length} of {facilitators.length} facilitators
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-3 grid overflow-hidden rounded-lg border border-brand-line bg-white md:grid-cols-2 md:gap-x-px md:bg-brand-line">
          {filtered.map((f) => (
            <li key={f.id} className="border-b border-brand-line bg-white">
              <FacilitatorRow facilitator={f} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-3 rounded-lg border border-dashed border-brand-line py-16 text-center">
          <p className="text-brand-ink/55">No facilitators match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCountry("all");
              setStatus("all");
            }}
            className="mt-3 text-sm font-semibold text-brand-red hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
