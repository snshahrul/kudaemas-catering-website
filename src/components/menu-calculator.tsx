"use client";

import { useCallback, useMemo, useState } from "react";
import { Calculator, ChevronDown, Minus, Plus, RotateCcw, Trash2 } from "lucide-react";
import { Reveal } from "./reveal";

/* ------------------------------------------------------------------ */
/*  Menu data                                                          */
/* ------------------------------------------------------------------ */

type CatalogItem = { name: string; price: number };

const FOOD_MENU: CatalogItem[] = [
  { name: "Nasi Minyak", price: 5.0 },
  { name: "Nasi Briyani", price: 6.0 },
  { name: "Nasi Putih", price: 3.0 },
  { name: "Ayam Masak Merah", price: 7.0 },
  { name: "Ayam Goreng Berempah", price: 7.5 },
  { name: "Ayam Kurma", price: 3.5 },
  { name: "Daging Rendang", price: 9.0 },
  { name: "Ikan Bakar", price: 8.5 },
  { name: "Udang Harimau", price: 12.0 },
  { name: "Sotong Goreng Tepung", price: 10.0 },
  { name: "Kambing Panggang", price: 14.0 },
];

const BEVERAGE_MENU: CatalogItem[] = [
  { name: "Teh O Ais", price: 2.0 },
  { name: "Kopi O", price: 2.0 },
  { name: "Sirap Bandung", price: 2.5 },
  { name: "Air Buah Campur", price: 3.0 },
  { name: "Air Cordial", price: 2.5 },
  { name: "Teh Tarik", price: 2.5 },
  { name: "Air Mineral", price: 1.5 },
  { name: "Jus Oren", price: 3.5 },
  { name: "Jus Tembikai", price: 3.5 },
  { name: "Air Katira", price: 3.0 },
];

const VEGETABLE_MENU: CatalogItem[] = [
  { name: "Sayur Campur", price: 3.0 },
  { name: "Kangkung Belacan", price: 3.0 },
  { name: "Pucuk Paku Goreng", price: 3.5 },
  { name: "Terung Goreng", price: 3.0 },
  { name: "Ulam-ulaman", price: 3.5 },
  { name: "Salad Sayur", price: 4.0 },
  { name: "Acar Jelatah", price: 2.5 },
  { name: "Sayur Lodeh", price: 3.5 },
  { name: "Kobis Goreng", price: 2.5 },
  { name: "Taugeh Goreng", price: 2.5 },
];

const DESSERT_MENU: CatalogItem[] = [
  { name: "Kuih-muih Campur", price: 3.0 },
  { name: "Puding Karamel", price: 3.5 },
  { name: "ABC (Ais Kacang)", price: 3.5 },
  { name: "Bubur Kacang Hijau", price: 3.0 },
  { name: "Puding Raja", price: 4.0 },
  { name: "Buah-buahan Potong", price: 3.5 },
  { name: "Kek Lapis", price: 4.5 },
  { name: "Sago Gula Melaka", price: 3.5 },
  { name: "Pengat Pisang", price: 3.0 },
  { name: "Cendol", price: 3.5 },
];

type CategoryKey = "food" | "beverage" | "vegetable" | "dessert";

const CATALOG: Record<CategoryKey, CatalogItem[]> = {
  food: FOOD_MENU,
  beverage: BEVERAGE_MENU,
  vegetable: VEGETABLE_MENU,
  dessert: DESSERT_MENU,
};

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  food: "Food",
  beverage: "Beverages",
  vegetable: "Vegetables",
  dessert: "Desserts",
};

const CATEGORY_ICONS: Record<CategoryKey, string> = {
  food: "🍛",
  beverage: "🥤",
  vegetable: "🥬",
  dessert: "🍰",
};

/* ------------------------------------------------------------------ */
/*  Row state                                                          */
/* ------------------------------------------------------------------ */

type Row = {
  id: number;
  category: CategoryKey;
  itemIndex: number; // index into CATALOG[category]
  qty: number;
};

let nextId = 1;

