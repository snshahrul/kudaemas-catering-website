import { Resend } from "resend";

const globalForResend = globalThis as typeof globalThis & {
  __resend?: Resend;
};

/** Lazily-initialized so importing never throws at build time — only actually
    sending an email requires RESEND_API_KEY to be configured. */
function getResend(): Resend {
  if (!globalForResend.__resend) {
    globalForResend.__resend = new Resend(process.env.RESEND_API_KEY);
  }
  return globalForResend.__resend;
}

export type NotificationBooking = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  package: string | null;
  message: string | null;
};

export type BookingNotificationResult =
  | { ok: true; resendId: string }
  | { ok: false; error: string };

export const NOTIFY_INBOX = "kudaemas.app@gmail.com";

const EVENT_TYPE_LABELS: Record<string, string> = {
  "wedding-reception": "Wedding & Reception",
  "corporate-summit": "Corporate & Summit",
  "private-celebration": "Private Celebration",
  "government-institution": "Government & Institution",
  other: "Other",
};

const PACKAGE_LABELS: Record<string, string> = {
  "grand-wedding-buffet": "Grand Wedding Buffet",
  "live-stations": "Live Stations Package",
  "high-tea-sweets": "High-Tea & Sweets",
  custom: "Custom / Not sure yet",
};

function safeLabel(
  value: string | null | undefined,
  labels: Record<string, string>,
): string {
  if (!value) return "—";
  return labels[value] ?? value;
}

/** Compact, mobile-readable HTML — the shape the owner needs when following up
    from the kitchen while on the go. Reply-to goes straight to the customer. */
function renderBookingHtml(booking: NotificationBooking, bookingRef: string): string {
  const valueTd =
    'style="padding:8px 12px;font-size:14px;color:#1f2a1f;"';
  const labelTd =
    'style="padding:8px 12px;width:110px;font-weight:bold;font-size:10px;letter-spacing:2px;color:#8a8474;text-transform:uppercase;vertical-align:top;"';

  const rows: Array<[string, string]> = [
    ["Event", safeLabel(booking.eventType, EVENT_TYPE_LABELS)],
    ["Date", booking.eventDate],
    ["Guests", String(booking.guests)],
    ["Package", safeLabel(booking.package, PACKAGE_LABELS)],
    ["Phone", booking.phone],
    ["Email", booking.email],
  ];

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#f5f3ee;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6e0d2;">
      <div style="background:#0f2419;padding:18px 20px;">
        <p style="margin:0;font-size:10px;letter-spacing:3px;color:#c9a24b;font-weight:bold;">NEW BOOKING REQUEST</p>
        <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;font-family:Georgia,serif;">${bookingRef} — ${booking.name}</h1>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;">
${rows
  .map(
    ([label, value]) => `        <tr>
          <td ${labelTd}>${label}</td>
          <td ${valueTd}>${value}</td>
        </tr>`,
  )
  .join("\n")}${
    booking.message
      ? `
        <tr>
          <td ${labelTd}>Notes</td>
          <td ${valueTd} style="white-space:pre-wrap;">${booking.message}</td>
        </tr>`
      : ""
  }
      </table>
      <div style="padding:14px 20px;background:#f9f7f2;border-top:1px solid #e6e0d2;">
        <p style="margin:0;font-size:11px;color:#8a8474;">Reply to this email to reach the customer directly.</p>
      </div>
    </div>
  </body>
</html>`;
}

function renderBookingText(booking: NotificationBooking, bookingRef: string): string {
  const lines = [
    `NEW BOOKING REQUEST ${bookingRef}`,
    ``,
    `Name: ${booking.name}`,
    `Event: ${safeLabel(booking.eventType, EVENT_TYPE_LABELS)}`,
    `Date: ${booking.eventDate}`,
    `Guests: ${booking.guests}`,
    `Package: ${safeLabel(booking.package, PACKAGE_LABELS)}`,
    `Phone: ${booking.phone}`,
    `Email: ${booking.email}`,
  ];
  if (booking.message) lines.push(`Notes:`, booking.message);
  return lines.join("\n");
}

/** Sends the booking notification to the operator inbox. Errors are caught and
    returned — a Resend outage must never break the booking submission itself. */
export async function sendBookingNotification(
  booking: NotificationBooking,
  bookingId: number,
): Promise<BookingNotificationResult> {
  try {
    const resend = getResend();
    const bookingRef = `KE-${String(bookingId).padStart(4, "0")}`;

    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ?? "Katering KudaEmas <bookings@sn-shahrul.com>",
      to: NOTIFY_INBOX,
      replyTo: booking.email,
      subject: `${bookingRef} · ${safeLabel(booking.eventType, EVENT_TYPE_LABELS)} · ${booking.name} (${booking.guests} pax, ${booking.eventDate})`,
      text: renderBookingText(booking, bookingRef),
      html: renderBookingHtml(booking, bookingRef),
    });

    if (error) return { ok: false, error: `${error.name}: ${error.message}` };
    return { ok: true, resendId: data?.id ?? "" };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
