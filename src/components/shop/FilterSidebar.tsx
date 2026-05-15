"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

const CATEGORIES = [
  { label: "Bedsheets", value: "bedsheets" },
  { label: "Comforter Sets", value: "comforters" },
  { label: "Bath Towels", value: "towels" },
  { label: "Gift Bundles", value: "gift-bundles" },
];

const COLORS = [
  { label: "White",    value: "white",    hex: "#F8F4EE" },
  { label: "Ivory",    value: "ivory",    hex: "#FFFFF0" },
  { label: "Lavender", value: "lavender", hex: "#E8DFF5" },
  { label: "Plum",     value: "plum",     hex: "#4A2040" },
  { label: "Navy",     value: "navy",     hex: "#1a237e" },
  { label: "Sage",     value: "sage",     hex: "#87A878" },
  { label: "Blush",    value: "blush",    hex: "#F4C2C2" },
  { label: "Charcoal", value: "charcoal", hex: "#36454F" },
];

const SIZES = ["Twin", "Full", "Queen", "King", "Cal King"];

interface FilterSidebarProps {
  onClose?: () => void;
}

export function FilterSidebar({ onClose }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = useCallback(
    (key: string, value: string, toggle = false) => {
      const params = new URLSearchParams(searchParams.toString());
      if (toggle) {
        const current = params.getAll(key);
        if (current.includes(value)) {
          params.delete(key);
          current.filter((v) => v !== value).forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      } else {
        params.set(key, value);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => router.push(pathname);

  const selectedCategories = searchParams.getAll("category");
  const selectedColors = searchParams.getAll("color");
  const selectedSizes = searchParams.getAll("size");
  const maxPrice = searchParams.get("maxPrice") ?? "500";
  const isOnSale = searchParams.get("sale") === "true";
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedColors.length > 0 ||
    selectedSizes.length > 0 ||
    maxPrice !== "500" ||
    isOnSale;

  return (
    <aside className="w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2DDD7]">
        <h2
          className="text-[11px] uppercase tracking-[0.2em] text-[#1A1714]"
          style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
        >
          Filters
        </h2>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-[11px] text-[#7A746D] hover:text-[#1A1714] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-[#7A746D] hover:text-[#1A1714]">
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-[#E2DDD7]">

        {/* Category */}
        <div className="py-5">
          <h3
            className="text-[10px] uppercase tracking-[0.22em] text-[#7A746D] mb-3"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = selectedCategories.includes(cat.value);
              return (
                <button
                  key={cat.value}
                  onClick={() => updateParam("category", cat.value, true)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 text-[11px] tracking-[0.04em] border transition-all ${
                    active
                      ? "bg-[#1A1714] text-white border-[#1A1714]"
                      : "bg-white text-[#5A554F] border-[#E2DDD7] hover:border-[#1A1714] hover:text-[#1A1714]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-[10px] uppercase tracking-[0.22em] text-[#7A746D]"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              Price
            </h3>
            <span
              className="text-[12px] text-[#1A1714]"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
            >
              Up to ${maxPrice}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={10}
            value={parseInt(maxPrice)}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="w-full accent-[#1A1714] cursor-pointer"
          />
          <div
            className="flex justify-between mt-2 text-[10px] text-[#B5AFA8]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>$0</span>
            <span>$500</span>
          </div>
        </div>

        {/* Color */}
        <div className="py-5">
          <h3
            className="text-[10px] uppercase tracking-[0.22em] text-[#7A746D] mb-4"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Color
          </h3>
          <div className="grid grid-cols-4 gap-x-2 gap-y-3">
            {COLORS.map((color) => {
              const active = selectedColors.includes(color.value);
              return (
                <button
                  key={color.value}
                  onClick={() => updateParam("color", color.value, true)}
                  aria-label={color.label}
                  aria-pressed={active}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <span
                    className={`w-10 h-10 rounded-full block border-2 transition-all ${
                      active
                        ? "border-[#1A1714] shadow-[0_0_0_2px_rgba(26,23,20,0.12)]"
                        : "border-[#E2DDD7] group-hover:border-[#7A746D]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <span
                    className={`text-[9px] tracking-[0.06em] leading-none transition-colors ${
                      active ? "text-[#1A1714]" : "text-[#B5AFA8] group-hover:text-[#7A746D]"
                    }`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {color.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size */}
        <div className="py-5">
          <h3
            className="text-[10px] uppercase tracking-[0.22em] text-[#7A746D] mb-3"
            style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
          >
            Size
          </h3>
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => {
              const active = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => updateParam("size", size, true)}
                  aria-pressed={active}
                  className={`px-3.5 py-2 text-[11px] tracking-[0.06em] border transition-all ${
                    active
                      ? "bg-[#1A1714] text-white border-[#1A1714]"
                      : "bg-white text-[#5A554F] border-[#E2DDD7] hover:border-[#1A1714] hover:text-[#1A1714]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* On Sale — toggle switch */}
        <div className="py-5">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              if (isOnSale) params.delete("sale");
              else params.set("sale", "true");
              router.push(`${pathname}?${params.toString()}`);
            }}
            className="flex items-center gap-3 group w-full"
          >
            {/* toggle track */}
            <span
              className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors ${
                isOnSale ? "bg-[#1A1714]" : "bg-[#DDD8D2]"
              }`}
            >
              {/* toggle thumb */}
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
                  isOnSale ? "left-4" : "left-0.5"
                }`}
              />
            </span>
            <span
              className={`text-[12px] transition-colors ${
                isOnSale ? "text-[#1A1714]" : "text-[#5A554F] group-hover:text-[#1A1714]"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
            >
              On Sale
            </span>
          </button>
        </div>

      </div>
    </aside>
  );
}
