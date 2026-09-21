"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { BrandConfig, BrandId, brandMap, brands, DEFAULT_BRAND_ID } from "@/lib/brand";

const STORAGE_KEY = "floratrade_brand";

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
  // hydration-safe: only read after mount
  const [mounted, setMounted] = useState(false);

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
    // haptic feedback subtle
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(20);
      } catch {}
    }
  }, []);

  const openSwitcher = useCallback(() => setIsSwitcherOpen(true), []);
  const closeSwitcher = useCallback(() => setIsSwitcherOpen(false), []);

  const brand = brandMap[brandId] ?? brandMap[DEFAULT_BRAND_ID];

  // Apply CSS variables for subtle global transition hint (optional)
  // We keep it in context so Navbar/Footer can use inline styles
  return (
    <BrandContext.Provider value={{ brand, brandId, brands, setBrand, isSwitcherOpen, openSwitcher, closeSwitcher }}>
      <div
        // 300ms transition wrapper - will animate background/border via child inline styles
        style={{ transition: "background-color 300ms ease, color 300ms ease" } as React.CSSProperties}
      >
        {children}
      </div>
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used within BrandProvider");
  return ctx;
}
