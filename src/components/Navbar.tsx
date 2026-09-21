"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { categories } from "@/data/articles";
import { waLink } from "@/lib/constants";
import { useBrand } from "@/context/BrandContext";
import BrandSwitcher from "@/components/BrandSwitcher";

export default function Navbar() {
  const { brand } = useBrand();
  const [open, setOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  // — Hidden easter egg: triple-click within 1.5s —
  const clickTimes = useRef<number[]>([]);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const now = Date.now();
    clickTimes.current = [...clickTimes.current.filter((t) => now - t < 1500), now];
    if (clickTimes.current.length >= 3) {
      e.preventDefault();
      clickTimes.current = [];
      setSwitcherOpen(true);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate(20);
        } catch {}
      }
    }
  };

  const startLongPress = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      setSwitcherOpen(true);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([30, 20, 30]);
        } catch {}
      }
    }, 1200);
  };
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo — hidden brand switcher: triple-click / long-press */}
          <Link
            href="/"
            onClick={handleLogoClick}
            onPointerDown={startLongPress}
            onPointerUp={cancelLongPress}
            onPointerLeave={cancelLongPress}
            onPointerCancel={cancelLongPress}
            className="flex items-center gap-3 select-none"
            aria-label={`${brand.name} — home (hidden brand switcher: triple-click)`}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-colors duration-300 shrink-0"
              style={{ backgroundColor: brand.colors.primary }}
            >
              {brand.logo.type === "monogram" ? (
                brand.id === "orchidloka" ? (
                  <span className="flex flex-col items-center leading-none scale-90">
                    <span className="w-5 h-3 rounded-t-full border-[1.7px] block" style={{ borderColor: "#fff", borderBottom: "none" }} />
                    <span className="text-[7px] tracking-[0.18em] font-extrabold mt-[1px]">LOKA</span>
                  </span>
                ) : brand.id === "orchidgardenia" ? (
                  <span className="font-serif italic text-[18px] -mt-0.5">G</span>
                ) : (
                  <span>{brand.logo.text}</span>
                )
              ) : (
                <span>{brand.logo.text}</span>
              )}
            </div>
            <div className="transition-colors duration-300">
              <div className="font-bold text-stone-900 leading-none tracking-tight transition-colors duration-300">{brand.name}</div>
              <div className="text-[11px] tracking-[0.18em] font-semibold uppercase transition-colors duration-300" style={{ color: brand.colors.primary }}>
                {brand.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-700">
            <Link href="/" className="hover:text-emerald-700 transition">Home</Link>

            <div className="relative" onMouseEnter={() => setLayananOpen(true)} onMouseLeave={() => setLayananOpen(false)}>
              <button className="flex items-center gap-1 hover:text-emerald-700">
                Layanan
                <svg className={`w-4 h-4 transition ${layananOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {layananOpen && (
                <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-stone-100 p-2">
                  {[
                    { title: "Jasa Export Flora", desc: "Tanaman hias, bunga potong, benih, umbi", href: "/#layanan" },
                    { title: "Jasa Import Benih & Bibit", desc: "Izin Kementan + Karantina", href: "/#layanan" },
                    { title: "Freight Forwarding Cold Chain", desc: "Air & Reefer dengan data logger", href: "/#layanan" },
                    { title: "Konsultasi Phytosanitary", desc: "PC, KT-12, fumigasi", href: "/#layanan" },
                  ].map((i) => (
                    <Link key={i.title} href={i.href} className="block p-3 rounded-xl hover:bg-emerald-50">
                      <div className="font-semibold text-stone-900 text-sm">{i.title}</div>
                      <div className="text-xs text-stone-500">{i.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative" onMouseEnter={() => setKnowledgeOpen(true)} onMouseLeave={() => setKnowledgeOpen(false)}>
              <Link href="/pengetahuan" className="flex items-center gap-1 hover:text-emerald-700">
                Product Knowledge
                <svg className={`w-4 h-4 transition ${knowledgeOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </Link>
              {knowledgeOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-stone-100 p-2">
                  {categories.filter((c) => c.id !== "semua").map((c) => (
                    <Link key={c.id} href={`/pengetahuan?kategori=${c.id}`} className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-sm">{c.label}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#tentang" className="hover:text-emerald-700">Tentang Kami</Link>
            <Link href="/#kontak" className="hover:text-emerald-700">Kontak</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={waLink(`Halo ${brand.name} mau konsultasi ekspor flora`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-white text-sm font-semibold transition shadow-sm duration-300 hover:opacity-95"
              style={{ backgroundColor: brand.colors.primary }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primaryHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primary)}
            >
              Konsultasi Gratis →
            </a>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 rounded-lg border border-stone-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t bg-white px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setOpen(false)} className="block py-2 font-medium">Home</Link>
          <Link href="/#layanan" onClick={() => setOpen(false)} className="block py-2 font-medium">Layanan</Link>
          <Link href="/pengetahuan" onClick={() => setOpen(false)} className="block py-2 font-medium">Product Knowledge</Link>
          <Link href="/#kontak" onClick={() => setOpen(false)} className="block py-2 font-medium">Kontak</Link>
          <a
            href={waLink(`Halo ${brand.name} mau konsultasi ekspor flora`)}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center mt-3 px-5 py-3 rounded-full text-white font-semibold transition-colors duration-300"
            style={{ backgroundColor: brand.colors.primary }}
          >
            Konsultasi Gratis
          </a>
        </div>
      )}
      <BrandSwitcher isOpen={switcherOpen} onClose={() => setSwitcherOpen(false)} />
    </header>
  );
}
