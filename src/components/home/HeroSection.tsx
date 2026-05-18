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

        {/* Single headline */}
        <h1
          className="text-white leading-[1.15] sm:leading-[1.1] mb-8 sm:mb-10 max-w-2xl text-[2rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[4.8rem]"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 300, letterSpacing: "0.01em" }}
        >
          Premium Home Textiles, Canadian Made.
        </h1>

        {/* Single CTA */}
        <Link
          href="/shop"
          className="px-10 py-4 bg-white text-[#1A1714] text-[12px] tracking-[0.22em] uppercase text-center transition-all duration-300 hover:bg-[#F4F0EB]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
}
