import { FacilitatorForm } from "@/components/admin/facilitator-form";
import { AdminPageHeader } from "@/components/admin/page-header";
import { createFacilitatorAction } from "@/app/admin/actions";
import { getStatusLookup } from "@/lib/data/facilitators";

export const metadata = { title: "Add Facilitator", robots: { index: false } };

export default async function NewFacilitatorPage() {
  const statusOptions = await getStatusLookup();

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        back={{ href: "/admin/facilitators", label: "Facilitators" }}
        title="Add facilitator"
        description="Create a new facilitator record."
      />
      <div className="mt-6">
        <FacilitatorForm action={createFacilitatorAction} statusOptions={statusOptions} />
      </div>
    </div>
  );
}
