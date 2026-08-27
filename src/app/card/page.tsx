import type { Metadata } from "next";
import { HorseMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "KudaEmas Catering House — Digital Name Card",
  description:
    "KudaEmas Catering House · The Golden Standard of Malaysian Catering · Est. 2025",
};

export default function NameCard() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-forest p-4">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-fern via-moss to-forest shadow-[0_0_80px_-20px_rgba(201,162,75,0.25)]">
        {/* Top gold accent */}
        <div className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Decorative glow */}
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-1/3 translate-x-1/3 rounded-full bg-gold/[0.07] blur-[80px]" />

        <div className="relative p-10 text-center sm:p-12">
          {/* Logo */}
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-gold/40 bg-gold/10 text-gold shadow-[0_0_40px_rgba(201,162,75,0.2)]">
            <HorseMark className="h-14 w-14" />
          </div>

          {/* Brand name */}
          <h1 className="mt-8 font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            Kuda<span className="gold-shimmer">Emas</span>
          </h1>

          {/* Tagline */}
          <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.42em] text-gold/80">
            Catering House · Est. 2025
          </p>

          {/* Divider */}
          <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {/* Description */}
          <p className="mx-auto mt-8 max-w-xs text-sm leading-relaxed text-cream/60">
            The golden standard of Malaysian catering — tradisional wedding food,
            live fire stations and grand buffets for celebrations across Malaysia.
          </p>

          {/* Contact details */}
          <div className="mt-8 space-y-3">
            <a
              href="tel:+601139794166"
              className="flex items-center justify-center gap-3 text-sm text-cream/70 transition-colors hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-gold/60"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +6011-3979 4166 / +6018-355 1765
            </a>
            <a
              href="mailto:kudaemas.app@gmail.com"
              className="flex items-center justify-center gap-3 text-sm text-cream/70 transition-colors hover:text-gold"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-gold/60"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              kudaemas.app@gmail.com
            </a>
            <div className="flex items-center justify-center gap-3 text-sm text-cream/70">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-gold/60"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-center leading-relaxed">
                10-15-37, Tingkat 15
                <br />
                Desa Mentari Apartment Block 10
                <br />
                46060 Petaling Jaya, Selangor
              </span>
            </div>
          </div>

          {/* Bottom gold accent */}
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="mt-4 font-display text-xs italic text-gold/50">
            Crafted with fire in Malaysia
          </p>
        </div>
      </div>
    </main>
  );
}
