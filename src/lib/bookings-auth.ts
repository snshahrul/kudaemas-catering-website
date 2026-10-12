import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal password gate for the /bookings dashboard.
 *
 * The password lives in BOOKINGS_PASSWORD (a Vercel secret / .env.local). On
 * successful login we mint a signed token — HMAC of the issued-at timestamp —
 * stored in an httpOnly cookie. Verification re-computes the HMAC, so the
 * cookie is unfakeable without the secret, and expires after 7 days.
 */

export const SESSION_COOKIE = "kudaemas_bookings_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.BOOKINGS_PASSWORD;
  if (!secret) throw new Error("BOOKINGS_PASSWORD is not configured");
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function verifyPassword(input: string): boolean {
  const expected = getSecret().trim();
  const given = input?.trim() ?? "";
  if (given.length !== expected.length) return false;
  // Constant-time comparison so login attempts can't leak length/prefix info.
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

export function createSessionToken(): string {
  const issuedAt = Date.now().toString(36);
  return `${issuedAt}.${sign(issuedAt)}`;
}

export type SessionCheck =
  | { ok: true }
  | { ok: false; reason: "none" | "expired" | "invalid" };

export function checkSessionToken(token: string | undefined): SessionCheck {
  if (!token) return { ok: false, reason: "none" };
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return { ok: false, reason: "invalid" };

  const expectedSig = sign(issuedAt);
  if (
    signature.length !== expectedSig.length ||
    !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))
  ) {
    return { ok: false, reason: "invalid" };
  }

  const issued = parseInt(issuedAt, 36);
  if (!Number.isFinite(issued) || Date.now() - issued > SESSION_TTL_MS) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true };
}

export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;
