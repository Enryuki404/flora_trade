"use client";

import { useEffect, useRef } from "react";
import { useBrand } from "@/context/BrandContext";
import { BrandId } from "@/lib/brand";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BrandSwitcher({ isOpen, onClose }: Props) {
  const { brandId, brands, setBrand } = useBrand();
  const panelRef = useRef<HTMLDivElement>(null);

  // close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // focus trap not needed, just autofocus
  useEffect(() => {
    if (isOpen) panelRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (id: BrandId) => {
    setBrand(id);
    // subtle delay before close for transition perception
    setTimeout(() => onClose(), 260);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        aria-label="Close brand switcher"
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm animate-[fadeIn_200ms_ease]"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Brand Switcher - Easter Egg"
        className="relative w-full max-w-[420px] bg-white rounded-[24px] shadow-2xl border border-stone-100 p-6 sm:p-7 outline-none animate-[scaleIn_220ms_cubic-bezier(0.16,1,0.3,1)]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-1">
          <div>
            <div className="text-[11px] font-bold tracking-[0.18em] text-stone-400 uppercase">Easter Egg Unlocked ✨</div>
            <h2 className="text-lg font-extrabold tracking-tight text-stone-900 mt-1">Pilih Identitas Brand</h2>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">Hidden switcher — tampilan akan bertransisi halus (300ms).</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition shrink-0"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Pills */}
        <div className="mt-5 grid grid-cols-1 gap-2.5">
          {brands.map((b) => {
            const active = b.id === brandId;
            return (
              <button
                key={b.id}
                onClick={() => handleSelect(b.id)}
                className={`group w-full text-left rounded-2xl border px-4 py-3.5 flex items-center gap-3.5 transition-all duration-300 ${
                  active
                    ? "bg-stone-900 text-white border-stone-900 shadow-lg scale-[1.01]"
                    : "bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 hover:shadow-sm"
                }`}
              >
                {/* Logo mark */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[15px] font-bold shrink-0 transition-colors duration-300 shadow-sm border"
                  style={{
                    backgroundColor: active ? b.colors.primary : b.colors.light,
                    color: active ? "#fff" : b.colors.primary,
                    borderColor: active ? "transparent" : b.colors.accent + "55",
                  }}
                >
                  {b.logo.type === "monogram" ? (
                    <span className="tracking-tight" style={{ fontFamily: "var(--font-jakarta), serif" }}>
                      {b.id === "orchidloka" ? (
                        // geometric arch hint
                        <span className="inline-flex flex-col items-center leading-none">
                          <span className="w-5 h-3 rounded-t-full border-2 block" style={{ borderColor: active ? "#fff" : b.colors.primary, borderBottom: "none" }} />
                          <span className="text-[10px] tracking-[0.16em] mt-0.5 font-extrabold">{b.logo.subtext}</span>
                        </span>
                      ) : (
                        <span className={b.id === "orchidgardenia" ? "text-[18px] font-serif italic" : ""}>{b.logo.text}</span>
                      )}
                    </span>
                  ) : (
                    <span>{b.logo.text}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-bold leading-none tracking-tight flex items-center gap-2 ${active ? "text-white" : "text-stone-900"}`}>
                    {b.name}
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${active ? "bg-white/15 text-white" : "bg-stone-100 text-stone-500"}`}>
                      {b.domain}
                    </span>
                  </div>
                  <div className={`text-[11px] tracking-[0.14em] font-semibold uppercase mt-1 ${active ? "text-white/60" : ""}`} style={!active ? { color: b.colors.primary } : undefined}>
                    {b.tagline}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${active ? "bg-white border-white text-stone-900" : "border-stone-200 text-transparent"}`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[11px] text-stone-400">Tip: triple-click logo atau long-press 1.2 d di Navbar.</span>
          <span className="text-[11px] font-medium text-stone-500">{brands.findIndex((b) => b.id === brandId) + 1} / {brands.length}</span>
        </div>
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes scaleIn{from{opacity:0;transform:scale(0.96) translateY(4px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}
