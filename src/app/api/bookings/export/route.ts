import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { bookings, type Booking } from "@/db/schema";
import { SESSION_COOKIE, checkSessionToken } from "@/lib/bookings-auth";

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

/** CSV-escape: quote when the value contains comma, quote, newline or CR, and
    double embedded quotes. Prefix a leading =+-@ with a space so Excel does not
    execute it as a formula (CSV injection). */
function csvCell(value: unknown): string {
  const raw = value == null ? "" : String(value);
  const safe = /^[=+\-@\t\r]/.test(raw) ? ` ${raw}` : raw;
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

function parseSessionCookie(request: Request) {
  const cookie = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim().split("="))
    .find(([name]) => name === SESSION_COOKIE);
  return checkSessionToken(cookie?.[1]);
}

export async function GET(request: Request) {
  const session = parseSessionCookie(request);
  if (!session.ok) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized — sign in again." },
      { status: 401 },
    );
  }

  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return NextResponse.json(
      { ok: false, error: "Cross-origin request rejected." },
      { status: 403 },
    );
  }

  const rows: Booking[] = await db
    .select()
    .from(bookings)
    .orderBy(desc(bookings.createdAt));

  const header = [
    "Ref",
    "Status",
    "Name",
    "Phone",
    "Email",
    "Event Type",
    "Event Date",
    "Guests",
    "Package",
    "Notes",
    "Submitted At",
  ];

  const lines = [
    header.join(","),
    ...rows.map((b) =>
      [
        `KE-${String(b.id).padStart(4, "0")}`,
        b.status,
        b.name,
        b.phone,
        b.email,
        EVENT_LABELS[b.eventType] ?? b.eventType,
        b.eventDate,
        b.guests,
        PACKAGE_LABELS[b.package ?? ""] ?? b.package ?? "",
        b.message ?? "",
        new Date(b.createdAt).toISOString(),
      ]
        .map(csvCell)
        .join(","),
    ),
  ];

  // BOM so Excel opens UTF-8 correctly on Windows.
  const csv = "\uFEFF" + lines.join("\r\n");

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kudaemas-bookings-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
