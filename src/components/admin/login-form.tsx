"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/actions";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined,
  );

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-brand-ink/70"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-lg border border-brand-ink/15 bg-white px-3.5 py-2.5 text-sm text-brand-ink focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-brand-ink/70"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-lg border border-brand-ink/15 bg-white px-3.5 py-2.5 text-sm text-brand-ink focus:border-brand-red focus:outline-none focus:ring-1 focus:ring-brand-red"
        />
      </div>

      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-brand-red-dark">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
