"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { createClient } from "@/lib/supabase/server";
import {
  adminCreateFacilitator,
  adminDeleteFacilitator,
  adminUpdateFacilitator,
} from "@/lib/data/facilitators";
import { slugify } from "@/lib/photo-url";
import type { FacilitatorInput } from "@/lib/types";

export type LoginState = { error?: string } | undefined;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Invalid email or password." };
  }

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "This account is not authorized for admin access." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!admin) redirect("/admin/login");

  return supabase;
}

const facilitatorSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter the facilitator’s full name."),
  status_code: z.string().trim().nullable(),
  location: z.string().trim().nullable(),
  mobile: z.string().trim().nullable(),
  // Plain text: existing records hold notes like "DO NOT CONTACT" here.
  email: z.string().trim().nullable(),
  street_address: z.string().trim().nullable(),
  certification_info: z.string().trim().nullable(),
  facilitation_locations: z.string().trim().nullable(),
  facilitation_dates: z.string().trim().nullable(),
  modules_facilitated: z.string().trim().nullable(),
  attended_community_call: z.string().trim().nullable(),
  notes: z.string().trim().nullable(),
  short_bio: z.string().trim().nullable(),
  is_public: z.boolean(),
});

function readFacilitatorForm(formData: FormData) {
  const raw = {
    full_name: String(formData.get("full_name") ?? ""),
    status_code: (formData.get("status_code") as string) || null,
    location: (formData.get("location") as string) || null,
    mobile: (formData.get("mobile") as string) || null,
    email: (formData.get("email") as string) || null,
    street_address: (formData.get("street_address") as string) || null,
    certification_info: (formData.get("certification_info") as string) || null,
    facilitation_locations:
      (formData.get("facilitation_locations") as string) || null,
    facilitation_dates: (formData.get("facilitation_dates") as string) || null,
    modules_facilitated: (formData.get("modules_facilitated") as string) || null,
    attended_community_call:
      (formData.get("attended_community_call") as string) || null,
    notes: (formData.get("notes") as string) || null,
    short_bio: (formData.get("short_bio") as string) || null,
    is_public: formData.get("is_public") === "on",
  };
  return raw;
}

export type FormState = { error?: string; success?: boolean } | undefined;

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const PHOTO_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

class UserError extends Error {}

/** Refresh every page that shows facilitator data. */
function revalidateFacilitatorPages(id?: string) {
  revalidatePath("/admin", "layout");
  if (id) revalidatePath(`/admin/facilitators/${id}`);
  revalidatePath("/", "layout");
}

/** Slugs must be unique; add -2, -3… when a name is already taken. */
async function uniqueSlug(name: string, excludeId?: string) {
  const supabase = await createClient();
  const base = slugify(name) || "facilitator";
  const { data } = await supabase
    .from("facilitators")
    .select("id, slug")
    .like("slug", `${base}%`);
  const taken = new Set(
    (data ?? []).filter((r) => r.id !== excludeId).map((r) => r.slug),
  );
  if (!taken.has(base)) return base;
  for (let n = 2; ; n++) {
    if (!taken.has(`${base}-${n}`)) return `${base}-${n}`;
  }
}

function errorMessage(err: unknown) {
  if (err instanceof UserError) return err.message;
  console.error(err);
  return "Something went wrong while saving. Please try again.";
}

export async function createFacilitatorAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = facilitatorSchema.safeParse(readFacilitatorForm(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  let createdId: string;
  try {
    const photoPath = await handlePhotoUpload(formData);
    const input: FacilitatorInput = {
      ...parsed.data,
      slug: await uniqueSlug(parsed.data.full_name),
      legacy_no: null,
      photo_path: photoPath,
    };
    createdId = (await adminCreateFacilitator(input)).id;
  } catch (err) {
    return { error: errorMessage(err) };
  }

  revalidateFacilitatorPages(createdId);
  redirect(`/admin/facilitators/${createdId}?created=1`);
}

export async function updateFacilitatorAction(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = facilitatorSchema.safeParse(readFacilitatorForm(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check the form fields." };
  }

  try {
    const photoPath = await handlePhotoUpload(formData);
    const removePhoto = formData.get("remove_photo") === "on";
    await adminUpdateFacilitator(id, {
      ...parsed.data,
      ...(photoPath ? { photo_path: photoPath } : removePhoto ? { photo_path: null } : {}),
    });
  } catch (err) {
    return { error: errorMessage(err) };
  }

  revalidateFacilitatorPages(id);
  return { success: true };
}

/** One-click show/hide from the facilitators table. */
export async function setVisibilityAction(id: string, isPublic: boolean) {
  await requireAdmin();
  await adminUpdateFacilitator(id, { is_public: isPublic });
  revalidateFacilitatorPages(id);
}

export async function deleteFacilitatorAction(id: string) {
  await requireAdmin();
  await adminDeleteFacilitator(id);
  revalidateFacilitatorPages();
  redirect("/admin/facilitators");
}

async function handlePhotoUpload(formData: FormData): Promise<string | null> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return null;

  const ext = PHOTO_TYPES[file.type];
  if (!ext) throw new UserError("Photo must be a JPG, PNG or WebP image.");
  if (file.size > MAX_PHOTO_BYTES) throw new UserError("Photo must be 5 MB or smaller.");

  const supabase = await createClient();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("facilitator-photos")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw new UserError(`Photo upload failed: ${error.message}`);
  return path;
}
