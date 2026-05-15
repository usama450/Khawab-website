import Link from "next/link";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-xl mx-auto px-6 text-center">
        <p
          className="text-[11px] tracking-[0.3em] uppercase text-[#6b6b6b] mb-4"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
        >
          Customer Stories
        </p>
        <h2
          className="text-[#1A1714] mb-8"
          style={{ fontFamily: "var(--font-playfair)", fontWeight: 300, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
        >
          What Our Customers Say
        </h2>

        <div className="flex items-center justify-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={16} className="fill-[#1A1714] text-[#1A1714]" />
          ))}
        </div>

        <p
          className="mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 300, color: "#7A746D", fontSize: "14px" }}
        >
          We&rsquo;re welcoming our first Khwab family. Be among the first to share your experience.
        </p>

        <Link
          href="/shop"
          className="text-[11px] tracking-[0.2em] uppercase text-[#1A1714] border-b border-[#1A1714]/30 pb-0.5 hover:border-[#1A1714] transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
