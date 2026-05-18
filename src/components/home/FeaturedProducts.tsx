import Link from "next/link";
import { prisma } from "@/lib/db";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollReveal } from "@/components/common/ScrollReveal";
import type { ProductCardData } from "@/types";

async function getFeaturedProducts(): Promise<ProductCardData[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true,
        slug: { not: "test-product-free" },
      },
      take: 6,
      include: {
        images: { orderBy: { displayOrder: "asc" }, take: 2 },
        variants: { select: { size: true, color: true, stockQuantity: true } },
        category: { select: { name: true, slug: true } },
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return products.map((p) => {
      const avgRating =
        p.reviews.length > 0
          ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
          : 0;
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
        isOnSale: p.isOnSale,
        isFeatured: p.isFeatured,
        images: p.images,
        category: p.category,
        variants: p.variants,
        _count: p._count,
        avgRating: Math.round(avgRating * 10) / 10,
      };
    });
  } catch {
    return [];
  }
}

function SkeletonCard() {
  return (
    <div className="min-w-[230px] flex-shrink-0 animate-pulse">
      <div className="aspect-[3/4] bg-[#EDE8E1]" />
      <div className="pt-3 space-y-2">
        <div className="h-2 bg-[#DDD8D2] rounded w-1/3" />
        <div className="h-3.5 bg-[#DDD8D2] rounded w-3/4" />
        <div className="h-2.5 bg-[#DDD8D2] rounded w-1/4" />
      </div>
    </div>
  );
}

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-[#F9F7F4] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <ScrollReveal
          type="fade-up"
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 lg:mb-12 gap-4 px-4 sm:px-8"
        >
          <div>
            <p
              className="text-[11px] tracking-[0.3em] uppercase text-[#6b6b6b] mb-3"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              Handpicked Favourites
            </p>
            <h2
              className="text-[#1A1714]"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 300, fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
            >
              Our Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[#2C4A35] hover:text-[#1A1714] transition-colors border-b border-[#2C4A35]/40 hover:border-[#1A1714] pb-0.5 self-start sm:self-auto"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            View all
          </Link>
        </ScrollReveal>

        {/* Carousel */}
        {products.length > 0 ? (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-8 pb-2">
            {products.map((product) => (
              <div key={product.id} className="min-w-[160px] max-w-[160px] flex-shrink-0 sm:min-w-[230px] sm:max-w-[230px] lg:min-w-[250px] lg:max-w-[250px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-8 pb-2">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
