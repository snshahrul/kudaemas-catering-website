"use client";

import { motion } from "framer-motion";
import { HorseMark } from "@/components/logo";
import { useEffect, useState } from "react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function NameCard() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-forest p-4">
      {/* Ambient background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold/[0.02] blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold/[0.02] blur-[100px]" />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-b from-fern/90 via-moss/80 to-forest/95 shadow-[0_0_100px_-25px_rgba(201,162,75,0.2)] backdrop-blur-xl">
          {/* Top decorative bar */}
          <div className="relative h-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
            {/* Decorative lines */}
            <div className="absolute left-1/2 top-8 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            <div className="absolute left-1/2 top-10 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>

          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={mounted ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="relative -mt-16 mx-auto"
          >
            <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-2 border-gold/30 bg-gradient-to-b from-gold/15 to-gold/5 shadow-[0_0_60px_rgba(201,162,75,0.25)] backdrop-blur-sm">
              <HorseMark className="h-16 w-16 text-gold" />
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(201,162,75,0.3)]" />
          </motion.div>

          <div className="relative px-8 pb-8 pt-6 text-center sm:px-10">
            {/* Brand name */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={mounted ? "visible" : "hidden"}>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-cream">
                Kuda<span className="gold-shimmer">Emas</span>
              </h1>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.5em] text-gold/70">
                Catering House
              </p>
            </motion.div>

            {/* Tagline */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate={mounted ? "visible" : "hidden"}>
              <div className="mx-auto mt-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/50">Est. 2025</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mx-auto mt-6 max-w-[280px] text-[13px] leading-relaxed text-cream/55"
            >
              The golden standard of Malaysian catering — tradisional wedding food,
              live fire stations and grand buffets.
            </motion.p>

            {/* Services badges */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {["Weddings", "Corporate", "Live Stations", "Buffets"].map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-gold/70"
                >
                  {service}
                </span>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mx-auto mt-7 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            />

            {/* Contact details */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-7 space-y-3"
            >
              <a
                href="tel:+601139794166"
                className="group flex items-center justify-center gap-3 rounded-xl border border-transparent py-2.5 text-sm text-cream/65 transition-all duration-300 hover:border-gold/15 hover:bg-gold/5 hover:text-gold"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/70 transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="text-left leading-tight">
                  +6011-3979 4166
                  <br />
                  +6018-355 1765
                </span>
              </a>

              <a
                href="mailto:kudaemas.app@gmail.com"
                className="group flex items-center justify-center gap-3 rounded-xl border border-transparent py-2.5 text-sm text-cream/65 transition-all duration-300 hover:border-gold/15 hover:bg-gold/5 hover:text-gold"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/70 transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                kudaemas.app@gmail.com
              </a>

              <div className="group flex items-center justify-center gap-3 rounded-xl border border-transparent py-2.5 text-sm text-cream/65">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/70">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span className="text-left text-[13px] leading-relaxed">
                  10-15-37, Tingkat 15
                  <br />
                  Desa Mentari Apartment Block 10
                  <br />
                  46060 Petaling Jaya, Selangor
                </span>
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-7 flex items-center justify-center gap-3"
            >
              {[
                { icon: WhatsAppIcon, label: "WhatsApp", href: "https://wa.me/601139794166" },
                { icon: InstagramIcon, label: "Instagram", href: "#" },
                { icon: FacebookIcon, label: "Facebook", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.2)]"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </motion.div>

            {/* Bottom accent */}
            <motion.div
              custom={7}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
              <p className="mt-4 font-display text-[11px] italic text-gold/40">
                Crafted with fire in Malaysia
              </p>
            </motion.div>
          </div>
        </div>

        {/* Reflection effect */}
        <div className="absolute -bottom-4 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-xl" />
      </motion.div>
    </main>
  );
}
