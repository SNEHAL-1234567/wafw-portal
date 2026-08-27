// Pure helpers safe to import from both Server and Client Components —
// no "server-only" or next/headers dependency here.

export function slugify(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function facilitatorPhotoUrl(photoPath: string | null) {
  if (!photoPath) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return `${base}/storage/v1/object/public/facilitator-photos/${photoPath}`;
}
