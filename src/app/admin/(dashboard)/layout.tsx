import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-brand-paper">
      <AdminSidebar email={user.email ?? ""} />
      <main className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 sm:py-10">
        {children}
      </main>
    </div>
  );
}
