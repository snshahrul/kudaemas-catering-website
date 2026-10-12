import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { SESSION_COOKIE, checkSessionToken } from "@/lib/bookings-auth";

const ALLOWED_STATUSES = new Set(["new", "contacted", "quoted", "won", "lost"]);

/** Same-origin check: a foreign site can't ride a user's cookie to mutate
    bookings (session cookie is sameSite=lax, but POSTs from other origins are
    blocked here regardless of browser behavior). */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser client (curl) — auth still applies
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = checkSessionToken(
    request.headers
      .get("cookie")
      ?.split(";")
      .map((c) => c.trim().split("="))
      .find(([name]) => name === SESSION_COOKIE)?.[1],
  );
  if (!session.ok) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized — sign in again." },
      { status: 401 },
    );
  }
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "Cross-origin request rejected." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const bookingId = Number(id);
  if (!Number.isInteger(bookingId) || bookingId < 1) {
    return NextResponse.json({ ok: false, error: "Invalid id." }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  const status = body?.status;
  if (typeof status !== "string" || !ALLOWED_STATUSES.has(status)) {
    return NextResponse.json(
      { ok: false, error: `status must be one of: ${[...ALLOWED_STATUSES].join(", ")}` },
      { status: 400 },
    );
  }

  try {
    const [updated] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, bookingId))
      .returning({ id: bookings.id, status: bookings.status });

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Booking not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, id: updated.id, status: updated.status });
  } catch (error) {
    console.error("Booking status update failed:", error);
    return NextResponse.json(
      { ok: false, error: "Could not update status. Try again." },
      { status: 500 },
    );
  }
}
