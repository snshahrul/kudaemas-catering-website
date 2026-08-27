import { Reveal, RevealText } from "./reveal";

const IMAGES = [
  {
    src: "/gallery-1.webp",
    alt: "Traditional Malay wedding feast",
    caption: "Traditional Feast · Malaysia",
    span: "sm:col-span-2 sm:row-span-2",
    aspect: "aspect-[4/3] sm:aspect-auto sm:h-full",
  },
  {
    src: "/gallery-2.webp",
    alt: "Elegant catering setup",
    caption: "Elegant Setup · Malaysia",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/gallery-3.png",
    alt: "Live cooking station",
    caption: "Live Station · Malaysia",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/gallery-4.jpg",
    alt: "Wedding buffet spread",
    caption: "Wedding Buffet · Malaysia",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/gallery-5.webp",
    alt: "Traditional Malaysian cuisine",
    caption: "Traditional Cuisine · Malaysia",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/gallery-6.png",
    alt: "Grand buffet display",
    caption: "Grand Buffet · Malaysia",
    span: "sm:col-span-2",
    aspect: "aspect-[4/3] sm:aspect-[2.35/1]",
  },
  {
    src: "/gallery-7.png",
    alt: "Catering event setup",
    caption: "Event Setup · Malaysia",
    span: "",
    aspect: "aspect-[4/3]",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative bg-moss py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-rule w-12" />
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold">
                  The Gallery
                </p>
              </div>
            </Reveal>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream sm:text-5xl lg:text-6xl">
              <RevealText text="Scenes from" />{" "}
              <RevealText text="the feast floor" delay={0.15} className="italic gold-shimmer" />
            </h2>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md leading-relaxed text-cream/60">
              A glimpse of recent stages — grand halls in Kuala Lumpur, beach villas
              in Langkawi, and the open-fire stations where every KudaEmas event
              finds its heartbeat.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-4">
          {IMAGES.map((image, i) => (
            <Reveal key={image.src} delay={0.05 + i * 0.06} className={image.span}>
              <figure className="group relative h-full overflow-hidden rounded-2xl border border-cream/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={`${image.aspect} h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
                <figcaption className="absolute bottom-0 left-0 right-0 flex translate-y-2 items-center justify-between p-5 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cream">
                    {image.caption}
                  </span>
                  <span className="h-px flex-1 mx-4 bg-gold/40" />
                  <span className="font-display text-sm italic text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
