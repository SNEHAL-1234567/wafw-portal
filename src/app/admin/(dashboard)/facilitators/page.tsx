import Link from "next/link";
import { Plus } from "lucide-react";
import { adminListFacilitators } from "@/lib/data/facilitators";
import { FacilitatorsTable } from "@/components/admin/facilitators-table";

export const metadata = { title: "Facilitators", robots: { index: false } };

export default async function AdminFacilitatorsPage() {
  const facilitators = await adminListFacilitators();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-2xl font-medium text-brand-ink">
          Facilitators
        </h1>
        <Link
          href="/admin/facilitators/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          <Plus size={16} /> Add Facilitator
        </Link>
      </div>

      <div className="mt-6">
        <FacilitatorsTable facilitators={facilitators} />
      </div>
    </div>
  );
}
