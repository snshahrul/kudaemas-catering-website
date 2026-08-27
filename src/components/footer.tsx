import { ArrowUp } from "lucide-react";
import { HorseMark } from "./logo";

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const EXPLORE = [
  { label: "The House", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Menus", href: "#menus" },
  { label: "Gallery", href: "#gallery" },
  { label: "Quality Management", href: "#quality" },
];

const SERVICES = [
  "Weddings & Receptions",
  "Corporate & Summits",
  "Private Celebrations",
  "Live Stations & Crew",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 bg-forest">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold">
                <HorseMark className="h-7 w-7" />
              </span>
              <div className="leading-none">
                <p className="font-display text-2xl font-semibold tracking-tight text-cream">
                  Kuda<span className="gold-shimmer">Emas</span>
                </p>
                <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.42em] text-gold/80">
                  Catering House · Est. 2025
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/55">
              The golden standard of Malaysian catering — tradisional wedding food, live
              fire stations and grand buffets for celebrations across Malaysia.
            </p>
            <div className="mt-7 flex gap-3">
              {[
                { icon: InstagramIcon, label: "Instagram" },
                { icon: FacebookIcon, label: "Facebook" },
                { icon: YoutubeIcon, label: "YouTube" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/60 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-forest"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {EXPLORE.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-cream/60">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">
              The Kitchen
            </p>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-cream/60">
              <p>
                10-15-37, Tingkat 15
                <br />
                Desa Mentari Apartment Block 10
                <br />
                46060 Petaling Jaya
                <br />
                Selangor, Malaysia
              </p>
              <p>
                <a href="tel:+601139794166" className="transition-colors hover:text-gold">
                   +6011-3979 4166 / +6018-355 1765
                 </a>
                <br />
                <a href="mailto:kudaemas.app@gmail.com" className="transition-colors hover:text-gold">
                   kudaemas.app@gmail.com
                 </a>
              </p>
              <p className="text-cream/45">
                Office hours · Mon–Sat, 08.00–20.00 WIB
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/40">
            © {new Date().getFullYear()} KudaEmas Catering House. All rights reserved.
          </p>
          <p className="font-display text-sm italic text-gold/70">
            Crafted with fire in Malaysia
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cream/50 transition-colors hover:text-gold"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-forest">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
