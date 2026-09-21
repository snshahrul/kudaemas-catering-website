/* Single source of truth for the catering menu.
   Used by the Menu Calculator (per-tier prices) and the Signature Menus
   grid (category + per-tier price display). */

export type TierKey = "tier100" | "tier60" | "tier40";

export type Dish = {
  /** slug used for i18n lookup (calculator.dishes.<category>[index]) */
  slug: string;
  /** fallback name — used when the i18n dictionary has no translation */
  name: string;
  price: Record<TierKey, number>;
  /** photo path under /public for the menus grid (omit when no photo) */
  image?: string;
  /** show the "Signature Legend" badge in the menus grid */
  featured?: boolean;
};

export type CatalogCategory = {
  key: string;
  /** i18n key suffix under calculator.categories */
  dishes: Dish[];
};

export const TIERS: { key: TierKey }[] = [
  { key: "tier100" },
  { key: "tier60" },
  { key: "tier40" },
];

export const CATALOG: CatalogCategory[] = [
  {
    key: "nasi",
    dishes: [
      { slug: "nasi-minyak", name: "Nasi Minyak", price: { tier100: 2.0, tier60: 2.5, tier40: 3.5 }, image: "/nasi-minyak.jpg", featured: true },
      { slug: "nasi-beriyani", name: "Nasi Beriyani", price: { tier100: 2.5, tier60: 3.0, tier40: 4.0 }, image: "/nasi-beriyani.jpeg" },
      { slug: "nasi-putih", name: "Nasi Putih", price: { tier100: 1.0, tier60: 1.5, tier40: 2.5 }, image: "/nasi-putih.jpg" },
    ],
  },
  {
    key: "ayam",
    dishes: [
      { slug: "ayam-merah", name: "Ayam Merah", price: { tier100: 3.0, tier60: 3.5, tier40: 4.0 }, image: "/ayam-merah.jpg" },
      { slug: "ayam-rendang", name: "Ayam Rendang", price: { tier100: 3.0, tier60: 3.5, tier40: 4.0 }, image: "/ayam-rendang.jpeg" },
      { slug: "ayam-goreng", name: "Ayam Goreng", price: { tier100: 2.5, tier60: 3.0, tier40: 3.5 }, image: "/ayam-goreng.jpg" },
    ],
  },
  {
    key: "daging",
    dishes: [
      { slug: "daging-rendang", name: "Daging Rendang", price: { tier100: 3.0, tier60: 3.5, tier40: 4.0 }, image: "/daging-rendang.jpg", featured: true },
      { slug: "daging-kari", name: "Daging Kari", price: { tier100: 3.0, tier60: 3.5, tier40: 4.0 }, image: "/daging-kari.jpg" },
      { slug: "daging-gulai-kawah", name: "Daging Gulai Kawah", price: { tier100: 3.5, tier60: 4.0, tier40: 4.5 }, image: "/daging-gulai-kawah.jpg" },
    ],
  },
  {
    key: "veg",
    dishes: [
      { slug: "acar-buah", name: "Acar Buah", price: { tier100: 1.0, tier60: 1.2, tier40: 1.5 }, image: "/acar-buah.jpeg" },
      { slug: "acar-timun-nenas", name: "Acar Timun & Nenas", price: { tier100: 1.0, tier60: 1.5, tier40: 1.5 }, image: "/acar-timun.jpg" },
      { slug: "acar-bombay", name: "Acar Bombay", price: { tier100: 1.2, tier60: 1.5, tier40: 1.7 }, image: "/acar-bombay.jpg" },
    ],
  },
  {
    key: "buah",
    dishes: [
      { slug: "buah-buahan", name: "Buah-buahan", price: { tier100: 1.0, tier60: 1.5, tier40: 2.0 }, image: "/buah-buahan.webp" },
    ],
  },
  {
    key: "dessert",
    dishes: [
      { slug: "kuih-campur", name: "Kuih Campur", price: { tier100: 1.2, tier60: 1.5, tier40: 1.8 }, image: "/kuih-campur.webp", featured: true },
      { slug: "kuih-lapis", name: "Kuih Lapis", price: { tier100: 1.0, tier60: 1.2, tier40: 1.5 }, image: "/kuih-lapis.jpg" },
    ],
  },
];

export const CATEGORY_KEYS = CATALOG.map((c) => c.key);

export type CategoryKey = (typeof CATEGORY_KEYS)[number];
