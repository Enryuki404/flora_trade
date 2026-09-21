"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [layananOpen, setLayananOpen] = useState(false);
  const [knowledgeOpen, setKnowledgeOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white font-bold text-lg">🌿</div>
            <div>
              <div className="font-bold text-stone-900 leading-none tracking-tight">FloraTrade</div>
              <div className="text-[11px] tracking-[0.18em] text-emerald-700 font-semibold uppercase">Nusantara</div>
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
                  {["Dasar Export Import", "Regulasi & Bea Cukai", "Incoterms", "Dokumen", "Logistik", "Tips"].map((c) => (
                    <Link key={c} href={`/pengetahuan?kategori=${c}`} className="block px-3 py-2 rounded-lg hover:bg-emerald-50 text-sm">{c}</Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/#tentang" className="hover:text-emerald-700">Tentang Kami</Link>
            <Link href="/#kontak" className="hover:text-emerald-700">Kontak</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="https://wa.me/6281234567890?text=Halo%20FloraTrade%20mau%20konsultasi%20ekspor%20flora" target="_blank" className="px-5 py-2.5 rounded-full bg-emerald-700 text-white text-sm font-semibold hover:bg-emerald-800 transition shadow-sm">Konsultasi Gratis →</a>
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
          <a href="https://wa.me/6281234567890?text=Halo%20FloraTrade" className="block text-center mt-3 px-5 py-3 rounded-full bg-emerald-700 text-white font-semibold">Konsultasi Gratis</a>
        </div>
      )}
    </header>
  );
}
