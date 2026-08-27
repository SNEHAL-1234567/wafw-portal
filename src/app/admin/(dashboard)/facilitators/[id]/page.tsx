import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FacilitatorForm } from "@/components/admin/facilitator-form";
import { DeleteFacilitatorButton } from "@/components/admin/delete-facilitator-button";
import {
  deleteFacilitatorAction,
  updateFacilitatorAction,
} from "@/app/admin/actions";
import { adminGetFacilitator, getStatusLookup } from "@/lib/data/facilitators";

export const metadata = { title: "Edit Facilitator", robots: { index: false } };

export default async function EditFacilitatorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [facilitator, statusOptions] = await Promise.all([
    adminGetFacilitator(id),
    getStatusLookup(),
  ]);

  if (!facilitator) notFound();

  const boundUpdate = updateFacilitatorAction.bind(null, id);
  const boundDelete = deleteFacilitatorAction.bind(null, id);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/facilitators"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-ink/60 hover:text-brand-red"
        >
          <ArrowLeft size={16} /> Facilitators
        </Link>
        <DeleteFacilitatorButton
          action={boundDelete}
          name={facilitator.full_name}
        />
      </div>

      <h1 className="mt-4 font-serif text-2xl font-medium text-brand-ink">
        {facilitator.full_name}
      </h1>
      <div className="mt-6">
        <FacilitatorForm
          action={boundUpdate}
          facilitator={facilitator}
          statusOptions={statusOptions}
        />
      </div>
    </div>
  );
}
