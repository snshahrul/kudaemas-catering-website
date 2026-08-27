import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

const EVENT_TYPES = [
  "Wedding & Reception",
  "Corporate & Summit",
  "Private Celebration",
  "Government & Institution",
  "Other",
];

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
    if (!eventType || !EVENT_TYPES.includes(eventType)) {
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

    const [created] = await db
      .insert(bookings)
      .values({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        eventType,
        eventDate,
        guests: Math.floor(guestCount),
        package: typeof pkg === "string" && pkg.trim() ? pkg.trim() : null,
        message: typeof message === "string" && message.trim() ? message.trim() : null,
      })
      .returning({ id: bookings.id });

    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch (error) {
    console.error("Booking submission failed:", error);
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const rows = await db.select({ id: bookings.id }).from(bookings);
    return NextResponse.json({ ok: true, count: rows.length });
  } catch {
    return NextResponse.json({ ok: false, count: 0 }, { status: 500 });
  }
}
