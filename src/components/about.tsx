import { Flame } from "lucide-react";
import { Reveal, RevealText } from "./reveal";

const PILLARS = [
  {
    number: "01",
    title: "Uncompromising Quality",
    description:
      "We source the freshest, highest-quality ingredients and prepare every dish with precision and passion. We never cut corners, because we know that every bite reflects on you and your event.",
  },
  {
    number: "02",
    title: "Reliability & Precision",
    description:
      "We understand that your event is a once-in-a-lifetime moment for many of your guests. We are committed to being punctual, organized, and detail-oriented, ensuring that your timeline is respected and your event runs seamlessly from setup to breakdown.",
  },
  {
    number: "03",
    title: "Personalized Service",
    description:
      'We do not believe in "one-size-fits-all." We take the time to listen to your vision, dietary needs, and budget constraints. We are committed to collaborating with you to create a custom menu that tells your story and delights your guests.',
  },
];

export function About() {
  return (
    <section id="about" className="section-shell relative overflow-hidden py-24 sm:py-32">
      {/* Ghost typography */}
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[18vw] font-semibold leading-none opacity-[0.06]"
      >
        Kuda Emas
      </span>
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-[-160px] top-1/3 h-[380px] w-[380px] rounded-full bg-gold/[0.06] blur-[110px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Imagery collage */}
        <div className="relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-cream/10 shadow-[0_36px_80px_-30px_rgba(0,0,0,0.75)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-a.jpg"
                alt="Chefs plating gourmet dishes in the KudaEmas kitchen"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-cream/10 bg-forest/70 px-4 py-3 backdrop-blur-md">
                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold">
                  Live-fire kitchen
                </span>
                <span className="font-display text-sm italic text-cream/80">Est. 2025</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2} className="absolute -bottom-10 -right-2 w-[46%] sm:-right-8">
            <div className="overflow-hidden rounded-2xl border-4 border-forest shadow-2xl shadow-black/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about-b.jpg"
                alt="Chef adding finishing touches to a dish"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal delay={0.35} className="absolute -left-3 top-8 sm:-left-8">
            <div className="animate-float-soft flex items-center gap-3 rounded-full border border-gold/30 bg-forest/90 px-5 py-3 shadow-[0_16px_40px_-12px_rgba(201,162,75,0.4)] backdrop-blur-md">
              <Flame className="h-5 w-5 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream/90">
                Briyani and its combination
              </span>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="pt-8 lg:pt-0">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="gold-rule w-12" />
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                Our Commitment
              </p>
            </div>
          </Reveal>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
            <RevealText text="Our Commitment" />{" "}
            <RevealText text="to You" delay={0.15} className="italic gold-shimmer" />
          </h2>
          <Reveal delay={0.25}>
            <p className="mt-7 max-w-xl leading-relaxed text-cream/70">
              At KudaEmas, we believe that great food is only half the story. The
              other half is the trust you place in us to deliver an exceptional
              experience. We are deeply committed to every client we serve, and we
              uphold that commitment through three core pillars:
            </p>
          </Reveal>

          <div className="mt-10 space-y-5">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.number} delay={0.3 + i * 0.1}>
                <div className="card-lift glass-panel rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 font-display text-sm font-semibold text-gold">
                      {pillar.number}
                    </span>
                    <h3 className="font-display text-xl font-medium text-cream">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-cream/60">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.6}>
            <p className="mt-8 max-w-xl leading-relaxed text-cream/70">
              We don't just cater events; we build relationships. Your
              satisfaction is our success, and we are honored to be a part of your
              special day.
            </p>
          </Reveal>
          <Reveal delay={0.7}>
            <p className="mt-4 font-display text-lg italic text-gold/80">
              Sincerely,
              <br />
              The Team at KudaEmas
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
