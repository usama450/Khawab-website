import Image from "next/image";
import Link from "next/link";

export function BrandStory() {
  return (
    <section className="relative h-[400px] md:h-[460px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=3840&q=100"
        alt="Khwab home textiles lifestyle"
        fill
        quality={100}
        className="object-cover"
        sizes="100vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-white/60 mb-5"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Our Story
        </p>
        <h2
          className="text-white max-w-xl leading-tight mb-5"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 300,
          }}
        >
          A Family Legacy, 25 Years in the Making
        </h2>
        <p
          className="text-white/70 max-w-md mb-9"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "15px",
            fontWeight: 300,
            lineHeight: 1.75,
          }}
        >
          Premium textiles crafted from Pakistan&rsquo;s finest cotton, brought to Canadian homes.
        </p>
        <Link
          href="/about"
          className="text-[11px] tracking-[0.2em] uppercase text-white border-b border-white/50 pb-0.5 hover:border-white transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Read Our Story
        </Link>
      </div>
    </section>
  );
}
