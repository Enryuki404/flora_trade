"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { categories } from "@/data/articles";
import { waLink } from "@/lib/constants";
import { useBrand } from "@/context/BrandContext";

export default function Navbar() {
  const { brand, openSwitcher } = useBrand();
  const [open, setOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  // — Hidden easter egg: triple-click within 1.5s + long-press 1.2s —
  // Hardened against Edge text-selection / tab-search intercept
  const clickTimes = useRef<number[]>([]);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const triggerSwitcher = (e?: React.SyntheticEvent) => {
    if (e) {
      // @ts-ignore
      e.preventDefault?.();
      // @ts-ignore
      e.stopPropagation?.();
    }
    openSwitcher();
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
  };

  const handleLogoClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    // Always stop bubble to prevent Edge vertical-tabs / tab-search
    e.stopPropagation();
    const now = Date.now();
    clickTimes.current = [...clickTimes.current.filter((t) => now - t < 1500), now];
    if (clickTimes.current.length >= 3) {
      e.preventDefault();
      clickTimes.current = [];
      triggerSwitcher();
    }
  };

  // Capture-phase duplicate to win over browser before bubble
  const handleLogoClickCapture: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
    // prevent text-selection on rapid clicks
    // @ts-ignore native
    if (e.detail >= 3) {
      e.preventDefault();
    }
  };

  const startLongPress: React.PointerEventHandler<HTMLAnchorElement> = (e) => {
    // block browser's touch-callout / text selection
    e.stopPropagation();
    // don't preventDefault on pointerDown for normal clicks, only after threshold
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      // prevent the synthetic click that follows long-press from navigating
      openSwitcher();
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([30, 20, 30]);
        } catch {}
      }
    }, 1200);
  };
  const startLongPressCapture: React.PointerEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };
  const cancelLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  // Extra guarantee: capture listener via DOM API (Edge sometimes handles before React)
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const onSelectStart = (ev: Event) => ev.preventDefault();
    const onDragStart = (ev: Event) => ev.preventDefault();
    el.addEventListener("selectstart", onSelectStart, { capture: true } as AddEventListenerOptions);
    el.addEventListener("dragstart", onDragStart, { capture: true } as AddEventListenerOptions);
    return () => {
      el.removeEventListener("selectstart", onSelectStart, { capture: true } as AddEventListenerOptions);
      el.removeEventListener("dragstart", onDragStart, { capture: true } as AddEventListenerOptions);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo — hidden brand switcher: triple-click / long-press (hardened) */}
          <Link
            ref={logoRef}
            href="/"
            draggable={false}
            onClick={handleLogoClick}
            onClickCapture={handleLogoClickCapture}
            onPointerDown={startLongPress}
            onPointerDownCapture={startLongPressCapture}
            onPointerUp={cancelLongPress}
            onPointerLeave={cancelLongPress}
            onPointerCancel={cancelLongPress}
            onContextMenu={(e) => e.preventDefault()}
            className="flex items-center gap-3 select-none touch-manipulation"
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "manipulation",
              WebkitTouchCallout: "none",
              WebkitTapHighlightColor: "transparent",
            } as React.CSSProperties}
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
            <div className="transition-colors duration-300 select-none" style={{ userSelect: "none" } as React.CSSProperties}>
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
    </header>
  );
}
