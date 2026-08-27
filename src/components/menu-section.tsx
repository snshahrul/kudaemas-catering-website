"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Info, Minus, Plus, Sparkle, Users } from "lucide-react";
import type { MenuItem } from "@/db/schema";
import { Reveal, RevealText } from "./reveal";

export function MenuSection({ items }: { items: MenuItem[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items],
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="menus" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-rule w-12" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                  Signature Menus
                </p>
              </div>
            </Reveal>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <RevealText text="Dishes that" />{" "}
              <RevealText text="become legends" delay={0.15} className="italic gold-shimmer" />
            </h2>
          </div>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    active === cat
                      ? "border-gold bg-gold text-forest"
                      : "border-cream/20 text-cream/60 hover:border-gold/60 hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-cream/10 bg-fern"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fern via-transparent to-transparent" />
                  {item.featured && (
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-forest">
                      <Sparkle className="h-3 w-3" />
                      House Legend
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full border border-gold/40 bg-forest/80 px-3 py-1.5 text-[10px] font-bold tracking-wide text-gold backdrop-blur-sm">
                    {item.price}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium text-cream transition-colors group-hover:text-gold">
                    {item.name}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-cream/60">
                    {item.description}
                  </p>
                  <a
                    href="#reserve"
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80 transition-colors hover:text-gold"
                  >
                    Include in my event
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Buffet Catering Pricing */}
        <Reveal delay={0.2}>
          <div className="mt-16 rounded-3xl border border-gold/25 bg-fern/80 p-8 backdrop-blur-sm sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              {/* Main pricing */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold">
                    <Users className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-2xl font-medium text-cream">
                    Buffet Catering
                  </h3>
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-display text-4xl font-semibold text-gold sm:text-5xl">
                    From RM15.00
                  </span>
                  <span className="text-sm text-cream/50">/ pax</span>
                </div>
                <p className="mt-3 text-sm text-cream/60">
                  Minimum 30 pax
                </p>
              </div>

              {/* Terms & conditions */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <p className="text-sm leading-relaxed text-cream/65">
                    Delivery and setup fee is from <span className="font-semibold text-cream/80">RM250</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <p className="text-sm leading-relaxed text-cream/65">
                    Orders have to be in increments of <span className="font-semibold text-cream/80">5 pax</span>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Plus className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <p className="text-sm leading-relaxed text-cream/65">
                    <span className="font-semibold text-cream/80">+RM3 per pax</span> for 20-29 pax orders
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <p className="text-sm leading-relaxed text-cream/65">
                    Orders need to be finalized at least <span className="font-semibold text-cream/80">4 working days</span> before the event
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <p className="text-sm leading-relaxed text-cream/65">
                    Teardown time will be <span className="font-semibold text-cream/80">2 hours and 30 minutes</span> from serving time
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                  <p className="text-sm leading-relaxed text-cream/65">
                    All prices are subject to delivery charges
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-cream/40">
            All menus tailored to your foods requirement, types, guest list, dietary needs & venue · Full tastings available after confirming booking and changing the foods variety if required
          </p>
        </Reveal>
      </div>
    </section>
  );
}
