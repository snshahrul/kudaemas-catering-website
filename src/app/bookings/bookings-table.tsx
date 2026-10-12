"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Phone, ChevronDown } from "lucide-react";

type BookingRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  package: string | null;
  message: string | null;
  status: string;
  createdAt: Date;
};

const EVENT_LABELS: Record<string, string> = {
  "wedding-reception": "Wedding & Reception",
  "corporate-summit": "Corporate & Summit",
  "private-celebration": "Private Celebration",
  "government-institution": "Government & Institution",
  other: "Other",
};

const PACKAGE_LABELS: Record<string, string> = {
  "grand-wedding-buffet": "Grand Wedding Buffet",
  "live-stations": "Live Stations",
  "high-tea-sweets": "High-Tea & Sweets",
  custom: "Custom",
};

function ref(id: number) {
  return `KE-${String(id).padStart(4, "0")}`;
}

function fmtDate(d: string) {
  return new Date(`${d}T00:00:00`).toLocaleDateString("en-MY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function fmtCreated(d: Date) {
  return new Date(d).toLocaleString("en-MY", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BookingsTable({ rows }: { rows: BookingRow[] }) {
  return (
    <div className="mt-8 space-y-3">
      {rows.length === 0 && (
        <p className="rounded-2xl border border-gold/15 bg-gold/5 p-8 text-center text-sm text-cream/60">
          No bookings yet —          they&apos;ll appear here the moment someone submits the form.
        </p>
      )}
      {rows.map((b) => (
        <details
          key={b.id}
          className="group rounded-2xl border border-gold/15 bg-fern/60 open:border-gold/35 open:bg-fern/90"
        >
          <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4">
            <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[11px] font-bold tracking-wider text-gold">
              {ref(b.id)}
            </span>
            <span className="font-semibold text-cream">{b.name}</span>
            <span className="text-xs text-cream/50">
              {EVENT_LABELS[b.eventType] ?? b.eventType} · {b.guests} pax ·{fmtDate(b.eventDate)}
            </span>
            <span className="ml-auto flex items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  b.status === "new"
                    ? "bg-gold/15 text-gold"
                    : "bg-cream/10 text-cream/60"
                }`}
              >
                {b.status}
              </span>
              <span className="hidden text-xs text-cream/40 sm:inline">
                {fmtCreated(b.createdAt)}
              </span>
              <ChevronDown className="h-4 w-4 text-gold/60 transition-transform group-open:rotate-180" />
            </span>
          </summary>
          <div className="grid gap-4 border-t border-gold/15 px-5 py-4 text-sm sm:grid-cols-2">
            <div className="space-y-2 text-cream/75">
              <p>
                <span className="text-cream/40">Package:</span>{" "}
                {PACKAGE_LABELS[b.package ?? ""] ?? b.package ?? "—"}
              </p>
              <p>
                <span className="text-cream/40">Phone:</span>{" "}
                <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 text-gold hover:underline">
                  <Phone className="h-3.5 w-3.5" /> {b.phone}
                </a>
              </p>
              <p>
                <span className="text-cream/40">Email:</span>{" "}
                <a href={`mailto:${b.email}`} className="text-gold hover:underline">
                  {b.email}
                </a>
              </p>
            </div>
            {b.message && (
              <div className="rounded-xl bg-forest/50 p-3 text-cream/70">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/40">
                  Notes
                </p>
                <p className="whitespace-pre-wrap">{b.message}</p>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

/** Sign-out button (client): clears the session cookie and refreshes the gate. */
export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      onClick={async () => {
        setBusy(true);
        await fetch("/api/bookings/login", { method: "DELETE" });
        router.refresh();
      }}
      className="flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60 transition-colors hover:border-clay hover:text-clay"
    >
      <LogOut className="h-3.5 w-3.5" />
      {busy ? "…" : "Sign out"}
    </button>
  );
}
