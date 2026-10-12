"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Clock, Flame, Info, Plus, Sparkle, Users } from "lucide-react";
import { Reveal, RevealText } from "./reveal";
import { MenuCalculator } from "./menu-calculator";
import { useLanguage } from "@/i18n/LanguageContext";
import { CATALOG, LIVE_STATIONS, TIERS, type Dish } from "@/lib/catalog";

export function MenuSection() {
  const { t } = useLanguage();

  const categoryLabels = t("calculator.categories") as Record<string, string>;

  const stationNames = useMemo(
    () => Object.fromEntries(LIVE_STATIONS.map((s) => [s.slug, s.name])),
    [],
  );

  const categories = useMemo(
    () => ["all", ...LIVE_STATIONS.map((s) => s.slug), ...CATALOG.map((c) => c.key)],
    [],
  );
  const [active, setActive] = useState("all");

  const visibleStations = useMemo(
    () => LIVE_STATIONS.filter((s) => active === "all" || s.slug === active),
    [active],
  );

  const cards = useMemo(() => {
    const source =
      active === "all" ? CATALOG.flatMap((c) => c.dishes.map((d) => ({ dish: d, categoryKey: c.key }))) : CATALOG.filter((c) => c.key === active).flatMap((c) => c.dishes.map((d) => ({ dish: d, categoryKey: c.key })));
    return source;
  }, [active]);

  const priceLabel = (dish: Dish) => {
    const prices = TIERS.map(({ key }) => dish.price[key]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `RM${min.toFixed(2)}` : `RM${min.toFixed(2)} – ${max.toFixed(2)}`;
  };

  return (
    <section id="menus" className="section-shell relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-rule w-12" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                  {t("menu.signature")}
                </p>
              </div>
            </Reveal>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <RevealText text={t("menu.title1")} />{" "}
              <RevealText text={t("menu.title2")} delay={0.15} className="italic gold-shimmer" />
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
                  {cat === "all" ? t("common.all") : (stationNames[cat] ?? categoryLabels[cat] ?? cat)}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {cards.map(({ dish, categoryKey }, i) => (
              <motion.article
                layout
                key={dish.slug}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border border-cream/10 bg-fern"
              >
                {dish.image && (
                  <div className="relative aspect-[16/11] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-fern via-transparent to-transparent" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {dish.featured && (
                      <span className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-forest">
                        <Sparkle className="h-3 w-3" />
                        {t("menu.legend")}
                      </span>
                    )}
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">
                      {categoryLabels[categoryKey] ?? categoryKey}
                    </p>
                    <span className="ml-auto rounded-full border border-gold/40 bg-forest/80 px-3 py-1.5 text-[10px] font-bold tracking-wide text-gold">
                      {priceLabel(dish)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-medium text-cream transition-colors group-hover:text-gold">
                    {dish.name}
                  </h3>
                  <a
                    href="#reserve"
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80 transition-colors hover:text-gold"
                  >
                    {t("menu.includeEvent")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            ))}

            {/* Live stations — priced separately from per-pax dishes */}
            {visibleStations.map((station, si) => (
                <motion.article
                  layout
                  key={station.slug}
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, delay: 0.05 + si * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="card-lift group relative flex flex-col overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-fern via-pine to-forest"
                >
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(201,162,75,0.18),transparent_60%)]" />
                    {station.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={station.image}
                        alt={station.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                    {!station.image && (
                      <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/40 bg-forest/70 text-gold shadow-[0_0_40px_rgba(201,162,75,0.35)]">
                        <Flame className="h-9 w-9" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                        <Flame className="h-3 w-3" />
                        {t("menu.liveStation")}
                      </span>
                      <span className="ml-auto rounded-full border border-gold/40 bg-forest/80 px-3 py-1.5 text-[10px] font-bold tracking-wide text-gold">
                        RM{Math.min(...TIERS.map(({ key }) => station.price[key])).toFixed(2)} – RM
                        {Math.max(...TIERS.map(({ key }) => station.price[key])).toFixed(2)}
                        <span className="ml-1 text-[9px] font-semibold uppercase tracking-wider text-gold/70">
                          {t("menu.perStick")}
                        </span>
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-medium text-cream transition-colors group-hover:text-gold">
                      {station.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/60">
                      {t("menu.stationIncludes")}
                    </p>
                    <a
                      href="#reserve"
                      className="mt-auto inline-flex items-center gap-2 pt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80 transition-colors hover:text-gold"
                    >
                      {t("menu.includeEvent")}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </motion.div>

        {/* Buffet Katering Pricing */}
        <Reveal delay={0.2}>
          <div className="glass-panel relative mt-16 overflow-hidden rounded-3xl p-8 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] sm:p-10">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold/[0.07] blur-[80px]" />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
              {/* Main pricing */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold">
                    <Users className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-2xl font-medium text-cream">
                    {t("menu.buffetTitle")}
                  </h3>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/65">
                  {t("menu.buffetIncludes")}
                </p>
              </div>

              {/* Terms & conditions */}
              <div className="flex-1 space-y-3">
                {[
                  { icon: Info, key: "menu.deliveryFee" },
                  { icon: Info, key: "menu.paxIncrementDesc" },
                  { icon: Plus, key: "menu.smallOrderFee" },
                  { icon: Clock, key: "menu.finalizationDesc" },
                  { icon: Clock, key: "menu.teardownTime" },
                ].map(({ icon: Icon, key }) => (
                  <div
                    key={key}
                    className="flex items-start gap-3 rounded-xl border-l-2 border-gold/60 bg-gold/[0.07] px-4 py-3 transition-colors hover:border-gold hover:bg-gold/[0.12]"
                  >
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-sm font-medium leading-relaxed text-cream/90">
                      {t(key)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Menu Foods & Beverages Calculator */}
        <Reveal delay={0.2}>
          <div className="mt-16">
            <div className="mb-8 flex items-center gap-4">
              <span className="gold-rule w-12" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                {t("menu.budgetEstimate")}
              </p>
            </div>
            <MenuCalculator />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-cream/40">
            {t("menu.tailoredNote")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
