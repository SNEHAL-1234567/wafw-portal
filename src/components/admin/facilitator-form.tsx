"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import type { FormState } from "@/app/admin/actions";
import type { Facilitator, StatusLookup } from "@/lib/types";
import { facilitatorPhotoUrl } from "@/lib/photo-url";

type Action = (state: FormState, formData: FormData) => Promise<FormState>;

const FIELD_GROUPS: {
  title: string;
  fields: { name: keyof Facilitator; label: string; type?: "textarea" }[];
}[] = [
  {
    title: "Public profile",
    fields: [
      { name: "location", label: "Location (country / region)" },
      { name: "short_bio", label: "Short bio", type: "textarea" },
      {
        name: "facilitation_locations",
        label: "Facilitation location(s)",
      },
      { name: "facilitation_dates", label: "Facilitation date(s)" },
      { name: "modules_facilitated", label: "Modules facilitated" },
    ],
  },
  {
    title: "Private / internal (never shown publicly)",
    fields: [
      { name: "mobile", label: "Mobile" },
      { name: "email", label: "Email" },
      { name: "street_address", label: "Street address" },
      { name: "certification_info", label: "Certification date, location" },
      { name: "attended_community_call", label: "Attended community call" },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
  },
];

export function FacilitatorForm({
  action,
  facilitator,
  statusOptions,
}: {
  action: Action;
  facilitator?: Facilitator;
  statusOptions: StatusLookup[];
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    action,
    undefined,
  );
  const existingPhoto = facilitatorPhotoUrl(facilitator?.photo_path ?? null);
  const [preview, setPreview] = useState<string | null>(existingPhoto);

  return (
    <form action={formAction} className="space-y-8" encType="multipart/form-data">
      <div className="rounded-2xl border border-brand-ink/10 bg-white p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-brand-paper">
            {preview ? (
              <Image
                src={preview}
                alt=""
                fill
                sizes="112px"
                className="object-cover"
              />
            ) : (
              <Users size={32} className="absolute inset-0 m-auto text-brand-ink/25" />
            )}
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-ink/70">
                Full name
              </label>
              <input
                name="full_name"
                required
                defaultValue={facilitator?.full_name}
                className="mt-1.5 w-full rounded-lg border border-brand-ink/15 px-3.5 py-2.5 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-brand-ink/70">
                  Status code
                </label>
                <input
                  name="status_code"
                  list="status-codes"
                  defaultValue={facilitator?.status_code ?? ""}
                  className="mt-1.5 w-full rounded-lg border border-brand-ink/15 px-3.5 py-2.5 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                />
                <datalist id="status-codes">
                  {statusOptions.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.label}
                    </option>
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-ink/70">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                  className="mt-1.5 w-full text-sm text-brand-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-paper file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand-ink"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-brand-ink/70">
              <input
                type="checkbox"
                name="is_public"
                defaultChecked={facilitator?.is_public ?? true}
                className="h-4 w-4 rounded border-brand-ink/30 text-brand-red focus:ring-brand-red"
              />
              Visible on the public facilitators page
            </label>
          </div>
        </div>
      </div>

      {FIELD_GROUPS.map((group) => (
        <div
          key={group.title}
          className="rounded-2xl border border-brand-ink/10 bg-white p-6"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-ink/50">
            {group.title}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <div
                key={field.name}
                className={field.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <label className="block text-sm font-medium text-brand-ink/70">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    rows={3}
                    defaultValue={
                      (facilitator?.[field.name] as string) ?? ""
                    }
                    className="mt-1.5 w-full rounded-lg border border-brand-ink/15 px-3.5 py-2.5 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                ) : (
                  <input
                    name={field.name}
                    defaultValue={
                      (facilitator?.[field.name] as string) ?? ""
                    }
                    className="mt-1.5 w-full rounded-lg border border-brand-ink/15 px-3.5 py-2.5 text-sm focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-brand-red-dark">
          {state.error}
        </p>
      )}
      {state?.success && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Saved.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-brand-red px-7 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Save Facilitator"}
      </button>
    </form>
  );
}
