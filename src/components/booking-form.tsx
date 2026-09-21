"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  Phone,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { Reveal, RevealText } from "./reveal";
import { useLanguage } from "@/i18n/LanguageContext";
import { useCalculator } from "./calculator-context";
import { CATALOG } from "@/lib/catalog";
import { EVENT_TYPE_VALUES, PACKAGE_VALUES } from "@/lib/booking-options";

export function BookingForm() {
  const { t, language } = useLanguage();
  const { confirmed, clear } = useCalculator();

  // Stable enum values for the API; localized labels for display.
  const eventTypes = t("booking.form.eventTypes") as { value: string; label: string }[];
  const packages = t("booking.form.packages") as { value: string; label: string }[];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: EVENT_TYPE_VALUES[0],
    eventDate: "",
    guests: "120",
    package: PACKAGE_VALUES[0],
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [bookingRef, setBookingRef] = useState<number | null>(null);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const next: Partial<Record<string, string>> = {};
    if (form.name.trim().length < 2) next.name = t("booking.form.errors.name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t("booking.form.errors.email");
    if (form.phone.replace(/\D/g, "").length < 8)
      next.phone = t("booking.form.errors.phone");
    if (!form.eventDate) next.eventDate = t("booking.form.errors.eventDate");
    const guests = Number(form.guests);
    if (!Number.isFinite(guests) || guests < 10 || guests > 5000)
      next.guests = t("booking.form.errors.guests");
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const menuSummary = confirmed
        ? CATALOG.map((c) => {
            const names = dishNames[c.key];
            const dish = names?.[confirmed.selection[c.key]] ?? c.dishes[confirmed.selection[c.key]].name;
            return `${categoryLabels[c.key] ?? c.key}: ${dish}`;
          }).join(" · ")
        : null;
      const fullMessage = [menuSummary, form.message.trim()].filter(Boolean).join("\n\n");
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests, message: fullMessage }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors({ form: data.errors ?? t("booking.form.errors.form") });
        setStatus("idle");
        return;
      }
      setBookingRef(data.id);
      setStatus("success");
    } catch {
      setErrors({ form: t("booking.form.errors.network") });
      setStatus("idle");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-cream/15 bg-forest/60 px-4 py-3.5 text-sm text-cream placeholder:text-cream/30 outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/25";

  const dishNames = t("calculator.dishes") as Record<string, string[]>;
  const categoryLabels = t("calculator.categories") as Record<string, string>;
  const myr = (value: number) =>
    value.toLocaleString("en-MY", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <section id="reserve" className="section-shell relative overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[280px] w-[420px] rounded-full bg-gold/[0.05] blur-[100px]" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Left: pitch + contact */}
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="gold-rule w-12" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                {t("booking.form.reservation")}
              </p>
            </div>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            <RevealText text={t("booking.form.occasionTitle1")} />{" "}
            <RevealText text={t("booking.form.occasionTitle2")} delay={0.12} className="italic gold-shimmer" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md leading-relaxed text-cream/65">
              {t("booking.form.occasionDesc")}
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {t("booking.form.perks").map((perk: string, i: number) => (
              <Reveal key={perk} delay={0.15 + i * 0.08}>
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-gold" />
                  <span className="text-sm text-cream/75">{perk}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.35}>
            <div className="mt-12 space-y-5 border-t border-cream/10 pt-8">
              <a href="tel:+601139794166" className="group flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-forest">
                  <Phone className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-cream/45">
                    {t("booking.form.callUs")}
                  </span>
                  <span className="text-sm font-semibold text-cream transition-colors group-hover:text-gold">
                    +6011-3979 4166 / +6018-355 1765
                  </span>
                </span>
              </a>
              <a href="mailto:kudaemas.app@gmail.com" className="group flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-forest">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-cream/45">
                    {t("booking.form.writeUs")}
                  </span>
                  <span className="text-sm font-semibold text-cream transition-colors group-hover:text-gold">
                    kudaemas.app@gmail.com
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-cream/45">
                    {t("booking.form.kitchen")}
                  </span>
                  <span className="text-sm font-semibold text-cream">
                    10-15-37, Tingkat 15,
                    <br />
                    Desa Mentari Apartment Block 10
                    <br />
                    46060 Petaling Jaya,
                    <br />
                    Selangor
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: the form */}
        <Reveal delay={0.15}>
          <div className="relative rounded-3xl border border-gold/25 bg-fern/80 p-7 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm sm:p-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[480px] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 14 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-gold text-forest shadow-[0_0_60px_rgba(201,162,75,0.5)]"
                  >
                    <BadgeCheck className="h-9 w-9" />
                  </motion.span>
                  <h3 className="mt-8 font-display text-3xl font-medium text-cream">
                    {t("booking.form.successTitle")}
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
                    {t("booking.form.successDesc")
                      .replace("{name}", form.name.split(" ")[0])
                      .replace("{ref}", `KE-${String(bookingRef ?? 0).padStart(4, "0")}`)
                      .split(/(KE-\d{4})/)
                      .map((part: string, i: number) =>
                        /^KE-\d{4}$/.test(part) ? (
                          <span key={i} className="font-bold text-gold">
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        ),
                      )}
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm((f) => ({ ...f, message: "" }));
                    }}
                    className="mt-10 rounded-full border border-gold/50 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-forest"
                  >
                    {t("booking.form.anotherRequest")}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-5"
                  noValidate
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-medium text-cream">
                      {t("booking.form.inquiry")}
                    </h3>
                    <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                      <CalendarDays className="h-3 w-3" />
                      {t("booking.form.bookingYear").replace("{year}", new Date().getFullYear().toString())}
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        {t("booking.form.name")}
                      </label>
                      <input
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Sari Wijaya"
                        className={inputClass}
                      />
                      {errors.name && <ErrorText msg={errors.name} />}
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        {t("booking.form.phone")}
                      </label>
                      <input
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+62 812 3456 7890"
                        className={inputClass}
                      />
                      {errors.phone && <ErrorText msg={errors.phone} />}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                      {t("booking.form.email")}
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                    {errors.email && <ErrorText msg={errors.email} />}
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        {t("booking.form.eventType")}
                      </label>
                      <div className="relative">
                        <select
                          value={form.eventType}
                          onChange={set("eventType")}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          {eventTypes.map((type) => (
                            <option key={type.value} value={type.value} className="bg-forest">
                              {type.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        {t("booking.form.eventDate")}
                      </label>
                      <input
                        type="date"
                        value={form.eventDate}
                        onChange={set("eventDate")}
                        min={new Date().toISOString().split("T")[0]}
                        className={inputClass}
                      />
                      {errors.eventDate && <ErrorText msg={errors.eventDate} />}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        {t("booking.form.guestCount")}
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={5000}
                        value={form.guests}
                        onChange={set("guests")}
                        className={inputClass}
                      />
                      {errors.guests && <ErrorText msg={errors.guests} />}
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        {t("booking.form.menuChoice")}
                      </label>
                      <div className="relative">
                        <select
                          value={form.package}
                          onChange={set("package")}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          {packages.map((pkg) => (
                            <option key={pkg.value} value={pkg.value} className="bg-forest">
                              {pkg.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                      {t("booking.form.notes")}
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Venue, vibe, dietary notes, dreams — anything helps."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Transferred menu calculator selection */}
                  {confirmed && (
                    <div className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-gold">
                          <UtensilsCrossed className="h-3.5 w-3.5" />
                          {t("booking.form.menuSummary")}
                        </span>
                        <button
                          type="button"
                          onClick={clear}
                          aria-label={t("booking.form.menuSummaryRemove")}
                          className="grid h-6 w-6 place-items-center rounded-full border border-cream/20 text-cream/50 transition-colors hover:border-clay hover:text-clay"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                      <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                        {CATALOG.map((c) => {
                          const names = dishNames[c.key];
                          const dish =
                            names?.[confirmed.selection[c.key]] ??
                            c.dishes[confirmed.selection[c.key]].name;
                          return (
                            <li
                              key={c.key}
                              className="flex items-baseline justify-between gap-3 text-sm"
                            >
                              <span className="text-cream/50">{categoryLabels[c.key] ?? c.key}</span>
                              <span className="font-semibold text-cream">{dish}</span>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gold/20 pt-3">
                        <span className="text-xs font-medium text-cream/60">
                          {t("calculator.totalPax")}: {confirmed.pax} · MYR {myr(confirmed.perPax)} / pax
                        </span>
                        <span className="font-display text-lg font-bold text-gold">
                          MYR {myr(confirmed.grandTotal)}
                        </span>
                      </div>
                    </div>
                  )}

                  {errors.form && <ErrorText msg={errors.form} />}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-sheen group flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4.5 text-xs font-bold uppercase tracking-[0.25em] text-forest transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_44px_rgba(201,162,75,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("booking.form.sending")}
                      </>
                    ) : (
                      <>
                        {t("booking.form.requestProposal")}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-[0.2em] text-cream/35">
                    {t("booking.form.noPayment")}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ErrorText({ msg }: { msg: string }) {  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 text-xs font-semibold text-clay"
    >
      {msg}
    </motion.p>
  );
}