import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Layers, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Khwab — a Canadian home textiles brand born from a deep appreciation for quality craftsmanship and the rich textile traditions of Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative min-h-[60vh] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=3840&q=100"
          alt="Premium home textiles"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1A2B20]/75" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
          <p
            className="text-[10px] text-white/50 tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Est. 2024
          </p>
          <h1
            className="text-white max-w-xl mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
            }}
          >
            A New Chapter in Canadian Textiles
          </h1>
          <p
            className="text-white/55 font-light max-w-lg"
            style={{ fontFamily: "var(--font-inter)", fontSize: "16px", lineHeight: 1.7 }}
          >
            Crafted with care. Inspired by heritage. Made for the modern home.
          </p>
        </div>
      </div>

      {/* Light content section */}
      <div className="bg-[#F9F7F4]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
          {/* Brand story */}
          <div className="mb-16">
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-[#2C4A35] mb-4"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              Our Story
            </p>
            <h2
              className="text-[#1A1714] mb-6"
              style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300 }}
            >
              About Khwab
            </h2>
            <div className="space-y-4 max-w-2xl">
              <p
                className="leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", color: "#5A554F", fontSize: "15px", fontWeight: 300, lineHeight: 1.8 }}
              >
                Khwab — meaning &ldquo;dream&rdquo; in Urdu — is a Canadian home textiles brand
                born from a deep appreciation for quality craftsmanship and the rich textile
                traditions of Pakistan. We believe your home deserves the best, and that premium
                quality shouldn&apos;t be out of reach.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontFamily: "var(--font-inter)", color: "#5A554F", fontSize: "15px", fontWeight: 300, lineHeight: 1.8 }}
              >
                We partner with a trusted, family-owned Canadian manufacturer based in the Greater
                Toronto Area, with over 25 years of expertise in textile production. This
                partnership allows us to bring you beautifully crafted bedsheets, comforters, and
                towels — made in Canada, inspired by heritage, designed for the modern home.
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              {
                Icon: Leaf,
                title: "Canadian Made",
                text: "Every product is manufactured in the Greater Toronto Area. Canadian quality, through and through.",
              },
              {
                Icon: Layers,
                title: "Premium Quality",
                text: "From thread count to finishing, we hold every product to the highest standard — because your home deserves it.",
              },
              {
                Icon: Users,
                title: "Family Partnership",
                text: "We work with a family-owned Canadian manufacturer with 25+ years of expertise, sharing our commitment to quality.",
              },
            ].map(({ Icon, title, text }) => (
              <div
                key={title}
                className="bg-white border border-[#E2DDD7] p-7 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <Icon size={20} className="text-[#2C4A35] mb-5" strokeWidth={1.5} />
                <h3
                  className="text-[#1A1714] text-lg mb-3"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-inter)", color: "#7A746D", fontWeight: 300 }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#E2DDD7] mb-16">
            {[
              { value: "25+", label: "Years of Craft" },
              { value: "100%", label: "Canadian Made" },
              { value: "500TC", label: "Thread Count" },
              { value: "Free", label: "Shipping $125+" },
            ].map(({ value, label }, i) => (
              <div key={i} className="bg-[#F9F7F4] py-8 text-center">
                <div
                  className="text-[#1A1714] mb-1"
                  style={{ fontFamily: "var(--font-playfair)", fontSize: "2rem", fontWeight: 300 }}
                >
                  {value}
                </div>
                <div
                  className="text-[11px] tracking-[0.15em] uppercase text-[#7A746D]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Wide image */}
          <div className="mb-14">
            <div className="relative w-full aspect-[16/7] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=3840&q=100"
                alt="Premium fabric texture — every thread crafted with care"
                fill
                className="object-cover"
              />
            </div>
            <p
              className="text-[13px] italic text-center mt-3"
              style={{ fontFamily: "var(--font-inter)", color: "#B5AFA8" }}
            >
              Every thread crafted with care
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/shop"
              className="inline-block text-[12px] tracking-[0.2em] uppercase text-[#1A1714] border-b border-[#1A1714]/30 pb-0.5 hover:border-[#1A1714] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Shop Our Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
