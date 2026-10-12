"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const HERO_IMAGE = "/hero.jpg";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const MARQUEE_ITEMS_KEYS = [
    "hero.marquee.weddings",
    "hero.marquee.feast",
    "hero.marquee.corporate",
    "hero.marquee.sate",
    "hero.marquee.villas",
    "hero.marquee.buffets",
  ];

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
          alt="Grand Malaysian heritage feast by Katering KudaEmas — wedding catering in Petaling Jaya and Kuala Lumpur"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-forest/85 via-forest/45 to-forest" />
      <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/30 to-transparent" />
      {/* Premium ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full bg-gold/[0.08] blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[280px] w-[380px] rounded-full bg-gold/[0.05] blur-[100px]" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-32 sm:px-8"
      >
        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-center gap-4"
        >
          <span className="gold-rule w-14" />
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold sm:text-xs">
            {t("hero.established")}
          </p>
        </motion.div>

        <h1 className="mt-6 font-display text-[11.5vw] font-medium leading-[0.95] tracking-tight text-cream sm:text-[9.5vw] lg:text-[6.5rem]">
          {/* SEO-readable text for crawlers and screen readers */}
          <span className="sr-only">
            Katering KudaEmas — Malaysian Wedding &amp; Event Catering in Petaling Jaya, Kuala Lumpur &amp; Selangor
          </span>

          {/* Visual H1 — decorative, hidden from screen readers */}
          <span aria-hidden="true">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flow-light block">{t("hero.title1")}</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flow-light flow-light-gold flow-delay-1 block italic">
                  {t("hero.title2")}
                </span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flow-light flow-delay-2 block">{t("hero.title3")}</span>
              </motion.span>
            </span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 text-xs font-bold uppercase tracking-[0.35em] text-gold/90 sm:text-sm"
        >
          Petaling Jaya · Kuala Lumpur · Selangor
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          {t("hero.description")}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#reserve"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-forest transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_44px_rgba(201,162,75,0.55)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {t("hero.reserveEvent")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#menus"
            className="inline-flex items-center gap-3 rounded-full border border-cream/25 bg-forest/40 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-cream backdrop-blur-md transition-all duration-300 hover:border-gold hover:text-gold"
          >
            {t("hero.exploreMenus")}
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
        <span className="text-[9px] font-bold uppercase tracking-[0.4em]">
          {t("hero.scroll")}
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>

      {/* Marquee strip */}
      <div className="relative z-10 border-t border-gold/20 bg-forest/70 backdrop-blur-md">
        <div className="group flex overflow-hidden py-4">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
            {[...Array(2)].flatMap((_, dup) =>
              MARQUEE_ITEMS_KEYS.map((key) => (
                <span
                  key={`${dup}-${key}`}
                  className="flex shrink-0 items-center gap-10 text-[11px] font-bold uppercase tracking-[0.4em] text-gold/85"
                >
                  {t(key)}
                  <span className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}