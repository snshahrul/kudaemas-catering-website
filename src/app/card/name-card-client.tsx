"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HorseMark } from "@/components/logo";

const CARD_URL = "https://www.kateringkudaemas.com/card";
const WHATSAPP_SHARE_URL = `https://wa.me/?text=${encodeURIComponent(
  "Check out Katering KudaEmas 🐴 — menus, pricing & booking:" + " " + CARD_URL + " /card",
)}`;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

// Brand SVG Icons
const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const EmailIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

const PhoneIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
);

const LocationIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

const ShareIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2v13m0-13l5 5m-5-5L7 7" />
    <path d="M4 14v5a2 2 0 002 2h12a2 2 0 002-2v-5" />
  </svg>
);

const ContactCardIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M7 15h4" />
  </svg>
);

export function NameCardClient() {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest p-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/20"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative flex w-full flex-col items-center gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full max-w-md"
        >
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-b from-fern/90 via-moss/80 to-forest/95 shadow-[0_0_100px_-25px_rgba(201,162,75,0.2)] backdrop-blur-xl">
          <div className="relative h-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-8 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="relative -mt-14 mx-auto"
          >
            <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-full border-2 border-gold/30 bg-gradient-to-b from-gold/15 to-gold/5 shadow-[0_0_60px_rgba(201,162,75,0.25)] backdrop-blur-sm">
              <HorseMark className="h-28 w-28" />
            </div>
          </motion.div>

          <div className="relative px-6 pb-7 pt-5 text-center sm:px-8">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <h1 className="font-display text-3xl font-semibold tracking-tight text-cream">
                <span className="gold-shimmer">Katering</span> Kuda<span className="gold-shimmer">Emas</span>
              </h1>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.5em] text-gold/70">
                Malaysia
              </p>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <div className="mx-auto mt-4 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/50">Est. 2025 · Reg. No. 003899142-V</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-4 flex flex-wrap justify-center gap-2"
            >
              {["Weddings Food Arrangements", "Corporate Events", "Special Requests", "Buffets"].map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-gold/70"
                >
                  {service}
                </span>
              ))}
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mx-auto mt-5 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            />

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-5 space-y-3"
            >
              <div className="rounded-xl border border-gold/15 bg-gold/5 p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold/10 text-gold/70">
                    <PhoneIcon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1 text-left text-sm leading-relaxed text-cream/70">
                    {[
                      { name: "Azman · Chef", number: "+6018-355 1765", tel: "+60183551765" },
                      { name: "Azmi", number: "+6011-3979 4166", tel: "+601139794166", label: "CENTER REGION" },
                      { name: "Abg Man", number: "+6013-637 8000", tel: "+60136378000", label: "NORTH REGION" },
                      { name: "Akram", number: "+6011-6393 5224", tel: "+601163935224" },
                    ].map((c) => (
                      <span key={c.tel} className="block">
                        {"label" in c && c.label ? (
                          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.25em] text-gold/60">{c.label}</span>
                        ) : null}
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.15em] text-gold/60">{c.name}</span>
                          <a href={`tel:${c.tel}`} className="transition-colors hover:text-gold">{c.number}</a>
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              <a
                href="mailto:kudaemas.app@gmail.com"
                className="group flex items-center justify-center gap-3 rounded-xl border border-transparent py-2.5 text-sm text-cream/65 transition-all duration-300 hover:border-gold/15 hover:bg-gold/5 hover:text-gold"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/70 transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                  <EmailIcon className="h-5 w-5" />
                </span>
                kudaemas.app@gmail.com
              </a>

              <div className="grid grid-cols-2 gap-3 rounded-xl border border-gold/15 bg-gold/5 p-4">
                <span className="text-left text-[13px] leading-relaxed text-cream/65">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-gold/70">North Region</span>
                  Residensi Lagenda Tropika,
                  <br />
                  Temoh, Perak
                </span>
                <span className="text-left text-[13px] leading-relaxed text-cream/65">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-gold/70">Center Region</span>
                  Desa Mentari Apartment,
                  <br />
                  Petaling Jaya
                </span>
              </div>
            </motion.div>

            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-5 flex items-center justify-center gap-4"
            >
              <a
                href="https://wa.me/60183551765"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366] hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/kudaemas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-[#E4405F] hover:bg-[#E4405F]/10 hover:text-[#E4405F] hover:shadow-[0_0_20px_rgba(228,64,95,0.3)]"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/kudaemas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.3)]"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a
                href="mailto:kudaemas.app@gmail.com"
                aria-label="Email"
                className="group grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.3)]"
              >
                <EmailIcon className="h-5 w-5" />
              </a>
            </motion.div>

          </div>
        </div>

        <div className="absolute -bottom-4 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-xl" />
      </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="relative w-full max-w-xs"
        >
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4 shadow-[0_0_60px_-20px_rgba(201,162,75,0.25)] backdrop-blur-xl">
                <p className="text-center text-[9px] font-bold uppercase tracking-[0.35em] text-gold/70">
                  {qrOpen ? "Scan to save contact" : "Tap to show QR"}
                </p>

                {/* Tappable QR toggle — image hidden until tapped */}
                <button
                  type="button"
                  onClick={() => setQrOpen((o) => !o)}
                  aria-expanded={qrOpen}
                  aria-controls="card-qr"
                  className="mx-auto mt-3 flex w-[140px] cursor-pointer items-center justify-center"
                  aria-label={qrOpen ? "Hide QR code" : "Show QR code"}
                >
                  <AnimatePresence initial={false}>
                    {qrOpen ? (
                      <motion.span
                        key="qr"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="block"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          id="card-qr"
                          src="/katering-kudaemas-card-qr.svg"
                          alt="QR code linking to the Katering KudaEmas digital business card"
                          width={140}
                          height={140}
                          className="block w-[140px] rounded-lg bg-white p-1.5"
                        />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="qr-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="grid h-[140px] w-full place-items-center rounded-lg border border-dashed border-gold/40 text-gold/60"
                      >
                        <ContactCardIcon className="h-8 w-8" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <p className="mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.25em] text-gold/50">
                  {qrOpen ? "Tap to hide" : "Tap to show"}
                </p>
                <a
                  href={WHATSAPP_SHARE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-[#1da855] hover:shadow-[0_0_24px_rgba(37,211,102,0.35)]"
                >
                  <ShareIcon className="h-3.5 w-3.5" />
                  Share via WhatsApp
                </a>
                <a
                  href="/api/card/vcf"
                  download="Katering-KudaEmas.vcf"
                  className="group mt-2.5 flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:bg-gold hover:text-forest"
                >
                  <ContactCardIcon className="h-3.5 w-3.5" />
                  Save Contact
                </a>
              </div>
        </motion.div>
      </div>
    </main>
  );
}