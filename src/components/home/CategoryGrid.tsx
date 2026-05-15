import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";

const CATEGORY_META: Record<string, { image: string; label: string; order: number }> = {
  bedsheets: {
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=3840&q=100",
    label: "Bedsheets",
    order: 0,
  },
  comforters: {
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=3840&q=100",
    label: "Comforters",
    order: 1,
  },
  towels: {
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=3840&q=100",
    label: "Towels",
    order: 2,
  },
};

const ALLOWED_SLUGS = ["bedsheets", "comforters", "towels"];

export async function CategoryGrid() {
  const dbCategories = await prisma.category.findMany({
    include: { _count: { select: { products: { where: { isActive: true } } } } },
    orderBy: { name: "asc" },
  });

  const categories = dbCategories
    .filter((c) => ALLOWED_SLUGS.includes(c.slug))
    .sort((a, b) => (CATEGORY_META[a.slug]?.order ?? 99) - (CATEGORY_META[b.slug]?.order ?? 99));

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-8 max-md:px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <p
            className="text-[11px] tracking-[0.3em] uppercase text-[#6b6b6b] mb-3"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
          >
            Collections
          </p>
          <h2
            className="text-[#1A1714]"
            style={{ fontFamily: "var(--font-playfair)", fontWeight: 300, fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
          >
            Shop by Category
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat.slug];
            if (!meta) return null;

            return (
              <Link
                key={cat.slug}
                href={`/shop/${cat.slug}`}
                className="group relative aspect-[4/5] overflow-hidden block"
              >
                <Image
                  src={meta.image}
                  alt={meta.label}
                  fill
                  quality={90}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3
                    className="text-xl text-white mb-3 font-light"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {meta.label}
                  </h3>
                  <span
                    className="inline-block text-[10px] tracking-[0.2em] uppercase text-white/80 border-b border-white/40 pb-0.5 group-hover:text-white group-hover:border-white transition-all duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Explore →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
