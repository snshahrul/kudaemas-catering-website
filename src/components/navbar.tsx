"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X, Languages } from "lucide-react";
import { Logo } from "./logo";
import { useLanguage } from "@/i18n/LanguageContext";

const LINKS_KEYS = [
  { key: "navbar.about", href: "#about" },
  { key: "navbar.services", href: "#services" },
  { key: "navbar.menus", href: "#menus" },
  { key: "navbar.gallery", href: "#gallery" },
  { key: "navbar.quality", href: "#quality" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ms" : "en");
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-gold/15 bg-forest/90 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-forest/70 to-transparent"
        }`}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <a href="#top" aria-label="Katering KudaEmas home">
            <Logo />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {LINKS_KEYS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-[11px] font-bold uppercase tracking-[0.28em] text-cream/70 transition-colors hover:text-gold"
              >
                {t(link.key)}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cream transition-colors hover:border-gold hover:text-gold"
              aria-label="Toggle Language"
            >
              <Languages className="h-3 w-3" />
              {language === "en" ? t("common.ms") : t("common.en")}
            </button>

            <a
              href="#reserve"
              className="group btn-sheen hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-forest transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_32px_rgba(201,162,75,0.45)] sm:flex"
            >
              {t("navbar.bookEvent")}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] flex flex-col bg-forest/97 backdrop-blur-2xl"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:text-gold"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {LINKS_KEYS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                  className="font-display text-4xl font-medium text-cream transition-colors hover:text-gold sm:text-s5xl"
                >
                  {t(link.key)}
                </motion.a>
              ))}
              <motion.a
                href="#reserve"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-forest"
              >
                {t("navbar.bookEvent")}
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-xs uppercase tracking-[0.25em] text-cream/40"
              >
                {t("navbar.hours")}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}