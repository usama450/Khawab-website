"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, Search, Menu, ChevronDown, User, Heart, Truck, RotateCcw, Leaf } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { MobileMenu } from "./MobileMenu";
import { SearchModal } from "./SearchModal";

const announcements = [
  { icon: Truck, text: "Free shipping on orders over $125 across Canada" },
  { icon: RotateCcw, text: "Free 30-day returns on all unwashed items" },
  { icon: Leaf, text: "Canadian-made with 25 years of textile expertise" },
];

const navLinks = [
  { label: "Shop All", href: "/shop" },
  {
    label: "Bedsheets",
    href: "/shop/bedsheets",
    sub: [
      { label: "Cotton Sheets", href: "/shop/bedsheets?material=cotton" },
      { label: "Percale Weave", href: "/shop/bedsheets?weave=percale" },
      { label: "Sateen Weave", href: "/shop/bedsheets?weave=sateen" },
      { label: "Shop All Bedsheets", href: "/shop/bedsheets" },
    ],
  },
  {
    label: "Comforters",
    href: "/shop/comforters",
    sub: [
      { label: "Duvet Sets", href: "/shop/comforters?type=duvet" },
      { label: "Comforter Sets", href: "/shop/comforters?type=comforter" },
      { label: "Shop All Comforters", href: "/shop/comforters" },
    ],
  },
  { label: "Towels", href: "/shop/towels" },
  { label: "Gift Bundles", href: "/shop/gift-bundles" },
  { label: "About", href: "/about" },
];

const heroPages = ["/"];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = mounted ? getItemCount() : 0;
  const pathname = usePathname();
  const isHeroPage = heroPages.includes(pathname);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((i) => (i + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-[0_1px_0_#E2DDD7]" : ""
        }`}
      >
        {/* Announcement bar — rotating messages */}
        <div
          className="text-center py-2.5 bg-[#1A2B20] overflow-hidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {announcements.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center justify-center gap-2 transition-all duration-500"
                style={{
                  display: i === announcementIdx ? "flex" : "none",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                }}
              >
                <Icon size={12} className="text-[#F9F7F4]/50 shrink-0" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-[#F9F7F4]/70">
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main bar: Search | Logo | Icons */}
        <div className="max-w-[1440px] mx-auto px-8 max-md:px-4">
          <div className="flex items-center h-[58px]">

            {/* Left: Search */}
            <div className="flex items-center basis-1/3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#1A1714]/55 hover:text-[#1A1714] transition-colors"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Center: Logo */}
            <Link
              href="/"
              className="flex flex-col items-center leading-none basis-1/3 justify-center"
            >
              <span
                className="text-[28px] tracking-[0.08em] text-[#1A1714]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
              >
                Khwab
              </span>
              <span
                className="text-[9px] tracking-[0.3em] uppercase text-[#6b6b6b] mt-0.5"
                style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
              >
                Home Textiles
              </span>
            </Link>

            {/* Right: Account + Wishlist + Cart + Hamburger */}
            <div className="flex items-center gap-0.5 basis-1/3 justify-end">
              {/* User menu — desktop only */}
              <div className="relative hidden lg:block" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen((v) => !v)}
                  className="p-2 text-[#1A1714]/55 hover:text-[#1A1714] transition-colors"
                  aria-label="Account"
                  aria-expanded={isUserMenuOpen}
                  aria-haspopup="menu"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>
                {isUserMenuOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-48 bg-white border border-[#E2DDD7] shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-2 z-50"
                    role="menu"
                    style={{ animation: "floatDown 0.18s ease forwards" }}
                  >
                    {session ? (
                      <>
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-[13px] text-[#5A554F] hover:text-[#1A1714] hover:bg-[#F4F0EB] transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                          role="menuitem"
                        >
                          My Account
                        </Link>
                        <button
                          onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                          className="block w-full text-left px-4 py-2.5 text-[13px] text-[#5A554F] hover:text-[#1A1714] hover:bg-[#F4F0EB] transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                          role="menuitem"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-[13px] text-[#5A554F] hover:text-[#1A1714] hover:bg-[#F4F0EB] transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                          role="menuitem"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2.5 text-[13px] text-[#5A554F] hover:text-[#1A1714] hover:bg-[#F4F0EB] transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                          role="menuitem"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Wishlist — desktop only */}
              <button
                className="hidden lg:block p-2 text-[#1A1714]/55 hover:text-[#1A1714] transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 text-[#1A1714] hover:text-[#2C4A35] transition-colors"
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {mounted && itemCount > 0 && (
                  <span
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-[#2C4A35] text-white text-[9px] font-semibold rounded-full flex items-center justify-center px-1 leading-none"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 text-[#1A1714]/55 hover:text-[#1A1714] transition-colors ml-1"
                aria-label="Open menu"
              >
                <Menu size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Nav row — desktop only */}
        <div className="hidden lg:block border-t border-[#E2DDD7]">
          <nav
            className="max-w-[1440px] mx-auto px-8 flex items-center justify-center h-[40px] gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[12px] tracking-[0.08em] uppercase text-[#1A1714]/60 hover:text-[#1A1714] transition-colors"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
                >
                  {link.label}
                  {link.sub && (
                    <ChevronDown
                      size={10}
                      className={`transition-transform duration-200 ${
                        activeDropdown === link.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {link.sub && activeDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-0 w-52 bg-white border border-[#E2DDD7] shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 z-50"
                    style={{ animation: "floatDown 0.18s ease forwards" }}
                  >
                    {link.sub.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-5 py-2.5 text-[13px] text-[#5A554F] hover:text-[#1A1714] hover:bg-[#F4F0EB] transition-colors"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {/* Spacer for non-hero pages — announcement(34) + main bar(58) + nav row(40) + borders */}
      {!isHeroPage && <div className="h-[136px]" aria-hidden="true" />}

      <MobileMenu isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
