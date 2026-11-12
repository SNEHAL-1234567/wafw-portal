import Link from "next/link";
import { Plus } from "lucide-react";
import { adminListFacilitators, getStatusLookup } from "@/lib/data/facilitators";
import { FacilitatorsTable } from "@/components/admin/facilitators-table";
import { AdminPageHeader, adminButton } from "@/components/admin/page-header";

export const metadata = { title: "Facilitators", robots: { index: false } };

export default async function AdminFacilitatorsPage({
  searchParams,
}: {
  searchParams: Promise<{ visibility?: string; status?: string; photo?: string }>;
}) {
  const [facilitators, statuses, params] = await Promise.all([
    adminListFacilitators(),
    getStatusLookup(),
    searchParams,
  ]);

  return (
    <div>
      <AdminPageHeader
        title="Facilitators"
        description={`${facilitators.length} records · ${facilitators.filter((f) => f.is_public).length} visible on the public site`}
        actions={
          <Link href="/admin/facilitators/new" className={adminButton.primary}>
            <Plus size={16} /> Add facilitator
          </Link>
        }
      />
      <div className="mt-6">
        <FacilitatorsTable
          facilitators={facilitators}
          statuses={statuses}
          initialVisibility={params.visibility}
          initialStatus={params.status}
          initialPhoto={params.photo}
        />
      </div>
    </div>
  );
}
