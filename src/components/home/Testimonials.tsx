export function Testimonials() {
  const stats = [
    { value: "25+", label: "Years of Craft" },
    { value: "100%", label: "Canadian Made" },
    { value: "500TC", label: "Premium Thread Count" },
    { value: "Free", label: "Shipping Over $125" },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-[#1A2B20]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Eyebrow */}
        <p
          className="text-center text-[11px] tracking-[0.3em] uppercase text-white/40 mb-10"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Why Khwab
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-[#1A2B20] flex flex-col items-center justify-center py-8 sm:py-10 px-4 sm:px-6 text-center"
            >
              <span
                className="text-white mb-2"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
              >
                {value}
              </span>
              <span
                className="text-[11px] tracking-[0.2em] uppercase text-white/45"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
