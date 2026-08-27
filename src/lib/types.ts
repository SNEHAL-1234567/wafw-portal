export type StatusCode = string;

export interface StatusLookup {
  code: StatusCode;
  label: string;
  description: string | null;
}

/** Public-safe facilitator fields — mirrors the public.public_facilitators view. No PII. */
export interface PublicFacilitator {
  id: string;
  slug: string;
  full_name: string;
  location: string | null;
  status_code: StatusCode | null;
  facilitation_locations: string | null;
  facilitation_dates: string | null;
  modules_facilitated: string | null;
  short_bio: string | null;
  photo_path: string | null;
  created_at: string;
}

/** Full record, admin-only — mirrors public.facilitators. */
export interface Facilitator extends PublicFacilitator {
  legacy_no: number | null;
  mobile: string | null;
  email: string | null;
  street_address: string | null;
  certification_info: string | null;
  attended_community_call: string | null;
  notes: string | null;
  is_public: boolean;
  updated_at: string;
}

export type FacilitatorInput = Omit<
  Facilitator,
  "id" | "created_at" | "updated_at"
>;
