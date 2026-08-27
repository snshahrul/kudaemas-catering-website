"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const HERO_IMAGE = "/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Parallax backdrop */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Grand Indonesian rijsttafel feast spread"
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/45 to-forest" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/20 to-transparent" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-28 sm:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <span className="gold-rule w-14" />
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold sm:text-xs">
            Est. 2025 Catering House
          </p>
        </motion.div>

        <h1 className="mt-6 font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-cream sm:text-[11vw] lg:text-[7.5rem]">
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              The Golden
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block italic gold-shimmer"
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              Standard
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              of Catering
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg"
        >
          We craft Malaysian traditional feasts that turn weddings, summits and
          private celebrations into unforgettable moments.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#reserve"
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-forest transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_44px_rgba(201,162,75,0.5)]"
          >
            Reserve Your Event
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#menus"
            className="inline-flex items-center gap-3 rounded-full border border-cream/30 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-cream transition-all duration-300 hover:border-gold hover:text-gold"
          >
            Explore Menus
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 transition-colors hover:text-gold md:flex"
        aria-label="Scroll to discover"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>

      {/* Marquee strip */}
      <div className="relative z-10 border-t border-gold/20 bg-forest/60 backdrop-blur-md">
        <div className="flex overflow-hidden py-4">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...Array(2)].flatMap((_, dup) =>
              [
                "Weddings & Receptions",
                "Royal Rijsttafel",
                "Corporate Summits",
                "Live Sate Stations",
                "Private Villas",
                "Grand Buffets",
              ].map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="flex shrink-0 items-center gap-10 text-[11px] font-bold uppercase tracking-[0.4em] text-gold/85"
                >
                  {item}
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
