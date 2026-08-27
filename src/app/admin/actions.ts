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
  full_name: z.string().trim().min(2, "Name is required"),
  status_code: z.string().trim().nullable(),
  location: z.string().trim().nullable(),
  mobile: z.string().trim().nullable(),
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
  return facilitatorSchema.parse(raw);
}

export type FormState = { error?: string; success?: boolean } | undefined;

export async function createFacilitatorAction(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  let parsed;
  try {
    parsed = readFacilitatorForm(formData);
  } catch {
    return { error: "Please check the form fields and try again." };
  }

  const photoPath = await handlePhotoUpload(formData);

  const input: FacilitatorInput = {
    ...parsed,
    slug: slugify(parsed.full_name),
    legacy_no: null,
    photo_path: photoPath,
  };

  const created = await adminCreateFacilitator(input);
  revalidatePath("/admin/facilitators");
  revalidatePath("/facilitators");
  redirect(`/admin/facilitators/${created.id}`);
}

export async function updateFacilitatorAction(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  let parsed;
  try {
    parsed = readFacilitatorForm(formData);
  } catch {
    return { error: "Please check the form fields and try again." };
  }

  const photoPath = await handlePhotoUpload(formData);

  await adminUpdateFacilitator(id, {
    ...parsed,
    ...(photoPath ? { photo_path: photoPath } : {}),
  });

  revalidatePath("/admin/facilitators");
  revalidatePath(`/admin/facilitators/${id}`);
  revalidatePath("/facilitators");
  return { success: true };
}

export async function deleteFacilitatorAction(id: string) {
  await requireAdmin();
  await adminDeleteFacilitator(id);
  revalidatePath("/admin/facilitators");
  revalidatePath("/facilitators");
  redirect("/admin/facilitators");
}

async function handlePhotoUpload(formData: FormData): Promise<string | null> {
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return null;

  const supabase = await createClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("facilitator-photos")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (error) throw error;
  return path;
}
