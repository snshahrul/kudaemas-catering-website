"use client";

import { Reveal, RevealText } from "./reveal";
import { Check, ChefHat, ClipboardCheck, Flame, Heart, Package, Truck, UtensilsCrossed } from "lucide-react";

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Menu Planning & Consultation",
    description:
      "We begin with a detailed consultation to understand your vision, dietary requirements, guest count, and budget. Our chefs craft a bespoke menu tailored to your event.",
  },
  {
    icon: ChefHat,
    title: "Sourcing & Ingredient Selection",
    description:
      "We source from the halalan toyyiban - comprehensive needs in consumption, products, and life, the freshest, highest-quality ingredients from trusted suppliers. Every ingredient is inspected for quality, freshness, and authenticity before entering our kitchen.",
  },
  {
    icon: Flame,
    title: "Preparation & Cooking",
    description:
      "Our master chefs prepare each dish with precision and passion, following traditional recipes enhanced with modern techniques. Every dish is cooked to perfection.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Check & Tasting",
    description:
      "Before any dish leaves the kitchen, it undergoes rigorous quality checks and tasting sessions. We ensure every flavor, presentation, and temperature meets our golden standard.",
  },
  {
    icon: Package,
    title: "Professional Packaging",
    description:
      "Dishes are carefully packaged using professional-grade containers that maintain temperature, freshness, and presentation during transport to your venue.",
  },
  {
    icon: Truck,
    title: "Timely Delivery & Setup",
    description:
      "Our logistics team ensures punctual delivery and professional setup at your venue. We handle everything from chafing stations to decorative presentation.",
  },
  {
    icon: UtensilsCrossed,
    title: "Live Service & Monitoring",
    description:
      "Our trained brigade manages the entire service — from live cooking stations to buffet management — ensuring seamless flow and guest satisfaction throughout the event.",
  },
  {
    icon: Heart,
    title: "Post-Event Follow-Up",
    description:
      "We value your feedback. After every event, we follow up to ensure your complete satisfaction and gather insights to continuously improve our service.",
  },
];

export function QualityManagement() {
  return (
    <section id="quality" className="relative bg-moss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-rule w-12" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                  Quality Management
                </p>
              </div>
            </Reveal>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <RevealText text="From Kitchen" />{" "}
              <RevealText text="to Guest Table" delay={0.15} className="italic gold-shimmer" />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md leading-relaxed text-cream/60">
              Every dish that reaches your table has journeyed through our rigorous
              quality management process — ensuring excellence at every step.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* Vertical line connecting steps */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent sm:left-8" />

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={0.1 + i * 0.08}>
                <div className="group relative flex gap-6 sm:gap-8">
                  {/* Step number circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-gold/40 bg-forest text-gold transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-forest sm:h-16 sm:w-16">
                    <step.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  {/* Step content */}
                  <div className="flex-1 rounded-2xl border border-cream/10 bg-fern/50 p-6 transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-[0_8px_40px_-12px_rgba(201,162,75,0.2)] sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-sm font-semibold text-gold/60">
                        Step {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px flex-1 bg-cream/10" />
                      <Check className="h-4 w-4 text-gold/40 transition-colors group-hover:text-gold" />
                    </div>
                    <h3 className="mt-3 font-display text-xl font-medium text-cream sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-cream/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-3xl border border-gold/25 bg-fern/80 p-8 text-center backdrop-blur-sm sm:p-12">
            <h3 className="font-display text-2xl font-medium text-cream sm:text-3xl">
              Our <span className="italic gold-shimmer">Golden Promise</span>
            </h3>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-cream/65">
              Every event is a reflection of your trust in us. We uphold the highest
              standards of quality, hygiene, and service — because your special day
              deserves nothing less than perfection.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
