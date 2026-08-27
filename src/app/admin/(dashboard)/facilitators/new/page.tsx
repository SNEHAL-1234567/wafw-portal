import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FacilitatorForm } from "@/components/admin/facilitator-form";
import { createFacilitatorAction } from "@/app/admin/actions";
import { getStatusLookup } from "@/lib/data/facilitators";

export const metadata = { title: "Add Facilitator", robots: { index: false } };

export default async function NewFacilitatorPage() {
  const statusOptions = await getStatusLookup();

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/admin/facilitators"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink/60 hover:text-brand-red"
      >
        <ArrowLeft size={16} /> Facilitators
      </Link>
      <h1 className="mt-4 font-serif text-2xl font-medium text-brand-ink">
        Add Facilitator
      </h1>
      <div className="mt-6">
        <FacilitatorForm
          action={createFacilitatorAction}
          statusOptions={statusOptions}
        />
      </div>
    </div>
  );
}
