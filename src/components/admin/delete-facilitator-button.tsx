"use client";

import { Trash2 } from "lucide-react";
import { adminButton } from "@/components/admin/page-header";

export function DeleteFacilitatorButton({
  action,
  name,
}: {
  action: () => Promise<void>;
  name: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (
          !confirm(
            `Permanently delete ${name}? This removes the record for good.\n\nTip: to just remove them from the website, untick "Visible on the public website" instead.`,
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className={adminButton.danger}>
        <Trash2 size={15} /> Delete
      </button>
    </form>
  );
}
