// Facilitator locations are free text ("phoenix", "Munich Germany", "AZ").
// These helpers tidy them for display and group them by country for filters.

const COUNTRY_RULES: [RegExp, string][] = [
  [/\b(usa|united states|phoenix|arizona|az|colorado|colerado|portland)\b/i, "USA"],
  [/\b(uk|united kingdom|england|cambridge)\b/i, "UK"],
  [/germany|munich|berlin/i, "Germany"],
  [/canada/i, "Canada"],
  [/china/i, "China"],
  [/iran/i, "Iran"],
  [/sweden/i, "Sweden"],
  [/italy/i, "Italy"],
  [/france/i, "France"],
  [/thailand/i, "Thailand"],
  [/mexico/i, "Mexico"],
];

export function countryOf(location: string | null | undefined): string | null {
  if (!location?.trim()) return null;
  for (const [re, country] of COUNTRY_RULES) if (re.test(location)) return country;
  const last = location.split(/[,/]/).pop()!.trim();
  return last ? tidyLocation(last) : null;
}

/** Title-cases all-lowercase entries ("phoenix" → "Phoenix"); leaves others. */
export function tidyLocation(location: string | null | undefined): string | null {
  const s = location?.trim();
  if (!s) return null;
  if (s === s.toLowerCase()) return s.replace(/\b\p{L}/gu, (c) => c.toUpperCase());
  return s;
}
