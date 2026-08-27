"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/db/schema";
import { Reveal, RevealText } from "./reveal";

export function Testimonials({ quotes }: { quotes: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (quotes.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  if (quotes.length === 0) return null;
  const current = quotes[index];

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + quotes.length) % quotes.length);
  };

  return (
    <section id="stories" className="relative overflow-hidden py-24 sm:py-32">
      {/* Ghost quote mark */}
      <Quote
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 left-1/2 h-72 w-72 -translate-x-1/2 text-gold/[0.06]"
      />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4">
              <span className="gold-rule w-12" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                Client Stories
              </p>
              <span className="gold-rule w-12" />
            </div>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl font-medium tracking-tight text-cream sm:text-5xl">
            <RevealText text="Word of mouth," />{" "}
            <RevealText text="golden thread" delay={0.15} className="italic gold-shimmer" />
          </h2>
        </div>

        <Reveal delay={0.2}>
          <div className="relative mt-14 rounded-3xl border border-cream/10 bg-fern/70 p-8 backdrop-blur-sm sm:p-14">
            <div className="flex justify-center gap-1.5">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>

            <div className="relative mt-8 min-h-[220px] sm:min-h-[180px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={current.id}
                  initial={{ opacity: 0, x: 40 * direction, filter: "blur(6px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -40 * direction, filter: "blur(6px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <p className="mx-auto max-w-3xl font-display text-xl font-normal leading-relaxed text-cream sm:text-2xl">
                    “{current.quote}”
                  </p>
                  <footer className="mt-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
                      {current.name}
                    </p>
                    <p className="mt-1.5 text-xs uppercase tracking-[0.15em] text-cream/50">
                      {current.role}
                    </p>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-cream/10 pt-6">
              <button
                onClick={() => go(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
                aria-label="Previous story"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2.5">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > index ? 1 : -1);
                      setIndex(i);
                    }}
                    aria-label={`Go to story ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-400 ${
                      i === index ? "w-8 bg-gold" : "w-1.5 bg-cream/25 hover:bg-cream/50"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(1)}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
                aria-label="Next story"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
