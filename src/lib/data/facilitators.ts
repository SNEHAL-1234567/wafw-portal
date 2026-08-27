import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  Facilitator,
  FacilitatorInput,
  PublicFacilitator,
  StatusLookup,
} from "@/lib/types";

export async function getPublicFacilitators(): Promise<PublicFacilitator[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("public_facilitators")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getPublicFacilitatorBySlug(
  slug: string,
): Promise<PublicFacilitator | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("public_facilitators")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getStatusLookup(): Promise<StatusLookup[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("status_lookup").select("*");
  if (error) throw error;
  return data ?? [];
}

// ---- Admin-only (requires an authenticated admin session; RLS enforces it) ----

export async function adminListFacilitators(): Promise<Facilitator[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("facilitators")
    .select("*")
    .order("full_name", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function adminGetFacilitator(
  id: string,
): Promise<Facilitator | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("facilitators")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function adminCreateFacilitator(input: FacilitatorInput) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("facilitators")
    .insert(input)
    .select("id")
    .single();

  if (error) throw error;
  return data;
}

export async function adminUpdateFacilitator(
  id: string,
  input: Partial<FacilitatorInput>,
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("facilitators")
    .update(input)
    .eq("id", id);

  if (error) throw error;
}

export async function adminDeleteFacilitator(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("facilitators").delete().eq("id", id);
  if (error) throw error;
}

