"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CATALOG, LIVE_STATIONS, type CategoryKey, type TierKey } from "@/lib/catalog";

/* ------------------------------------------------------------------ */
/*  Pax → tier mapping (mirrors menu-calculator.tsx)                    */
/* ------------------------------------------------------------------ */

function activeTier(pax: number): TierKey {
  if (pax > 100) return "tier100";
  if (pax >= 60) return "tier60";
  return "tier40";
}

export type ConfirmedSelection = {
  /** dish index per category key */
  selection: Record<CategoryKey, number>;
  /** per-stick live station price per slug (user-entered in the calculator) */
  satePrice: Record<string, number>;
  pax: number;
  perPax: number;
  grandTotal: number;
  confirmedAt: number;
};

type CalculatorContextType = {
  confirmed: ConfirmedSelection | null;
  /** Publish the current selection — called by the calculator's confirm button */
  confirm: (
    selection: Record<CategoryKey, number>,
    pax: number,
    satePrice?: Record<string, number>,
  ) => void;
  clear: () => void;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined,
);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [confirmed, setConfirmed] = useState<ConfirmedSelection | null>(null);

  const confirm = useCallback(
    (selection: Record<CategoryKey, number>, pax: number, satePrice?: Record<string, number>) => {
      const safePax = Math.max(1, Math.floor(pax) || 1);
      const tier = activeTier(safePax);
      let perPax = 0;
      CATALOG.forEach((category) => {
        const dish = category.dishes[selection[category.key]];
        perPax += dish.price[tier];
      });
      const sate = satePrice ?? {};
      LIVE_STATIONS.forEach((station) => {
        perPax += sate[station.slug] ?? 0;
      });
      setConfirmed({
        selection,
        satePrice: sate,
        pax: safePax,
        perPax,
        grandTotal: perPax * safePax,
        confirmedAt: Date.now(),
      });
    },
    [],
  );

  const clear = useCallback(() => setConfirmed(null), []);

  const value = useMemo(
    () => ({ confirmed, confirm, clear }),
    [confirmed, confirm, clear],
  );

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
