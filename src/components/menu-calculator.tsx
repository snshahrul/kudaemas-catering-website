"use client";

import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Calculator,
  ChevronDown,
  Equal,
  Info,
  MousePointerClick,
  Tag,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { CATALOG, TIERS, type CategoryKey, type TierKey } from "@/lib/catalog";
import { useCalculator } from "./calculator-context";

/* ------------------------------------------------------------------ */
/*  Pax → tier mapping: 100+ gets the bulk rate, 60–100 the mid rate,  */
/*  anything below 60 the smallest-tier rate.                          */
/* ------------------------------------------------------------------ */

function activeTier(pax: number): TierKey {
  if (pax > 100) return "tier100";
  if (pax >= 60) return "tier60";
  return "tier40";
}

const DEFAULT_PAX = 100;

const myr = (value: number) =>
  value.toLocaleString("en-MY", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MenuCalculator() {
  const { t } = useLanguage();

  const [selection, setSelection] = useState<Record<CategoryKey, number>>({
    nasi: 0,
    ayam: 0,
    daging: 0,
    veg: 0,
    buah: 0,
    dessert: 0,
  });
  const [pax, setPax] = useState(DEFAULT_PAX);
  const { confirm } = useCalculator();
  const [justConfirmed, setJustConfirmed] = useState(false);

  const dishNames = t("calculator.dishes") as Record<CategoryKey, string[]>;

  const tierTotals = useMemo(() => {
    const totals: Record<TierKey, number> = { tier100: 0, tier60: 0, tier40: 0 };
    CATALOG.forEach((category) => {
      const dish = category.dishes[selection[category.key]];
      TIERS.forEach(({ key: tier }) => {
        totals[tier] += dish.price[tier];
      });
    });
    return totals;
  }, [selection]);

  const safePax = Math.max(1, Math.floor(pax) || 1);
  const appliedTier = activeTier(safePax);
  const grandTotal = tierTotals[appliedTier] * safePax;

  const selectDish = (key: CategoryKey, index: number) =>
    setSelection((prev) => ({ ...prev, [key]: index }));

  const onPaxChange = (value: string) => {
    if (value === "") {
      setPax(0); // render as 1, but keep field empty while typing
      return;
    }
    setPax(Math.max(0, Math.floor(Number(value) || 0)));
  };

  const onConfirm = () => {
    confirm(selection, safePax);
    setJustConfirmed(true);
    window.setTimeout(() => setJustConfirmed(false), 2500);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/25 bg-fern/80 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gold/15 bg-pine/30 px-6 py-5 sm:px-8">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/10 text-gold">
          <UtensilsCrossed className="h-6 w-6" />
        </span>
        <h3 className="font-display text-xl font-medium tracking-tight text-cream sm:text-2xl">
          {t("calculator.title")}
        </h3>
        <span className="ml-auto hidden items-center gap-2 rounded-full border border-gold/20 bg-pine/50 px-4 py-2 text-xs font-medium text-cream/70 sm:flex">
          <Users className="h-3.5 w-3.5 text-gold/80" />
          {t("calculator.groupSize")}
        </span>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto px-4 sm:px-6">
        <table className="w-full min-w-[720px] overflow-hidden rounded-2xl border border-gold/15 text-sm">
          <thead>
            <tr className="bg-pine/60 text-cream">
              <th className="px-5 py-4 text-left font-semibold tracking-wide">
                {t("calculator.menuCategory")}
              </th>
              {TIERS.map(({ key: tier }) => (
                <th key={tier} className="px-3 py-4 text-center font-semibold tracking-wide">
                  <span className="block whitespace-nowrap">{t(`calculator.${tier}`)}</span>
                  <span className="mt-1 inline-block rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                    {t(`calculator.${tier}Badge`)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATALOG.map((category) => (
              <tr
                key={category.key}
                className="border-t border-gold/10 transition-colors hover:bg-pine/20"
              >
                <td className="bg-forest/50 px-5 py-4">
                  <div className="relative">
                    <select
                      value={selection[category.key]}
                      onChange={(e) => selectDish(category.key, Number(e.target.value))}
                      aria-label={dishNames[category.key][selection[category.key]]}
                      className="w-full max-w-[230px] cursor-pointer appearance-none rounded-xl border border-gold/25 bg-fern py-2.5 pl-4 pr-10 text-sm font-semibold text-cream outline-none transition-all hover:border-gold/50 focus:border-gold focus:ring-1 focus:ring-gold/30"
                    >
                      {category.dishes.map((dish, i) => (
                        <option key={dish.slug} value={i} className="bg-fern text-cream">
                          {dishNames[category.key][i] ?? dish.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold/60" />
                  </div>
                </td>
                {TIERS.map(({ key: tier }) => (
                  <td key={tier} className="px-3 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5 text-sm font-bold text-gold-soft">
                      <Tag className="h-3.5 w-3.5 text-gold/60" />
                      {category.dishes[selection[category.key]].price[tier].toFixed(2)}
                    </span>
                  </td>
                ))}
              </tr>
            ))}

            {/* Total per pax row — each tier sums its own prices */}
            <tr className="border-y border-gold/25 bg-pine/40">
              <td className="px-5 py-4 text-left">
                <span className="flex items-center gap-2 font-display text-base font-semibold text-gold">
                  <Calculator className="h-4 w-4" />
                  {t("calculator.totalPerPax")}
                </span>
              </td>
              {TIERS.map(({ key: tier }) => (
                <td key={tier} className="px-3 py-4 text-center">
                  <span
                    className={[
                      "inline-block rounded-full border px-4 py-1.5 text-base font-bold transition-all",
                      tier === appliedTier
                        ? "border-gold bg-gold/25 text-gold-bright shadow-[0_0_16px_rgba(201,162,75,0.25)]"
                        : "border-gold/40 bg-gold/15 text-gold",
                    ].join(" ")}
                  >
                    MYR {tierTotals[tier].toFixed(2)}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Grand total */}
      <div className="mx-4 mt-6 mb-6 sm:mx-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gold/30 bg-pine/40 px-5 py-5 sm:px-7">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 font-display text-base font-semibold text-cream">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/10 text-gold">
                <Calculator className="h-4.5 w-4.5" />
              </span>
              {t("calculator.totalPax")}
            </span>
            <label className="flex items-center gap-2 rounded-xl border border-gold/30 bg-forest/70 py-1.5 pl-4 pr-1.5">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-cream/60">
                <Users className="h-3.5 w-3.5 text-gold/70" />
                {t("calculator.quantity")}
              </span>
              <input
                type="number"
                min={1}
                step={1}
                value={pax || ""}
                onChange={(e) => onPaxChange(e.target.value)}
                aria-label={t("calculator.totalPax")}
                className="w-20 rounded-lg bg-gold/5 py-2 text-center text-base font-bold text-cream outline-none transition-all focus:bg-gold/10 focus:ring-1 focus:ring-gold/40"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-forest/60 px-4 py-2 text-xs font-medium text-cream/60">
              <Equal className="h-3.5 w-3.5 text-gold/80" />
              {t("calculator.formula")} {safePax} {t("calculator.paxSuffix")}
            </span>
            <span className="rounded-2xl border border-gold/40 bg-gold/10 px-6 py-3 font-display text-2xl font-bold tracking-tight text-gold shadow-[0_4px_12px_rgba(0,0,0,0.3)] sm:text-3xl">
              <span className="mr-1.5 text-sm font-semibold text-cream/60">MYR</span>
              {myr(grandTotal)}
            </span>
            <button
              type="button"
              onClick={onConfirm}
              className="btn-sheen group flex items-center gap-2.5 rounded-full bg-gold px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-forest transition-all duration-300 hover:bg-gold-bright hover:shadow-[0_0_36px_rgba(201,162,75,0.45)]"
            >
              {justConfirmed ? (
                <>
                  <BadgeCheck className="h-4 w-4" />
                  {t("calculator.confirmed")}
                </>
              ) : (
                <>
                  <BadgeCheck className="h-4 w-4" />
                  {t("calculator.confirmSelection")}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer notes */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/15 bg-pine/20 px-6 py-4 text-xs text-cream/50 sm:px-8">
        <span className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-gold/70" />
          {t("calculator.note1")}
        </span>
        <span className="flex items-center gap-1.5">
          <MousePointerClick className="h-3.5 w-3.5 text-gold/70" />
          {t("calculator.note2")}
        </span>
        <span className="text-cream/30">{t("calculator.disclaimer")}</span>
      </div>
    </div>
  );
}
