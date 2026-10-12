import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { EVENT_TYPE_VALUES, PACKAGE_VALUES, normalizeEventType, type PackageValue } from "@/lib/booking-options";
import { sendBookingNotification, sendBookingConfirmation } from "@/lib/email";

const EMAIL_DEBUG = process.env.EMAIL_DEBUG === "1";

/** Normalize a package selection to a canonical value.
    Accepts canonical values and legacy/localized display labels. */
function normalizePackage(input: unknown): PackageValue | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if ((PACKAGE_VALUES as readonly string[]).includes(value)) {
    return value as PackageValue;
  }
  const aliases: Record<string, PackageValue> = {
    "Grand Wedding Buffet": "grand-wedding-buffet",
    "Live Stations Package": "live-stations",
    "High-Tea & Sweets": "high-tea-sweets",
    "Custom / Not sure yet": "custom",
    "Bufet Perkahwinan Agung": "grand-wedding-buffet",
    "Pakej Stesen Terbuka": "live-stations",
    "High-Tea & Manisan": "high-tea-sweets",
    "Tersuai / Belum pasti": "custom",
  };
  return aliases[value] ?? null;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, guests, package: pkg, message } =
      body ?? {};

    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Please tell us your full name.";
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "A valid email address is required.";
    }
    if (!phone || typeof phone !== "string" || phone.replace(/\D/g, "").length < 8) {
      errors.phone = "A valid phone number is required.";
    }

    const normalizedEventType = normalizeEventType(eventType);
    if (!normalizedEventType) {
      errors.eventType = "Please choose an event type.";
    }

    if (!eventDate || typeof eventDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
      errors.eventDate = "Please pick your event date.";
    } else {
      const chosen = new Date(`${eventDate}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(chosen.getTime()) || chosen < today) {
        errors.eventDate = "Event date must be today or later.";
      }
    }
    const guestCount = Number(guests);
    if (!Number.isFinite(guestCount) || guestCount < 10 || guestCount > 5000) {
      errors.guests = "Guest count must be between 10 and 5000.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    // Non-blocking package normalization: fall back to null on unknown values
    const normalizedPackage = normalizePackage(pkg);

    const [created] = await db
      .insert(bookings)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        eventType: normalizedEventType!,
        eventDate,
        guests: Math.floor(guestCount),
        package: normalizedPackage,
        message: typeof message === "string" && message.trim() ? message.trim() : null,
      })
      .returning({ id: bookings.id });

    // Fire-and-forget emails — an email outage must never block or fail the
    // booking that was already persisted. One to the operator inbox, one to
    // the customer with their KE- reference. With EMAIL_DEBUG=1 the sends are
    // awaited and surfaced in the 201 body so failures are diagnosable.
    const notifyPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      eventType: normalizedEventType!,
      eventDate,
      guests: Math.floor(guestCount),
      package: normalizedPackage,
      message: typeof message === "string" && message.trim() ? message.trim() : null,
    };

    if (EMAIL_DEBUG) {
      const notify = await sendBookingNotification(notifyPayload, created.id);
      const confirm = await sendBookingConfirmation(notifyPayload, created.id);
      return NextResponse.json(
        { ok: true, id: created.id, debug: { notify, confirm } },
        { status: 201 },
      );
    }

    void sendBookingNotification(notifyPayload, created.id).then((result) => {
      if (!result.ok) {
        console.error("Booking email notification failed:", result.error);
      }
    });

    void sendBookingConfirmation(notifyPayload, created.id).then((result) => {
      if (!result.ok) {
        console.error("Booking confirmation email failed:", result.error);
      }
    });

    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch (error) {
    console.error("Booking submission failed:", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. On miscommunication, please retry." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const rows = await db.select({ id: bookings.id, eventType: bookings.eventType }).from(bookings);
    return NextResponse.json({ ok: true, count: rows.length });
  } catch {
    return NextResponse.json({ ok: false, count: 0 }, { status: 500 });
  }
}
