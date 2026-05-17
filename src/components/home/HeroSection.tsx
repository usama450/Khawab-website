import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] max-h-[600px] sm:h-[88vh] sm:max-h-none md:h-[92vh] overflow-hidden">
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

      {/* Overlay — 45% on mobile, slightly lighter on desktop */}
      <div className="absolute inset-0 bg-black/45 sm:bg-black/40 md:bg-black/35" />
      {/* Extra bottom gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 md:pb-20 px-6 sm:px-8 text-center">

        {/* Eyebrow — small on all screens */}
        <p
          className="text-[12px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-white/55 mb-4 sm:mb-5"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
        >
          Canadian Made · Pakistani Heritage
        </p>

        {/* Headline — 32–36px mobile, scales up on larger screens */}
        <h1
          className="text-white leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8 md:mb-8 max-w-3xl text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[5rem]"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 300, letterSpacing: "0.01em" }}
        >
          Sleep in Luxury.<br className="hidden sm:block" />{" "}
          Live in Comfort.
        </h1>

        {/* Sub-copy — hidden on mobile, visible sm+ */}
        <p
          className="hidden sm:block text-white/60 mb-8 md:mb-10 max-w-md"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(14px, 1.6vw, 16px)",
            fontWeight: 300,
            lineHeight: 1.75,
          }}
        >
          Premium bedsheets, comforters and towels — crafted for the modern Canadian home.
        </p>

        {/* CTA buttons — stacked + full-width on mobile, side-by-side on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xs sm:max-w-none sm:w-auto">
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-white text-[#1A1714] text-[12px] tracking-[0.2em] uppercase text-center transition-all duration-300 hover:bg-[#F4F0EB]"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Shop Collection
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-white/60 text-white text-[12px] tracking-[0.2em] uppercase text-center transition-all duration-300 hover:border-white hover:bg-white/10"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
          >
            Our Story
          </Link>
        </div>

        {/* Category quick-links — scroll horizontally on mobile */}
        <div className="flex items-center gap-5 sm:gap-6 mt-8 sm:mt-10 overflow-x-auto w-full justify-center pb-1">
          {[
            { label: "Bedsheets", href: "/shop/bedsheets" },
            { label: "Comforters", href: "/shop/comforters" },
            { label: "Towels", href: "/shop/towels" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="shrink-0 text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white/90 transition-colors"
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
