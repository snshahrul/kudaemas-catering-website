/** Shared pipeline-status vocabulary for the bookings dashboard.
    Lives outside the client table component so server components (the page's
    counter chips) and client components both import real values — importing an
    array from a "use client" module into a server component yields a client
    reference proxy, not the array. */

export const STATUS_VALUES = ["new", "contacted", "quoted", "won", "lost"] as const;

export type Status = (typeof STATUS_VALUES)[number];

/** Tailwind classes per status for badges/counters, shared by client + server
    renderers. */
export const STATUS_STYLES: Record<Status, string> = {
  new: "bg-gold/15 text-gold",
  contacted: "bg-sky-500/15 text-sky-300",
  quoted: "bg-violet-500/15 text-violet-300",
  won: "bg-emerald-500/15 text-emerald-300",
  lost: "bg-clay/25 text-clay",
};
