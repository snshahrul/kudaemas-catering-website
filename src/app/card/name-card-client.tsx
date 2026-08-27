"use client";

import { motion } from "framer-motion";
import { HorseMark } from "@/components/logo";
import { useEffect, useState } from "react";

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

export function NameCardClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="relative w-full max-w-sm"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-gold/20 bg-gradient-to-b from-fern/90 via-moss/80 to-forest/95 shadow-[0_0_100px_-25px_rgba(201,162,75,0.2)] backdrop-blur-xl">
          <div className="relative h-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-gold/5 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-transparent" />
            <div className="absolute left-1/2 top-8 h-px w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
          </div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={mounted ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
            className="relative -mt-16 mx-auto"
          >
            <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-2 border-gold/30 bg-gradient-to-b from-gold/15 to-gold/5 shadow-[0_0_60px_rgba(201,162,75,0.25)] backdrop-blur-sm">
              <HorseMark className="h-16 w-16 text-gold" />
            </div>
          </motion.div>

          <div className="relative px-8 pb-8 pt-6 text-center sm:px-10">
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate={mounted ? "visible" : "hidden"}>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-cream">
                Kuda<span className="gold-shimmer">Emas</span>
              </h1>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.5em] text-gold/70">
                Catering House
              </p>
            </motion.div>

            <motion.div custom={1} variants={fadeUp} initial="hidden" animate={mounted ? "visible" : "hidden"}>
              <div className="mx-auto mt-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/50">Est. 2025</span>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
              </div>
            </motion.div>

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

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mx-auto mt-7 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            />

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-7 space-y-3"
            >
              <a
                href="https://wa.me/601139794166"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 rounded-xl border border-transparent py-2.5 text-sm text-cream/65 transition-all duration-300 hover:border-gold/15 hover:bg-gold/5 hover:text-gold"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/70 transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                  &#9742;
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
                  &#9993;
                </span>
                kudaemas.app@gmail.com
              </a>

              <div className="flex items-center justify-center gap-3 rounded-xl py-2.5 text-sm text-cream/65">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/70">
                  &#9906;
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

            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate={mounted ? "visible" : "hidden"}
              className="mt-7 flex items-center justify-center gap-3"
            >
              <a
                href="https://wa.me/601139794166"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.2)]"
              >
                W
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.2)]"
              >
                Ig
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-gold/20 bg-gold/5 text-gold/60 transition-all duration-300 hover:border-gold/40 hover:bg-gold/10 hover:text-gold hover:shadow-[0_0_20px_rgba(201,162,75,0.2)]"
              >
                Fb
              </a>
            </motion.div>

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

        <div className="absolute -bottom-4 left-1/2 h-8 w-[85%] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-xl" />
      </motion.div>
    </main>
  );
}
