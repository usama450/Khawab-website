import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "@/components/common/NewsletterForm";

export function NewsletterSection() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=3840&q=100"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1A2B20]/80" />

      {/* Content */}
      <div className="relative z-10 max-w-[420px] mx-auto px-6 sm:px-4 text-center">
        {/* Eyebrow */}
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-white/45 mb-4"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Stay in the Loop
        </p>

        {/* Heading */}
        <h2
          className="text-white mb-5 leading-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 300,
          }}
        >
          Get 10% Off Your First Order
        </h2>

        {/* Body */}
        <p
          className="mb-9 leading-relaxed max-w-sm mx-auto"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.55)",
            fontSize: "14px",
          }}
        >
          Subscribe for exclusive offers, new arrivals, and home styling inspiration.
        </p>

        {/* Form */}
        <NewsletterForm darkMode />

        {/* Fine print */}
        <p
          className="mt-4 text-[11px] text-white/30"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          By subscribing you agree to our{" "}
          <Link href="/privacy" className="underline hover:text-white/60 transition-colors">
            Privacy Policy
          </Link>
          . Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
