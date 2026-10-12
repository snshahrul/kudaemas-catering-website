"use client";

import { ArrowUpRight, Briefcase, Gem, Heart, Flame } from "lucide-react";
import { Reveal, RevealText } from "./reveal";
import { useLanguage } from "@/i18n/LanguageContext";

const SERVICE_ICONS = [Heart, Briefcase, Gem, Flame];

const SERVICE_SLUGS = ["weddings", "corporate", "private", "live-stations"];

export function Services() {
  const { t } = useLanguage();
  const items = t("services.items");

  return (
    <section id="services" className="section-shell relative overflow-hidden border-y border-gold/10 bg-moss py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-rule w-12" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                  {t("services.eyebrow")}
                </p>
              </div>
            </Reveal>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <RevealText text={t("services.title1")} />{" "}
              <RevealText text={t("services.title2")} delay={0.15} className="italic gold-shimmer" />{" "}
              <RevealText text={t("services.title3")} delay={0.25} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md leading-relaxed text-cream/60">
              {t("services.description")}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((service: { title: string; description: string; tag: string }, i: number) => {
            const Icon = SERVICE_ICONS[i] ?? Heart;
            return (
              <Reveal key={service.title} delay={0.08 + i * 0.08} className="h-full">
                <a
                  href="#reserve"
                  className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream/10 bg-fern/90 p-7"
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/15" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-forest">
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-cream/25 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-gold" />
                  </div>
                  <h3 className="mt-7 font-display text-2xl font-medium text-cream">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-cream/60">
                    {service.description}
                  </p>
                  <p className="mt-6 border-t border-cream/10 pt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold/80">
                    {service.tag}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
