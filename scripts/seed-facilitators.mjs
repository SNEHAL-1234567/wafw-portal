// One-time data migration: loads source-data/facilitators_seed.json and the
// extracted facilitator photos into Supabase (storage + facilitators table).
// Safe to re-run — upserts by slug, uploads use upsert:true.
// Usage: node scripts/seed-facilitators.mjs
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import WS from "ws";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
config({ path: path.join(root, ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WS },
});

const facilitators = JSON.parse(
  await fs.readFile(
    path.join(root, "source-data", "facilitators_seed.json"),
    "utf-8",
  ),
);
const statusLookup = JSON.parse(
  await fs.readFile(
    path.join(root, "source-data", "status_lookup_seed.json"),
    "utf-8",
  ),
);
const photosDir = path.join(root, "source-data", "facilitator_photos");

console.log(`Seeding ${statusLookup.length} status codes...`);
const { error: statusError } = await supabase
  .from("status_lookup")
  .upsert(statusLookup, { onConflict: "code" });
if (statusError) {
  console.error("Status lookup seed failed:", statusError.message);
  process.exit(1);
}

console.log(`Seeding ${facilitators.length} facilitators...`);
let uploaded = 0;
let failed = 0;

for (const f of facilitators) {
  let photoPath = null;

  if (f.photo_file) {
    const ext = path.extname(f.photo_file) || ".jpg";
    const storagePath = `${f.slug}${ext}`;
    const bytes = await fs.readFile(path.join(photosDir, f.photo_file));
    const { error: uploadError } = await supabase.storage
      .from("facilitator-photos")
      .upload(storagePath, bytes, {
        contentType: ext === ".png" ? "image/png" : "image/jpeg",
        upsert: true,
      });
    if (uploadError) {
      console.warn(`  photo upload failed for ${f.full_name}:`, uploadError.message);
    } else {
      photoPath = storagePath;
      uploaded++;
    }
  }

  const { error: insertError } = await supabase.from("facilitators").upsert(
    {
      legacy_no: f.legacy_no,
      full_name: f.full_name,
      slug: f.slug,
      status_code: f.status_code,
      location: f.location,
      mobile: f.mobile,
      email: f.email,
      street_address: f.street_address,
      certification_info: f.certification_info,
      facilitation_locations: f.facilitation_locations,
      facilitation_dates: f.facilitation_dates,
      modules_facilitated: f.modules_facilitated,
      attended_community_call: f.attended_community_call,
      notes: f.notes,
      short_bio: f.short_bio,
      photo_path: photoPath,
      is_public: true,
    },
    { onConflict: "slug" },
  );

  if (insertError) {
    console.warn(`  insert failed for ${f.full_name}:`, insertError.message);
    failed++;
  }
}

console.log(
  `\nDone. ${facilitators.length} facilitators processed, ${uploaded} photos uploaded, ${failed} failures.\n`,
);
