import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-[92vh] min-h-[560px] overflow-hidden">
      {/* Full-bleed lifestyle image */}
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=3840&q=100"
        alt="Khwab luxury home textiles"
        fill
        priority
        quality={100}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Layered gradient — darker at bottom for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/65" />

      {/* Content — centre-bottom aligned */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-20 px-6 text-center">
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.4em] uppercase text-white/55 mb-5"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
        >
          Canadian Made · Pakistani Heritage
        </p>

        {/* Main headline */}
        <h1
          className="text-white leading-[1.1] mb-6 max-w-3xl"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "0.01em",
          }}
        >
          Sleep in Luxury.<br className="hidden sm:block" /> Live in Comfort.
        </h1>

        {/* Sub-copy */}
        <p
          className="text-white/60 mb-10 max-w-md"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(14px, 1.6vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.75,
          }}
        >
          Premium bedsheets, comforters and towels — crafted for the modern Canadian home.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-white text-[#1A1714] text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#F4F0EB]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Shop Collection
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-white/60 text-white text-[12px] tracking-[0.2em] uppercase transition-all duration-300 hover:border-white hover:bg-white/10"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
          >
            Our Story
          </Link>
        </div>

        {/* Category quick-links */}
        <div className="flex items-center gap-6 mt-10">
          {[
            { label: "Bedsheets", href: "/shop/bedsheets" },
            { label: "Comforters", href: "/shop/comforters" },
            { label: "Towels", href: "/shop/towels" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white/90 transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
