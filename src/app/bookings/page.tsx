import type { Metadata } from "next";
import { cookies } from "next/headers";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { SESSION_COOKIE, checkSessionToken } from "@/lib/bookings-auth";
import { LoginGate } from "./login-gate";
import { BookingsTable, SignOutButton } from "./bookings-table";

export const metadata: Metadata = {
  title: "Bookings Dashboard | Katering KudaEmas",
  robots: { index: false, follow: false }, // keep it out of Google
};

export const dynamic = "force-dynamic";

async function getBookings() {
  return db
    .select()
    .from(bookings)
    .orderBy(desc(bookings.createdAt))
    .limit(500);
}

export default async function BookingsPage() {
  const session = checkSessionToken((await cookies()).get(SESSION_COOKIE)?.value);

  if (!session.ok) {
    return <LoginGate />;
  }

  let rows: Awaited<ReturnType<typeof getBookings>>;
  try {
    rows = await getBookings();
  } catch (error) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-2xl text-cream">Bookings</h1>
        <p className="mt-4 rounded-xl border border-clay/40 bg-clay/10 p-6 text-sm text-cream/80">
          Could not load the bookings table
          {error instanceof Error ? ` — ${error.message}` : ""}.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-gold/20 pb-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
            Katering KudaEmas · Internal
          </p>
          <h1 className="mt-2 font-display text-3xl font-medium text-cream sm:text-4xl">
            Booking requests
          </h1>
          <p className="mt-2 text-sm text-cream/60">
            {rows.length} submission{rows.length === 1 ? "" : "s"} · newest first
          </p>
        </div>
        <SignOutButton />
      </header>

      <BookingsTable rows={rows} />
    </main>
  );
}
