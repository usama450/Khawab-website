import Link from "next/link";
import Image from "next/image";

const panels = [
  {
    href: "/shop/bedsheets",
    heading: "Bedroom Dreams",
    sub: "Shop Bedsheets",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=3840&q=100",
    alt: "Luxurious bedsheets",
  },
  {
    href: "/shop/comforters",
    heading: "Cloud-Like Comfort",
    sub: "Shop Comforters",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=3840&q=100",
    alt: "Premium comforters",
  },
  {
    href: "/shop/towels",
    heading: "Bath Luxury",
    sub: "Shop Towels",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=3840&q=100",
    alt: "Plush bath towels",
  },
];

export function HeroSection() {
  return (
    <section className="flex h-[65vh] min-h-[420px] max-md:flex-col max-md:h-auto">
      {panels.map((panel) => (
        <Link
          key={panel.href}
          href={panel.href}
          className="relative flex-1 overflow-hidden group max-md:h-[56vw] max-md:min-h-[220px]"
        >
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            priority
            quality={100}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Text */}
          <div className="absolute bottom-10 left-0 right-0 px-6 text-center">
            <h2
              className="text-white font-light text-[32px] md:text-[38px] leading-tight mb-5"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 300 }}
            >
              {panel.heading}
            </h2>
            <span
              className="inline-block text-[10px] tracking-[0.22em] uppercase text-white border-b border-white/50 pb-0.5 transition-all duration-300 group-hover:border-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {panel.sub}
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
