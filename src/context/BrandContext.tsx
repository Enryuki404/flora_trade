"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { BrandConfig, BrandId, brandMap, brands, DEFAULT_BRAND_ID } from "@/lib/brand";
import BrandSwitcher from "@/components/BrandSwitcher";

const STORAGE_KEY = "floratrade_brand";
const HINT_KEY = "brand_hint_dismissed";

type BrandContextValue = {
  brand: BrandConfig;
  brandId: BrandId;
  brands: BrandConfig[];
  setBrand: (id: BrandId) => void;
  isSwitcherOpen: boolean;
  openSwitcher: () => void;
  closeSwitcher: () => void;
};

const BrandContext = createContext<BrandContextValue | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brandId, setBrandId] = useState<BrandId>(DEFAULT_BRAND_ID);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const konamiIndex = useRef(0);

  // hydration-safe: only read after mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as BrandId | null;
    if (saved && brandMap[saved]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBrandId(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, brandId);
  }, [brandId, mounted]);

  const setBrand = useCallback((id: BrandId) => {
    if (!brandMap[id]) return;
    setBrandId(id);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
  }, []);

  const openSwitcher = useCallback(() => setIsSwitcherOpen(true), []);
  const closeSwitcher = useCallback(() => setIsSwitcherOpen(false), []);

  const brand = brandMap[brandId] ?? brandMap[DEFAULT_BRAND_ID];

  // --- Keyboard: Ctrl+Shift+B + Konami ↑↑↓↓←→←→BA ---
  useEffect(() => {
    const seq = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const onKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+B — 100% safe from browser
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "b") {
        e.preventDefault();
        e.stopPropagation();
        openSwitcher();
        konamiIndex.current = 0;
        return;
      }
      // Konami
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedRaw = seq[konamiIndex.current];
      const expected = expectedRaw.length === 1 ? expectedRaw.toLowerCase() : expectedRaw;
      // normalize Arrow keys lower for loose compare but keep exact for arrow
      const kk = k.toLowerCase();
      const ee = expected.toLowerCase();
      if (kk === ee) {
        konamiIndex.current += 1;
        if (konamiIndex.current === seq.length) {
          konamiIndex.current = 0;
          e.preventDefault();
          openSwitcher();
          try {
            navigator.vibrate([30, 20, 30]);
          } catch {}
        }
      } else {
        // overlapping reset: if current key matches start of seq, keep 1 else 0
        const first = seq[0].toLowerCase();
        konamiIndex.current = kk === first ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openSwitcher]);

  // --- Hidden URL triggers: ?brand=orchid  / ?brand=switch  / /pengetahuan?brand=switch ---
  useEffect(() => {
    const check = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const v = params.get("brand");
        if (v && ["orchid", "switch", "admin", "orchidloka", "orchidnest", "orchidgardenia", "brand"].includes(v.toLowerCase())) {
          openSwitcher();
          params.delete("brand");
          const newSearch = params.toString();
          const newUrl = window.location.pathname + (newSearch ? `?${newSearch}` : "") + window.location.hash;
          window.history.replaceState({}, "", newUrl);
        }
      } catch {}
    };
    // run on mount
    check();
    window.addEventListener("popstate", check);
    let lastSearch = window.location.search;
    let lastPath = window.location.pathname;
    const interval = setInterval(() => {
      if (window.location.search !== lastSearch || window.location.pathname !== lastPath) {
        lastSearch = window.location.search;
        lastPath = window.location.pathname;
        check();
      }
    }, 400);
    return () => {
      window.removeEventListener("popstate", check);
      clearInterval(interval);
    };
  }, [openSwitcher]);

  // --- In-website toast hint (replaces browser-panel tip) ---
  useEffect(() => {
    if (!mounted) return;
    try {
      if (localStorage.getItem(HINT_KEY) === "1") return;
    } catch {}
    const t = setTimeout(() => setHintVisible(true), 2200);
    const autoHide = setTimeout(() => setHintVisible(false), 16000);
    return () => {
      clearTimeout(t);
      clearTimeout(autoHide);
    };
  }, [mounted]);

  const dismissHint = useCallback(() => {
    setHintVisible(false);
    try {
      localStorage.setItem(HINT_KEY, "1");
    } catch {}
  }, []);

  // CSS variables for brand theming — SSR safe: default brand fallback in style
  const cssVars: React.CSSProperties = {
    ["--brand-primary" as string]: brand.colors.primary,
    ["--brand-primary-hover" as string]: brand.colors.primaryHover,
    ["--brand-accent" as string]: brand.colors.accent,
    ["--brand-light" as string]: brand.colors.light,
    transition: "background-color 300ms ease, color 300ms ease, border-color 300ms ease",
  } as React.CSSProperties;

  return (
    <BrandContext.Provider value={{ brand, brandId, brands, setBrand, isSwitcherOpen, openSwitcher, closeSwitcher }}>
      <div style={cssVars}>
        {children}
        {/* Single source of truth — all triggers open the same modal */}
        <BrandSwitcher isOpen={isSwitcherOpen} onClose={closeSwitcher} />

        {/* In-website toast — fixed bottom-right, not eaten by Edge toolbar */}
        {mounted && hintVisible && !isSwitcherOpen && (
          <div
            role="status"
            aria-live="polite"
            className="fixed z-[85] flex items-center gap-3 pl-3 pr-2 py-2.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-white/10 backdrop-blur-xl animate-[slideUp_420ms_cubic-bezier(0.16,1,0.3,1)] max-w-[340px] bottom-[88px] right-4 sm:right-[88px] sm:bottom-6 sm:max-w-[360px]"
            style={{ backgroundColor: "rgba(28,25,23,0.94)", color: "#fafaf9" }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm" style={{ backgroundColor: "var(--brand-primary, #0F7A4B)" }}>
              🎨
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[12px] font-bold tracking-tight">Brand switcher tersedia</div>
              <div className="text-[11px] text-stone-300 leading-snug mt-0.5">
                <span className="font-mono bg-white/10 px-1 py-0.5 rounded text-[10px]">Ctrl+Shift+B</span> · Konami · <span className="font-mono bg-white/10 px-1 py-0.5 rounded text-[10px]">?brand=orchid</span>
              </div>
            </div>
            <button
              onClick={openSwitcher}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white text-stone-900 text-xs font-bold hover:bg-stone-100 transition"
            >
              Buka
            </button>
            <button
              onClick={dismissHint}
              aria-label="Tutup hint"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 transition text-stone-300"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>
      </div>
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
