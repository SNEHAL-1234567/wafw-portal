"use client";

import { startTransition, useActionState, useState } from "react";
import { Camera, CheckCircle2, Users } from "lucide-react";
import type { FormState } from "@/app/admin/actions";
import type { Facilitator, StatusLookup } from "@/lib/types";
import { facilitatorPhotoUrl } from "@/lib/photo-url";
import { adminButton, adminInput } from "@/components/admin/page-header";

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

const FIELD_GROUPS: {
  title: string;
  description: string;
  fields: { name: keyof Facilitator; label: string; type?: "textarea"; placeholder?: string }[];
}[] = [
  {
    title: "Public profile",
    description: "Shown on the public website when the facilitator is visible.",
    fields: [
      { name: "location", label: "Location", placeholder: "e.g. Munich, Germany" },
      { name: "facilitation_locations", label: "Facilitation location(s)", placeholder: "e.g. China, Mexico" },
      { name: "facilitation_dates", label: "Facilitation date(s)" },
      { name: "modules_facilitated", label: "Modules facilitated" },
      { name: "short_bio", label: "Short bio", type: "textarea" },
    ],
  },
  {
    title: "Private details",
    description: "For the WAFW team only. Never shown on the public website.",
    fields: [
      { name: "email", label: "Email" },
      { name: "mobile", label: "Mobile" },
      { name: "street_address", label: "Street address" },
      { name: "certification_info", label: "Certification date, location" },
      { name: "attended_community_call", label: "Attended community call" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
];

const MAX_PHOTO_MB = 5;

export function FacilitatorForm({
  action,
  facilitator,
  statusOptions,
  justCreated,
}: {
  action: Action;
  facilitator?: Facilitator;
  statusOptions: StatusLookup[];
  justCreated?: boolean;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, undefined);
  const existingPhoto = facilitatorPhotoUrl(facilitator?.photo_path ?? null);
  const [preview, setPreview] = useState<string | null>(existingPhoto);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const currentStatus = (facilitator?.status_code ?? "").trim();
  const statuses = statusOptions.filter((s) => s.code !== "Blank");
  const statusKnown = !currentStatus || statuses.some((s) => s.code === currentStatus);

  return (
    <form
      className="space-y-6 pb-24"
      onSubmit={(e) => {
        // Submit manually so React does not reset the fields afterwards —
        // otherwise a validation error would wipe what the admin typed.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
    >
      {(justCreated || state?.success) && (
        <p className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          <CheckCircle2 size={17} /> {justCreated && !state ? "Facilitator added." : "Changes saved."}
        </p>
      )}

      {/* Basics */}
      <section className="rounded-lg border border-brand-line bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex shrink-0 flex-col items-center gap-3">
            <div className="relative h-28 w-28 overflow-hidden rounded-full bg-brand-paper ring-1 ring-brand-line">
              {preview && !removePhoto ? (
                // eslint-disable-next-line @next/next/no-img-element -- local blob previews and small storage thumbnails
                <img src={preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <Users size={32} className="absolute inset-0 m-auto text-brand-ink/25" />
              )}
            </div>
            <label className={`${adminButton.secondary} cursor-pointer px-3 py-1.5 text-xs`}>
              <Camera size={14} /> {existingPhoto ? "Change photo" : "Add photo"}
              <input
                type="file"
                name="photo"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setPhotoError(null);
                  if (!file) return;
                  if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
                    setPhotoError(`Photo must be ${MAX_PHOTO_MB} MB or smaller.`);
                    e.target.value = "";
                    return;
                  }
                  setRemovePhoto(false);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            </label>
            {existingPhoto && (
              <label className="flex items-center gap-1.5 text-xs text-brand-ink/60">
                <input
                  type="checkbox"
                  name="remove_photo"
                  checked={removePhoto}
                  onChange={(e) => setRemovePhoto(e.target.checked)}
                  className="h-3.5 w-3.5 accent-brand-red"
                />
                Remove photo
              </label>
            )}
            {photoError && <p className="max-w-40 text-center text-xs text-brand-red-dark">{photoError}</p>}
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-semibold text-brand-ink/80">
                Full name <span className="text-brand-red">*</span>
              </label>
              <input
                id="full_name"
                name="full_name"
                required
                minLength={2}
                defaultValue={facilitator?.full_name}
                className={adminInput}
              />
            </div>
            <div>
              <label htmlFor="status_code" className="block text-sm font-semibold text-brand-ink/80">
                Status
              </label>
              <select id="status_code" name="status_code" defaultValue={currentStatus} className={adminInput}>
                <option value="">No status assigned</option>
                {!statusKnown && <option value={currentStatus}>{currentStatus} (current)</option>}
                {statuses.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} — {s.label}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-start gap-3 rounded-md border border-brand-line bg-brand-sand px-4 py-3">
              <input
                type="checkbox"
                name="is_public"
                defaultChecked={facilitator?.is_public ?? true}
                className="mt-0.5 h-4 w-4 accent-brand-red"
              />
              <span className="text-sm">
                <span className="block font-semibold text-brand-ink">Visible on the public website</span>
                <span className="block text-brand-ink/60">
                  Shows this facilitator on the Facilitators page and their profile page.
                </span>
              </span>
            </label>
          </div>
        </div>
      </section>

      {FIELD_GROUPS.map((group) => (
        <section key={group.title} className="rounded-lg border border-brand-line bg-white p-5 sm:p-6">
          <h2 className="font-bold text-brand-ink">{group.title}</h2>
          <p className="mt-0.5 text-sm text-brand-ink/55">{group.description}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
                <label htmlFor={field.name} className="block text-sm font-semibold text-brand-ink/80">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    placeholder={field.placeholder}
                    defaultValue={(facilitator?.[field.name] as string) ?? ""}
                    className={adminInput}
                  />
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    defaultValue={(facilitator?.[field.name] as string) ?? ""}
                    className={adminInput}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-brand-line bg-white/95 backdrop-blur lg:left-64">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <div className="min-h-5 text-sm">
            {state?.error ? (
              <span className="font-medium text-brand-red-dark">{state.error}</span>
            ) : state?.success ? (
              <span className="font-medium text-green-700">All changes saved.</span>
            ) : (
              <span className="text-brand-ink/50">Fields marked * are required.</span>
            )}
          </div>
          <button type="submit" disabled={pending || !!photoError} className={adminButton.primary}>
            {pending ? "Saving…" : facilitator ? "Save changes" : "Add facilitator"}
          </button>
        </div>
      </div>
    </form>
  );
}
