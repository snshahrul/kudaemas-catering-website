/* Single source of truth for booking select options.
   The form sends these stable values to /api/bookings; localized display
   labels live in src/i18n/{en,ms}.ts under booking.form.eventTypes/packages. */

export const EVENT_TYPE_VALUES = [
  "wedding-reception",
  "corporate-summit",
  "private-celebration",
  "government-institution",
  "other",
] as const;

export type EventTypeValue = (typeof EVENT_TYPE_VALUES)[number];

export const PACKAGE_VALUES = [
  "grand-wedding-buffet",
  "live-stations",
  "high-tea-sweets",
  "custom",
] as const;

export type PackageValue = (typeof PACKAGE_VALUES)[number];

/** Legacy/alternate human-readable labels mapped to canonical values, so
    submissions made before the enum switch (or with localized labels) still
    validate instead of being rejected with a 400. */
export const EVENT_TYPE_ALIASES: Record<string, EventTypeValue> = {
  "Wedding & Reception": "wedding-reception",
  "Corporate & Summit": "corporate-summit",
  "Private Celebration": "private-celebration",
  "Private Celebrations": "private-celebration",
  "Government & Institution": "government-institution",
  Other: "other",
  "Perkahwinan & Resepsi": "wedding-reception",
  "Korporat & Sidang": "corporate-summit",
  "Sambutan Peribadi": "private-celebration",
  "Kerajaan & Institusi": "government-institution",
  "Lain-lain": "other",
};

export function normalizeEventType(input: unknown): EventTypeValue | null {
  if (typeof input !== "string") return null;
  const value = input.trim();
  if ((EVENT_TYPE_VALUES as readonly string[]).includes(value)) {
    return value as EventTypeValue;
  }
  return EVENT_TYPE_ALIASES[value] ?? null;
}
