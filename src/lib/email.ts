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

const CONTACT_PHONE = "+6011-3979 4166";
const CONTACT_NORTH = "+6013-637 8000 (Abg Man)";
const CONTACT_WA = "https://wa.me/60183551765";

/** Warm, on-brand confirmation to the customer. First name only in tone,
    but keeps the KE- reference front and centre so they can quote it. */
function renderConfirmationHtml(
  booking: NotificationBooking,
  bookingRef: string,
): string {
  const firstName = booking.name.split(" ")[0];

  const rows: Array<[string, string]> = [
    ["Event", safeLabel(booking.eventType, EVENT_TYPE_LABELS)],
    ["Date", booking.eventDate],
    ["Guests", String(booking.guests)],
    ["Package", safeLabel(booking.package, PACKAGE_LABELS)],
  ];

  const valueTd = 'style="padding:7px 12px;font-size:14px;color:#1f2a1f;"';
  const labelTd =
    'style="padding:7px 12px;width:90px;font-weight:bold;font-size:10px;letter-spacing:2px;color:#8a8474;text-transform:uppercase;"';

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#f5f3ee;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e6e0d2;">
      <div style="background:#0f2419;padding:20px;">
        <p style="margin:0;font-size:10px;letter-spacing:3px;color:#c9a24b;font-weight:bold;">KATERING KUDAEMAS</p>
        <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;font-family:Georgia,serif;">Thank you, ${firstName}! 🐴</h1>
      </div>
      <div style="padding:22px 22px 8px;">
        <p style="margin:0;font-size:14px;line-height:1.6;color:#1f2a1f;">
          We've received your enquiry and our team is already looking at it.
          Your reference number is
          <strong style="color:#0f2419;">${bookingRef}</strong> — keep it handy;
          quote it any time you call or WhatsApp us.
        </p>
        <table role="presentation" style="width:100%;border-collapse:collapse;margin-top:16px;background:#f9f7f2;border-radius:8px;border:1px solid #e6e0d2;">
${rows
  .map(
    ([label, value]) => `          <tr>
            <td ${labelTd}>${label}</td>
            <td ${valueTd}>${value}</td>
          </tr>`,
  )
  .join("\n")}
        </table>
        <p style="margin:18px 0 0;font-size:14px;line-height:1.6;color:#1f2a1f;">
          Someone from the KudaEmas team will get back to you within
          <strong>1–2 working days</strong> with a proposal and pricing.
        </p>
      </div>
      <div style="padding:0 22px 22px;">
        <a href="${CONTACT_WA}" style="display:block;padding:12px 18px;background:#25D366;color:#ffffff;font-weight:bold;font-size:12px;letter-spacing:1px;text-align:center;text-decoration:none;border-radius:999px;">CHAT WITH US ON WHATSAPP</a>
        <p style="margin:16px 0 0;font-size:12px;line-height:1.7;color:#8a8474;">
          Prefer to talk? Call <strong style="color:#1f2a1f;">${CONTACT_PHONE}</strong> or our North region team at ${CONTACT_NORTH}.
          You can also browse our menus any time at
          <a href="https://www.kateringkudaemas.com" style="color:#c9a24b;">kateringkudaemas.com</a>.
        </p>
      </div>
      <div style="padding:12px 20px;background:#0f2419;">
        <p style="margin:0;font-size:10px;color:#94a88f;text-align:center;letter-spacing:1px;">
          Katering KudaEmas (003899142-V) · ${bookingRef}
        </p>
      </div>
    </div>
  </body>
</html>`;
}

function renderConfirmationText(
  booking: NotificationBooking,
  bookingRef: string,
): string {
  const firstName = booking.name.split(" ")[0];
  return [
    `Thank you, ${firstName}!`,
    ``,
    `We've received your enquiry and our team is already looking at it.`,
    `Your reference number is ${bookingRef} — quote it any time you call or WhatsApp us.`,
    ``,
    `Event: ${safeLabel(booking.eventType, EVENT_TYPE_LABELS)}`,
    `Date: ${booking.eventDate}`,
    `Guests: ${booking.guests}`,
    `Package: ${safeLabel(booking.package, PACKAGE_LABELS)}`,
    ``,
    `Someone from the KudaEmas team will get back to you within 1-2 working days with a proposal and pricing.`,
    ``,
    `WhatsApp: ${CONTACT_WA}`,
    `Phone: ${CONTACT_PHONE} (North: ${CONTACT_NORTH})`,
    `Web: https://www.kateringkudaemas.com`,
  ].join("\n");
}

/** Sends the customer-facing confirmation. Same fire-and-forget rules as the
    operator notification: caught, never thrown. replyTo is the operator inbox
    so the customer's Reply goes straight to the business, not a mailbox bomb. */
export async function sendBookingConfirmation(
  booking: NotificationBooking,
  bookingId: number,
): Promise<BookingNotificationResult> {
  try {
    const resend = getResend();
    const bookingRef = `KE-${String(bookingId).padStart(4, "0")}`;
    const firstName = booking.name.split(" ")[0];

    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ?? "Katering KudaEmas <bookings@sn-shahrul.com>",
      to: booking.email,
      replyTo: NOTIFY_INBOX,
      subject: `We've got you, ${firstName}! — ${bookingRef} confirmed · Katering KudaEmas`,
      text: renderConfirmationText(booking, bookingRef),
      html: renderConfirmationHtml(booking, bookingRef),
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
