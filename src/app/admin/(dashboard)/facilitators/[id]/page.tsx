import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { FacilitatorForm } from "@/components/admin/facilitator-form";
import { DeleteFacilitatorButton } from "@/components/admin/delete-facilitator-button";
import { AdminPageHeader, adminButton } from "@/components/admin/page-header";
import { deleteFacilitatorAction, updateFacilitatorAction } from "@/app/admin/actions";
import { adminGetFacilitator, getStatusLookup } from "@/lib/data/facilitators";

export const metadata = { title: "Edit Facilitator", robots: { index: false } };

export default async function EditFacilitatorPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string }>;
}) {
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const [facilitator, statusOptions] = await Promise.all([
    adminGetFacilitator(id),
    getStatusLookup(),
  ]);

  if (!facilitator) notFound();

  const boundUpdate = updateFacilitatorAction.bind(null, id);
  const boundDelete = deleteFacilitatorAction.bind(null, id);

  return (
    <div className="mx-auto max-w-4xl">
      <AdminPageHeader
        back={{ href: "/admin/facilitators", label: "Facilitators" }}
        title={facilitator.full_name}
        description={
          facilitator.is_public ? "Visible on the public website" : "Hidden from the public website"
        }
        actions={
          <>
            {facilitator.is_public && (
              <Link href={`/facilitators/${facilitator.slug}`} target="_blank" className={adminButton.secondary}>
                <ExternalLink size={15} /> View public profile
              </Link>
            )}
            <DeleteFacilitatorButton action={boundDelete} name={facilitator.full_name} />
          </>
        }
      />
      <div className="mt-6">
        <FacilitatorForm
          action={boundUpdate}
          facilitator={facilitator}
          statusOptions={statusOptions}
          justCreated={created === "1"}
        />
      </div>
    </div>
  );
}
