// Sets which facilitators appear on the public site, based on the master
// Google Sheet. A facilitator is public when:
//   - Status is one of C, C/U, F, W
//   - "Certification Date, Location" is not blank
// Everyone else is hidden (is_public = false). Nobody is deleted.
//
// Usage:
//   node scripts/sync-public-facilitators.mjs <sheet-csv-url-or-file>          (dry run)
//   node scripts/sync-public-facilitators.mjs <sheet-csv-url-or-file> --apply  (write)
//
// For a Google Sheet tab, the CSV URL is:
//   https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<TAB_GID>
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";
import WS from "ws";

const PUBLIC_STATUSES = ["C", "C/U", "F", "W"];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const source = process.argv[2];
const apply = process.argv.includes("--apply");
if (!source || source.startsWith("--")) {
  console.error("Usage: node scripts/sync-public-facilitators.mjs <csv-url-or-file> [--apply]");
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i++;
        } else quoted = false;
      } else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (c !== "\r") cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

const normName = (s) => (s ?? "").toLowerCase().replace(/\s+/g, " ").trim();

const csvText = /^https?:\/\//.test(source)
  ? await (async () => {
      const res = await fetch(source);
      if (!res.ok) throw new Error(`Sheet download failed: HTTP ${res.status}`);
      return res.text();
    })()
  : await fs.readFile(source, "utf-8");

const rows = parseCsv(csvText);
const headerIdx = rows.findIndex((r) => r.some((c) => c.trim().startsWith("Name")));
if (headerIdx === -1) throw new Error("Could not find the header row (a column starting with 'Name').");
const header = rows[headerIdx].map((h) => h.trim());
const nameCol = header.findIndex((h) => h.startsWith("Name"));
const statusCol = header.findIndex((h) => h.startsWith("Status"));
const certCol = header.findIndex((h) => h.startsWith("Certification"));
if (nameCol < 0 || statusCol < 0 || certCol < 0) {
  throw new Error("Sheet is missing the Name / Status / Certification columns.");
}

const sheetRows = rows.slice(headerIdx + 1).filter((r) => (r[nameCol] ?? "").trim());
const publicNames = new Set(
  sheetRows
    .filter(
      (r) =>
        PUBLIC_STATUSES.includes((r[statusCol] ?? "").trim().toUpperCase()) &&
        (r[certCol] ?? "").trim() !== "",
    )
    .map((r) => normName(r[nameCol])),
);
console.log(`Sheet: ${sheetRows.length} facilitators, ${publicNames.size} match the public filter.`);

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WS },
});

const { data: dbRows, error } = await supabase
  .from("facilitators")
  .select("id, full_name, is_public, photo_path");
if (error) throw error;

const dbNames = new Set(dbRows.map((f) => normName(f.full_name)));
const missing = [...publicNames].filter((n) => !dbNames.has(n));
if (missing.length) {
  console.warn(`\nWARNING: ${missing.length} matching sheet names not found in the database:`);
  missing.forEach((n) => console.warn(`  - ${n}`));
}

const toShow = dbRows.filter((f) => publicNames.has(normName(f.full_name)) && !f.is_public);
const toHide = dbRows.filter((f) => !publicNames.has(normName(f.full_name)) && f.is_public);
const finalPublic = dbRows.filter((f) => publicNames.has(normName(f.full_name)));

console.log(`Database: ${dbRows.length} facilitators.`);
console.log(`  will show: ${toShow.length}`);
console.log(`  will hide: ${toHide.length}`);
console.log(
  `  public after sync: ${finalPublic.length} (${finalPublic.filter((f) => f.photo_path).length} with photos)`,
);

if (!apply) {
  console.log("\nDry run — nothing changed. Re-run with --apply to write.");
  process.exit(0);
}

const update = async (ids, value) => {
  for (let i = 0; i < ids.length; i += 100) {
    const { error: e } = await supabase
      .from("facilitators")
      .update({ is_public: value })
      .in("id", ids.slice(i, i + 100));
    if (e) throw e;
  }
};
await update(toHide.map((f) => f.id), false);
await update(toShow.map((f) => f.id), true);
console.log("\nApplied.");
