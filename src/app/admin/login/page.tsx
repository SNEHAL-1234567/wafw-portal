import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-charcoal px-5">
      <div className="w-full max-w-sm rounded-2xl bg-brand-cream p-8 shadow-2xl">
        <div className="flex justify-center">
          <Image
            src="/brand/wafw-logo.png"
            unoptimized
            alt="World Academy for the Future of Women"
            width={200}
            height={80}
            className="h-10 w-auto"
          />
        </div>
        <h1 className="mt-6 text-center font-serif text-xl font-medium text-brand-ink">
          Admin Sign In
        </h1>
        <p className="mt-1 text-center text-sm text-brand-ink/55">
          Portal management access only.
        </p>
        <div className="mt-6">
          <LoginForm next={next ?? "/admin"} />
        </div>
      </div>
    </div>
  );
}
