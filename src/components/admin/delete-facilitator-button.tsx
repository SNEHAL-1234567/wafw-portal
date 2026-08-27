"use client";

import { Trash2 } from "lucide-react";

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
        if (!confirm(`Delete ${name}? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-brand-red-dark hover:bg-red-50"
      >
        <Trash2 size={15} /> Delete
      </button>
    </form>
  );
}
