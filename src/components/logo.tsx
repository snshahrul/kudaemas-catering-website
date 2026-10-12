import type { CSSProperties } from "react";

const LOGO_IMAGE = "/katering-logo.jpg";

type HorseMarkProps = {
  className?: string;
  style?: CSSProperties;
};

export function HorseMark({ className = "h-9 w-9", style }: HorseMarkProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_IMAGE}
      alt="Katering KudaEmas logo"
      className={`object-cover object-center ${className}`}
      style={style}
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-gold/50 bg-gold/10">
        <HorseMark className="h-10 w-10" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-lg font-semibold tracking-tight text-cream">
            <span className="gold-shimmer">Katering</span> Kuda<span className="gold-shimmer">Emas</span>
          </span>
          <span className="mt-1 block whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.3em] text-gold/80">
            Est. 2025 · Reg. 003899142-V
          </span>
        </span>
      )}
    </span>
  );
}
