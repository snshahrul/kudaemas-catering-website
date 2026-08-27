import { ArrowUpRight, Briefcase, Gem, Heart, Flame } from "lucide-react";
import { Reveal, RevealText } from "./reveal";

const SERVICES = [
  {
    icon: Heart,
    title: "Weddings & Foods Arrangements",
    description:
      "Golden banquet halls, garden pavilions, cliff-top villas. Full styling, chafing lines, carving boards and a serving brigade in traditional attire.",
    tag: "From 100 to 600 pax",
  },
  {
    icon: Briefcase,
    title: "Corporate & Summits",
    description:
      "Executive luncheons, 800-delegate summits, product launches. Punctual, discreet, dietary-inclusive — with invoices your finance team will love.",
    tag: "Same-day proposals",
  },
  {
    icon: Gem,
    title: "Private Celebrations",
    description:
      "Milestone birthdays, anniversaries, family reunions. A personal chef and butler team staging rijsttafel theater in your own home or villa.",
    tag: "Chef's table at home",
  },
  {
    icon: Flame,
    title: "Live Stations & Crew",
    description:
      "Sate grill, wok-fire nasi goreng, gudeg cauldrons and kue towers — staffed stations that turn dinner into performance art.",
    tag: "Interactive theater",
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-moss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-rule w-12" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                  What We Stage
                </p>
              </div>
            </Reveal>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <RevealText text="Four stages," />{" "}
              <RevealText text="one golden" delay={0.15} className="italic gold-shimmer" />{" "}
              <RevealText text="standard" delay={0.25} />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md leading-relaxed text-cream/60">
              Every engagement includes menu design, on-site brigade, elegant
              disposables or chinaware, and a floor captain who owns your
              timeline from first plate to last toast.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={0.08 + i * 0.08} className="h-full">
              <a
                href="#reserve"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-fern p-7 transition-all duration-500 hover:-translate-y-2 hover:border-gold/40 hover:shadow-[0_24px_60px_-20px_rgba(201,162,75,0.35)]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all duration-500 group-hover:bg-gold/15" />
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-forest">
                    <service.icon className="h-5 w-5" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
