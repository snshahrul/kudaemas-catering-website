"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";

export function LoginGate() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "Something went wrong. Try again.");
      setBusy(false);
    } catch {
      setError("Network error. Try again.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6">
      <div className="rounded-3xl border border-gold/25 bg-fern/80 p-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">
          <Lock className="h-6 w-6" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-medium text-cream">
          Bookings Dashboard
        </h1>
        <p className="mt-2 text-sm text-cream/60">
          Internal use only — enter the team password to continue.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-xl border border-cream/15 bg-forest/60 px-4 py-3.5 text-sm text-cream placeholder:text-cream/30 outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/25"
          />
          {error && (
            <p className="text-xs font-semibold text-clay" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="btn-sheen flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-forest transition-all hover:bg-gold-bright disabled:cursor-not-allowed disabled:opacity-70"
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking…
              </>
            ) : (
              "Unlock"
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
