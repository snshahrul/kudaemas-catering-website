export function HorseMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8.2 26.5c0-6.1 2.6-10.7 8.2-13.7l.5-4.3 2.6 3.4c2.9.6 5.2 2.3 6.7 4.7.9 1.5.5 2.7-.4 3.4-.7.5-1.7.6-2.4.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 26.5h17.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="20.8" cy="13.6" r="0.7" fill="currentColor" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold">
        <HorseMark className="h-6 w-6" />
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display text-lg font-semibold tracking-tight text-cream">
            Kuda<span className="gold-shimmer">Emas</span>
          </span>
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.42em] text-gold/80">
            Catering House
          </span>
        </span>
      )}
    </span>
  );
}
