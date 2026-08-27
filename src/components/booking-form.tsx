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
} from "lucide-react";
import { Reveal, RevealText } from "./reveal";

const EVENT_TYPES = [
  "Wedding & Reception",
  "Corporate & Summit",
  "Private Celebrations",
  "Government & Institution",
  "Other",
];

const PACKAGES = [
  "Grand Wedding Buffet",
  "Live Stations Package",
  "High-Tea & Sweets",
  "Custom / Not sure yet",
];

const PERKS = [
  "Menu tasting for confirmed bookings",
  "Dedicated floor captain & serving brigade",
  "Full styling, chinaware & disposables included",
];

type Errors = Partial<
  Record<"name" | "email" | "phone" | "eventType" | "eventDate" | "guests" | "form", string>
>;

const inputClass =
  "w-full rounded-xl border border-cream/15 bg-forest/60 px-4 py-3.5 text-sm text-cream placeholder:text-cream/30 outline-none transition-all duration-300 focus:border-gold focus:ring-2 focus:ring-gold/25";

export function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: EVENT_TYPES[0],
    eventDate: "",
    guests: "120",
    package: PACKAGES[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [bookingRef, setBookingRef] = useState<number | null>(null);

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErrors({});

    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "A valid email is required.";
    if (form.phone.replace(/\D/g, "").length < 8)
      next.phone = "A valid phone number is required.";
    if (!form.eventDate) next.eventDate = "Please pick your event date.";
    const guests = Number(form.guests);
    if (!Number.isFinite(guests) || guests < 10 || guests > 5000)
      next.guests = "Between 10 and 5000 guests.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? { form: data.message ?? "Please review your details." });
        setStatus("idle");
        return;
      }
      setBookingRef(data.id);
      setStatus("success");
    } catch {
      setErrors({ form: "Network error — please try again." });
      setStatus("idle");
    }
  }

  return (
    <section id="reserve" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[120px]" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Left: pitch + contact */}
        <div>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="gold-rule w-12" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                Reserve the House
              </p>
            </div>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            <RevealText text="Tell us your" />{" "}
            <RevealText text="occasion" delay={0.12} className="italic gold-shimmer" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md leading-relaxed text-cream/65">
              Share the details below and our event director will call you within
              one working day with a tailored proposal, tasting invitation and
              transparent quotation.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {PERKS.map((perk, i) => (
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
                    Call the House
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
                    Write to us
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
                    The Kitchen
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
                    Your table is <span className="italic gold-shimmer">reserved</span>
                  </h3>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
                    Thank you, {form.name.split(" ")[0]}. Your request has been
                    received — reference{" "}
                    <span className="font-bold text-gold">
                      KE-{String(bookingRef ?? 0).padStart(4, "0")}
                    </span>
                    . Our event director will reach you within one working day.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm((f) => ({ ...f, message: "" }));
                    }}
                    className="mt-10 rounded-full border border-gold/50 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold transition-colors hover:bg-gold hover:text-forest"
                  >
                    Make another request
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
                      Event Inquiry
                    </h3>
                    <span className="flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                      <CalendarDays className="h-3 w-3" />
                      Booking {new Date().getFullYear()}
                    </span>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        Full Name
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
                        Phone / WhatsApp
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
                      Email Address
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
                        Event Type
                      </label>
                      <div className="relative">
                        <select
                          value={form.eventType}
                          onChange={set("eventType")}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          {EVENT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-forest">
                              {t}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                        Event Date
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
                        Estimated Guests
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
                        Preferred Package
                      </label>
                      <div className="relative">
                        <select
                          value={form.package}
                          onChange={set("package")}
                          className={`${inputClass} appearance-none pr-10`}
                        >
                          {PACKAGES.map((p) => (
                            <option key={p} value={p} className="bg-forest">
                              {p}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/70" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[9px] font-bold uppercase tracking-[0.25em] text-cream/50">
                      Tell us about your occasion
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="Venue, vibe, dietary notes, dreams — anything helps."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {errors.form && <ErrorText msg={errors.form} />}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-gold px-8 py-4.5 text-xs font-bold uppercase tracking-[0.25em] text-forest transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_44px_rgba(201,162,75,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        Request Proposal
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[10px] uppercase tracking-[0.2em] text-cream/35">
                    No payment required · Response within 1 working day
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

function ErrorText({ msg }: { msg: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 text-xs font-semibold text-clay"
    >
      {msg}
    </motion.p>
  );
}
