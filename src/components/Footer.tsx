"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { useBrand } from "@/context/BrandContext";
import BrandSwitcher from "@/components/BrandSwitcher";

export default function Footer() {
  const { brand } = useBrand();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const dotClicks = useRef<number[]>([]);

  const handleDotClick = () => {
    const now = Date.now();
    dotClicks.current = [...dotClicks.current.filter((t) => now - t < 1500), now];
    if (dotClicks.current.length >= 5) {
      dotClicks.current = [];
      setSwitcherOpen(true);
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        try {
          navigator.vibrate([20, 30, 20]);
        } catch {}
      }
    }
  };

  return (
    <>
      <footer className="bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold transition-colors duration-300"
                  style={{ backgroundColor: brand.colors.primary }}
                >
                  {brand.logo.type === "monogram" ? (
                    brand.id === "orchidloka" ? (
                      <span className="flex flex-col items-center leading-none scale-90">
                        <span className="w-5 h-3 rounded-t-full border-[1.7px] block" style={{ borderColor: "#fff", borderBottom: "none" }} />
                        <span className="text-[7px] tracking-[0.18em] font-extrabold mt-[1px]">LOKA</span>
                      </span>
                    ) : brand.id === "orchidgardenia" ? (
                      <span className="font-serif italic text-[17px] -mt-0.5">G</span>
                    ) : (
                      <span>{brand.logo.text}</span>
                    )
                  ) : (
                    <span>{brand.logo.text}</span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-white leading-none transition-colors duration-300">{brand.name}</div>
                  <div className="text-[11px] tracking-[0.18em] font-semibold uppercase transition-colors duration-300" style={{ color: brand.colors.accent }}>
                    {brand.tagline}
                  </div>
                </div>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                Spesialis jasa export-import komoditi flora non-tambang. Kami bantu UMKM dan agribisnis Indonesia tembus pasar global — legal, segar, tepat waktu.
              </p>
              <div className="flex gap-3 mt-5">
                <a href="/#" aria-label={`Instagram ${brand.name}`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:text-white transition text-sm duration-300" style={{} as React.CSSProperties} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}>
                  ig
                </a>
                <a href="/#" aria-label={`LinkedIn ${brand.name}`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:text-white transition text-sm duration-300" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}>
                  in
                </a>
                <a href="/#" aria-label={`YouTube ${brand.name}`} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:text-white transition text-sm duration-300" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = brand.colors.primary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}>
                  yt
                </a>
              </div>
            </div>

            <div>
              <div className="font-semibold text-white mb-4">Navigasi</div>
              <ul className="space-y-2.5 text-sm text-stone-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#layanan" className="hover:text-white">
                    Layanan
                  </Link>
                </li>
                <li>
                  <Link href="/pengetahuan" className="hover:text-white">
                    Product Knowledge
                  </Link>
                </li>
                <li>
                  <Link href="/#tentang" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/#kontak" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-4">Layanan</div>
              <ul className="space-y-2.5 text-sm text-stone-400">
                <li>Jasa Export Flora (Tanaman Hias, Bunga)</li>
                <li>Jasa Import Benih & Bibit</li>
                <li>Cold Chain & Reefer Logistics</li>
                <li>Phytosanitary & Karantina</li>
                <li>Customs Clearance (PEB/PIB)</li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-4">Kontak</div>
              <ul className="space-y-3 text-sm text-stone-400">
                <li>📍 Jl. Flora Raya No.88, Lembang — Bandung<br />Gudang Karantina: Pelabuhan Tanjung Priok & Bandara Soetta</li>
                <li>📧 halo@{brand.domain}</li>
                <li>📞 +62 812-3456-7890 (WA 24/7)</li>
                <li>🕘 Senin–Sabtu 08.00–17.00 WIB</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-stone-500">
            <span className="select-none">
              © 2026 {brand.name} {brand.tagline === "NUSANTARA" ? "Nusantara" : ""}
              {/* hidden dot — 5x rapid click */}
              <button
                onClick={handleDotClick}
                aria-label="hidden brand switcher"
                className="inline-block px-0.5 -mx-0.5 cursor-default select-none focus:outline-none"
                style={{ WebkitTapHighlightColor: "transparent" }}
                title=""
              >
                .
              </button>{" "}
              All rights reserved. <span className="hidden sm:inline opacity-60">— {brand.domain}</span>
            </span>
            <span className="flex gap-4">
              <a href="/#privacy" className="hover:text-white">
                Kebijakan Privasi
              </a>
              <a href="/#terms" className="hover:text-white">
                Syarat Layanan
              </a>
            </span>
          </div>
        </div>
      </footer>
      <BrandSwitcher isOpen={switcherOpen} onClose={() => setSwitcherOpen(false)} />
    </>
  );
}
