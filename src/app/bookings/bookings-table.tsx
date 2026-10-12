"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Phone, ChevronDown, Loader2, Download } from "lucide-react";
import { STATUS_VALUES, STATUS_STYLES, type Status } from "@/lib/booking-status";

export type BookingRow = {
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
  const [statuses, setStatuses] = useState<Record<number, string>>(
    Object.fromEntries(rows.map((b) => [b.id, b.status])),
  );
  const [savingId, setSavingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(id: number, status: Status) {
    const prev = statuses[id];
    if (prev === status) return;
    setSavingId(id);
    setError(null);
    setStatuses((m) => ({ ...m, [id]: status })); // optimistic
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        setStatuses((m) => ({ ...m, [id]: prev })); // roll back
        const err = await res.json().catch(() => null);
        setError(err?.error ?? "Could not update status.");
      }
    } catch {
      setStatuses((m) => ({ ...m, [id]: prev }));
      setError("Network error — status not saved.");
    }
    setSavingId(null);
  }

  return (
    <div className="mt-8 space-y-3">
      {error && (
        <p
          className="rounded-xl border border-clay/40 bg-clay/10 px-4 py-2 text-xs font-semibold text-clay"
          role="alert"
        >
          {error}
        </p>
      )}
      {rows.length === 0 && (
        <p className="rounded-2xl border border-gold/15 bg-gold/5 p-8 text-center text-sm text-cream/60">
          No bookings yet — they&apos;ll appear here the moment someone submits the form.
        </p>
      )}
      {rows.map((b) => (
        <BookingRowCard
          key={b.id}
          booking={b}
          status={((statuses[b.id] ?? b.status) as Status) || "new"}
          saving={savingId === b.id}
          onStatusChange={(s) => updateStatus(b.id, s)}
        />
      ))}
    </div>
  );
}

function BookingRowCard({
  booking: b,
  status,
  saving,
  onStatusChange,
}: {
  booking: BookingRow;
  status: Status;
  saving: boolean;
  onStatusChange: (s: Status) => void;
}) {
  return (
    <details className="group rounded-2xl border border-gold/15 bg-fern/60 open:border-gold/35 open:bg-fern/90">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4">
        <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[11px] font-bold tracking-wider text-gold">
          {ref(b.id)}
        </span>
        <span className="font-semibold text-cream">{b.name}</span>
        <span className="text-xs text-cream/50">
          {EVENT_LABELS[b.eventType] ?? b.eventType} · {b.guests} pax · {fmtDate(b.eventDate)}
        </span>
        <span className="ml-auto flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
              STATUS_STYLES[status] ?? STATUS_STYLES.new
            }`}
          >
            {saving && <Loader2 className="h-3 w-3 animate-spin" />}
            {status}
          </span>
          <span className="hidden text-xs text-cream/40 sm:inline">
            {fmtCreated(b.createdAt)}
          </span>
          <ChevronDown className="h-4 w-4 text-gold/60 transition-transform group-open:rotate-180" />
        </span>
      </summary>
      <div className="grid gap-4 border-t border-gold/15 px-5 py-4 text-sm sm:grid-cols-2">
        <div className="space-y-2 text-cream/75">
          {/* Pipeline: tap a chip to mark this lead contacted → quoted → won/lost */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-cream/40">Status:</span>
            {STATUS_VALUES.map((s) => (
              <button
                key={s}
                onClick={() => onStatusChange(s)}
                disabled={saving}
                className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                  status === s
                    ? `${STATUS_STYLES[s]} ring-1 ring-current`
                    : "bg-cream/5 text-cream/40 hover:bg-cream/10 hover:text-cream/70"
                } disabled:opacity-60`}
              >
                {s}
              </button>
            ))}
          </div>
          <p>
            <span className="text-cream/40">Package:</span>{" "}
            {PACKAGE_LABELS[b.package ?? ""] ?? b.package ?? "—"}
          </p>
          <p>
            <span className="text-cream/40">Phone:</span>{" "}
            <a
              href={`tel:${b.phone}`}
              className="inline-flex items-center gap-1 text-gold hover:underline"
            >
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
  );
}

/** Export CSV button (client): plain link, the endpoint enforces the session. */
export function ExportCsvButton() {
  return (
    <a
      href="/api/bookings/export"
      download
      className="flex items-center gap-2 rounded-full border border-gold/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-forest"
    >
      <Download className="h-3.5 w-3.5" />
      Export CSV
    </a>
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