function emptyRow(category: CategoryKey = "food"): Row {
  return { id: nextId++, category, itemIndex: 0, qty: 1 };
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MenuCalculator() {
  const [rows, setRows] = useState<Row[]>([
    emptyRow("food"),
    emptyRow("beverage"),
    emptyRow("vegetable"),
    emptyRow("dessert"),
  ]);

  /* helpers */
  const update = useCallback(
    (id: number, patch: Partial<Row>) =>
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r))),
    [],
  );

  const remove = useCallback(
    (id: number) =>
      setRows((prev) => {
        if (prev.length <= 1) return prev; // keep at least one row
        return prev.filter((r) => r.id !== id);
      }),
    [],
  );

  const addRow = useCallback(
    (category: CategoryKey = "food") =>
      setRows((prev) => [...prev, emptyRow(category)]),
    [],
  );

  const reset = useCallback(
    () =>
      setRows([
        emptyRow("food"),
        emptyRow("beverage"),
        emptyRow("vegetable"),
        emptyRow("dessert"),
      ]),
    [],
  );

  /* totals */
  const categoryTotals = useMemo(() => {
    const totals: Record<CategoryKey, number> = {
      food: 0,
      beverage: 0,
      vegetable: 0,
      dessert: 0,
    };
    rows.forEach((r) => {
      const item = CATALOG[r.category][r.itemIndex];
      totals[r.category] += item.price * r.qty;
    });
    return totals;
  }, [rows]);

  const grandTotal = useMemo(
    () => Object.values(categoryTotals).reduce((a, b) => a + b, 0),
    [categoryTotals],
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="overflow-hidden rounded-3xl border border-gold/25 bg-fern/80 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gold/15 bg-pine/30 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/10 text-gold">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-medium text-cream sm:text-2xl">
              Menu Calculator
            </h3>
            <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">
              Foods &amp; Beverages
            </p>
          </div>
        </div>
        <button
          onClick={reset}
          className="flex items-center gap-1.5 rounded-full border border-cream/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cream/60 transition-all hover:border-gold/40 hover:text-gold"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>

      {/* Rows */}
      <div className="space-y-0 divide-y divide-cream/5 px-6 py-4 sm:px-8">
        {rows.map((row) => {
          const catalog = CATALOG[row.category];
          const selectedItem = catalog[row.itemIndex];
          const lineTotal = selectedItem.price * row.qty;

          return (
            <div key={row.id} className="py-4 first:pt-2 last:pb-2">
              {/* Category label */}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">{CATEGORY_ICONS[row.category]}</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">
                  {CATEGORY_LABELS[row.category]}
                </span>
              </div>

              {/* Controls row */}
              <div className="flex flex-wrap items-end gap-3">
                {/* Category dropdown */}
                <div className="w-full sm:w-auto">
                  <label className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={row.category}
                      onChange={(e) =>
                        update(row.id, {
                          category: e.target.value as CategoryKey,
                          itemIndex: 0,
                        })
                      }
                      className="w-full appearance-none rounded-xl border border-cream/15 bg-forest/60 px-4 py-2.5 pr-10 text-sm text-cream outline-none transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/30 sm:w-44"
                    >
                      {(Object.keys(CATEGORY_LABELS) as CategoryKey[]).map((key) => (
                        <option key={key} value={key}>
                          {CATEGORY_ICONS[key]} {CATEGORY_LABELS[key]}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
                  </div>
                </div>

                {/* Item dropdown */}
                <div className="flex-1 min-w-[200px]">
                  <label className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                    Menu Item
                  </label>
                  <div className="relative">
                    <select
                      value={row.itemIndex}
                      onChange={(e) =>
                        update(row.id, { itemIndex: Number(e.target.value) })
                      }
                      className="w-full appearance-none rounded-xl border border-cream/15 bg-forest/60 px-4 py-2.5 pr-10 text-sm text-cream outline-none transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
                    >
                      {catalog.map((item, i) => (
                        <option key={i} value={i}>
                          {item.name} — RM{item.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
                  </div>
                </div>

                {/* Price per pax (read-only) */}
                <div className="w-full sm:w-auto">
                  <label className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                    Price / Pax
                  </label>
                  <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-2.5 text-sm font-semibold text-gold">
                    RM {selectedItem.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-auto">
                  <label className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                    Qty (Pax)
                  </label>
                  <div className="flex items-center gap-0 overflow-hidden rounded-xl border border-cream/15">
                    <button
                      onClick={() =>
                        update(row.id, { qty: Math.max(1, row.qty - 5) })
                      }
                      className="grid h-[42px] w-10 place-items-center bg-pine/40 text-cream/60 transition-colors hover:bg-gold/10 hover:text-gold"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={row.qty}
                      onChange={(e) =>
                        update(row.id, {
                          qty: Math.max(1, Number(e.target.value) || 1),
                        })
                      }
                      className="h-[42px] w-16 border-x border-cream/15 bg-forest/60 text-center text-sm font-semibold text-cream outline-none focus:bg-forest"
                    />
                    <button
                      onClick={() => update(row.id, { qty: row.qty + 5 })}
                      className="grid h-[42px] w-10 place-items-center bg-pine/40 text-cream/60 transition-colors hover:bg-gold/10 hover:text-gold"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Line total */}
                <div className="w-full sm:w-auto sm:ml-auto">
                  <label className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                    Total
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl border border-cream/10 bg-pine/30 px-4 py-2.5 text-sm font-bold text-cream">
                      RM {lineTotal.toFixed(2)}
                    </div>
                    <button
                      onClick={() => remove(row.id)}
                      className="grid h-[42px] w-10 place-items-center rounded-xl border border-cream/10 text-cream/30 transition-all hover:border-red-500/40 hover:text-red-400"
                      title="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add row button */}
      <div className="border-t border-cream/5 px-6 py-4 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CATEGORY_LABELS) as CategoryKey[]).map((cat) => (
            <button
              key={cat}
              onClick={() => addRow(cat)}
              className="flex items-center gap-1.5 rounded-full border border-cream/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-cream/50 transition-all hover:border-gold/40 hover:text-gold"
            >
              <Plus className="h-3 w-3" />
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Summary / Grand Total */}
      <div className="border-t border-gold/15 bg-pine/20 px-6 py-6 sm:px-8">
        {/* Category breakdown */}
        <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(CATEGORY_LABELS) as CategoryKey[]).map((cat) => (
            <div
              key={cat}
              className="rounded-xl border border-cream/8 bg-forest/40 px-4 py-3"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-cream/40">
                {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
              </p>
              <p className="mt-1 text-lg font-bold text-cream">
                RM {categoryTotals[cat].toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Grand total */}
        <div className="flex items-center justify-between rounded-2xl border border-gold/30 bg-gold/5 px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/70">
              Grand Total
            </p>
            <p className="mt-1 font-display text-3xl font-semibold text-gold sm:text-4xl">
              RM {grandTotal.toFixed(2)}
            </p>
          </div>
          <a
            href="#reserve"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-forest transition-all hover:bg-gold-soft"
          >
            Book Now
            <Plus className="h-3.5 w-3.5 rotate-45" />
          </a>
        </div>

        <p className="mt-4 text-center text-[10px] text-cream/35">
          * Prices are estimates. Final pricing confirmed upon booking.
        </p>
      </div>
    </div>
  );
}
