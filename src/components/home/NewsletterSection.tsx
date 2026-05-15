import Link from "next/link";
import { NewsletterForm } from "@/components/common/NewsletterForm";
import { ScrollReveal } from "@/components/common/ScrollReveal";

export function NewsletterSection() {
  return (
    <section className="py-12 lg:py-16 bg-[#F5F1EA]">
      <div className="max-w-[420px] mx-auto px-6 sm:px-4 text-center">
        <ScrollReveal type="fade-up">
          {/* Eyebrow */}
          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[#7A746D] mb-4"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Stay in the Loop
          </p>

          {/* Heading */}
          <h2
            className="text-[#1A1714] mb-6 leading-tight"
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
              color: "#7A746D",
              fontSize: "14px",
            }}
          >
            Subscribe for exclusive offers, new arrivals, and home styling inspiration.
          </p>

          {/* Form */}
          <NewsletterForm />

          {/* Fine print */}
          <p
            className="mt-4 text-[11px] text-[#B5AFA8]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            By subscribing you agree to our{" "}
            <Link href="/privacy" className="underline hover:text-[#7A746D] transition-colors">
              Privacy Policy
            </Link>
            . Unsubscribe anytime.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
