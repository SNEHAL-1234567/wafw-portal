// One-time setup: creates the first admin login for /admin.
// Usage: node scripts/create-admin.mjs [email]
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local.
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";
import WS from "ws";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const email = process.argv[2] || process.env.ADMIN_EMAIL;
if (!email) {
  console.error(
    "Usage: node scripts/create-admin.mjs you@example.com (or set ADMIN_EMAIL)",
  );
  process.exit(1);
}

const password = randomBytes(12).toString("base64url");

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
  realtime: { transport: WS },
});

const { data: created, error: createError } =
  await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

if (createError) {
  console.error("Failed to create user:", createError.message);
  process.exit(1);
}

const { error: adminError } = await supabase
  .from("admins")
  .upsert({ user_id: created.user.id, email });

if (adminError) {
  console.error("Failed to grant admin access:", adminError.message);
  process.exit(1);
}

console.log("\nAdmin account created.");
console.log("  URL:      /admin/login");
console.log("  Email:    ", email);
console.log("  Password: ", password);
console.log(
  "\nSave this password now — it will not be shown again. Change it after first login.\n",
);
