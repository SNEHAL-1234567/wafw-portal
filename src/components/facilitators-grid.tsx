"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FacilitatorCard } from "@/components/facilitator-card";
import type { PublicFacilitator } from "@/lib/types";

export function FacilitatorsGrid({
  facilitators,
}: {
  facilitators: PublicFacilitator[];
}) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");

  const locations = useMemo(() => {
    const set = new Set(
      facilitators.map((f) => f.location).filter((v): v is string => !!v),
    );
    return Array.from(set).sort();
  }, [facilitators]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilitators.filter((f) => {
      const matchesQuery =
        !q ||
        f.full_name.toLowerCase().includes(q) ||
        f.short_bio?.toLowerCase().includes(q) ||
        f.facilitation_locations?.toLowerCase().includes(q);
      const matchesLocation = location === "all" || f.location === location;
      return matchesQuery && matchesLocation;
    });
  }, [facilitators, query, location]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, location, or bio..."
            className="w-full rounded-full border border-brand-ink/15 bg-white py-3 pl-11 pr-4 text-sm text-brand-ink placeholder:text-brand-ink/40 focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
        </div>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-full border border-brand-ink/15 bg-white px-4 py-3 text-sm text-brand-ink focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red sm:w-56"
        >
          <option value="all">All locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-sm text-brand-ink/50">
        {filtered.length} facilitator{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((f) => (
            <FacilitatorCard key={f.id} facilitator={f} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-brand-ink/50">
          No facilitators match your search.
        </p>
      )}
    </div>
  );
}
